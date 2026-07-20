# WS DS — WebSolutions Design System Layer

## 1. Назначение слоя

**WS DS** — это формирующийся frontend-слой компонентной дизайн-системы проекта WebSolutions.

Его задача — не просто “оформлять элементы интерфейса”, а задать устойчивую систему построения UI:

```text
UI primitives
  ↓
UI composites
  ↓
Feature / presentation blocks
  ↓
Data-driven rendering
```

WS DS должен стать промежуточным слоем между:

```text
Vue component architecture
  ↔
layout/styling layer
  ↔
данными, приходящими из backend/API
```

На текущем этапе WS DS рассматривается строго в границах **component-driven design system**. Tailwind, общий Vue-фундамент, animation layer и backend/data-driven слой пока не раскрываются как отдельные главы, но учитываются как соседние архитектурные контексты.

---

## 2. Текущее состояние

Слой возник из практического рефакторинга участка:

```text
src/views/Compred.vue
  → src/components/blocks/compred/presentation/benefits.vue
  → src/components/blocks/general/ui/Card.vue
  → src/components/blocks/general/ui/SectionHeader.vue
  → src/components/blocks/services/micro/IconOffer.vue
```

Изначально разметка опиралась на связку:

```text
Bootstrap classes
+ legacy CSS classes
+ локальные правки внутри feature-компонента
```

Постепенно эта структура была разложена на более чистую модель:

```text
Feature component: Benefits
UI primitive: Card
UI composite / primitive candidate: SectionHeader
Micro visual component: IconOffer
Layout layer: Bootstrap row / col / align-items-stretch
```

Ключевой сдвиг:

```text
Было:
HTML + Bootstrap + legacy CSS + точечные правки

Стало:
Component system + slots + UI primitives + scoped CSS
```

---

## 3. Архитектурная граница WS DS

WS DS отвечает за:

```text
- структуру UI-компонентов
- публичный API UI-компонентов
- slots / props / naming conventions
- локальную семантику HTML
- правила scoped CSS
- разделение primitive / composite / feature
- постепенную изоляцию от legacy Bootstrap classes
- поведение reusable UI-контейнеров
```

WS DS не отвечает за:

```text
- получение данных из API
- маршрутизацию
- Pinia state management
- backend contracts
- бизнес-логику
- анимационный lifecycle
- сидирование данных
```

Если компонент начинает импортировать store, выполнять fetch или знать структуру backend глубже, чем нужно для отображения props, он выходит за границы WS DS и нарушает frontend-слойность.

---

## 4. Основная модель слоев внутри WS DS

### 4.1. UI primitives

Нижний reusable-слой.

Примеры:

```text
Card
Button
Input
Section
Grid
```

Текущие фактические представители:

```text
Card
SectionHeader
```

Хотя `SectionHeader` может быть отнесен и к UI composite, на текущем этапе его допустимо считать primitive/composite boundary-компонентом.

UI primitive должен:

```text
- быть максимально независимым от бизнес-смысла
- не знать про services / benefits / offers / portfolio
- не импортировать feature-specific components
- не знать структуру API-объектов
- предоставлять стабильный API через slots и props
- описывать layout-поведение
```

UI primitive не должен:

```text
- принимать объект item целиком, если ему нужны только title/icon
- содержать business-specific naming
- хардкодить IconOffer или другие feature-specific элементы
- решать, какие данные показывать
```

---

### 4.2. UI composites

Компоненты, которые собирают несколько primitives в устойчивый UI-паттерн.

Примеры-кандидаты:

```text
SectionHeader
CardHeader
CardBody
CardsGrid
```

Назначение UI composite:

```text
- стандартизировать повторяемые UI-паттерны
- уменьшать дублирование layout-разметки
- сохранять предсказуемый API
- не превращаться в бизнес-компонент
```

Пример будущего направления:

```vue
<Card>
  <template #header>
    <CardHeader>
      <IconOffer />
      {{ item.title }}
    </CardHeader>
  </template>
</Card>
```

Это следующий уровень: composition inside composition.

---

### 4.3. Feature / presentation components

Feature-компоненты — это компоненты уровня конкретного блока страницы.

Примеры:

```text
benefits.vue
services.vue
pricing.vue
portfolio/list.vue
```

Feature-компонент отвечает за:

```text
- принятие props от orchestrator/index layer
- выбор, какие UI primitives использовать
- маппинг data.items в UI
- подключение micro-компонентов
- композицию slots
```

Feature-компонент не должен:

```text
- определять внутреннее устройство Card
- дублировать layout Card-header
- импортировать Pinia store напрямую
- выполнять fetch
- держать глобальные стили
```

В текущем кейсе `benefits.vue` корректно стал composition layer:

```vue
<Card>
  <template #icon>
    <IconOffer :index="item.index" :properties="item" />
  </template>

  <template #title>
    {{ item.title }}
  </template>

  <template #text>
    {{ item.text }}
  </template>
</Card>
```

`Benefits` решает **что** отрисовать, а `Card` решает **как** устроен базовый контейнер.

---

### 4.4. Micro visual components

Micro-компоненты — мелкие визуальные элементы.

Пример:

```text
IconOffer
```

Текущий статус `IconOffer`:

```text
- используется в нескольких местах
- принимает index и properties
- временно связан со структурой item/properties
- пока допустим как transitional component
```

Целевое направление:

```text
IconOffer должен постепенно уйти от properties:Object
к более явному API:
  icon
  index / variant
  gradient / colorScheme
```

Текущая связь:

```vue
<IconOffer :index="item.index" :properties="item" />
```

допустима временно, но в долгосрочной WS DS-архитектуре это считается техническим долгом.

---

## 5. Главный принцип слоя

Главный принцип WS DS:

```text
Composition over configuration
```

То есть предпочтение композиции через slots вместо передачи большого набора props.

Нежелательный путь:

```vue
<Card
  :icon="item.icon"
  :title="item.title"
  :text="item.text"
  :badge="item.badge"
  :action="item.action"
/>
```

Предпочтительный путь:

```vue
<Card>
  <template #icon>
    <IconOffer />
  </template>

  <template #title>
    {{ item.title }}
  </template>

  <template #default>
    {{ item.text }}
  </template>

  <template #footer>
    <Button />
  </template>
</Card>
```

Смысл:

```text
Card не знает, что именно вставлено внутрь.
Card знает только свои зоны и поведение этих зон.
```

---

## 6. Slots как API компонента

В WS DS slot — это не просто “дырка для контента”, а часть публичного API компонента.

Для `Card` текущий слот-API можно описать так:

```text
icon   — зона визуального маркера / иконки
title  — зона заголовка
text   — зона основного текстового содержимого
footer — будущая зона действия / кнопки / ссылки
```

Однако есть важное замечание: слот `text` лучше в будущем заменить на default slot.

Целевой API:

```vue
<Card>
  <template #icon>
    ...
  </template>

  <template #title>
    ...
  </template>

  Основное содержимое карточки

  <template #footer>
    ...
  </template>
</Card>
```

Почему default лучше:

```text
- это стандартная Vue-семантика
- body/content не требует обязательного имени
- Card становится ближе к привычным UI-библиотекам
```

Текущий `text` можно оставить на переходном этапе, но зафиксировать как temporary API.

---

## 7. Card как UI primitive

`Card` — центральный первый primitive WS DS.

Он должен отвечать за:

```text
- внешний контейнер карточки
- высоту и растяжение
- внутренние зоны
- базовый layout header/body/footer
- spacing внутри карточки
- shadow / border / radius
- slot layout
```

Он не должен отвечать за:

```text
- выбор иконки
- выбор заголовка
- бизнес-значение карточки
- структуру item
- количество карточек в сетке
```

Текущая модель `Card`:

```text
ui-card
  ui-card__header
    ui-card__header-inner
      ui-card__icon
      ui-card__title
  ui-card__body
```

Это правильное направление, потому что header описан как набор зон:

```text
icon: фиксированная зона
title: гибкая зона
```

CSS описывает поведение:

```text
icon → flex: 0 0 auto
title → flex: 1 1 auto
```

То есть карточка проектируется не как случайный div, а как layout-контракт.

---

## 8. SectionHeader как UI component

`SectionHeader` фиксирует повторяемый паттерн заголовка секции:

```text
subtitle / pretitle
title
alignment
spacing
typography
```

Текущая реализация:

```vue
<SectionHeader class="text-center">
  <template #subtitle>{{ props.data.pretitle }}</template>
  <template #title>{{ props.data.title }}</template>
</SectionHeader>
```

Это хороший промежуточный вариант, потому что:

```text
- заголовок вынесен из feature-компонента
- legacy .section-title удаляется
- стили перестают зависеть от .section-title h2
- появляется единое место управления типографикой секций
```

Открытый вопрос:

```text
SectionHeader должен ли принимать slots, props или поддерживать оба режима?
```

Рекомендуемая траектория:

```text
1. slots оставить как основной гибкий API
2. props добавить позже как shortcut API, если появится много простых случаев
```

Пример будущего dual API:

```vue
<SectionHeader
  subtitle="..."
  title="..."
/>
```

и одновременно:

```vue
<SectionHeader>
  <template #subtitle>...</template>
  <template #title>...</template>
</SectionHeader>
```

---

## 9. Naming conventions

В WS DS принимается hybrid naming strategy.

### 9.1. Глобальные UI primitives

Для reusable primitives используется namespace:

```css
.ui-card
.ui-button
.ui-input
.ui-section
```

Если компонент содержит внутренние глобальные элементы:

```css
.ui-card__header
.ui-card__body
.ui-card__footer
```

### 9.2. Scoped CSS внутри компонента

Внутри Vue SFC с `scoped` допустимы короткие имена:

```css
.header
.title
.subtitle
.body
.icon
```

Это предпочтительнее, чем чрезмерно длинный BEM:

```css
.cards_block__header__title
```

### 9.3. Не использовать

Не использовать:

```css
.cb_title
nero_title
cards_block__header__title
.page .cards_block .header
```

Причины:

```text
- cb_* теряет читаемость
- nero_* привязывает UI к авторскому/персональному namespace
- длинный BEM решает проблему, которую уже решает scoped CSS
- каскад через родителя ломает инкапсуляцию
```

### 9.4. Bootstrap classes

Bootstrap-классы пока допустимы на layout-уровне:

```html
container
row
col
d-flex
align-items-stretch
row-cols-2
row-cols-lg-4
```

Bootstrap не должен становиться design-system API.

---

## 10. Bootstrap в WS DS

Bootstrap сейчас является transitional dependency.

Правильная граница:

```text
Bootstrap = layout / compatibility layer
WS DS = component behavior / UI identity
```

Допустимо:

```html
<div class="container">
<div class="row row-cols-2 row-cols-lg-4 align-items-stretch">
<div class="col d-flex">
```

Нежелательно внутри primitive:

```html
<div class="card card-header card-body ...">
```

Если `Card` уже переопределяет почти все стили Bootstrap `.card`, это сигнал, что Bootstrap card больше не дает ценности.

Текущий допустимый переходный вариант:

```html
<div class="card ui-card">
```

Целевой вариант:

```html
<div class="ui-card">
```

То есть Bootstrap можно оставить для сетки, но постепенно убрать из самих primitives.

---

## 11. Семантика HTML/CSS

Основное правило:

```text
Сначала определить роль элемента.
Потом определить зону.
Потом описать поведение зоны.
Только потом писать CSS.
```

Пример для Card header:

Не думать:

```text
“куда поставить display:flex?”
```

Думать:

```text
“header карточки состоит из icon zone и title zone”
```

После этого CSS становится описанием поведения:

```text
header-inner → flex container
icon         → fixed
title        → fluid
```

Это переводит верстку из режима “стилизации” в режим “проектирования компонента”.

---

## 12. Работа с разным количеством элементов

В `Benefits` и подобных блоках количество элементов приходит из данных.

Это уже пограничная зона между WS DS и data-driven layer, но в рамках WS DS можно зафиксировать принцип:

```text
Feature-компонент не должен хаотично подгонять сетку под конкретные числа.
Он должен выбирать допустимое layout-поведение.
```

Плохой путь:

```text
5 items → row-cols-lg-5
```

Лучше:

```text
5 items → композиционно приемлемое распределение, например 3 + 2
```

На текущем Bootstrap-этапе допустима computed-логика класса сетки в feature-компоненте или вынос в будущий `CardsGrid`.

Целевое направление:

```text
CardsGrid как отдельный UI composite
или CSS Grid вместо Bootstrap row-cols
```

То есть регулирование количества колонок в будущем должно быть обязанностью не `Benefits`, а компонента уровня:

```text
CardsGrid
```

---

## 13. Текущие поставленные вопросы и решения

### Вопрос: Card должен знать про IconOffer?

Ответ:

```text
Нет.
IconOffer вставляется через slot из feature-компонента.
```

### Вопрос: Иконка и заголовок должны верстаться в Benefits?

Ответ:

```text
Нет.
Benefits передает содержимое.
Card задает зоны и layout header.
```

### Вопрос: Нужно ли использовать каскад `.cards_block .header`?

Ответ:

```text
Технически возможно, архитектурно не нужно.
Использовать scoped CSS или ui-* namespace.
```

### Вопрос: Bootstrap utilities использовать или писать свой CSS?

Ответ:

```text
Bootstrap допустим снаружи как layout.
Внутри UI primitive — лучше свой контролируемый CSS.
```

### Вопрос: Нужно ли сразу рефакторить IconOffer?

Ответ:

```text
Нет, если он используется во многих местах.
Но его текущий API нужно считать transitional.
```

### Вопрос: SectionHeader — это primitive или composite?

Ответ:

```text
На текущем этапе — boundary-компонент.
Можно считать UI composite, но использовать как foundation-level element.
```

---

## 14. План миграции WS DS

### Этап 1. Зафиксировать foundation

```text
- Card
- SectionHeader
- базовые slot API
- scoped CSS naming
- Bootstrap только на layout-уровне
```

Статус: начато.

### Этап 2. Нормализовать API Card

Решения к фиксации:

```text
- icon slot
- title slot
- default slot вместо text
- footer slot
- optional action slot в будущем
```

Промежуточно допустимо:

```text
text slot
```

но он должен быть помечен как temporary.

### Этап 3. Выделить CardsGrid

Когда появятся разные сценарии количества карточек:

```text
Benefits
Services
Pricing
Works
```

нужно вынести сетку в отдельный компонент:

```text
CardsGrid
```

Он будет отвечать за:

```text
- количество колонок
- gap
- responsive behavior
- equal height
- Bootstrap/CSS Grid implementation
```

### Этап 4. Очистить Card от Bootstrap

Переход:

```text
.card ui-card
  → ui-card
```

Bootstrap `.card-header` / `.card-body` заменить внутренними `ui-card__header` / `ui-card__body`.

### Этап 5. Рефактор IconOffer

Переход:

```text
:index="item.index"
:properties="item"
```

к:

```text
:icon="item.icon"
:variant="..."
```

Цель:

```text
IconOffer не должен знать структуру item/properties.
```

### Этап 6. Ввести tokens

До отдельной главы Tailwind не раскрывать, но в рамках WS DS зафиксировать потребность:

```text
shadow
radius
section padding
card padding
typography
colors
gap
```

должны переехать из локальной магии в общий token/system layer.

---

## 15. Риски

### 15.1. Возврат к prop-heavy компонентам

Опасность:

```vue
<Card :title :text :icon :button :badge />
```

Такой подход быстро приведет к “универсальному монстру”.

Контрмера:

```text
composition over configuration
```

### 15.2. Смешение business и UI

Опасность:

```text
Card импортирует IconOffer
Card знает про services
Card принимает item.properties
```

Контрмера:

```text
feature component композирует
UI primitive только размещает
```

### 15.3. Разрастание кастомного нейминга

Опасность:

```css
cards_block__header__title
```

Контрмера:

```text
ui-* для primitives
scoped короткие имена внутри SFC
```

### 15.4. Bootstrap как скрытая зависимость

Опасность:

```text
UI primitive выглядит как WS DS,
но фактически зависит от Bootstrap card internals.
```

Контрмера:

```text
Bootstrap оставить для layout,
primitives постепенно отвязать.
```

### 15.5. Непроработанный responsive внутри primitive

Опасность:

```text
Card сам решает, что на mobile header всегда column.
```

Это может быть неверно для других сценариев.

Контрмера:

```text
responsive behavior должен быть параметризован
или вынесен в variant/layout prop.
```

---

## 16. Рабочее определение WS DS

WS DS — это компонентно-ориентированная дизайн-система frontend-слоя WebSolutions, которая задает:

```text
- reusable UI primitives
- composition patterns
- slot API
- scoped CSS conventions
- separation between layout, visual behavior and feature composition
- migration path from Bootstrap/legacy CSS to controlled UI system
```

На текущем этапе WS DS находится в состоянии early foundation:

```text
Card + SectionHeader + slot composition
```

Основной ближайший фокус:

```text
стандартизация API компонентов
```

Критические элементы стандартизации:

```text
- slot naming
- default slot usage
- icon/title/body/footer zones
- naming conventions
- boundary between Bootstrap layout and WS DS primitive
- migration plan for IconOffer
- future CardsGrid extraction
```

---

## 17. Краткий итог для будущих LLM

При работе с WS frontend UI:

```text
Не воспринимай Card / SectionHeader как локальные одноразовые компоненты.
Это начало WS DS foundation layer.

Не хардкодь бизнес-логику в UI primitives.
Не импортируй IconOffer в Card.
Не превращай Card в prop-heavy компонент.
Используй slots как основной API композиции.
Bootstrap допустим как внешний layout layer, но не как ядро UI primitive.
Scoped CSS позволяет использовать короткие имена внутри компонента.
Глобальные reusable primitives используют ui-* namespace.
```

Правильная модель мышления:

```text
Feature component решает, ЧТО показать.
UI primitive решает, КАК это структурно разместить.
Layout layer решает, КАК блоки стоят в сетке.
Design tokens решают, КАК это выглядит системно.
```
