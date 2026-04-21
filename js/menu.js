// --- MENÚ PRINCIPAL, MODALES Y ARRANQUE ---

// ── Helper: crear modal con barra de título estilo NES ────────────
// onClose: callback opcional que se ejecuta al cerrar (X o ESC)
function _createModal(title, onClose = null) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-titlebar">
                <span>${title}</span>
                <button class="modal-close-x" aria-label="Cerrar">X</button>
            </div>
            <div class="modal-body"></div>
        </div>
    `;

    const doClose = () => {
        modal.remove();
        window.removeEventListener('keydown', onKey);
        if (onClose) onClose();
    };

    modal.querySelector('.modal-close-x').onclick = doClose;

    const onKey = e => {
        if (e.key === 'Escape' && document.body.contains(modal)) doClose();
    };
    window.addEventListener('keydown', onKey);

    // Limpiar listener si el modal se elimina por otra vía
    new MutationObserver((_, obs) => {
        if (!document.body.contains(modal)) {
            window.removeEventListener('keydown', onKey);
            obs.disconnect();
        }
    }).observe(document.body, { childList: true, subtree: false });

    return modal;
}

// ── GALERÍA ───────────────────────────────────────────────────────
function showGallery() {
    const modal = _createModal(t('modalGallery'));
    const body  = modal.querySelector('.modal-body');

    const items = [
        {
            id: 'level1',
            name: t('galleryLevel1'),
            desc: t('galleryDesc1'),
            img: 'https://res.cloudinary.com/dcqnjn6fe/image/upload/q_auto/f_auto/v1775746503/f2_rqusvm.png'
        },
        {
            id: 'level3',
            name: t('galleryLevel3'),
            desc: t('galleryDesc3'),
            img: 'https://res.cloudinary.com/dcqnjn6fe/image/upload/q_auto/f_auto/v1775746503/%C3%B1_xkmfgg.png'
        },
        {
            id: 'level5',
            name: t('galleryLevel5'),
            desc: t('galleryDesc5'),
            img: 'https://res.cloudinary.com/dcqnjn6fe/image/upload/q_auto/f_auto/v1775746503/1775745751_xrpe26.png'
        },
        {
            id: 'level7',
            name: t('galleryLevel7'),
            desc: t('galleryDesc7'),
            img: 'https://res.cloudinary.com/dcqnjn6fe/image/upload/q_auto/f_auto/v1775746503/1775745877_wf7810.png'
        },
        {
            id: 'level9',
            name: t('galleryLevel9'),
            desc: t('galleryDesc9'),
            img: 'https://res.cloudinary.com/dcqnjn6fe/image/upload/q_auto/f_auto/v1775746503/output_8mbudp_cxsljf.png'
        }
    ];

    const grid = document.createElement('div');
    grid.className = 'gallery-grid';
    items.forEach(item => {
        const unlocked = state.unlockedImages[item.id];
        const div = document.createElement('div');
        div.className = `gallery-item ${unlocked ? 'unlocked' : ''}`;
        div.innerHTML = `
            <img src="${unlocked ? item.img : ''}" alt="${item.name}"
                 style="${unlocked ? '' : 'background:#111;'}">
            <p>${item.name}</p>
            <small>${unlocked ? t('galleryUnlocked') : t('galleryLocked')}</small>
        `;
        grid.appendChild(div);
    });
    body.appendChild(grid);
    document.body.appendChild(modal);
}

// ── OPCIONES ──────────────────────────────────────────────────────
// fromPause: si es true, al cerrar/guardar vuelve a la pausa
function showOptions(fromPause = false) {
    const onClose = fromPause ? () => _showPauseMenu() : null;
    const modal   = _createModal(t('modalOptions'), onClose);
    const body    = modal.querySelector('.modal-body');
    const s       = state.settings;

    body.innerHTML = `
        <div class="option-row">
            <span>${t('optSound')}</span>
            <label class="pixel-toggle">
                <input type="checkbox" id="opt-sound" ${s.soundEnabled ? 'checked' : ''}>
                <div class="pixel-toggle-track"><div class="pixel-toggle-thumb"></div></div>
            </label>
        </div>
        <div class="option-row">
            <span>${t('optGraphics')}</span>
            <select id="opt-graphics" class="pixel-select">
                <option value="pixelated" ${s.graphicsQuality === 'pixelated' ? 'selected' : ''}>${t('optPixelated')}</option>
                <option value="smooth"    ${s.graphicsQuality === 'smooth'    ? 'selected' : ''}>${t('optSmooth')}</option>
            </select>
        </div>
        <div class="option-row">
            <span>${t('optDifficulty')}</span>
            <select id="opt-diff" class="pixel-select">
                <option value="normal">${t('optNormal')}</option>
                <option value="hard">${t('optHard')}</option>
            </select>
        </div>
        <div class="option-row">
            <span>${t('optLanguage')}</span>
            <select id="opt-lang" class="pixel-select">
                <option value="es" ${s.language === 'es' ? 'selected' : ''}>ESPAÑOL</option>
                <option value="en" ${s.language === 'en' ? 'selected' : ''}>ENGLISH</option>
            </select>
        </div>
        <button class="option-save-btn" id="opt-save">${t('optSave')}</button>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#opt-save').onclick = () => {
        s.soundEnabled    = modal.querySelector('#opt-sound').checked;
        s.graphicsQuality = modal.querySelector('#opt-graphics').value;
        const newLang     = modal.querySelector('#opt-lang').value;
        document.body.style.imageRendering = s.graphicsQuality === 'pixelated' ? 'pixelated' : 'auto';
        saveGameProgress();
        const btn = modal.querySelector('#opt-save');
        btn.textContent   = t('optSaved');
        btn.style.color   = '#0f0';
        btn.style.borderColor = '#0f0';
        setTimeout(() => {
            modal.remove();
            if (newLang !== currentLang) setLang(newLang);
            if (fromPause) _showPauseMenu();
        }, 500);
    };
}

// ── CRÉDITOS — patos volando detrás del texto ────────────────────
function showCredits() {
    const modal = _createModal(t('modalCredits'));
    const body  = modal.querySelector('.modal-body');
    body.style.padding = '0';

    body.innerHTML = `
        <div class="credits-scene" id="credits-scene">
            <canvas id="credits-canvas"></canvas>
            <div class="credits-text-overlay">

                <!-- Título bilingüe animado -->
                <div class="c-title-wrap">
                    <div class="c-title c-title-anim" id="credits-main-title">${t('creditsTitle1')}</div>
                    <div class="c-title-divider"></div>
                    <div class="c-sub">${t('creditsSub')}</div>
                </div>

                <div class="c-section">${t('creditsDev')}</div>
                <div class="c-line">${t('creditsDevLine1')}</div>
                <div class="c-line c-highlight">${t('creditsDevLine2')}</div>

                <div class="c-section">${t('creditsArt')}</div>
                <div class="c-line">${t('creditsArtLine1')}</div>
                <div class="c-line">${t('creditsArtLine2')}</div>
                <div class="c-line">${t('creditsArtLine3')}</div>

                <div class="c-section">${t('creditsTest')}</div>
                <div class="c-special">${t('creditsTestSpc')}</div>
                <div class="c-line">${t('creditsTestLine')}</div>

                <div class="c-section">${t('creditsInsp')}</div>
                <div class="c-line">${t('creditsInspLine1')}</div>
                <div class="c-line">${t('creditsInspLine2')}</div>

                <div class="c-section">${t('creditsTech')}</div>
                <div class="c-line">${t('creditsTechLine1')}</div>
                <div class="c-line">${t('creditsTechLine2')}</div>

                <div class="c-section">${t('creditsRepo')}</div>
                <div class="c-repo">
                    <span class="c-repo-icon">⌥</span>
                    <a class="c-repo-link" href="https://github.com/Jhormancastella/the-feather-exodus" target="_blank" rel="noopener">
                        ${t('creditsRepoLine1')} / ${t('creditsRepoLine2')}
                    </a>
                </div>

                <div class="c-version">${t('creditsVersion')}</div>
                <div class="c-title c-end">${t('creditsThanks')}</div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    _startCreditsDucks(modal);
    _startCreditsTitleAnim(modal);
}

// Alterna el título entre ES e EN cada 2.5s
function _startCreditsTitleAnim(modal) {
    const el     = modal.querySelector('#credits-main-title');
    if (!el) return;
    const titles = [t('creditsTitle1'), t('creditsTitle2')];
    // Si ambos son iguales (EN) no animar
    if (titles[0] === titles[1]) return;
    let idx = 0;
    const iv = setInterval(() => {
        if (!document.body.contains(el)) { clearInterval(iv); return; }
        el.classList.add('c-title-fade');
        setTimeout(() => {
            idx = (idx + 1) % titles.length;
            el.textContent = titles[idx];
            el.classList.remove('c-title-fade');
        }, 300);
    }, 2500);
}

function _startCreditsDucks(modal) {
    const scene  = modal.querySelector('#credits-scene');
    const canvas = modal.querySelector('#credits-canvas');
    const W = scene.offsetWidth  || 520;
    const H = scene.offsetHeight || 360;
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // Usar el mismo sheet y coordenadas que el juego
    const sheet = new Image();
    sheet.crossOrigin = 'anonymous';
    sheet.src = 'https://i0.wp.com/github.com/elpsk/Unity3D-Nintentdo_Duck_Hunt/raw/master/Assets/Resources/duckhunt_various_sheet.png?ssl=1';

    // Tipos de pato usando las coordenadas exactas del config.js
    const DUCK_TYPES = Object.keys(SPRITES); // ['black','red','brown']
    const STATES = ['flying', 'hit', 'falling'];

    function _makeDuck() {
        const typeName = DUCK_TYPES[Math.floor(Math.random() * DUCK_TYPES.length)];
        const spr      = SPRITES[typeName];
        const dstate   = STATES[Math.floor(Math.random() * STATES.length)];
        const dir      = Math.random() > 0.5 ? 1 : -1;

        if (dstate === 'falling') {
            return {
                typeName, spr, state: dstate,
                x: 20 + Math.random() * (W - 40), y: -40,
                vx: (Math.random() - 0.5) * 1.2,
                vy: 1.2 + Math.random() * 1.5,
                dir: Math.random() > 0.5 ? 1 : -1,
                frame: 0, timer: 0, hitTimer: 0,
                delay: Math.random() * 100, alpha: 1
            };
        }
        return {
            typeName, spr, state: dstate,
            x:   dir === 1 ? -40 : W + 40,
            y:   20 + Math.random() * (H - 60),
            vx:  dir * (0.5 + Math.random() * 0.9),
            vy:  (Math.random() - 0.5) * 0.6,
            dir, frame: 0, timer: 0,
            hitTimer: dstate === 'hit' ? 18 : 0,
            delay: Math.random() * 120, alpha: 1
        };
    }

    const ducks = Array.from({ length: 10 }, _makeDuck);
    let rafId;

    function _drawDuck(d) {
        // Elegir coordenada del sprite según estado
        let coord;
        if (d.state === 'falling' || d.state === 'hit') {
            coord = d.spr.falling[d.frame % d.spr.falling.length];
        } else {
            coord = d.spr.fly[d.frame % d.spr.fly.length];
        }

        // sprCoord devuelve {bx, by} — convertir a coordenadas del sheet
        // bx = -sx + offset  →  sx = -bx + offset = -(bx - (SW-sw)/2)
        // Más simple: recalcular desde config directamente
        // Usamos las coords raw del análisis de píxeles
        const RAW_FLY = {
            black: [{x:0,y:119,w:34,h:28},{x:40,y:119,w:34,h:28},{x:81,y:119,w:32,h:28}],
            red:   [{x:130,y:119,w:34,h:28},{x:170,y:119,w:34,h:28},{x:211,y:119,w:32,h:28}],
            brown: [{x:260,y:119,w:34,h:28},{x:300,y:119,w:34,h:28},{x:341,y:119,w:32,h:28}]
        };
        const RAW_FALL = {
            black: [{x:1,y:237,w:31,h:30},{x:48,y:237,w:18,h:30}],
            red:   [{x:1,y:237,w:31,h:30},{x:48,y:237,w:18,h:30}],
            brown: [{x:1,y:237,w:31,h:30},{x:48,y:237,w:18,h:30}]
        };

        let raw;
        if (d.state === 'falling' || d.state === 'hit') {
            raw = RAW_FALL[d.typeName][d.frame % 2];
        } else {
            raw = RAW_FLY[d.typeName][d.frame % 3];
        }

        ctx.save();
        ctx.globalAlpha = d.alpha * 0.75;
        ctx.translate(d.x + raw.w / 2, d.y + raw.h / 2);

        if (d.state === 'falling') {
            const rot = Math.min(Math.PI, (d.vy / 6) * Math.PI);
            ctx.rotate(d.dir === 1 ? rot : -rot);
        }
        if (d.dir === -1 && d.state !== 'falling') ctx.scale(-1, 1);

        // Dibujar a 2x
        ctx.drawImage(sheet, raw.x, raw.y, raw.w, raw.h,
                      -raw.w, -raw.h, raw.w * 2, raw.h * 2);
        ctx.restore();
    }

    function draw() {
        if (!document.body.contains(canvas)) { cancelAnimationFrame(rafId); return; }
        ctx.clearRect(0, 0, W, H);

        ducks.forEach((d, i) => {
            if (d.delay > 0) { d.delay--; return; }
            d.timer++;

            if (d.state === 'flying') {
                d.x += d.vx;
                d.y += d.vy;
                if (d.y < 10 || d.y > H - 58) d.vy *= -1;
                if (d.x > W + 60 || d.x < -60) ducks[i] = _makeDuck();
                if (d.timer % 8 === 0) d.frame = (d.frame + 1) % 3;

            } else if (d.state === 'hit') {
                d.x += d.vx * 0.3;
                d.alpha = d.timer % 4 < 2 ? 0.3 : 1;
                d.hitTimer--;
                if (d.hitTimer <= 0) {
                    d.state = 'falling'; d.vy = 1.5;
                    d.vx = (Math.random() - 0.5) * 1.5;
                    d.alpha = 1; d.frame = 0; d.timer = 0;
                }

            } else if (d.state === 'falling') {
                d.x  += d.vx;
                d.y  += d.vy;
                d.vy += 0.08;
                if (d.timer % 6 === 0) d.frame = (d.frame + 1) % 2;
                if (d.y > H + 50) ducks[i] = _makeDuck();
            }

            _drawDuck(d);
        });

        rafId = requestAnimationFrame(draw);
    }

    sheet.onload = () => { rafId = requestAnimationFrame(draw); };
    if (sheet.complete) rafId = requestAnimationFrame(draw);
}

// ── PAUSA ─────────────────────────────────────────────────────────
function showPause() {
    if (!state.game.active) return;
    state.game.active = false;
    cancelAnimationFrame(state.animationId);
    state.animationId = null;
    stopSpriteInterval();
    stopScoreInterval();
    _showPauseMenu();
}

// Construye el modal de pausa sin tocar el estado del juego
function _showPauseMenu() {
    // onClose del modal (X o ESC) → reanudar
    const modal = _createModal(t('modalPause'), () => resumeGame());
    const body  = modal.querySelector('.modal-body');
    body.style.padding = '0';

    body.innerHTML = `
        <div class="pause-stat">
            <div class="pause-stat-item">
                <div class="ps-label">${t('pauseLevel')}</div>
                <div class="ps-val">${state.game.level + 1}</div>
            </div>
            <div class="pause-stat-item">
                <div class="ps-label">${t('pauseScore')}</div>
                <div class="ps-val">${state.game.score}</div>
            </div>
            <div class="pause-stat-item">
                <div class="ps-label">${t('pauseDucks')}</div>
                <div class="ps-val">${state.game.ducks.filter(d => d.alive).length}</div>
            </div>
        </div>
        <div class="pause-menu">
            <div class="pause-opt" id="p-resume"  tabindex="0"><span class="p-arrow">►</span>${t('pauseResume')}</div>
            <div class="pause-opt" id="p-options" tabindex="0"><span class="p-arrow">►</span>${t('pauseOptions')}</div>
            <div class="pause-opt" id="p-menu"    tabindex="0"><span class="p-arrow">►</span>${t('pauseMainMenu')}</div>
        </div>
    `;

    document.body.appendChild(modal);

    const resume  = modal.querySelector('#p-resume');
    const options = modal.querySelector('#p-options');
    const toMenu  = modal.querySelector('#p-menu');

    resume.onclick  = () => { modal.remove(); resumeGame(); };
    options.onclick = () => { modal.remove(); showOptions(true); };
    toMenu.onclick  = () => {
        modal.remove();
        stopLoop();
        stopPowerupSystem();
        state.game.ducks.forEach(d => d.el && d.el.remove());
        state.game.active = false;
        DOM.gameContainer.style.display = 'none';
        DOM.mainMenu.style.display      = 'flex';
        DOM.menuTopscore.textContent    = `TOP SCORE = ${getTopScore()}`;
        playMenuMusic();
    };

    // Navegación con teclado ↑↓ Enter P/ESC
    const pauseOpts = [resume, options, toMenu];
    let pauseIdx = 0;
    pauseOpts[0].classList.add('selected');

    const onPauseKey = e => {
        if (!document.body.contains(modal)) {
            window.removeEventListener('keydown', onPauseKey);
            return;
        }
        if (e.key === 'ArrowDown') {
            pauseOpts[pauseIdx].classList.remove('selected');
            pauseIdx = (pauseIdx + 1) % pauseOpts.length;
            pauseOpts[pauseIdx].classList.add('selected');
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            pauseOpts[pauseIdx].classList.remove('selected');
            pauseIdx = (pauseIdx - 1 + pauseOpts.length) % pauseOpts.length;
            pauseOpts[pauseIdx].classList.add('selected');
            e.preventDefault();
        } else if (e.key === 'Enter') {
            pauseOpts[pauseIdx].click();
        } else if (e.key.toLowerCase() === 'p') {
            // P de nuevo reanuda
            modal.remove();
            resumeGame();
            window.removeEventListener('keydown', onPauseKey);
        }
    };
    window.addEventListener('keydown', onPauseKey);
}

function resumeGame() {
    state.game.active = true;
    lastTimestamp = 0;
    state.animationId = requestAnimationFrame(gameLoop);
    startSpriteInterval();
    startScoreInterval();
}

// ── Selector NES con teclado ──────────────────────────────────────
function initMenuSelector() {
    // Navegación del menú principal
    _initSelectorFor('#nes-menu');
}

/** Activa navegación ↑↓ Enter en un selector NES dado */
function _initSelectorFor(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const opts = Array.from(container.querySelectorAll('.nes-option'))
        .filter(o => o.style.pointerEvents !== 'none');
    if (!opts.length) return;

    let idx = 0;
    opts.forEach(o => o.classList.remove('selected'));
    opts[0].classList.add('selected');

    const onKey = e => {
        // Solo actuar si este contenedor está visible
        if (container.style.display === 'none') return;
        if (DOM.mainMenu.style.display === 'none') return;
        if (e.key === 'ArrowDown') {
            opts[idx].classList.remove('selected');
            idx = (idx + 1) % opts.length;
            opts[idx].classList.add('selected');
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            opts[idx].classList.remove('selected');
            idx = (idx - 1 + opts.length) % opts.length;
            opts[idx].classList.add('selected');
            e.preventDefault();
        } else if (e.key === 'Enter') {
            opts[idx].click();
        } else if (e.key === 'Escape' || e.key === 'Backspace') {
            // ESC en submenú vuelve al menú principal
            if (containerSelector === '#nes-submenu-start') _showMainMenu();
        }
    };
    window.addEventListener('keydown', onKey);
}

/** Muestra el menú principal y oculta el submenú */
function _showMainMenu() {
    document.getElementById('nes-menu').style.display          = '';
    document.getElementById('nes-submenu-start').style.display = 'none';
}

/** Muestra el submenú INICIAR y oculta el menú principal */
function _showStartSubmenu() {
    document.getElementById('nes-menu').style.display          = 'none';
    document.getElementById('nes-submenu-start').style.display = '';
    // Resetear selección al primer ítem visible del submenú
    const opts = Array.from(document.querySelectorAll('#nes-submenu-start .nes-option'))
        .filter(o => o.style.pointerEvents !== 'none');
    opts.forEach(o => o.classList.remove('selected'));
    if (opts[0]) opts[0].classList.add('selected');
}

// ── Inicialización ────────────────────────────────────────────────
function initMenu() {
    loadGameProgress();
    currentLang = state.settings.language || 'es';
    state.settings.language = currentLang;
    document.body.style.imageRendering =
        state.settings.graphicsQuality === 'pixelated' ? 'pixelated' : 'auto';

    DOM.menuTopscore.textContent = `TOP SCORE = ${getTopScore()}`;

    // Deshabilitar CONTINUAR si no hay guardado
    if (!hasSaveData()) {
        const btnCont = document.getElementById('btn-continue');
        btnCont.style.opacity       = '0.35';
        btnCont.style.pointerEvents = 'none';
    }

    // Menú principal
    document.getElementById('btn-start').onclick   = () => _showStartSubmenu();
    document.getElementById('btn-gallery').onclick = () => showGallery();
    document.getElementById('btn-options').onclick = () => showOptions();
    document.getElementById('btn-credits').onclick = () => showCredits();
    document.getElementById('btn-exit').onclick    = () => {
        const ok = window.confirm('¿Salir del juego?');
        if (ok) { window.close(); history.back(); }
    };

    // Submenú INICIAR
    document.getElementById('btn-continue').onclick = () => continueGame();
    document.getElementById('btn-newgame').onclick  = () => showStoryScreen(() => newGame());
    document.getElementById('btn-back').onclick     = () => _showMainMenu();

    window.addEventListener('keydown', e => {
        if ((e.key === 'Escape' || e.key.toLowerCase() === 'p')
            && state.game.active
            && !document.querySelector('.modal')) {
            showPause();
        }
    });

    _applyLangToDOM();
    initMenuSelector();
    _initSelectorFor('#nes-submenu-start');
    initControls();
    document.addEventListener('click',   () => playMenuMusic(), { once: true });
    document.addEventListener('keydown', () => playMenuMusic(), { once: true });
}

/** Maneja el video de introducción */
function handleIntroVideo() {
    const introContainer = document.getElementById('intro-video-container');
    const introVideo = document.getElementById('intro-video');
    const skipBtn = document.getElementById('intro-skip');

    if (!introContainer || !introVideo) return;

    let finished = false;
    const finishIntro = () => {
        if (finished) return;
        finished = true;
        introVideo.pause();
        introContainer.style.transition = 'opacity 0.5s ease';
        introContainer.style.opacity = '0';
        setTimeout(() => {
            if (introContainer.parentNode) {
                introContainer.remove();
            }
            // Iniciar música del menú si no ha empezado
            playMenuMusic();
        }, 500);
    };

    // Timeout de seguridad: si en 6 segundos no ha pasado nada, saltar
    const safetyTimeout = setTimeout(() => {
        console.warn("Intro video timed out");
        finishIntro();
    }, 6000);

    // Al terminar el video
    introVideo.onended = () => {
        clearTimeout(safetyTimeout);
        finishIntro();
    };

    // Error de carga
    introVideo.onerror = () => {
        console.error("Error loading intro video");
        clearTimeout(safetyTimeout);
        finishIntro();
    };

    // Al hacer clic en el contenedor (saltar)
    introContainer.onclick = () => {
        clearTimeout(safetyTimeout);
        finishIntro();
    };

    // Intentar reproducir (aunque ya tenga autoplay en HTML)
    const playPromise = introVideo.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Video empezó a reproducirse, el timeout ya no es tan crítico pero lo dejamos corto
        }).catch(err => {
            console.warn("Autoplay blocked or failed:", err);
            skipBtn.textContent = 'Toca para empezar';
        });
    }

    // Manejar audio en móviles
    const enableAudio = () => {
        if (introVideo.muted) {
            introVideo.muted = false;
        }
        document.removeEventListener('touchstart', enableAudio);
        document.removeEventListener('mousedown', enableAudio);
    };
    document.addEventListener('touchstart', enableAudio);
    document.addEventListener('mousedown', enableAudio);
}

document.addEventListener('DOMContentLoaded', () => {
    cacheDOMRefs();
    initMenu();
    handleIntroVideo();
});
