# Vue Foundation / Component Architecture — WebSolutions Frontend

## 1. Назначение слоя

**Vue Foundation / Component Architecture** — это базовый frontend-слой проекта WebSolutions, определяющий:

```text id="xbpndr"
- как устроены Vue-компоненты
- где живет загрузка данных
- как страницы связываются с route params
- где используется Pinia
- как данные проходят от API к UI
- какие компоненты имеют право владеть состоянием
- какие компоненты остаются презентационными
- как scope влияет на маршрутизацию и загрузку данных
```

Этот слой является несущей конструкцией frontend-системы.

Если предыдущие слои отвечают за:

```text id="bgctf4"
WS DS      → component-driven design system
Tailwind   → visual tokens / theme layer
Animation  → motion lifecycle
```

то Vue Foundation отвечает за:

```text id="tpq3ra"
component lifecycle
data orchestration
route-driven rendering
Pinia state boundaries
page ownership
props flow
frontend module discipline
```

Главная формула слоя:

```text id="h7ogyj"
Vue Foundation = структура приложения + жизненный цикл данных + границы ответственности компонентов
```

---

## 2. Позиция в общей frontend-архитектуре

Общая модель frontend-слоев:

```text id="fc1iaf"
Vue Foundation / Component Architecture
  ↓
Data Orchestration / Stores
  ↓
Feature / Presentation Components
  ↓
WS DS
  ↓
Tailwind Theme Layer
  ↓
Animation Layer
```

Но practically Vue Foundation пронизывает все остальные слои:

```text id="6liiyr"
Vue component model
  удерживает
WS DS components

Vue props/slots
  передают
data and composition

Pinia stores
  хранят
state and fetched data

Router
  определяет
scope, slug, page identity

Orchestrator
  связывает
route → store → API → props → UI
```

---

## 3. Технологический фундамент

Текущий стек Vue Foundation:

```text id="vk6xik"
Vue 3
Composition API
<script setup>
Vue Router 4
Pinia
Axios
vue-i18n
Vite
```

Backend API существует как внешний источник данных, но Laravel-архитектура не является частью этого слоя. Для Vue Foundation важен только API-контракт:

```text id="g77ns8"
response.data.data
```

и route/scope-based endpoints.

---

## 4. Базовая компонентная схема

Ключевая схема frontend-компонентов:

```text id="8s217c"
View.vue
  ↓
index.vue
  ↓
list.vue / section-level presentation
  ↓
item.vue / pure item component
```

Расшифровка:

```text id="gvwrlk"
View.vue
  слой компоновки страницы

index.vue
  оркестратор данных и состояния блока

list.vue
  presentation-level orchestrator внутри секции

item.vue
  dumb component, только props
```

---

## 5. View.vue

`View.vue` — это верхний слой компоновки страницы.

Типовая структура:

```text id="gx4ran"
Header
PageTitle
Index
Footer
```

Примерно:

```vue id="9pdwyw"
<template>
  <Header />
  <PageTitle />
  <Index />
  <Footer />
</template>
```

### View.vue отвечает за

```text id="lp5eaa"
- сборку крупных page-level компонентов
- порядок Header / PageTitle / Content / Footer
- выбор основного index-компонента страницы
```

### View.vue не отвечает за

```text id="xfu9q4"
- fetch данных
- импорт Pinia stores
- вызов usePageOrchestrator
- вычисление page vars
- фильтрацию данных
- нормализацию API
- бизнес-логику
```

Жесткое правило:

```text id="8lxvbc"
View.vue не знает о stores.
View.vue не делает fetch.
View.vue не является data-owner.
```

Причина:

```text id="6zvziv"
View.vue должен оставаться стабильным layout shell.
Данные и логика должны жить ниже — в index.vue / orchestrator layer.
```

---

## 6. index.vue как page/block orchestrator

`index.vue` — главный рабочий компонент для блока или страницы.

Он отвечает за:

```text id="52s8vo"
- вызов usePageOrchestrator
- выбор схемы загрузки
- владение blockStore / navigationStore
- передачу props ниже
- определение page ownership через orchestrator
- условный рендер по ready flags
```

Типовой паттерн:

```js id="gup46z"
const { blockStore } = usePageOrchestrator('portfolio', 'category', {
  fetch: (route) => route.params.slug ?? route.name
})
```

или:

```js id="9m9xph"
const { blockStore, navigationStore } = usePageOrchestrator('direction', 'structure+category', {
  fetch: (route) => route.params.slug
})
```

### index.vue может

```text id="0e32ew"
- использовать stores
- вызывать composables
- запускать загрузку данных через orchestrator
- проверять isCatReady / isItemReady
- раскладывать данные на presentation-компоненты
```

### index.vue не должен

```text id="r7mt86"
- содержать глубокую верстку UI primitives
- превращаться в большой presentation component
- дублировать fetch-логику вручную
- напрямую обрабатывать все API edge cases в template
```

---

## 7. Presentation components

Presentation-компоненты — это уровень отображения секции.

Примеры:

```text id="akodyl"
Benefits
Services
PortfolioList
Workflow
FAQ
```

Они принимают данные через props:

```vue id="xbkgme"
<Benefits
  v-if="blockStore.item.properties.benefits"
  :data="blockStore.item.properties.benefits"
/>
```

Presentation-компонент отвечает за:

```text id="n9hehx"
- отображение переданных данных
- локальную композицию UI primitives
- v-for по data.items
- локальные UI-состояния: фильтр, раскрытие, emit
- выбор WS DS компонентов
```

Presentation-компонент не должен:

```text id="d7e3u6"
- импортировать Pinia store напрямую
- делать API-запросы
- знать route params
- вызывать usePageOrchestrator
- менять глобальный page context
```

Формула:

```text id="ragq1g"
index.vue получает данные.
presentation.vue отображает данные.
```

---

## 8. Item components

`item.vue` — самый нижний чистый слой.

Он отвечает только за:

```text id="2y7bpj"
- принятие props
- отображение одного элемента
- emit локального события при необходимости
```

Он не должен:

```text id="nhvjed"
- импортировать stores
- знать route
- делать fetch
- менять глобальное состояние
- обращаться к API
```

Идеальная модель:

```text id="pw8j93"
item.vue = pure function of props
```

---

## 9. usePageOrchestrator

`usePageOrchestrator` — центральный composable Vue Foundation.

Он связывает:

```text id="f4cnzo"
route
scope
blockId
scheme
store instance
API fetch
page ownership
global loading
navigation loading
```

Сигнатура:

```js id="7svyud"
const { blockStore, navigationStore } = usePageOrchestrator(blockId, scheme, {
  fetch: (route) => slug
})
```

### 9.1. blockId

`blockId` — логический ID блока:

```text id="8wftgx"
main
portfolio
services
direction
group
pages
```

Он используется для:

```text id="cmywdn"
- выбора blockStore instance
- определения page ownership
- формирования fetch key
- изоляции данных между блоками
```

### 9.2. scheme

`scheme` определяет, какие данные нужно загрузить.

Поддерживаемые схемы:

```text id="53cihh"
category
item
structure
structure+category
structure+category+item
```

Смысл:

```text id="0orjz0"
category
  загрузить категорию блока

item
  загрузить item

structure
  загрузить дерево структуры

structure+category
  загрузить структуру и категорию

structure+category+item
  загрузить полный набор
```

### 9.3. fetch resolver

`fetch` — функция, которая из route получает slug/key:

```js id="g8l25w"
fetch: (route) => route.params.slug ?? route.name
```

Это важно, потому что разные страницы получают ключ по-разному:

```text id="z92si4"
portfolio может брать route.name
group берет route.params.slug
pages берет route.params.slug
main может быть route.name
```

---

## 10. isPageOwner

`isPageOwner` — важнейшая концепция Vue Foundation.

Только один orchestrator на странице имеет право вызвать:

```text id="b719hg"
buildPageVars()
```

Автоматическое правило:

```js id="13tfas"
const isPageOwner = route.name === blockId || route.params.slug === blockId
```

### Зачем это нужно

Один и тот же компонент может быть использован:

```text id="in6fxi"
- как полноценная страница
- как дочерний блок на другой странице
```

Пример:

```text id="x6msjd"
Portfolio на /portfolio
  → page owner
  → может обновить PageTitle / breadcrumbs

Portfolio на главной /
  → child block
  → не должен перезаписывать page context
```

Правило:

```text id="8s5u3e"
Дочерние блоки не имеют права менять глобальный page context.
```

Это защищает `PageTitle`, breadcrumbs и metadata от перезаписи вложенными компонентами.

---

## 11. Защита от повторных запросов

`usePageOrchestrator` использует module-level cache активных ключей.

Логика:

```text id="f6tre8"
fetchKey = blockId::slug::scope
```

Если активный ключ совпадает, повторный fetch не выполняется.

Это решает:

```text id="23ze9l"
- двойной mount
- возврат назад
- повторную навигацию на тот же slug
- одновременное существование старого и нового компонента
```

Важно:

```text id="d10adi"
Дедупликация fetch должна быть в orchestrator layer,
а не размазана по отдельным компонентам.
```

---

## 12. Pinia Store Architecture

В проекте используются несколько типов stores:

```text id="2zz3c3"
uiStore
navigationStore
blockStore(id)
formStore
```

---

## 13. uiStore

`uiStore` — глобальный store состояния интерфейса.

Он отвечает за:

```text id="6h5go0"
- scope
- locale / i18n sync context
- uiMainVars.page
- title
- breadcrumbs
- parent / children
- global loading
- buildPageVars()
```

### 13.1. scope

`scope` — URL-префикс раздела.

Примеры:

```text id="377sdk"
''
ru
en
vi
```

Scope не должен сводиться только к языку. В будущем он может обозначать:

```text id="dfnmzr"
- язык
- раздел сайта
- бренд
- регион
- версию сайта
```

### 13.2. global loading

Global loading реализован как счетчик:

```js id="elw62h"
state: { _loadingCount: 0 }

isGlobalLoading = _loadingCount > 0
```

Причина:

```text id="p9q1gp"
при параллельных запросах boolean ломается
```

Правильная модель:

```text id="z6yfj7"
startGlobalLoading() → count + 1
stopGlobalLoading()  → count - 1, но не ниже 0
```

Это важно для связи с Animation Layer:

```text id="mqgghr"
loading finished
  → PAGE_ENTER can start
```

---

## 14. navigationStore

`navigationStore` — singleton-store для структуры и навигации.

Он отвечает за:

```text id="zga65s"
- structure tree
- nav[]
- fetchStructure(slug)
- fetchNavigation(scope)
```

Навигация не должна блокировать router guard.

Правило:

```text id="6260mc"
fetchNavigation запускается параллельно и не блокирует первичный рендер.
```

То есть navbar может появиться после загрузки данных, а страница не должна ждать навигацию в `beforeEach`.

---

## 15. blockStore(id)

`blockStore(id)` — ключевое архитектурное решение.

Это не singleton, а фабрика Pinia-store по ID.

Причина:

```text id="0wcu6n"
один и тот же тип store нужен разным блокам,
но данные этих блоков должны быть изолированы
```

Модель:

```text id="u53lqo"
useBlockStore('main')
useBlockStore('portfolio')
useBlockStore('services')
useBlockStore('direction')
```

Каждый instance хранит свой набор данных:

```text id="k8ng2b"
category
item
overlay
filter
filteredItems
ready flags
```

### Важное правило

```text id="3bfy5a"
defineStore должен создаваться один раз на ID.
```

Поэтому используется registry:

```text id="yxgqlg"
_registry = new Map()
```

Если создавать `defineStore` каждый раз заново, появится ошибка состояния:

```text id="gztxy7"
DevTools показывает данные,
а template смотрит в другой instance
```

---

## 16. formStore

`formStore` — отдельный state layer для форм.

Он не является главным фокусом Vue Foundation, но должен соблюдать те же правила:

```text id="ku70qg"
- не смешивать форму с blockStore
- не хранить form status в UI primitive
- API submit выносить в service/formStore
- server errors нормализовать отдельно
```

---

## 17. Router Architecture

Основной router построен вокруг optional `scope`.

Модель:

```text id="l671lw"
/:scope([^/]+)?
  /
  /services
  /direction/:slug
  /group/:slug
  /portfolio
  /blocks/item/:slug
  /pages/:slug
```

### 17.1. beforeEach

`beforeEach` выполняет только критичные синхронные операции:

```text id="48ohai"
- прочитать новый scope
- обновить uiStore.scope
- запустить global loading
- вызвать next()
```

Запрещено:

```text id="dzix70"
- await fetchNavigation()
- await fetchBlockCategory()
- await fetchBlockItem()
- блокировать рендер страницы API-запросами
```

Формула:

```text id="qa0x8o"
Router guard синхронизирует route context.
Data loading выполняет orchestrator.
```

---

## 18. Scope system

Scope — ключевой frontend-контекст.

Термины:

```text id="t6x5do"
scope
  URL-префикс раздела

locale
  язык интерфейса

currentScope
  конфигурация текущего scope
```

Важно не смешивать:

```text id="2ie3bn"
scope !== locale
```

Да, сейчас они могут совпадать (`ru`, `en`, `vi`), но архитектурно scope шире.

Неправильно:

```text id="8k3re8"
везде считать scope языком
```

Правильно:

```text id="c4cty9"
scope — frontend context segment
locale — i18n language
```

---

## 19. AppLink

`AppLink` — scope-aware wrapper над `RouterLink`.

Назначение:

```text id="9cq9jc"
автоматически добавлять scope к внутренним ссылкам
```

Пример:

```vue id="m92xpt"
<AppLink to="/portfolio">
  Портфолио
</AppLink>
```

Целевое поведение:

```text id="3pm91d"
to="/portfolio"
  → /ru/portfolio, если scope = ru
```

Открытая задача:

```text id="a7rf7y"
поддержка object route:
{ name, params }
```

Правило:

```text id="3nwx7r"
Компоненты не должны вручную собирать scope-prefixed links.
Это обязанность AppLink / router helpers.
```

---

## 20. API Data Contract

Vue Foundation знает только frontend-контракт API.

Основное правило:

```js id="ep3awh"
const payload = response.data.data
```

Не использовать напрямую `response.data`, если endpoint возвращает Laravel Resource.

### Navigation endpoint

Рабочие данные:

```text id="lm6u0q"
data.content[]
```

Формат:

```text id="2jc3np"
{ anchor, link, sort }
```

Проблема текущего переходного состояния:

```text id="5tzolr"
link может содержать scope prefix
```

Frontend временно нормализует:

```text id="y6h3wb"
normalizeLink(rawLink, VALID_SCOPES)
```

Целевое требование:

```text id="20u8se"
API должен возвращать scope-agnostic links
```

---

## 21. Data normalization

Данные backend могут приходить не в форме, удобной для `v-for`.

Например:

```text id="sn18bf"
category.sections.works
  Object { slug: properties }
```

Frontend getter нормализует:

```text id="2agt86"
Object.entries(works).map(([slug, data]) => ({ slug, ...data }))
```

Правило:

```text id="fmxk57"
Нормализация структур API должна жить в store/getter/composable,
а не в item.vue.
```

Presentation-компонент должен получать уже удобный формат.

---

## 22. Связь с WS DS

Vue Foundation передает WS DS уже подготовленные данные.

Правильная цепочка:

```text id="1o4tyl"
index.vue
  получает blockStore data

presentation.vue
  принимает props

WS DS primitive
  принимает slots / simple props

UI item
  отображает props
```

Пример:

```text id="5s7h3j"
blockStore.item.properties.benefits
  → Benefits :data
  → Card / SectionHeader
```

WS DS не должен знать:

```text id="qaxrwn"
blockStore
route
scope
API endpoint
```

---

## 23. Связь с Tailwind Layer

Vue Foundation не решает визуальные токены.

Он только определяет, где живут компоненты и props.

Tailwind применяется внутри:

```text id="eu98hh"
WS DS primitives
presentation components
layout composites
```

Но Vue Foundation задает правило:

```text id="d3p8mv"
Не писать visual hacks в index.vue.
```

`index.vue` должен orchestrate, а не style.

---

## 24. Связь с Animation Layer

Animation Layer зависит от Vue Foundation в части lifecycle.

Правильная цепочка:

```text id="mcqpl7"
usePageOrchestrator завершил загрузку
uiStore.isGlobalLoading = false
useGsapGlobalSync запускает PAGE_ENTER
components через useGsapOrchestrator проигрывают анимации
```

Но Vue Foundation не должен знать деталей GSAP.

Правило:

```text id="laf0qy"
Data orchestration сообщает “интерфейс готов”.
Animation layer решает “как он появляется”.
```

---

## 25. Связь с будущим Server-Driven UI

Текущее состояние:

```text id="s92tbs"
страницы компонуются статично во View-файлах
```

Целевое состояние:

```text id="1ziiiu"
API возвращает конфигурацию страницы
PageRenderer рендерит блоки через registry
```

Будущая схема:

```json id="ekipvw"
{
  "meta": {
    "title": "Главная",
    "breadcrumbs": []
  },
  "blocks": [
    {
      "type": "hero",
      "key": "hero",
      "scheme": "category",
      "fetch_slug": "main"
    },
    {
      "type": "portfolio",
      "key": "portfolio",
      "scheme": "category",
      "fetch_slug": "portfolio"
    }
  ]
}
```

Frontend target:

```text id="0tyc4w"
PageRenderer.vue
src/registry/blocks.js
pageStore
```

Важный принцип:

```text id="12jufk"
Новый тип блока должен добавляться через registry,
а не через переписывание View.vue.
```

---

## 26. Текущие архитектурные риски

### 26.1. Логика в View.vue

Риск:

```text id="6g95ix"
View.vue начнет импортировать store и fetch.
```

Контрмера:

```text id="sx4qlp"
View.vue только layout shell.
```

---

### 26.2. Presentation components импортируют stores

Риск:

```text id="t1beq9"
Benefits.vue сам берет useBlockStore.
```

Контрмера:

```text id="gmer3q"
данные идут через props от index.vue.
```

---

### 26.3. Singleton blockStore

Риск:

```text id="x3fdly"
все блоки делят один store и перетирают данные.
```

Контрмера:

```text id="vzze76"
blockStore(id) factory.
```

---

### 26.4. Async router guard

Риск:

```text id="q8mcc2"
beforeEach ждет API, страница блокируется.
```

Контрмера:

```text id="j11sdf"
router только sync context, fetch в orchestrator.
```

---

### 26.5. Scope/locale confusion

Риск:

```text id="1zetsd"
scope используется как locale везде без абстракции.
```

Контрмера:

```text id="f7kqn8"
scope и locale документировать как разные понятия.
```

---

### 26.6. Page context перезаписывается дочерними блоками

Риск:

```text id="gpp7rm"
Portfolio на главной обновляет PageTitle как /portfolio.
```

Контрмера:

```text id="h8b8g6"
isPageOwner.
```

---

## 27. Правила написания компонентов

### View.vue

```text id="l6zc4t"
- только layout
- не store
- не fetch
- не route logic
```

### index.vue

```text id="zzdb0s"
- usePageOrchestrator
- store owner
- fetch scheme
- ready flags
- pass props down
```

### presentation.vue

```text id="f2qfj5"
- defineProps
- local UI logic
- composition of UI components
- emits if needed
- no direct store
```

### item.vue

```text id="xdg8i1"
- pure props
- no fetch
- no store
- no route
```

### composables

```text id="z6es43"
- contain reusable behavior
- may use stores if designed as orchestration layer
- must not become hidden components
```

---

## 28. Правила работы с stores

```text id="qefuyw"
- uiStore only for global UI state
- navigationStore singleton for nav/structure
- blockStore(id) for block-scoped data
- formStore for forms
- no random state in components if it belongs to store
- no store import in pure presentation components
```

Особенно:

```text id="j5xbfk"
blockStore must remain factory-based.
Do not convert it into singleton.
```

---

## 29. Правила маршрутизации

```text id="0z93l4"
- route defines page identity
- scope comes from route.params.scope
- router guard is synchronous
- data fetching is delegated to orchestrator
- AppLink handles scope-aware links
- API links should be scope-agnostic
```

---

## 30. Правила данных

```text id="n6pmc8"
- Laravel Resource payload is response.data.data
- normalize API shape before deep presentation
- pass props down
- avoid template-level defensive chaos
- use ready flags before rendering nested data
```

Плохо:

```vue id="fp55zi"
{{ blockStore.category.sections.slide.hero.title }}
```

без проверки готовности.

Лучше:

```vue id="az1528"
<template v-if="blockStore.isCatReady">
  ...
</template>
```

---

## 31. План развития слоя

### Этап 1. Укрепить текущую архитектуру

```text id="cgrgh0"
- проверить View.vue на отсутствие stores
- проверить presentation components на прямые Pinia imports
- привести схемы usePageOrchestrator к единообразию
- завершить section → scope rename
```

### Этап 2. Укрепить routing/scope

```text id="r20vv0"
- AppLink object route support
- normalize all links
- API scope-agnostic navigation
- i18n ↔ scope sync
```

### Этап 3. Укрепить page context

```text id="93yyc6"
- buildPageVars null-safe
- updatePageVars for all nesting schemes
- page metadata handling
- breadcrumb consistency
```

### Этап 4. Подготовить SDUI

```text id="nfl61c"
- PageRenderer.vue
- pageStore
- block registry
- block config schema
- render by type/key/scheme/fetch_slug
```

### Этап 5. Очистить legacy

```text id="295d5x"
- удалить неиспользуемые старые stores/composables
- убрать дублирующие dataStore/calcStore fragments, если они legacy
- проверить ServiceView.vue и подобные переходные компоненты
- отделить old components от active architecture
```

---

## 32. Рабочее определение слоя

Vue Foundation / Component Architecture — это слой, который задает:

```text id="h42nt8"
- структуру Vue-приложения
- порядок ответственности компонентов
- route-driven data loading
- Pinia-store boundaries
- page ownership
- scope-aware routing
- data normalization before presentation
- переход к будущему Server-Driven UI
```

Он должен удерживать проект от смешения:

```text id="g7fbad"
layout shell
data owner
presentation component
UI primitive
animation behavior
visual tokens
```

---

## 33. Инструкция для будущих LLM

При работе с frontend-компонентами WebSolutions:

```text id="5gy0ym"
Не добавляй fetch в View.vue.
Не импортируй store в presentation/item components.
Не превращай blockStore в singleton.
Не делай async API calls в router.beforeEach.
Не позволяй дочерним блокам перезаписывать page vars.
Не собирай scope вручную в каждом RouterLink.
Не используй response.data вместо response.data.data для Laravel Resource endpoints.
```

Предпочитай:

```text id="ep0w57"
View.vue as layout shell
index.vue as orchestrator
usePageOrchestrator for data loading
blockStore(id) for isolated block state
props down to presentation components
slots inside WS DS components
AppLink for scope-aware navigation
ready flags before nested rendering
```

Главная формула:

```text id="hs87if"
Route defines context.
Orchestrator loads data.
Store holds state.
Index passes props.
Presentation composes UI.
WS DS renders primitives.
Tailwind styles them.
Animation layer animates them.
```
