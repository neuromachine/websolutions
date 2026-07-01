# Skill — Tailwind Theme Rules

## Purpose

Tailwind is the theme/token layer, not a replacement for component architecture.

## Rules

- Treat `tailwind.config.js` / theme tokens as the visual SSOT.
- Avoid raw hex in Vue templates.
- Avoid repeated raw hex/shadow/spacing in scoped CSS.
- Use semantic utilities where available.
- Bootstrap may remain as transitional layout compatibility.
- Do not build new UI primitives on Bootstrap `.card`, `.card-header`, `.card-body` internals.

## Migration direction

From:

```css
box-shadow: 5px 7px 15px 2px rgba(82, 90, 101, 0.12);
color: #404040;
```

Toward semantic tokens/utilities:

```text
shadow-card
text-content
bg-surface
rounded-card
```

## Practical rule

If a style is repeated across components, move it toward tokens. If it is unique behavior, scoped CSS is acceptable.
