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

    // Cargar spritesheet
    const sheet = new Image();
    sheet.src = 'https://i0.wp.com/github.com/elpsk/Unity3D-Nintentdo_Duck_Hunt/raw/master/Assets/Resources/duckhunt_various_sheet.png?ssl=1';

    // Definición de sprites por tipo (x, y en el sheet, 36x36)
    const TYPES = [
        { frames: [{x:0,y:115},{x:36,y:115},{x:72,y:115}], color: 'black'  },
        { frames: [{x:0,y:153},{x:36,y:153},{x:72,y:153}], color: 'red'    },
        { frames: [{x:108,y:115},{x:144,y:115},{x:180,y:115}], color: 'brown' }
    ];

    // Crear patos con posiciones y velocidades aleatorias
    const ducks = Array.from({ length: 8 }, () => {
        const type  = TYPES[Math.floor(Math.random() * TYPES.length)];
        const dir   = Math.random() > 0.5 ? 1 : -1;
        return {
            x:     dir === 1 ? -40 : W + 40,
            y:     30 + Math.random() * (H - 80),
            vx:    dir * (0.6 + Math.random() * 0.8),
            vy:    (Math.random() - 0.5) * 0.5,
            dir,
            frame: Math.floor(Math.random() * 3),
            timer: 0,
            type,
            delay: Math.random() * 120   // frames de espera antes de aparecer
        };
    });

    let frameCount = 0;
    let rafId;

    function draw() {
        if (!document.body.contains(canvas)) { cancelAnimationFrame(rafId); return; }
        ctx.clearRect(0, 0, W, H);
        frameCount++;

        ducks.forEach(d => {
            if (d.delay > 0) { d.delay--; return; }

            // Mover
            d.x += d.vx;
            d.y += d.vy;

            // Rebotar verticalmente
            if (d.y < 10 || d.y > H - 46) d.vy *= -1;

            // Reiniciar si sale por los lados
            if (d.x > W + 50 || d.x < -50) {
                d.dir = d.x < 0 ? 1 : -1;
                d.x   = d.dir === 1 ? -40 : W + 40;
                d.y   = 30 + Math.random() * (H - 80);
                d.vx  = d.dir * (0.6 + Math.random() * 0.8);
                d.delay = 40 + Math.random() * 80;
            }

            // Animar frames cada 8 ticks
            d.timer++;
            if (d.timer % 8 === 0) d.frame = (d.frame + 1) % 3;

            const sp = d.type.frames[d.frame];

            ctx.save();
            ctx.translate(d.x + 18, d.y + 18);
            if (d.dir === 1) ctx.scale(-1, 1);   // voltear si va a la derecha
            ctx.globalAlpha = 0.55;               // semi-transparente para no tapar el texto
            ctx.drawImage(sheet, sp.x, sp.y, 36, 36, -18, -18, 36, 36);
            ctx.restore();
        });

        rafId = requestAnimationFrame(draw);
    }

    sheet.onload = () => { rafId = requestAnimationFrame(draw); };
    // Si ya estaba cacheada
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
