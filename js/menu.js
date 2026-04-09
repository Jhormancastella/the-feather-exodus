// --- MENÚ PRINCIPAL, MODALES Y ARRANQUE ---

// ── Helper: crear modal con barra de título estilo NES ────────────
function _createModal(title) {
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
    modal.querySelector('.modal-close-x').onclick = () => modal.remove();
    // Cerrar con ESC
    const onKey = e => { if (e.key === 'Escape') { modal.remove(); window.removeEventListener('keydown', onKey); } };
    window.addEventListener('keydown', onKey);
    return modal;
}

// ── GALERÍA ───────────────────────────────────────────────────────
function showGallery() {
    const modal = _createModal(t('modalGallery'));
    const body  = modal.querySelector('.modal-body');
    const IMG   = 'https://www.clipartmax.com/png/middle/428-4287261_duck-hunt-nintendo-sprite-clipart-png-download-duck-hunt-nintendo-sprite.png';

    const items = [
        { id: 'level1', name: t('galleryLevel1'), desc: t('galleryDesc1') },
        { id: 'level3', name: t('galleryLevel3'), desc: t('galleryDesc3') },
        { id: 'level5', name: t('galleryLevel5'), desc: t('galleryDesc5') },
        { id: 'level7', name: t('galleryLevel7'), desc: t('galleryDesc7') }
    ];

    const grid = document.createElement('div');
    grid.className = 'gallery-grid';
    items.forEach(item => {
        const unlocked = state.unlockedImages[item.id];
        const div = document.createElement('div');
        div.className = `gallery-item ${unlocked ? 'unlocked' : ''}`;
        div.innerHTML = `
            <img src="${IMG}" alt="${item.name}">
            <p>${item.name}</p>
            <small>${unlocked ? t('galleryUnlocked') : t('galleryLocked')}</small>
        `;
        grid.appendChild(div);
    });
    body.appendChild(grid);
    document.body.appendChild(modal);
}

// ── OPCIONES ──────────────────────────────────────────────────────
function showOptions() {
    const modal = _createModal(t('modalOptions'));
    const body  = modal.querySelector('.modal-body');
    const s     = state.settings;

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
        btn.textContent = t('optSaved');
        btn.style.color = '#0f0';
        btn.style.borderColor = '#0f0';
        setTimeout(() => {
            modal.remove();
            if (newLang !== currentLang) setLang(newLang);
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
                <div class="c-title">${t('creditsTitle')}</div>
                <div class="c-sub">${t('creditsSub')}</div>
                <div class="c-section">${t('creditsDev')}</div>
                <div class="c-line">${t('creditsDevLine1')}</div>
                <div class="c-line">${t('creditsDevLine2')}</div>
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
                <div class="c-title c-end">${t('creditsThanks')}</div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    _startCreditsDucks(modal);
}

function _startCreditsDucks(modal) {
    const scene  = modal.querySelector('#credits-scene');
    const canvas = modal.querySelector('#credits-canvas');
    const W = scene.offsetWidth  || 520;
    const H = scene.offsetHeight || 360;
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    const sheet = new Image();
    sheet.src = 'https://i0.wp.com/github.com/elpsk/Unity3D-Nintentdo_Duck_Hunt/raw/master/Assets/Resources/duckhunt_various_sheet.png?ssl=1';

    // Sprites del sheet: vuelo, caída
    const TYPES = [
        { fly: [{x:0,y:115},{x:36,y:115},{x:72,y:115}], fall: [{x:0,y:189},{x:36,y:189}] },
        { fly: [{x:0,y:153},{x:36,y:153},{x:72,y:153}], fall: [{x:0,y:189},{x:36,y:189}] },
        { fly: [{x:108,y:115},{x:144,y:115},{x:180,y:115}], fall: [{x:0,y:189},{x:36,y:189}] }
    ];

    // Estados posibles
    const STATES = ['flying', 'hit', 'falling'];

    function _makeDuck() {
        const type  = TYPES[Math.floor(Math.random() * TYPES.length)];
        const state = STATES[Math.floor(Math.random() * STATES.length)];
        const dir   = Math.random() > 0.5 ? 1 : -1;

        // Patos cayendo empiezan desde arriba en X aleatorio
        if (state === 'falling') {
            return {
                type, state,
                x: 20 + Math.random() * (W - 40),
                y: -40,
                vx: (Math.random() - 0.5) * 1.2,
                vy: 1.2 + Math.random() * 1.5,
                dir: Math.random() > 0.5 ? 1 : -1,
                frame: 0, timer: 0,
                hitTimer: 0,
                delay: Math.random() * 100,
                alpha: 1
            };
        }
        // Patos volando entran por los lados
        return {
            type, state,
            x:   dir === 1 ? -40 : W + 40,
            y:   20 + Math.random() * (H - 60),
            vx:  dir * (0.5 + Math.random() * 0.9),
            vy:  (Math.random() - 0.5) * 0.6,
            dir,
            frame: 0, timer: 0,
            hitTimer: state === 'hit' ? 18 : 0,  // hit: parpadea N frames luego cae
            delay: Math.random() * 120,
            alpha: 1
        };
    }

    const ducks = Array.from({ length: 10 }, _makeDuck);
    let rafId;

    function draw() {
        if (!document.body.contains(canvas)) { cancelAnimationFrame(rafId); return; }
        ctx.clearRect(0, 0, W, H);

        ducks.forEach((d, i) => {
            if (d.delay > 0) { d.delay--; return; }

            d.timer++;

            // ── Lógica por estado ──────────────────────────────
            if (d.state === 'flying') {
                d.x += d.vx;
                d.y += d.vy;
                if (d.y < 10 || d.y > H - 50) d.vy *= -1;
                if (d.x > W + 50 || d.x < -50) ducks[i] = _makeDuck();

                // Animar frames de vuelo cada 8 ticks
                if (d.timer % 8 === 0) d.frame = (d.frame + 1) % 3;

            } else if (d.state === 'hit') {
                // Parpadea en su posición, luego pasa a falling
                d.x += d.vx * 0.3;
                d.alpha = d.timer % 4 < 2 ? 0.3 : 1;
                d.hitTimer--;
                if (d.hitTimer <= 0) {
                    d.state  = 'falling';
                    d.vy     = 1.5;
                    d.vx     = (Math.random() - 0.5) * 1.5;
                    d.alpha  = 1;
                    d.frame  = 0;
                    d.timer  = 0;
                }

            } else if (d.state === 'falling') {
                d.x  += d.vx;
                d.y  += d.vy;
                d.vy += 0.08;  // gravedad
                // Rotar visualmente al caer (con transform en canvas)
                if (d.timer % 6 === 0) d.frame = (d.frame + 1) % 2;
                if (d.y > H + 50) ducks[i] = _makeDuck();
            }

            // ── Elegir sprite ──────────────────────────────────
            let sp;
            if (d.state === 'falling' || d.state === 'hit') {
                sp = d.type.fall[d.frame % 2];
            } else {
                sp = d.type.fly[d.frame];
            }

            // ── Dibujar ────────────────────────────────────────
            ctx.save();
            ctx.globalAlpha = d.alpha * 0.7;
            ctx.translate(d.x + 18, d.y + 18);

            if (d.state === 'falling') {
                // Rotar el pato al caer
                const rot = Math.min(Math.PI, (d.vy / 6) * Math.PI);
                ctx.rotate(d.dir === 1 ? rot : -rot);
            }

            if (d.dir === 1 && d.state !== 'falling') ctx.scale(-1, 1);

            ctx.drawImage(sheet, sp.x, sp.y, 36, 36, -18, -18, 36, 36);
            ctx.restore();
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

    const modal = _createModal(t('modalPause'));
    modal.querySelector('.modal-close-x').onclick = () => { modal.remove(); resumeGame(); };
    const body = modal.querySelector('.modal-body');
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
            <div class="pause-opt" id="p-resume"><span class="p-arrow">►</span>${t('pauseResume')}</div>
            <div class="pause-opt" id="p-options"><span class="p-arrow">►</span>${t('pauseOptions')}</div>
            <div class="pause-opt" id="p-menu"><span class="p-arrow">►</span>${t('pauseMainMenu')}</div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#p-resume').onclick = () => { modal.remove(); resumeGame(); };
    modal.querySelector('#p-options').onclick = () => showOptions();
    modal.querySelector('#p-menu').onclick = () => {
        modal.remove();
        stopLoop();
        state.game.ducks.forEach(d => d.el && d.el.remove());
        state.game.active = false;
        DOM.gameContainer.style.display = 'none';
        DOM.mainMenu.style.display      = 'flex';
        DOM.menuTopscore.textContent    = `TOP SCORE = ${getTopScore()}`;
    };
}

function resumeGame() {
    state.game.active = true;
    lastTimestamp = 0;
    state.animationId = requestAnimationFrame(gameLoop);
}

// ── Selector NES con teclado ──────────────────────────────────────
function initMenuSelector() {
    const allOptions = Array.from(document.querySelectorAll('#nes-menu .nes-option'));
    const options    = allOptions.filter(o => o.style.pointerEvents !== 'none');
    let selIdx = 0;

    function updateSel() {
        allOptions.forEach(o => o.classList.remove('selected'));
        options[selIdx].classList.add('selected');
    }
    updateSel();

    window.addEventListener('keydown', e => {
        if (DOM.mainMenu.style.display === 'none') return;
        if (e.key === 'ArrowDown') { selIdx = (selIdx + 1) % options.length; updateSel(); e.preventDefault(); }
        if (e.key === 'ArrowUp')   { selIdx = (selIdx - 1 + options.length) % options.length; updateSel(); e.preventDefault(); }
        if (e.key === 'Enter')     { options[selIdx].click(); }
    });
}

// ── Inicialización ────────────────────────────────────────────────
function initMenu() {
    loadGameProgress();
    // Aplicar idioma guardado
    currentLang = state.settings.language || 'es';
    document.body.style.imageRendering =
        state.settings.graphicsQuality === 'pixelated' ? 'pixelated' : 'auto';

    DOM.menuTopscore.textContent = `TOP SCORE = ${getTopScore()}`;

    if (!hasSaveData()) {
        const btnCont = document.getElementById('btn-continue');
        btnCont.style.opacity       = '0.35';
        btnCont.style.pointerEvents = 'none';
    }

    document.getElementById('btn-continue').onclick = () => continueGame();
    document.getElementById('btn-newgame').onclick  = () => newGame();
    document.getElementById('btn-gallery').onclick  = () => showGallery();
    document.getElementById('btn-options').onclick  = () => showOptions();
    document.getElementById('btn-credits').onclick  = () => showCredits();
    document.getElementById('btn-exit').onclick     = () => window.close();

    window.addEventListener('keydown', e => {
        if ((e.key === 'Escape' || e.key === 'p') && state.game.active) showPause();
    });

    // Aplicar idioma al DOM inicial
    _applyLangToDOM();
    initMenuSelector();
    initControls();
}

document.addEventListener('DOMContentLoaded', () => {
    cacheDOMRefs();
    initMenu();
});
