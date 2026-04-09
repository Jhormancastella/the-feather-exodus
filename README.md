# The Feather Exodus

> A Duck Hunt inspired browser game — HTML · CSS · JavaScript

![GitHub repo size](https://img.shields.io/github/repo-size/Jhormancastella/the-feather-exodus)
![GitHub last commit](https://img.shields.io/github/last-commit/Jhormancastella/the-feather-exodus)

## 🎮 Play

Open `index.html` in any browser or serve with Live Server.

## 🕹️ Controls

| Action | Keyboard | Mobile |
|--------|----------|--------|
| Move duck | `WASD` / Arrow keys | Joystick |
| Boost | `Space` | BOOST button |
| Switch duck | `Tab` | SWITCH button |
| Pause | `Esc` / `P` | PAUSE button |

## 📁 Structure

```
index.html
css/
  global.css       — reset, layout
  background.css   — sky, clouds, mountains
  menu.css         — NES-style main menu
  hud.css          — HUD, mobile controls, screens
  game.css         — duck sprites, effects
  modal.css        — gallery, options, credits, pause
js/
  config.js        — level config, sprite coords
  state.js         — global game state
  i18n.js          — ES / EN translations
  storage.js       — localStorage save/load
  hud.js           — HUD updates, DOM refs
  ducks.js         — spawn, physics, animation
  hunter.js        — hunter AI, shot effects
  loop.js          — game loop, intervals
  controls.js      — keyboard + touch joystick
  game.js          — newGame, loadLevel, transitions
  menu.js          — modals, pause, menu init
img/
  sprP*.png        — duck spritesheets
```

## 🌐 Languages

Supports **Spanish** and **English** — switchable from Options menu.

## ✨ Features

- NES-style main menu with keyboard navigation
- Animated sky background (clouds, sun, mountains)
- Hunter AI with crosshair and reload system
- Gallery with unlockable content
- Credits screen with flying ducks animation
- Pause menu with live stats
- Save/load progress via localStorage
- Mobile support with virtual joystick

## 📝 Credits

- Inspiration: Duck Hunt — Nintendo 1984
- Sprites: Nintendo / Public domain
- Developer: Indie Dev
- Tester: Rosy
