# WebSolutions

## 🌐 About the Project / О проекте

**EN:**  
WebSolutions is a modular web platform built with Vue 3 (Vite) on the frontend and Laravel 12 as API backend. The project focuses on dynamic content structures, reactive UI rendering, and scalable architecture for complex web solutions.

**RU:**  
WebSolutions — это модульная веб-платформа на Vue 3 (Vite) с backend API на Laravel 12. Проект ориентирован на динамические структуры контента, реактивный UI и масштабируемую архитектуру для сложных веб-решений.

---

# Tech Stack

### Frontend
- Vue 3 (Vite)
- Vue Router
- Pinia
- Axios
- Swiper (gallery / zoom)

### Backend
- Laravel 12 (API)

---

# Project Structure (Key Files)

```
src/
 ├── utils/
 │    └── api.js              # Axios instance (baseURL from env)
 ├── stores/
 │    └── calcStore.js        # Pinia store (structure, item, overlay)
 ├── components/
 │    ├── blocks/
 │    │    └── Item.vue       # Gallery / Item view (Swiper integration)
 │    ├── Group.vue           # View for /group/:slug
 │    └── OverlayCat.vue      # Modal content component
```

---

# Core Architecture Notes

## Axios

API payload format:

```js
response.data.data
```

Always use `response.data.data` as the actual payload.

Base URL is taken from:

```
VITE_API_URL
```

---

## Routing

Route:

```
/group/:slug
```

`Group.vue` must watch:

```js
watch(() => route.params.slug, ...)
```

to ensure reactive content update without full reload.

---

## Swiper Integration

Using component API:

```js
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Zoom, Autoplay } from 'swiper/modules'
```

### Requirements

- Import CSS:
    - `swiper/css`
    - `swiper/css/zoom`
    - or `swiper/swiper-bundle.css`
- Wrap image in:

```html
<div class="swiper-zoom-container">
```

- Capture instance:

```vue
@swiper="onSwiper"
```

- Use:

```js
swiper.zoom.in()
swiper.zoom.out()
```

Zoom should work on click.

---

## Modal (DialogModal)

Currently uses functional API:

```js
DialogModal(Component, options)
```

Limitations:
- Dynamic header update after open is problematic.

Recommended approaches:
- Switch to component-based modal (`DialogModalBox`)
- Or observe `calcStore.isOverlayReady` inside `OverlayCat.vue`
- Otherwise modal must be reopened to refresh header

---

# Environment & Production Setup

## Environment

`.env.local` → must be in `.gitignore`

```
VITE_API_URL=https://api.example.com
```

## Production Options

### Option 1 — Nginx Reverse Proxy
```
/api → https://api.ws-pro.ru
```

### Option 2 — Laravel CORS
Proper CORS configuration in backend.

---

# Git Policy

- `.env.local` — ignored
- Decide strategy for `package-lock.json`:
    - Keep in repo (recommended for deterministic builds)
    - Or reset locally if necessary

---

# Development Setup

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

---

# Task Checklist

## Swiper
- [ ] Proper CSS imports
- [ ] Zoom module connected
- [ ] `.swiper-zoom-container` implemented
- [ ] Swiper instance stored via `@swiper`
- [ ] Zoom in/out works on click

## Routing
- [ ] `watch(route.params.slug)` implemented
- [ ] Reactive store update on slug change
- [ ] No full reload required

## Store
- [ ] `fetchStructure()` uses `response.data.data`
- [ ] `fetchBlockItem()` uses `response.data.data`
- [ ] Loading flags properly handled:
    - [ ] `isStrReady`
    - [ ] `isItemReady`
    - [ ] `isOverlayReady`

## Modal
- [ ] Decide: functional vs component modal
- [ ] Dynamic header update implemented
- [ ] Overlay content reacts to store state

## Production
- [ ] VITE_API_URL configured
- [ ] Reverse proxy OR CORS configured
- [ ] Environment variables validated

## Git
- [ ] `.env.local` ignored
- [ ] Lockfile policy defined

---

If needed, this document can be extended into ARCHITECTURE.md for deeper technical documentation.

