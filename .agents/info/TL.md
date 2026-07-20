# Tailwind Theme Layer — WebSolutions Frontend

## 1. Назначение слоя

**Tailwind Theme Layer** — это слой дизайн-токенов, семантических utility-классов и правил применения Tailwind CSS внутри frontend-системы WebSolutions.

Он не заменяет **WS DS / Component-driven design system**, а обслуживает его.

Если WS DS отвечает за:

```text id="0ng23r"
Card
SectionHeader
Button
Input
CardsGrid
slots
props
component API
composition patterns
```

то Tailwind Theme Layer отвечает за:

```text id="85mejr"
colors
spacing
typography
shadows
radius
breakpoints
semantic utility classes
migration from Bootstrap / legacy CSS
visual consistency
```

Главная идея:

```text id="jfxa3w"
WS DS описывает компонентную форму.
Tailwind Theme Layer описывает визуальный язык и токены этой формы.
```

---

## 2. Текущий статус

Текущее состояние проекта:

```text id="x65no3"
Tailwind CSS v4 подключен
Vite используется как сборщик
@import "tailwindcss" используется
tailwind.config.js активен
Bootstrap все еще присутствует
legacy CSS все еще присутствует
часть scoped-компонентов содержит raw hex
часть компонентов уже использует Tailwind semantic classes
```

То есть слой находится в transitional state:

```text id="7fhyz8"
Legacy Bootstrap / custom CSS
  ↓
Tailwind tokens
  ↓
semantic utility classes
  ↓
component-level design system
```

Важно: Tailwind уже не должен восприниматься как “еще один способ написать CSS”. В рамках WS он должен быть зафиксирован как **theme engine**.

---

## 3. Место слоя в общей frontend-архитектуре

Общая frontend-модель:

```text id="qz0r9c"
Vue Foundation
  ↓
Data / Orchestration Layer
  ↓
Feature / Presentation Components
  ↓
WS DS — Component-driven Design System
  ↓
Tailwind Theme Layer
  ↓
CSS output / browser rendering
```

Но логически Tailwind обслуживает не только UI primitives, а весь визуальный слой.

Корректная взаимосвязь:

```text id="spcjwl"
Vue component
  использует
WS DS component

WS DS component
  использует
semantic classes / tokens

Tailwind config
  определяет
visual language
```

Пример:

```vue id="pc13gg"
<Card class="shadow-card rounded-card bg-surface">
  ...
</Card>
```

Здесь `Card` — часть WS DS, а `shadow-card`, `rounded-card`, `bg-surface` — часть Tailwind Theme Layer.

---

## 4. Главный принцип Tailwind-слоя

Главный принцип:

```text id="034s0d"
tailwind.config.js = Single Source of Truth для дизайн-токенов
```

Запрещено распылять визуальные значения по компонентам, если они являются системными.

Плохо:

```css id="nxp4ql"
.card {
  box-shadow: 5px 7px 15px 2px rgba(82, 90, 101, 0.12);
  color: #404040;
}
```

Лучше:

```html id="t1rov1"
<div class="shadow-card text-content">
```

или внутри WS DS primitive:

```vue id="4s0tbq"
<div class="ui-card shadow-card text-content bg-surface">
```

Смысл: значение тени, цвета, радиуса или отступа должно жить не в отдельном компоненте, а в theme layer.

---

## 5. Три уровня Tailwind-системы

### 5.1. Raw design tokens

Это базовые значения бренда.

Пример:

```js id="fviibl"
brand: {
  light: '#E5F7FD',
  aqua:  '#00D9EA',
  sky:   '#0C90C7',
  deep:  '#223A76',
  sun1:  '#FFE265',
  sun2:  '#FFC500',
  alert: '#FF5A5F',
}
```

Raw tokens отвечают на вопрос:

```text id="xbgd6e"
Какие цвета / размеры / значения существуют в системе?
```

Их нельзя использовать хаотично в интерфейсе. Это нижний уровень.

---

### 5.2. Semantic tokens

Семантические токены отвечают не на вопрос “какой цвет?”, а “зачем он используется?”.

Пример:

```js id="fdbbvr"
primary: {
  DEFAULT: '#00D9EA',
  dark: '#0C90C7',
},
accent: '#FFC500',
danger: '#FF5A5F',
```

Целевой вектор — расширить семантику:

```js id="13ym6n"
colors: {
  brand: { ... },

  primary: { ... },
  accent: { ... },
  danger: { ... },

  surface: {
    DEFAULT: '#FFFFFF',
    muted: '#E5F7FD',
    dark: '#223A76',
  },

  content: {
    DEFAULT: '#404040',
    muted: '#5F5F5F',
    inverse: '#FFFFFF',
  },

  border: {
    DEFAULT: '#E6E5F1',
    muted: '#F1F1F1',
  }
}
```

Семантический слой отвечает на вопрос:

```text id="8x2wrk"
Что означает это оформление в UI?
```

---

### 5.3. Usage layer

Это конкретное применение в компонентах.

Пример:

```html id="fqbnfh"
<section class="bg-surface text-content">
```

```html id="dxygah"
<button class="bg-primary text-content-inverse">
```

```html id="r1wwsr"
<p class="text-content-muted">
```

Usage layer не должен знать raw hex.

---

## 6. Граница между Tailwind и WS DS

Очень важное разделение:

```text id="scsor1"
WS DS отвечает за структуру компонента.
Tailwind отвечает за визуальные значения.
```

Пример `Card`.

WS DS-ответственность:

```text id="8u3me0"
- есть card container
- есть header
- есть icon zone
- есть title zone
- есть body
- есть footer
- slots определяют точки вставки
```

Tailwind-ответственность:

```text id="o2v7sh"
- какой shadow у card
- какой radius
- какой padding
- какой цвет title
- какой gap между icon и title
- какой responsive spacing
```

Правильная модель:

```vue id="442dva"
<div class="ui-card shadow-card rounded-card bg-surface">
  <div class="ui-card__header px-card-x py-card-y">
    ...
  </div>
</div>
```

Где:

```text id="92cm5i"
ui-card              → WS DS naming / component identity
shadow-card          → Tailwind theme token
rounded-card         → Tailwind theme token
bg-surface           → Tailwind semantic color
px-card-x / py-card-y → Tailwind spacing tokens
```

---

## 7. Bootstrap coexistence

Bootstrap пока остается transitional layer.

Правильная граница:

```text id="9c835b"
Bootstrap допустим для внешней layout-сетки.
Tailwind постепенно забирает theme/styling layer.
WS DS постепенно забирает component layer.
```

Допустимо временно:

```html id="blj3vc"
<div class="container">
  <div class="row row-cols-2 row-cols-lg-4 align-items-stretch">
    <div class="col d-flex">
      <Card />
    </div>
  </div>
</div>
```

Нежелательно в долгосрочной перспективе:

```html id="xet4fp"
<div class="card ui-card">
  <div class="card-header">
  <div class="card-body">
```

Потому что Bootstrap `.card`, `.card-header`, `.card-body` начинают конкурировать с WS DS `ui-card`, `ui-card__header`, `ui-card__body`.

Целевое состояние:

```html id="xl58a6"
<div class="ui-card">
  <div class="ui-card__header">
  <div class="ui-card__body">
```

А визуальные значения идут из Tailwind tokens/utilities.

---

## 8. Raw CSS и scoped CSS

В проекте scoped CSS остается допустимым, но его роль должна быть ограничена.

Scoped CSS можно использовать для:

```text id="ie49q1"
- локальной структуры компонента
- нестандартного поведения
- редких CSS-сценариев, которые неудобно выразить utility-классами
- временного migration bridge
```

Scoped CSS не должен использоваться для системных значений:

```text id="rkfu91"
- brand colors
- common text colors
- card shadow
- common spacing
- repeated font sizes
- repeated border radius
```

Плохо:

```css id="9628qy"
.title {
  color: #404040;
  font-size: 2.5rem;
}
```

Лучше:

```html id="c0c8bl"
<h2 class="text-content text-section-title">
```

или, если это внутри WS DS-компонента:

```css id="l6fwe4"
.title {
  @apply text-content text-section-title;
}
```

Но `@apply` использовать аккуратно: он допустим для component-layer abstractions, но не должен превращаться в дублирующую CSS-систему.

---

## 9. Forbidden patterns

Запрещенные паттерны Tailwind-слоя:

```text id="ri33fn"
- raw hex в Vue template
- raw hex в повторяемом scoped CSS
- дублировать цвета одновременно в tailwind.config.js и custom CSS
- создавать @layer utilities для цветов, если они уже есть в config
- использовать Tailwind как хаотичный набор классов без семантического слоя
- превращать scoped CSS в параллельную дизайн-систему
- усиливать Bootstrap card/header/body как основу новых primitives
```

Особенно опасный паттерн:

```css id="uf7j58"
.service .know_price {
  color: #00D9EA;
  border: solid 1px #00D9EA;
}
```

Такой код должен мигрировать к токенам:

```html id="x7qk0w"
class="text-primary border border-primary"
```

или к WS DS primitive:

```vue id="1y29ac"
<Button variant="outline-primary">
```

---

## 10. Allowed patterns

Разрешено:

```text id="w3x8h1"
- semantic Tailwind classes в template
- ui-* namespace для primitives
- scoped CSS для структуры компонента
- Bootstrap grid как временный layout layer
- @layer components для устойчивых UI abstractions
- important utilities точечно при конфликте с Bootstrap
```

Пример допустимого transition-кода:

```vue id="46rshn"
<div class="ui-card shadow-card bg-surface">
  ...
</div>
```

Пример временного конфликта с Bootstrap:

```html id="43zk7n"
<ul class="!hidden lg:!block">
```

Но `!`-утилиты не должны стать нормой.

---

## 11. Tailwind и UI primitives

Tailwind-слой должен постепенно обслуживать WS DS primitives.

### 11.1. Card

Текущая проблема:

```text id="9setas"
Card содержит box-shadow и padding как локальную магию.
```

Цель:

```text id="4lpdae"
shadow-card
rounded-card
p-card
gap-card-header
text-card-title
```

Возможные tokens:

```js id="h6goys"
boxShadow: {
  card: '5px 7px 15px 2px rgba(82, 90, 101, 0.12)',
}

borderRadius: {
  card: '0.5rem',
}

spacing: {
  'card-x': '1.5rem',
  'card-y': '1rem',
}
```

### 11.2. SectionHeader

Текущая проблема:

```text id="58nokj"
SectionHeader содержит цвет subtitle, размер title, margin как scoped CSS.
```

Цель:

```text id="yfn2jd"
text-section-subtitle
text-section-title
text-accent
text-content
mb-section-header
```

Возможные tokens:

```js id="a8wbqo"
fontSize: {
  'section-title': ['2.5rem', { lineHeight: '1.15' }],
  'section-subtitle': ['1rem', { lineHeight: '1.4' }],
}

spacing: {
  'section-header': '2rem',
  'section-y': '100px',
}
```

### 11.3. Button

Button пока не выделен как стабильный WS DS primitive, но Tailwind-слой должен подготовить основу:

```text id="s9v2ms"
bg-primary
text-content-inverse
border-primary
hover:bg-primary-dark
rounded-button
px-button-x
py-button-y
```

Цель — чтобы будущий `<Button />` не имел raw CSS.

---

## 12. Tailwind и layout

Layout пока частично Bootstrap-based.

Текущее состояние:

```text id="ennicg"
container
row
col
row-cols-2
row-cols-lg-4
align-items-stretch
d-flex
```

Tailwind-слой не обязан немедленно заменить Bootstrap grid.

Правильная стратегия:

```text id="f4qaic"
1. оставить Bootstrap grid для существующих блоков
2. не строить новые WS DS primitives на Bootstrap internals
3. для новых layout-composites рассматривать CSS Grid / Tailwind grid utilities
4. вынести повторяемые сетки в CardsGrid
```

Будущий `CardsGrid` может быть реализован через Tailwind:

```vue id="yqstyu"
<div class="grid gap-card-grid sm:grid-cols-2 lg:grid-cols-4">
  <slot />
</div>
```

Или через CSS Grid с custom class:

```css id="m1qdko"
.cards-grid {
  @apply grid gap-card-grid sm:grid-cols-2 lg:grid-cols-4;
}
```

Важно: решение о сетке относится к layout-composite, а не к отдельной карточке.

---

## 13. Tailwind и data-driven UI

Tailwind-слой не должен зависеть от данных backend.

Неправильно:

```text id="d29ibt"
если item.type === 'premium', подставить raw class напрямую без карты вариантов
```

Правильно:

```text id="sgq37t"
data → variant
variant → class map
class map → semantic Tailwind classes
```

Пример:

```js id="9ga44w"
const cardVariantClass = {
  default: 'bg-surface shadow-card',
  accent: 'bg-surface-muted shadow-card',
  danger: 'bg-danger text-content-inverse',
}
```

Здесь backend может дать `variant`, но не должен диктовать frontend raw classes.

---

## 14. Tailwind и naming

Tailwind-слой не отменяет ранее принятый WS DS naming.

Сохраняются два уровня:

```text id="f5fmga"
1. Component identity:
   ui-card
   ui-button
   ui-input

2. Theme utilities:
   bg-surface
   text-content
   shadow-card
   rounded-card
```

Не нужно заменять все `ui-*` на Tailwind-классы.

Плохо:

```html id="ubc2us"
<div class="flex flex-col h-full shadow-lg rounded-lg bg-white p-6">
```

Такой код может быть быстрым, но теряет компонентную идентичность.

Лучше:

```html id="1aixwd"
<div class="ui-card shadow-card rounded-card bg-surface p-card">
```

Так понятны обе роли:

```text id="0euqz1"
ui-card → что это за компонент
shadow-card / bg-surface → как он оформлен
```

---

## 15. Migration strategy

### Этап 1. Зафиксировать Tailwind SSOT

Проверить и стабилизировать:

```text id="q1eixt"
tailwind.config.js
src/index.css
Vite Tailwind plugin
@import "tailwindcss"
```

Убедиться, что brand tokens и semantic tokens определены только в одном месте.

---

### Этап 2. Инвентаризация raw CSS

Найти в проекте:

```text id="sj8yig"
#00D9EA
#0C90C7
#223A76
#FFE265
#FFC500
#FF5A5F
#404040
#5F5F5F
#ffffff
rgba(...)
```

Разделить:

```text id="jjg0ek"
- системные значения → tailwind.config.js
- уникальные одноразовые значения → scoped CSS, если действительно уникальны
- legacy значения → migration debt
```

---

### Этап 3. Перевести UI primitives на tokens

Приоритет:

```text id="ihjepy"
Card
SectionHeader
Button
Input
Form controls
CardsGrid
```

Цель:

```text id="4g4sjs"
UI primitive не содержит raw hex / magic spacing / hardcoded shadow.
```

---

### Этап 4. Разграничить Bootstrap и Tailwind

Зафиксировать правило:

```text id="x9o1w3"
Bootstrap grid остается временно.
Bootstrap card/button/form постепенно вытесняются WS DS primitives + Tailwind tokens.
```

---

### Этап 5. Ввести Tailwind-based layout composites

Кандидаты:

```text id="izq8b1"
CardsGrid
Section
Container
Stack
Inline
Cluster
```

Эти компоненты могут заменить повторяемые Bootstrap-patterns.

---

### Этап 6. Документировать UI conventions

Нужен файл уровня:

```text id="57djln"
docs/frontend/tailwind-theme-layer.md
```

или:

```text id="uu6wc2"
src/styles/README.md
```

Содержимое:

```text id="cgb7ej"
- tokens
- semantic classes
- запрещенные паттерны
- migration rules
- Bootstrap coexistence
- examples for Card / SectionHeader / Button
```

---

## 16. Открытые вопросы

### 16.1. Где держать design tokens?

Текущий ответ:

```text id="bnc9cg"
tailwind.config.js
```

Но с Tailwind v4 возможна дальнейшая эволюция в сторону CSS-first tokens. Пока в рамках проекта закрепляется config-driven SSOT.

---

### 16.2. Использовать ли `@apply`?

Ответ:

```text id="b3fzs4"
Да, но ограниченно.
```

`@apply` допустим для UI primitives и stable component classes.

Плохо:

```css id="tnn9dj"
.special-one-time-section {
  @apply ...
}
```

Хорошо:

```css id="3hmjms"
.ui-card {
  @apply bg-surface shadow-card rounded-card;
}
```

---

### 16.3. Оставлять ли scoped CSS?

Ответ:

```text id="q1d26d"
Да, но не для системных токенов.
```

Scoped CSS остается для component-specific behavior.

---

### 16.4. Когда убирать Bootstrap?

Ответ:

```text id="dmevsn"
Не сразу.
```

Правильный порядок:

```text id="6uo8pi"
1. сначала выделить WS DS primitives
2. затем перенести их визуальные значения в Tailwind tokens
3. потом убрать Bootstrap из primitives
4. только после этого постепенно заменить Bootstrap grid, где это оправдано
```

---

## 17. Краткий системный вывод

Tailwind Theme Layer в WebSolutions — это не слой “классов в шаблоне”, а слой **визуальной нормализации**.

Он должен:

```text id="fecxur"
- убрать raw hex из компонентов
- заменить магические spacing/font/shadow на tokens
- дать WS DS единый visual language
- позволить контролируемо мигрировать с Bootstrap
- сохранить component identity через ui-* classes
- поддержать будущую Server-Driven UI архитектуру без визуального хаоса
```

Правильная итоговая модель:

```text id="esozzg"
Feature component
  использует
WS DS primitive

WS DS primitive
  использует
ui-* structure classes
  + Tailwind semantic utilities

Tailwind config
  хранит
brand tokens
semantic tokens
spacing
typography
shadows
radius
```

---

## 18. Инструкция для будущих LLM

При работе с frontend styling в WebSolutions:

```text id="6x7tn9"
Не добавляй raw hex в Vue templates.
Не добавляй системные цвета в scoped CSS.
Не усиливай Bootstrap card/button/form как основу новых компонентов.
Не заменяй ui-* component identity на длинные utility-only chains.
Не смешивай business props и Tailwind classes напрямую.
```

Предпочитай:

```text id="xomqjy"
tailwind.config.js as SSOT
semantic classes
WS DS primitives
scoped CSS only for component behavior
Bootstrap only as transitional layout layer
```

Если нужно оформить новый компонент:

```text id="7r17p2"
1. Сначала определить WS DS роль: primitive / composite / feature.
2. Затем выбрать semantic tokens.
3. Затем использовать Tailwind utilities или @apply.
4. Только потом добавлять scoped CSS, если utility layer недостаточен.
```

Формула слоя:

```text id="qyo4gt"
WS DS = component contract
Tailwind = visual contract
Bootstrap = temporary layout compatibility
Scoped CSS = local behavior, not system theme
```
