// --- CICLOS DE CIELO ---

const SKY_CYCLES = ['sky-dawn', 'sky-noon', 'sky-sunset', 'sky-storm'];

// Generar árboles y rocas con posiciones aleatorias (una sola vez al cargar)
function _decorateBackground() {
    const treesContainer = document.querySelector('.bg-trees');
    const rocksContainer = document.querySelector('.bg-rocks');
    
    if (treesContainer) {
        // Variar tamaño y posición de los árboles
        Array.from(treesContainer.querySelectorAll('.tree')).forEach((tree, i) => {
            const scale = 0.8 + Math.random() * 0.4;
            tree.style.transform = `scale(${scale})`;
            tree.style.animationDelay = `${-Math.random() * 6}s`;
            // Color ligeramente variado
            tree.style.color = `hsl(${90 + Math.random() * 20}, 40%, ${35 + Math.random() * 15}%)`;
        });
    }
    
    if (rocksContainer) {
        // Variar tamaño y posición de las rocas
        Array.from(rocksContainer.querySelectorAll('.rock')).forEach((rock, i) => {
            const size = 0.7 + Math.random() * 0.6;
            rock.style.transform = `scale(${size}) translateY(${Math.random() * 4}px)`;
            // Tono ligeramente variado
            const hue = 70 + Math.random() * 20;
            rock.style.background = `linear-gradient(135deg, hsl(${hue}, 15%, 45%), hsl(${hue}, 20%, 30%))`;
        });
    }
}

// Llamar una vez al inicio
document.addEventListener('DOMContentLoaded', _decorateBackground);

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
    
    // Actualizar colores de elementos decorativos según el ciclo
    _updateDecorColors(sky);
}

// Actualiza colores de árboles/rocas según el ciclo de cielo
function _updateDecorColors(skyClass) {
    const trees = document.querySelectorAll('.bg-trees .tree');
    const rocks = document.querySelectorAll('.bg-rocks .rock');
    
    if (skyClass === 'sky-dawn') {
        trees.forEach(t => t.style.color = '#4a7a38');
        rocks.forEach(r => r.style.filter = 'none');
    } else if (skyClass === 'sky-noon') {
        trees.forEach(t => t.style.color = '#5a9a48');
        rocks.forEach(r => r.style.filter = 'none');
    } else if (skyClass === 'sky-sunset') {
        trees.forEach(t => t.style.color = '#3a5a28');
        rocks.forEach(r => r.style.filter = 'saturate(0.8) brightness(0.95)');
    } else if (skyClass === 'sky-storm') {
        trees.forEach(t => t.style.color = '#2a3a18');
        rocks.forEach(r => r.style.filter = 'saturate(0.4) brightness(0.7)');
    }
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
