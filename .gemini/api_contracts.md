# Интеграция и Контракты API

В данном документе описываются контракты взаимодействия клиентской части приложения с бэкенд-сервисами (Laravel API), а также механизмы нормализации данных на клиенте.

---

## 1. Базовая адресация эндпоинтов

Все запросы к бэкенду отправляются через обёртку `src/utils/api.js`.  
Префикс пути каждого запроса формируется динамически с учётом текущего `scope` (за исключением случаев, когда `scope` пустой, что соответствует значению по умолчанию).

Шаблон запроса:
```
GET /api/{scope}/blocks/...
```

---

## 2. Спецификации контрактов

### 2.1 Навигация и Ссылки Меню (`navigation`)
Эндпоинт загрузки навигационной структуры:
```
GET /{scope}/blocks/blocks/navigation
```

#### Формат ответа API (JSON):
```json
{
  "success": true,
  "content": [
    {
      "anchor": "Портфолио",
      "link": "ru/portfolio",
      "sort": 10
    },
    {
      "anchor": "Услуги",
      "link": "/services",
      "sort": 20
    }
  ]
}
```

#### Особенности и нормализация на клиенте:
Бэкенд может возвращать ссылки как со scope-префиксом (`ru/portfolio`), так и абсолютные/относительные без префикса.
* **Проблема:** Если ссылка содержит префикс (`ru/portfolio`), компонент `<AppLink>` может ошибочно повторно применить префикс, сформировав некорректный путь `/ru/ru/portfolio`.
* **Решение:** На фронтенде перед сохранением в `navigationStore.nav` все ссылки прогоняются через утилитарную функцию `normalizeLink`:
  ```js
  import { normalizeLink } from '@/utils/normalizeLink'
  // Очищает переданный URL от известных префиксов VALID_SCOPES, возвращая чистый scope-агностичный путь
  const safeLink = normalizeLink(rawLink, VALID_SCOPES)
  ```

---

### 2.2 Блоки категорий (`category`)
Загрузка данных категории конкретного блока (например, для портфолио):
```
GET /{scope}/blocks/blocks/category/{slug}
```

#### Формат ответа API (JSON):
```json
{
  "success": true,
  "data": {
    "id": 5,
    "slug": "portfolio",
    "name": "Наши работы",
    "sections": {
      "works": {
        "work-1": {
          "title": "Разработка интернет-магазина",
          "workclass": [
            { "key": "web", "label": "Веб-сайты" }
          ],
          "img": "portfolio/img-1.jpg"
        },
        "work-2": {
          "title": "Мобильное приложение для доставки",
          "workclass": [
            { "key": "mobile", "label": "Мобильные" }
          ],
          "img": "portfolio/img-2.jpg"
        }
      }
    }
  }
}
```

#### Нормализация в геттере `filteredItems`:
В API данные элементов (`works`) возвращаются в виде объекта, где ключами являются слаги (`work-1`, `work-2`).  
Для удобного рендеринга через `v-for` фронтенд нормализует этот объект в массив в геттере `filteredItems` внутри `blockStore`:
```js
// src/stores/blockStore.js
getters: {
  filteredItems: (state) => {
    const rawWorks = state.category?.sections?.works || {}
    return Object.entries(rawWorks).map(([slug, data]) => ({
      slug,
      ...data
    }))
  }
}
```

---

### 2.3 Детализированные элементы блока (`item`)
Загрузка данных конкретной детальной страницы (например, проект из портфолио или статья):
```
GET /{scope}/blocks/blocks/item/{slug}
```

#### Формат ответа API (JSON):
```json
{
  "success": true,
  "data": {
    "id": 101,
    "slug": "work-1",
    "name": "Разработка интернет-магазина",
    "properties": {
      "title": "Кейс: Интернет-магазин под ключ",
      "client": "ООО 'РитейлГрупп'",
      "year": "2026",
      "description": "Полное описание выполненных работ..."
    },
    "content": {
      "blocks": [
        { "type": "text", "value": "Параграф текста" },
        { "type": "image", "value": "images/case-1-step-1.jpg" }
      ]
    }
  }
}
```
Фронтенд извлекает свойства `properties` и структуру `content` для сборки детальной страницы. Если детальный элемент содержит вложенную структуру страниц, в `usePageOrchestrator` должна применяться схема `'structure+category+item'`.
