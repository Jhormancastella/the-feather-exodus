// --- CICLOS DE CIELO ---

const SKY_CYCLES = ['sky-dawn', 'sky-noon', 'sky-sunset', 'sky-storm'];

// Asigna el ciclo de cielo según el nivel
function applySky(levelIndex) {
    const idx  = Math.min(Math.floor(levelIndex / 2), SKY_CYCLES.length - 1);
    const sky  = SKY_CYCLES[idx];
    const el   = DOM.gameContainer;

    el.classList.remove(...SKY_CYCLES);
    el.classList.add(sky);

    // Tormenta: activar lluvia y relámpagos
    _stopStorm();
    if (sky === 'sky-storm') _startStorm();
}

// ── Lluvia ────────────────────────────────────────────────────────
let _stormInterval = null;
let _rainDrops     = [];

function _startStorm() {
    const rain = DOM.gameContainer.querySelector('.bg-rain');
    if (!rain) return;

    // Crear gotas de lluvia
    for (let i = 0; i < 60; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        const h = 10 + Math.random() * 20;
        drop.style.cssText = `
            left: ${Math.random() * 100}%;
            height: ${h}px;
            animation-duration: ${0.4 + Math.random() * 0.4}s;
            animation-delay: ${-Math.random() * 1}s;
        `;
        rain.appendChild(drop);
        _rainDrops.push(drop);
    }

    // Relámpagos aleatorios con intervalo recurrente variable
    function _scheduleFlash() {
        _stormInterval = setTimeout(() => {
            if (!state.game.active) return;
            const lightning = DOM.gameContainer.querySelector('.bg-lightning');
            if (lightning) {
                lightning.classList.remove('flash');
                void lightning.offsetWidth;
                lightning.classList.add('flash');
            }
            _scheduleFlash();
        }, 3000 + Math.random() * 4000);
    }
    _scheduleFlash();
}

function _stopStorm() {
    if (_stormInterval) { clearTimeout(_stormInterval); _stormInterval = null; }
    _rainDrops.forEach(d => d.remove());
    _rainDrops = [];
}
