# Data-driven / API Contract / Frontend Data Mapping Layer — WebSolutions Frontend

## 1. Назначение слоя

**Data-driven / API Contract / Frontend Data Mapping Layer** — это frontend-слой, который описывает, как данные, полученные от Laravel API, превращаются в структуру Vue-страницы и передаются в компоненты.

Он отвечает за:

```text id="y6bq02"
- контракт API-ответа
- нормализацию payload
- разграничение root data / properties / sections
- правила передачи данных в presentation-компоненты
- защиту UI от знания EAV-структуры backend
- подготовку данных для WS DS компонентов
- обработку rich HTML, списков, карточек, пакетов, KPI и hero-структур
```

Главная формула слоя:

```text id="w5zdy9"
Laravel Resource returns normalized JSON.
Frontend store receives payload.
Orchestrator selects data fragment.
Presentation component receives props.
WS DS renders component structure.
```

---

## 2. Позиция в общей архитектуре frontend

Этот слой находится между backend API и Vue presentation-компонентами.

Общая схема:

```text id="1mkfcp"
Laravel API / Resource
  ↓
Axios response
  ↓
blockStore / navigationStore
  ↓
usePageOrchestrator
  ↓
index.vue
  ↓
presentation components
  ↓
WS DS primitives
```

Если Vue Foundation отвечает за то, **где** живет загрузка и кто владеет состоянием, то Data-driven layer отвечает за то, **какой формы данные считаются валидными для UI**.

---

## 3. Базовый API contract

Основной контракт Laravel Resource:

```js id="9yrwwp"
response.data.data
```

Frontend не должен использовать `response.data` как payload, если endpoint возвращает Laravel Resource.

Правильный паттерн:

```js id="046efy"
const payload = response.data.data
```

Для страницы `visarun_system` payload имеет вид:

```json id="vtujr1"
{
  "data": {
    "id": 107,
    "key": "visarun_system",
    "name": "Visa Run Booking System",
    "properties": {
      "title": "",
      "content": "",
      "acticle": "...",
      "hero": {},
      "benefits": {},
      "extras": {},
      "important": {},
      "items": {},
      "includes": []
    }
  }
}
```

То есть после извлечения `response.data.data` frontend получает:

```js id="23w4u8"
blockStore.item = {
  id,
  key,
  name,
  properties
}
```

---

## 4. Backend EAV не должен протекать во frontend UI

На backend данные могут происходить из EAV:

```text id="5v81gn"
Block
  → BlockItem
  → Property
  → PropertyValue
```

Но frontend не должен знать:

```text id="y5zrh2"
property_id
item_id
value_type
locale
version
EAV joins
BlockItemPropertyValue
```

Frontend contract уже денормализован:

```text id="meu2ao"
properties.title
properties.hero.title
properties.benefits.items[]
properties.important.items[]
properties.items.items[]
```

Именно это — нормальная граница между backend и frontend.

Правило:

```text id="o6y9za"
Frontend работает с логическим JSON-представлением, а не с EAV-моделью.
```

---

## 5. Термины слоя

Для дальнейшей работы удобно зафиксировать термины.

### 5.1. API Envelope

Внешняя обертка Laravel Resource:

```json id="xmca1a"
{
  "data": {}
}
```

Frontend обязан снять envelope:

```js id="0o4gnz"
payload = response.data.data
```

---

### 5.2. Entity Payload

Корневой объект сущности:

```json id="y5bc2d"
{
  "id": 107,
  "key": "visarun_system",
  "name": "Visa Run Booking System",
  "properties": {}
}
```

Это то, что хранится в:

```js id="logy73"
blockStore.item
```

---

### 5.3. Properties Root

Основная содержательная область:

```js id="f4l6ia"
blockStore.item.properties
```

Для `compred / visarun_system` именно здесь находится вся структура страницы.

Пример:

```text id="8hk9bq"
properties.hero
properties.benefits
properties.extras
properties.important
properties.items
properties.includes
```

---

### 5.4. Section Node

Семантический фрагмент страницы.

Примеры:

```text id="vz7nxj"
hero
benefits
extras
important
items
includes
```

Section Node может иметь разные формы:

```text id="th9mqw"
Object with title/pretitle/items
Array of includes
Object with hero fields
Object with pricing packages
```

---

### 5.5. Card Collection Section

Раздел с повторяющимися карточками.

Форма:

```json id="e34vry"
{
  "pretitle": "...",
  "title": "...",
  "items": [
    {
      "index": 1,
      "icon": "...",
      "title": "...",
      "text": "..."
    }
  ]
}
```

Такая форма есть у:

```text id="9z3p85"
benefits
extras
important
```

---

### 5.6. Package Collection Section

Раздел с пакетами / тарифами.

Форма:

```json id="vyiglr"
{
  "pretitle": "Стоимость",
  "title": "Пакеты внедрения",
  "items": [
    {
      "index": 1,
      "icon": "card-text",
      "name": "Базовый",
      "price": "34 000 ?",
      "term": "2–3 недели",
      "featured": false,
      "desc": "...",
      "features": []
    }
  ]
}
```

В текущем payload этот section называется `items`, но терминологически на frontend его лучше воспринимать как:

```text id="uachpw"
packages
pricing
offerPackages
```

Текущее имя `properties.items` является слишком общим и потенциально конфликтным.

---

### 5.7. Rich HTML Field

Поле, содержащее HTML-строку.

Пример:

```json id="sckqmx"
{
  "text": "<ul><li>Дата выезда...</li></ul>"
}
```

Такое поле нельзя обрабатывать как обычный plain text.

Frontend должен явно различать:

```text id="moc4ce"
plain text
rich HTML
structured list
```

---

## 6. Структура payload compred / visarun_system

Реальный payload показывает такую страницу:

```text id="6hj8lp"
properties
  title
  content
  acticle
  hero
  benefits
  extras
  important
  items
  includes
```

### 6.1. title / content

Сейчас:

```json id="kd2irb"
"title": "",
"content": ""
```

Это либо legacy-поля, либо зарезервированные поля.

Frontend не должен строить критичную логику на пустых `title/content`, если есть специализированные section nodes.

---

### 6.2. acticle

Поле:

```json id="hu5buu"
"acticle": "Мы создаём не просто сайт..."
```

Вероятно, это typo от `article`.

Текущий статус:

```text id="zvou2k"
acticle — legacy/typo field, но фактически присутствует в API.
```

Frontend может временно поддерживать его, но в документации лучше зафиксировать target rename:

```text id="bpmayr"
acticle → article
```

При этом нельзя просто переименовать на frontend без backend/seed миграции, если поле уже используется.

---

### 6.3. hero

Форма:

```json id="5xelal"
{
  "pretitle": "...",
  "title": "...",
  "focus": "...",
  "paragraph": "..."
}
```

Это single-section object.

Рекомендуемый frontend component:

```text id="9hi95t"
CompredHero
```

Props contract:

```js id="dv6892"
{
  pretitle: String,
  title: String,
  focus: String,
  paragraph: String
}
```

---

### 6.4. benefits

Форма:

```json id="i5c2s9"
{
  "pretitle": "Что получает бизнес",
  "title": "Система онлайн-бронирования визаранов",
  "items": [
    {
      "index": 1,
      "icon": "sliders",
      "title": "Автоматизация выбора",
      "text": "..."
    }
  ]
}
```

Это canonical card collection section.

Текущий компонент:

```text id="elyxiz"
src/components/blocks/compred/presentation/benefits.vue
```

уже работает именно с таким контрактом:

```vue id="h11a2f"
<Benefits
  v-if="blockStore.item.properties.benefits"
  :data="blockStore.item.properties.benefits"
/>
```

---

### 6.5. extras

Форма совпадает с `benefits`:

```text id="b48zhd"
pretitle
title
items[index, icon, title, text]
```

Отличие только в семантике: это KPI / outcome / quantified benefits.

Следовательно, `extras` может использовать тот же UI-шаблон, что и `benefits`, но с другим variant.

Возможная модель:

```vue id="6hwch3"
<CardSection
  :data="properties.extras"
  variant="metric"
/>
```

На текущем этапе можно использовать отдельный компонент, но важно видеть повторяющийся контракт.

---

### 6.6. important

Форма похожа на `benefits`, но `text` содержит rich HTML.

```json id="q5w39i"
{
  "title": "Онлайн-конфигуратор поездки",
  "text": "<ul><li>Дата выезда...</li></ul>"
}
```

Это уже не обычная текстовая карточка.

Нужно различать:

```text id="egr8u8"
BenefitsCard
  text = plain text

ImportantCard
  text = rich HTML
```

или параметризовать:

```text id="o05ogx"
renderMode: 'text' | 'html'
```

Главное правило:

```text id="cd5uoa"
Нельзя бездумно передавать HTML-строки в обычный text slot как plain text.
```

---

### 6.7. items

Текущее поле `properties.items` содержит пакеты внедрения.

Форма:

```text id="vgyayz"
pretitle
title
items[]
  index
  icon
  name
  price
  term
  featured
  desc
  features[]
```

Это не “items” в общем смысле, а pricing/packages section.

Рекомендуемый frontend alias:

```js id="bl7798"
const packages = props.properties.items
```

или в нормализаторе:

```js id="yuzmdb"
properties.packages = properties.items
```

Но делать это нужно аккуратно, чтобы не сломать текущий backend contract.

---

### 6.8. includes

Форма:

```json id="d8ge04"
[
  {
    "index": 1,
    "text": "Анализ текущих процессов бизнеса",
    "icon": "check-lg"
  }
]
```

Это simple checklist section.

Рекомендуемый component:

```text id="as6evr"
IncludesList
Checklist
```

Contract:

```js id="qeiq5m"
Array<{
  index: Number,
  text: String,
  icon: String
}>
```

---

## 7. Компонентная декомпозиция compred

На основе payload `visarun_system` страницу `compred` можно разложить так:

```text id="ur4bxk"
CompredView.vue
  ↓
components/blocks/compred/index.vue
  ↓
CompredHero
Benefits
Extras / Metrics
ImportantFeatures
PricingPackages
IncludesList
CTA / Article
```

Текущий практический вход:

```text id="k1k38d"
benefits.vue
```

Но по данным видно, что `benefits.vue` является только первым повторяемым section-компонентом.

---

## 8. Рекомендуемая frontend data flow для compred

Правильная цепочка:

```text id="wdb3ho"
Route:
  /blocks/item/visarun_system
  или другой маршрут compred

index.vue:
  usePageOrchestrator('compred', 'item', fetch resolver)

blockStore:
  fetchBlockItem('visarun_system')
  item = response.data.data

index.vue:
  const properties = computed(() => blockStore.item?.properties ?? {})

presentation:
  <CompredHero :data="properties.hero" />
  <Benefits :data="properties.benefits" />
  <Benefits :data="properties.extras" variant="metrics" />
  <ImportantFeatures :data="properties.important" />
  <PricingPackages :data="properties.items" />
  <IncludesList :items="properties.includes" />
```

Важно: presentation-компоненты не должны сами доставать `blockStore`.

---

## 9. Разграничение responsibility

### index.vue

Отвечает за:

```text id="0xze7z"
- загрузку item через orchestrator
- ready state
- выбор section-компонентов
- передачу props
- fallback, если section отсутствует
```

Не отвечает за:

```text id="edek6k"
- внутреннюю верстку карточек
- UI layout карточек
- парсинг rich HTML
- typography
```

---

### section component

Например `Benefits.vue`.

Отвечает за:

```text id="tdjbpi"
- принять section node
- отрисовать pretitle/title через SectionHeader
- пройтись по data.items
- передать item в Card
- выбрать IconOffer / slot composition
```

Не отвечает за:

```text id="vj3n0s"
- fetch
- route
- blockStore
- global page vars
```

---

### UI primitive

Например `Card`.

Отвечает за:

```text id="k0za9g"
- зоны icon/title/body/footer
- layout header/body
- базовую структуру карточки
```

Не отвечает за:

```text id="2vm7tn"
- выбор item.icon
- знание item.index
- знание data.items
- обработку backend-секции
```

---

## 10. Типовые контракты sections

Для дальнейшей практической работы полезно зафиксировать минимальные DTO-формы.

### 10.1. HeroSection

```ts id="p7j7hj"
type HeroSection = {
  pretitle?: string
  title: string
  focus?: string
  paragraph?: string
}
```

---

### 10.2. CardCollectionSection

```ts id="s92n44"
type CardCollectionSection = {
  pretitle?: string
  title: string
  items: CardItem[]
}

type CardItem = {
  index?: number
  icon?: string
  title: string
  text: string
}
```

Используется для:

```text id="5f5kcg"
benefits
extras
```

Частично для:

```text id="sdck2m"
important
```

но там `text` может быть rich HTML.

---

### 10.3. RichCardCollectionSection

```ts id="39vqdp"
type RichCardCollectionSection = {
  pretitle?: string
  title: string
  items: RichCardItem[]
}

type RichCardItem = {
  index?: number
  icon?: string
  title: string
  text: string // HTML string
}
```

Используется для:

```text id="amfstk"
important
```

---

### 10.4. PackageSection

```ts id="46fkxj"
type PackageSection = {
  pretitle?: string
  title: string
  items: PackageItem[]
}

type PackageItem = {
  index?: number
  icon?: string
  name: string
  price: string
  term: string
  featured?: boolean
  desc?: string
  features: string[]
}
```

Используется для:

```text id="2bkab3"
properties.items
```

---

### 10.5. ChecklistItem

```ts id="ycdqhv"
type ChecklistItem = {
  index?: number
  icon?: string
  text: string
}
```

Используется для:

```text id="7o7eug"
properties.includes
```

---

## 11. Нормализация имен

В payload есть несколько naming issues.

### 11.1. `acticle`

Текущий ключ:

```text id="tk3j2i"
acticle
```

Предпочтительный ключ:

```text id="ukpjh2"
article
```

Статус:

```text id="pevbqk"
backend/content typo, временно поддерживать
```

Рекомендация:

```js id="w02v65"
const article = properties.article ?? properties.acticle ?? ''
```

---

### 11.2. `items` как pricing packages

Текущий ключ:

```text id="8yfaun"
properties.items
```

Проблема:

```text id="l2yoxz"
items слишком общий ключ,
внутри него тоже есть items[]
```

Получается:

```js id="rjcc2k"
properties.items.items
```

Это ухудшает читаемость.

Предпочтительно:

```text id="7lzjg0"
properties.packages
properties.pricing
properties.offer_packages
```

Временный frontend alias:

```js id="a47648"
const packages = properties.items
```

---

### 11.3. `text` как HTML

Один и тот же ключ `text` используется и для plain text, и для rich HTML.

Проблема:

```text id="63scrg"
UI не знает, надо ли рендерить text как текст или HTML
```

Возможные решения:

```text id="wzr0f5"
1. backend добавляет text_type: 'plain' | 'html'
2. section-level component знает, что important.text является HTML
3. использовать разные ключи: text / html
```

На текущем этапе допустимо решение 2, потому что `important` — известный section type.

---

## 12. Работа с rich HTML

В `important.items[].text` находится HTML.

Frontend должен отрисовывать его осознанно.

Возможные варианты:

```vue id="i6fxkn"
<div v-html="item.text"></div>
```

Но это требует правила безопасности.

Так как HTML приходит из собственного backend/content seed слоя, это допустимо как controlled content, но нужно зафиксировать:

```text id="5nofkh"
v-html разрешен только для доверенного контента из WS content pipeline.
Не использовать v-html для пользовательского ввода.
```

Лучше ввести отдельный компонент:

```text id="ex7zvk"
RichText.vue
```

Ответственность `RichText`:

```text id="ahz0k5"
- единая точка v-html
- scoped typography for ul/li/strong/p
- будущая sanitizer integration
- запрет хаотичного v-html в разных компонентах
```

---

## 13. Defensive rendering

Так как section nodes могут отсутствовать, `index.vue` должен рендерить секции defensively.

Пример принципа:

```vue id="8mpqm5"
<Benefits
  v-if="properties.benefits?.items?.length"
  :data="properties.benefits"
/>
```

Не делать:

```vue id="j4l9rq"
<Benefits :data="blockStore.item.properties.benefits" />
```

без проверки, если `item` может быть еще не загружен.

Рекомендуемый уровень защиты:

```text id="3md2hz"
index.vue проверяет наличие section
section component проверяет наличие items
item component считает props валидными
```

---

## 14. Data mapping в blockStore

`blockStore` должен хранить raw-normalized payload, но не должен превращаться в God-object.

Допустимо:

```text id="g0ulh9"
item
category
overlay
filteredItems
ready flags
```

Не нужно помещать в store слишком feature-specific computed для каждого compred section, если это используется только на одной странице.

Лучше:

```text id="vzt8yy"
index.vue:
  const properties = computed(...)
  const article = computed(...)
  const packages = computed(...)
```

Если mapping повторяется в нескольких местах — вынести в composable:

```text id="2bqvyr"
useCompredSections(item)
```

---

## 15. Возможный composable для compred

Когда практический этап дойдет до нескольких секций, можно ввести:

```text id="e4yr81"
src/composables/compred/useCompredSections.js
```

Назначение:

```text id="pbshqu"
- дать алиасы для properties
- закрыть acticle/article fallback
- отделить packages от properties.items
- проверить наличие sections
- вернуть удобные computed
```

Пример возвращаемых значений:

```js id="q27fyr"
{
  hero,
  article,
  benefits,
  extras,
  important,
  packages,
  includes,
  hasHero,
  hasBenefits,
  hasPackages
}
```

Но не вводить этот composable преждевременно, пока структура используется только в одном месте и не мешает пониманию.

---

## 16. Связь с WS DS

Data-driven layer не должен заставлять WS DS знать backend-форматы.

Правильно:

```text id="nkv7m5"
Benefits receives CardCollectionSection.
Card receives slots.
IconOffer receives icon/index.
```

Неправильно:

```text id="omc566"
Card receives backend item object.
Card knows item.properties.
Card renders v-html because backend gave text.
```

WS DS components должны получать уже подготовленные значения.

---

## 17. Связь с Tailwind

Data layer не должен напрямую генерировать Tailwind classes.

Неправильно:

```json id="6ilac9"
{
  "class": "bg-red-500 text-white"
}
```

Лучше:

```json id="xhnua5"
{
  "variant": "featured"
}
```

Frontend mapping:

```js id="pjpjqd"
const packageVariantClass = {
  featured: 'border-primary shadow-card-accent',
  default: 'border-border shadow-card'
}
```

В текущем payload есть поле:

```json id="zbhfms"
"featured": true
```

Это хороший data-driven флаг, потому что он говорит о смысле, а не о CSS.

---

## 18. Связь с Animation Layer

Data-driven layer влияет на анимации через количество и структуру элементов.

Например:

```text id="7yxhkq"
benefits.items.length
important.items.length
packages.items.length
```

Но анимационный слой не должен читать backend raw data.

Правильно:

```text id="w2s2mu"
Presentation component рендерит список.
Animation Layer анимирует DOM refs / item refs.
```

Не нужно:

```text id="fqi7cv"
GSAP логика зависит от properties.important.items напрямую.
```

---

## 19. Практическая стратегия для compred

На ближайший практический этап правильный фокус:

```text id="3yag2h"
1. Удержать текущий Benefits как первый section-компонент.
2. Проверить его контракт against properties.benefits.
3. Не усложнять Card.
4. Не передавать весь root properties внутрь Benefits.
5. Постепенно выделить повторяемый CardCollectionSection.
```

### Текущий валидный вызов

```vue id="d8rwql"
<Benefits
  v-if="blockStore.item.properties.benefits"
  :data="blockStore.item.properties.benefits"
/>
```

Лучше сделать безопаснее:

```vue id="650tvp"
<Benefits
  v-if="properties.benefits?.items?.length"
  :data="properties.benefits"
/>
```

где:

```js id="nz46b9"
const properties = computed(() => blockStore.item?.properties ?? {})
```

---

## 20. Потенциальная унификация секций

По payload видно, что минимум три section имеют близкую форму:

```text id="q8ajpl"
benefits
extras
important
```

Но они не полностью одинаковые:

```text id="8xiwgu"
benefits → plain cards
extras → metric/result cards
important → rich HTML cards
```

Следовательно, не стоит сразу делать один универсальный компонент-монстр.

Лучше постепенная модель:

```text id="1g7q1z"
BenefitsSection
MetricsSection
RichCardsSection
```

А общий reusable слой выделять ниже:

```text id="zw3ru2"
CardsGrid
Card
SectionHeader
IconOffer
RichText
```

То есть унифицировать не бизнес-компоненты, а их UI primitives/composites.

---

## 21. Вопрос “универсальный компонент или отдельные секции”

Для `benefits`, `extras`, `important` есть два пути.

### Вариант A. Один универсальный CardSection

```vue id="qz5svz"
<CardSection
  :data="properties.benefits"
  variant="benefits"
/>

<CardSection
  :data="properties.extras"
  variant="metrics"
/>

<CardSection
  :data="properties.important"
  variant="rich"
/>
```

Плюсы:

```text id="13timp"
- меньше файлов
- единый layout
- быстрее развивать
```

Минусы:

```text id="qp136x"
- риск prop/variant hell
- сложнее читать
- component becomes too smart
```

### Вариант B. Отдельные section-компоненты + общие primitives

```vue id="t4le1n"
<BenefitsSection />
<MetricsSection />
<ImportantSection />
```

Плюсы:

```text id="gouviw"
- ясная семантика
- проще поддерживать
- меньше условий внутри
```

Минусы:

```text id="qa9lxd"
- больше файлов
- возможное дублирование
```

Рекомендация для текущего проекта:

```text id="o8rmxw"
Начать с отдельных section-компонентов.
Повторяемые части выносить вниз в WS DS primitives/composites.
```

Это лучше соответствует уже принятому принципу:

```text id="x7bx88"
composition over configuration
```

---

## 22. Правила слоя

### 22.1. Не передавать root properties в каждую секцию

Плохо:

```vue id="hf3mcb"
<Benefits :properties="blockStore.item.properties" />
```

Хорошо:

```vue id="5hkabf"
<Benefits :data="properties.benefits" />
```

---

### 22.2. Не доставать store внутри section

Плохо:

```js id="sgl74i"
const blockStore = useBlockStore('compred')
```

внутри `benefits.vue`.

Хорошо:

```js id="1um3ot"
const props = defineProps({
  data: Object
})
```

---

### 22.3. Не смешивать plain text и rich HTML

Плохо:

```vue id="lp7xgq"
<slot name="text">{{ item.text }}</slot>
```

для HTML.

Хорошо:

```vue id="ks87tn"
<RichText :html="item.text" />
```

или отдельный rich-section component.

---

### 22.4. Не превращать backend field names в UI-термины без осмысления

`properties.items` не обязан называться `ItemsSection` во frontend.

Лучше:

```js id="iprx4j"
const packages = properties.items
```

---

### 22.5. Data flags лучше CSS-классов

Хорошо:

```json id="ym4j4j"
"featured": true
```

Плохо:

```json id="xgauis"
"class": "border border-primary shadow-lg"
```

---

## 23. Риски

### 23.1. UI начинает знать EAV

Риск:

```text id="6gddrz"
компонент работает с propertyValues, value_type, locale
```

Контрмера:

```text id="9w4uqf"
только denormalized properties contract
```

---

### 23.2. Feature-компонент получает слишком много

Риск:

```text id="97bq8w"
Benefits получает весь item/properties
```

Контрмера:

```text id="5xq3vy"
section-level props only
```

---

### 23.3. Один универсальный компонент для всех секций

Риск:

```text id="f4u67s"
CardSection с десятком variants и условий
```

Контрмера:

```text id="fqs8e0"
отдельные semantic sections + shared primitives
```

---

### 23.4. Небезопасный v-html

Риск:

```text id="kcjod0"
HTML из недоверенного источника попадает в DOM
```

Контрмера:

```text id="ythwf7"
v-html только через RichText и только для trusted content pipeline
```

---

### 23.5. Naming debt в content keys

Риск:

```text id="ctv94j"
acticle, items.items, text-as-html
```

Контрмера:

```text id="y8yv7r"
frontend aliases + backend/content migration plan
```

---

## 24. План практического развития compred

### Этап 1. Стабилизировать текущий Benefits

```text id="5yfxqk"
- props.data = CardCollectionSection
- defensive rendering
- Card slots icon/title/default
- IconOffer оставить transitional
```

### Этап 2. Добавить Hero

```text id="mzyt02"
CompredHero receives properties.hero
```

### Этап 3. Добавить Extras

```text id="4y3iu4"
MetricsSection receives properties.extras
```

Использовать тот же Card/Grid фундамент, но не обязательно тот же компонент.

### Этап 4. Добавить Important

```text id="tcue22"
ImportantSection receives properties.important
RichText component for HTML
```

### Этап 5. Добавить Packages

```text id="sc9io2"
PricingPackages receives properties.items as packages
```

Здесь важны:

```text id="p1dwgv"
featured
price
term
features[]
```

### Этап 6. Добавить Includes

```text id="58sm2b"
IncludesList receives properties.includes
```

### Этап 7. Вынести shared components

После 2–3 секций станет понятно, что реально повторяется.

Кандидаты:

```text id="u4qk42"
CardsGrid
SectionHeader
Card
IconOffer v2
RichText
FeatureList
```

---

## 25. Рабочее определение слоя

Data-driven / API Contract / Frontend Data Mapping Layer — это слой, который защищает frontend от хаоса между backend EAV, API payload и UI-компонентами.

Он фиксирует:

```text id="wwl8z5"
- API envelope
- item payload shape
- properties root
- section nodes
- section DTOs
- mapping rules
- aliases for bad names
- rich HTML boundaries
- flags/variants strategy
- defensive rendering
```

---

## 26. Инструкция для будущих LLM

При работе с `compred` и подобными страницами WebSolutions:

```text id="4snzf6"
Не передавай весь blockStore.item.properties в каждый компонент.
Не импортируй blockStore внутри presentation-компонентов.
Не заставляй Card знать backend item.
Не смешивай text и html.
Не превращай properties.items.items в UI-термин без alias.
Не делай универсальный компонент-монстр для всех секций сразу.
```

Предпочитай:

```text id="7o1pxu"
index.vue owns item and properties
section components receive exact section node
Card / SectionHeader / CardsGrid stay UI-level
RichText handles trusted HTML
packages alias for properties.items
article fallback for acticle
featured as semantic flag
```

Главная формула:

```text id="dly47i"
Backend returns denormalized content.
Store holds entity payload.
Index maps properties to sections.
Sections render semantic chunks.
WS DS renders reusable UI.
```
