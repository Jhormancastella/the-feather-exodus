// --- POWER-UPS: monedas, escudos, corazones ---

// Tipos de power-up
const POWERUP_TYPES = {
    coin:   { img: 'https://images.vexels.com/media/users/3/157332/isolated/preview/9c1a0590528c68138bc08d9df0942f9d-icono-de-moneda-dolar.png', color: '#ffcc00', label: '+50',  duration: 0    },
    shield: { emoji: '🛡️', color: '#00aaff', label: 'SHIELD', duration: 5000 },
    heart:  { emoji: '❤️', color: '#ff4466', label: '+HP',  duration: 0    }
};

// Power-ups activos en pantalla
let activePowerups = [];
let powerupSpawnInterval = null;

function startPowerupSystem() {
    stopPowerupSystem();
    // Spawnear un power-up aleatorio cada 8-14 segundos
    powerupSpawnInterval = setInterval(() => {
        if (!state.game.active || state.game.transitioning) return;
        if (activePowerups.length >= 3) return; // máximo 3 en pantalla
        _spawnPowerup();
    }, 8000 + Math.random() * 6000);
}

function stopPowerupSystem() {
    if (powerupSpawnInterval) {
        clearInterval(powerupSpawnInterval);
        powerupSpawnInterval = null;
    }
    // Limpiar todos los power-ups del DOM
    activePowerups.forEach(p => p.el && p.el.remove());
    activePowerups = [];
}

function _spawnPowerup() {
    const types   = Object.keys(POWERUP_TYPES);
    const type    = types[Math.floor(Math.random() * types.length)];
    const cfg     = POWERUP_TYPES[type];
    const W       = DOM.gameContainer.offsetWidth;
    const H       = DOM.gameContainer.offsetHeight;

    const el = document.createElement('div');
    el.className = 'powerup';
    // Usar imagen si está definida, si no emoji
    if (cfg.img) {
        el.innerHTML = `<img src="${cfg.img}" alt="${type}" class="powerup-img">`;
    } else {
        el.textContent = cfg.emoji;
    }
    el.style.left  = (40 + Math.random() * (W - 80)) + 'px';
    el.style.top   = (80 + Math.random() * (H * 0.5)) + 'px';
    el.style.setProperty('--pu-color', cfg.color);
    DOM.gameContainer.appendChild(el);

    const pu = { type, cfg, el, collected: false };
    activePowerups.push(pu);

    // Auto-desaparecer tras 10s si no se recoge
    setTimeout(() => _removePowerup(pu), 10000);

    // Detectar colisión con el pato controlado en cada frame
    pu.checkInterval = setInterval(() => {
        if (!state.game.active || pu.collected) return;
        const duck = state.game.ducks[state.game.currentDuckIdx];
        if (!duck || !duck.alive) return;

        const puX = parseFloat(el.style.left);
        const puY = parseFloat(el.style.top);
        const dist = Math.hypot((duck.x + 17) - (puX + 16), (duck.y + 17) - (puY + 16));

        if (dist < 30) _collectPowerup(pu, duck);
    }, 50);
}

function _collectPowerup(pu, duck) {
    if (pu.collected) return;
    pu.collected = true;
    clearInterval(pu.checkInterval);

    // Efecto visual de recogida
    pu.el.classList.add('powerup-collect');
    setTimeout(() => _removePowerup(pu), 400);

    // Aplicar efecto
    switch (pu.type) {
        case 'coin':
            state.game.score += 50;
            updateHUD();
            _showFloatingText(pu.el, '+50', '#ffcc00');
            break;

        case 'shield':
            // Invencibilidad de 5s: 5000ms / 16ms por frame * 0.5 decremento = ~156 unidades
            duck.invincible = 156;
            duck.el.classList.add('duck-shielded');
            _showFloatingText(pu.el, '🛡️', '#00aaff');
            setTimeout(() => {
                duck.el.classList.remove('duck-shielded');
                duck.invincible = 0;
            }, 5000);
            break;

        case 'heart':
            duck.health = Math.min(100, duck.health + 40);
            const fill = duck.el.querySelector('.duck-health-fill');
            if (fill) {
                fill.style.width      = duck.health + '%';
                fill.style.background = healthColor(duck.health);
            }
            _showFloatingText(pu.el, '+❤️', '#ff4466');
            break;
    }
}

function _removePowerup(pu) {
    if (pu.checkInterval) clearInterval(pu.checkInterval);
    pu.el && pu.el.remove();
    activePowerups = activePowerups.filter(p => p !== pu);
}

function _showFloatingText(refEl, text, color) {
    const div = document.createElement('div');
    div.className   = 'powerup-float';
    div.textContent = text;
    div.style.color = color;
    div.style.left  = refEl.style.left;
    div.style.top   = refEl.style.top;
    DOM.gameContainer.appendChild(div);
    setTimeout(() => div.remove(), 800);
}
