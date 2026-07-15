# Animation Layer — WebSolutions Frontend

## 1. Назначение слоя

**Animation Layer** — это отдельный frontend-слой управления анимациями в проекте WebSolutions.

Он отвечает не за внешний вид компонента и не за его бизнес-смысл, а за поведение интерфейса во времени:

```text id="u2x87k"
когда элемент появляется
как он появляется
какая анимация уже была проиграна
какая анимация блокирует переход
как синхронизировать ScrollTrigger после изменения DOM
как локальные hover/click-анимации не конфликтуют с глобальными page-анимациями
```

Главная формула слоя:

```text id="2m7r82"
WS DS = component contract
Tailwind = visual contract
Animation Layer = temporal / motion contract
```

То есть:

```text id="4u7rqe"
Card знает структуру карточки.
Tailwind знает ее цвета, отступы и тени.
Animation Layer знает, когда и как эта карточка появляется, реагирует и участвует в page lifecycle.
```

---

## 2. Архитектурная роль

Animation Layer находится поверх Vue-компонентов, но не должен смешиваться с их бизнес-логикой.

Общая позиция слоя:

```text id="dk4abu"
Vue Foundation
  ↓
Data / Orchestration Layer
  ↓
Feature / Presentation Components
  ↓
WS DS Components
  ↓
Tailwind Theme Layer
  ↓
Animation Layer
```

Но это не значит, что анимации “важнее” компонентов. Корректнее считать, что Animation Layer пересекает компонентную систему как поведенческий слой:

```text id="lwsy54"
component structure
  + visual tokens
  + animation lifecycle
  =
complete UI behavior
```

---

## 3. Главный принцип

Главный принцип слоя:

```text id="4zawyc"
Decoupled Animation Logic
```

Расшифровка:

```text id="6p24dg"
Анимация не должна быть размазана по onMounted, watch и случайным DOM-обработчикам.
Компонент должен декларативно описывать, какие анимации он поддерживает.
Оркестратор должен решать, когда и как их запускать.
```

Плохой путь:

```js id="znqlxt"
onMounted(() => {
  gsap.from('.item', { opacity: 0 })
})
```

Правильный путь:

```text id="4g8d96"
component
  → описывает animationsConfig

useGsapOrchestrator
  → связывает config, DOM, Pinia и GSAP

animationStore
  → хранит глобальные фазы и состояние
```

---

## 4. Основные элементы слоя

### 4.1. animationStore

`animationStore` — глобальный Pinia-store анимационного lifecycle.

Он является SSOT для глобального состояния анимаций.

Хранит:

```text id="tb57fk"
currentPhase
playedPhases
activeAnimations
```

### currentPhase

Текущая фаза интерфейса:

```text id="9r9573"
IDLE
PAGE_ENTER
PAGE_LEAVE
```

Фаза определяет, какие global-анимации сейчас должны сработать.

### playedPhases

Механизм памяти.

Нужен для сценариев:

```text id="7sufwz"
runOnce: true
```

Если фаза уже проигрывалась, анимация может быть пропущена.

### activeAnimations

Счетчик блокирующих анимаций.

Нужен для контроля ситуаций:

```text id="32j1qy"
страница не должна считаться полностью готовой,
пока важная transition-анимация не завершилась
```

---

## 5. useGsapOrchestrator

`useGsapOrchestrator` — центральный composable Animation Layer.

Он связывает:

```text id="n419bv"
Vue ref
animationsConfig
animationStore
GSAP
ScrollTrigger
component lifecycle
```

Сигнатура:

```js id="at7u06"
useGsapOrchestrator(targetRef, animationsConfig)
```

Его задача — чтобы компонент не управлял GSAP напрямую.

Компонент говорит:

```text id="e6cenv"
Вот мой root.
Вот конфиг моих анимаций.
```

Оркестратор отвечает:

```text id="mfsvrw"
- когда подписаться на phase changes
- когда вызвать global animation
- как запустить local animation
- как создать ScrollTrigger
- как очистить gsap.context
- как не допустить конфликта таймлайнов
```

---

## 6. Три потока анимаций

Animation Layer делит анимации на три типа:

```text id="89phza"
global
local
scroll
```

Это ключевое разделение.

---

### 6.1. Global animations

Global-анимации привязаны к фазам приложения.

Пример фаз:

```text id="f2de2b"
PAGE_ENTER
PAGE_LEAVE
```

Назначение:

```text id="91sjgn"
- появление страницы
- уход страницы
- первичная сборка hero / section / cards
- page-level transitions
```

Правило:

```text id="zf7vbe"
Все анимации появления секций должны жить в global.PAGE_ENTER.
```

Пример логики:

```js id="j19rtj"
global: {
  PAGE_ENTER: {
    runOnce: true,
    isBlocking: true,
    play: () => gsap.timeline().from(...)
  }
}
```

`runOnce` означает:

```text id="o4ayjm"
не проигрывать повторно, если фаза уже была отмечена как выполненная
```

`isBlocking` означает:

```text id="chlyh7"
учитывать анимацию в activeAnimations
```

---

### 6.2. Local animations

Local-анимации — это реакции на локальное взаимодействие пользователя.

Примеры:

```text id="q4zl8j"
hover
focus
click
expand
collapse
active state
```

Они не должны проходить через глобальные фазы.

Правильно:

```text id="zw4dty"
mouseenter → triggerLocal('HOVER')
```

Неправильно:

```text id="xpuone"
hover меняет animationStore.currentPhase
```

Причина:

```text id="ktt9uh"
hover — локальное состояние компонента,
а не lifecycle всей страницы
```

Обязательное правило для local-анимаций:

```js id="6kuicx"
overwrite: "auto"
```

Это позволяет local-анимации корректно перехватывать управление у global timeline без конфликтов.

---

### 6.3. Scroll animations

Scroll-анимации используют `ScrollTrigger`.

Назначение:

```text id="5em5ia"
- появление элементов при прокрутке
- scroll-based reveal
- sticky / pin / progress-анимации
- секционные эффекты
```

Обязательное правило:

```text id="pywqz8"
Scroll-анимация всегда должна получать triggerConfig с привязкой к локальному ref.
```

Неправильно:

```js id="y9ykhn"
trigger: '.section'
```

Лучше:

```js id="g1jv6q"
trigger: root.value
```

или конкретный локальный ref.

Цель:

```text id="xgjkcf"
не создавать глобальные селекторные конфликты между повторяемыми компонентами
```

---

## 7. useGsapGlobalSync

`useGsapGlobalSync` — системный composable синхронизации геометрии.

Он нужен из-за природы проекта:

```text id="xock4w"
данные приходят асинхронно
v-for меняет высоту DOM
страницы собираются из динамических блоков
часть контента приходит после initial render
ScrollTrigger должен знать актуальную геометрию
```

Основные функции:

```text id="n0uyk4"
ResizeObserver следит за #app
при изменении высоты вызывает ScrollTrigger.refresh()
refresh выполняется с debounce
когда uiStore.isGlobalLoading становится false, запускается PAGE_ENTER
```

Это важнейшая связка между Data/Orchestration Layer и Animation Layer.

Формула:

```text id="vbjwr1"
data loading finished
  → uiStore.isGlobalLoading = false
  → useGsapGlobalSync
  → animationStore.setPhase(PAGE_ENTER)
  → компоненты запускают PAGE_ENTER-анимации
```

---

## 8. Связь с Data / Page Orchestration Layer

Animation Layer не должен сам получать данные.

Он только реагирует на состояние готовности интерфейса.

Правильная цепочка:

```text id="1xr2d7"
usePageOrchestrator
  → fetch data
  → stores updated
  → uiStore global loading false
  → useGsapGlobalSync sets PAGE_ENTER
  → useGsapOrchestrator runs component animations
```

Неправильно:

```text id="0j07pi"
animation component сам ждет API
animation component сам вызывает fetch
animation component сам решает, что данные готовы
```

Анимационный слой не должен знать, как устроен backend, EAV, Resource или Pinia blockStore.

Он знает только:

```text id="y2ql0z"
DOM готов
loading завершен
phase изменилась
```

---

## 9. Связь с WS DS

WS DS и Animation Layer должны быть разделены.

WS DS отвечает за:

```text id="cba0qo"
Card
SectionHeader
Button
Input
CardsGrid
slot API
component structure
```

Animation Layer отвечает за:

```text id="rgbjn2"
как Card появляется
как CardsGrid stagger-анимируется
как Button реагирует на hover
как SectionHeader входит в viewport
```

Важно:

```text id="v4h3ah"
UI primitive не должен быть обязан иметь анимацию.
Анимация должна быть подключаемым поведением.
```

То есть `Card` как primitive может существовать без GSAP. А `Benefits.vue` или `CardsGrid.vue` могут подключать `useGsapOrchestrator`, если им нужна анимация.

Неправильно:

```text id="d580uo"
Card всегда импортирует gsap и анимирует себя при mount
```

Правильно:

```text id="md9e0u"
Card — чистый UI primitive.
Feature / composite component решает, нужна ли ему анимация.
```

---

## 10. Связь с Tailwind Theme Layer

Tailwind отвечает за статическую визуальную систему:

```text id="ha84ri"
цвет
тень
радиус
отступ
типографика
responsive tokens
```

Animation Layer отвечает за динамику:

```text id="egexwa"
opacity transition
y/x movement
scale
stagger
scroll reveal
hover response
page enter / leave
```

Запрещено смешивать:

```text id="m1kx06"
Tailwind class как способ управлять сложным timeline
```

Допустимо:

```text id="pbawkr"
Tailwind задает начальные layout/visual состояния.
GSAP управляет переходом между состояниями.
```

Пример хорошего разграничения:

```text id="edp3ny"
class="ui-card shadow-card bg-surface"
animationConfig.PAGE_ENTER → gsap.from(cardRefs, { opacity: 0, y: 24, stagger: 0.08 })
```

---

## 11. Связь с Vue Component Layer

Animation Layer должен уважать Vue lifecycle.

Правила:

```text id="7crevd"
- DOM target только через ref
- не использовать глобальные селекторы без необходимости
- не обращаться к DOM до готовности ref
- очищать GSAP context при unmount
- не оставлять ScrollTrigger после уничтожения компонента
```

Компонент должен предоставлять:

```text id="fnzxmp"
root ref
animationsConfig
локальные события, если нужны
```

Но не должен вручную управлять низкоуровневым GSAP lifecycle.

---

## 12. Паттерн компонента с анимацией

Базовая модель:

```text id="0e6fkp"
<script setup>
  root ref
  computed animationsConfig
  useGsapOrchestrator(root, animationsConfig)
</script>

<template>
  root element with ref
  local events call triggerLocal
</template>
```

Смысл:

```text id="7i53kt"
анимация описана рядом с компонентом,
но исполнение и lifecycle вынесены в orchestrator
```

Это компромисс:

```text id="cfs4da"
компонент знает свои визуальные элементы
но не управляет всей анимационной системой вручную
```

---

## 13. Типы компонентов и допустимость анимаций

### 13.1. View components

`View.vue` не должен содержать анимационную логику.

Причина:

```text id="dsm7wf"
View.vue — слой компоновки, не владеет store/fetch/composables поведения
```

Допустимо только включение компонентов, которые сами умеют анимироваться.

---

### 13.2. index.vue / orchestrator components

`index.vue` может быть местом подключения page-level animation, если он уже является владельцем страницы.

Но нужно осторожно:

```text id="1fg7fv"
index.vue не должен превращаться в склад всех анимаций дочерних компонентов
```

---

### 13.3. Feature components

Feature-компоненты — основной кандидат для подключения анимаций.

Примеры:

```text id="d457n1"
Benefits
Services
PortfolioList
Hero
Workflow
FAQ
```

Именно они знают:

```text id="39lyu4"
какие элементы повторяются
где нужен stagger
какая секция появляется
какие local events есть
```

---

### 13.4. UI primitives

UI primitives должны быть максимально нейтральными.

Пример:

```text id="3n5n4t"
Card
Button
Input
SectionHeader
```

Они не должны автоматически создавать сложные GSAP timelines.

Исключение:

```text id="b5vm9y"
очень простые CSS/Tailwind transition states
```

Например hover-transition цвета кнопки может быть Tailwind/CSS, не GSAP.

---

## 14. Когда использовать GSAP, а когда CSS/Tailwind

### Использовать CSS/Tailwind transitions

Для простых состояний:

```text id="j46eby"
hover color
hover border
focus ring
small opacity transition
button background
simple transform
```

### Использовать GSAP

Для сложного поведения:

```text id="lw7l69"
stagger
timeline
page enter / leave
scroll reveal
coordinated multi-element animation
interruptible local animation
SVG/morph/advanced motion
animation that must sync with app lifecycle
```

Правило:

```text id="qwg7ag"
Если анимация требует состояния, таймлайна, синхронизации или ScrollTrigger — это Animation Layer.
Если это простой hover-переход — это Tailwind/CSS.
```

---

## 15. Naming и структура конфигурации

В `animationsConfig` использовать понятные ключи:

```text id="ooho25"
PAGE_ENTER
PAGE_LEAVE
HOVER
FOCUS
EXPAND
COLLAPSE
APPEAR
```

Не использовать случайные имена:

```text id="zoykgo"
anim1
test
start
foo
```

Разделять:

```js id="4xjpk5"
global: {}
local: {}
scroll: {}
```

Не смешивать hover в global, а scroll в local.

---

## 16. Архитектурные запреты

Запрещено:

```text id="qe3ykc"
- вызывать gsap.to/from напрямую в onMounted
- использовать глобальный store для hover-анимаций
- запускать page-enter анимации до завершения global loading
- использовать глобальные селекторы без локального ref
- оставлять ScrollTrigger без cleanup
- хардкодить анимации внутри UI primitives
- смешивать fetch/data loading и animation logic
- управлять layout через JS-анимацию, если это CSS/layout задача
```

Особенно опасно:

```js id="4wg4ar"
onMounted(() => {
  gsap.from('.card', ...)
})
```

Почему:

```text id="qtuyug"
- .card может встречаться во многих местах
- повторяемые компоненты конфликтуют
- нет cleanup
- нет связи с PAGE_ENTER
- нет runOnce
- нет activeAnimations
```

---

## 17. Риски слоя

### 17.1. Распыление GSAP по компонентам

Если каждый компонент начнет сам писать `onMounted(gsap...)`, система быстро потеряет управляемость.

Контрмера:

```text id="qcvl76"
только useGsapOrchestrator
```

---

### 17.2. Конфликт global и local-анимаций

Например PAGE_ENTER двигает карточку, а hover одновременно scale-ит ее.

Контрмера:

```text id="cidqxk"
local animations must use overwrite: "auto"
```

---

### 17.3. Неверная геометрия ScrollTrigger

Динамический контент меняет высоту страницы после инициализации.

Контрмера:

```text id="f4j9yv"
useGsapGlobalSync + ResizeObserver + ScrollTrigger.refresh()
```

---

### 17.4. Анимация до готовности данных

Если animation запускается до завершения загрузки, элементы могут отсутствовать или появиться рывком.

Контрмера:

```text id="bznj1v"
PAGE_ENTER запускается только после uiStore.isGlobalLoading = false
```

---

### 17.5. Слишком тяжелые анимации

Риск:

```text id="5jeswc"
анимировать layout properties
left/top/width/height
много ScrollTrigger
сложные timelines на каждом item
```

Контрмера:

```text id="3t75ei"
анимировать transform и opacity
ограничивать количество ScrollTrigger
использовать stagger аккуратно
```

---

## 18. План миграции / стабилизации

### Этап 1. Зафиксировать правила

Документально закрепить:

```text id="z7gnd4"
- no GSAP in onMounted
- useGsapOrchestrator only
- global/local/scroll separation
- local overwrite auto
- ScrollTrigger through local ref
```

### Этап 2. Проверить текущий код

Найти:

```text id="5uosze"
gsap.to(
gsap.from(
ScrollTrigger.create(
onMounted(
```

И разделить:

```text id="0nyojx"
- допустимое
- legacy
- candidate for useGsapOrchestrator
```

### Этап 3. Подключить PAGE_ENTER к ключевым секциям

Кандидаты:

```text id="rfwa3s"
Hero
Benefits
Services
PortfolioList
Workflow
FAQ
```

### Этап 4. Унифицировать section reveal

Создать повторяемый animation pattern:

```text id="ol0wzj"
section reveal
cards stagger
header reveal
list item reveal
```

Не обязательно сразу выделять в отдельную библиотеку. Сначала стабилизировать паттерны.

### Этап 5. Связать с WS DS аккуратно

Не внедрять GSAP внутрь каждого primitive.

Лучше:

```text id="eubt26"
CardsGrid анимирует список Card
Card остается чистым primitive
```

### Этап 6. Performance pass

Проверить:

```text id="o50w2z"
- нет ли лишних ScrollTrigger
- нет ли layout-thrashing
- нет ли повторного проигрывания PAGE_ENTER при навигации назад
- корректно ли работает runOnce
- нет ли конфликтов hover/global
```

---

## 19. Рабочее определение Animation Layer

Animation Layer — это frontend-подсистема управления motion-поведением интерфейса WebSolutions, построенная на:

```text id="i31dhv"
Vue refs
GSAP
ScrollTrigger
Pinia animationStore
useGsapOrchestrator
useGsapGlobalSync
```

Она обеспечивает:

```text id="2d483c"
- фазовую модель page lifecycle
- декларативное описание анимаций
- изоляцию GSAP через context
- синхронизацию с загрузкой данных
- локальные интеракции без загрязнения global store
- scroll-анимации с актуальной геометрией
```

---

## 20. Инструкция для будущих LLM

При работе с анимациями в WebSolutions:

```text id="0bz9tn"
Не добавляй gsap.to/from напрямую в onMounted.
Не используй глобальный animationStore для hover.
Не хардкодь GSAP в UI primitives.
Не используй глобальные DOM-селекторы без ref.
Не запускай ScrollTrigger без triggerConfig.
Не смешивай fetch/data loading и animation logic.
```

Используй:

```text id="7jmst1"
useGsapOrchestrator(rootRef, animationsConfig)
animationStore phases
PAGE_ENTER для появления
triggerLocal для hover/click
scroll config для ScrollTrigger
overwrite: "auto" для local-анимаций
useGsapGlobalSync для refresh и loader sync
```

Формула слоя:

```text id="nbuap9"
Component describes animation capability.
Orchestrator executes animation lifecycle.
Store controls global phase.
GlobalSync synchronizes DOM geometry and loading readiness.
```

---

## 21. Краткий итог

Animation Layer в WebSolutions должен развиваться как самостоятельная архитектурная подсистема, а не как набор эффектов.

Его ценность:

```text id="vc8yqd"
- контролируемость
- отсутствие хаоса в onMounted
- единый page lifecycle
- защита от конфликтов GSAP
- совместимость с dynamic content rendering
- подготовка к более сложному motion design без переписывания компонентов
```

Связь с соседними слоями:

```text id="zstpmw"
WS DS
  дает структуру компонентов

Tailwind
  дает визуальные токены

Animation Layer
  дает motion-поведение

Data Orchestration
  сообщает, когда интерфейс готов к анимации
```
