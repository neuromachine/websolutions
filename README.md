## WS Antigravity package — FE-015

Пакет подготовлен для прохода **A-CP-4** и содержит одну frontend-задачу:

```text
TASK-FE-015 — Structured Acticle & Responsive CP Card Layout
```

Задача не создаёт и не изменяет JSON коммерческого предложения. Файл предложения
включён только как read-only reference для проверки структурированного `acticle`.

### Назначение

1. Научить существующий `acticle.vue` корректно отображать:
   - legacy-цитату;
   - структурированное персональное письмо.

2. Исправить раскладку карточек коммерческого предложения:
   - `Benefits`: пять элементов → пять колонок на `lg`;
   - `Includes`: перейти от фиксированных `col-lg-3 col-md-6` к `d-flex col`
     и общей адаптивной row-cols-схеме.

3. Сохранить существующие API-контракты и legacy-ключ `acticle`.

### Установка

Распакуйте архив в корень frontend-репозитория `websolutions`.

После распаковки появятся только файлы внутри:

```text
.agents/
```

Исходный код `src/**` пакет не изменяет.

### Запуск в Antigravity

Передайте агенту launch-файл:

```text
.agents/tasks/LAUNCH-FE-015-compred-structured-acticle-layout.md
```

### Ожидаемый отчёт агента

```text
.agents/reports/REPORT-FE-015-compred-structured-acticle-layout.md
```

### Важная граница

Автономный website prototype из вектора B-WP не относится к этой задаче.
FE-015 касается только существующего frontend WebSolutions и вывода `ind_offers`.
