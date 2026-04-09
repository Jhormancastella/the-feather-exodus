// --- IA DEL CAZADOR Y EFECTOS DE DISPARO ---

function fireShot(x, y) {
    // Flash de disparo
    const flash = document.createElement('div');
    flash.className  = 'muzzle-flash';
    flash.style.left = (x - 15) + 'px';
    flash.style.top  = (y - 15) + 'px';
    DOM.gameContainer.appendChild(flash);
    setTimeout(() => flash.remove(), 80);

    // Rastro de bala
    const trail = document.createElement('div');
    trail.className  = 'bullet-trail';
    trail.style.left = (x + 15) + 'px';
    trail.style.top  = (y + 15) + 'px';
    trail.style.height = (DOM.gameContainer.offsetHeight - y) + 'px';
    DOM.gameContainer.appendChild(trail);
    setTimeout(() => trail.remove(), 100);

    // Detección de impacto
    state.game.ducks.forEach(duck => {
        if (!duck.alive || duck.invincible > 0) return;
        const dx = (duck.x + 18) - x;
        const dy = (duck.y + 18) - y;
        if (Math.hypot(dx, dy) < 28) damageDuck(duck, 40);
    });
}

function updateHunterAI(now) {
    const h = state.game.hunter;

    if (h.phase === 'IDLE') {
        h.timer = now + 1000 + Math.random() * 1000;
        h.phase = 'WAITING';
    }

    if (h.phase === 'WAITING' && now >= h.timer) {
        const alive = state.game.ducks.filter(d => d.alive);
        if (alive.length === 0) return;

        const preferControlled = state.game.ducks[state.game.currentDuckIdx]?.alive && Math.random() < 0.7;
        h.targetIdx = preferControlled
            ? state.game.currentDuckIdx
            : state.game.ducks.indexOf(alive[Math.floor(Math.random() * alive.length)]);

        h.phase = 'AIMING';
        h.timer = now + 800;

        if (!state.crosshairElement) {
            state.crosshairElement = document.createElement('div');
            state.crosshairElement.className = 'crosshair visible';
            DOM.gameContainer.appendChild(state.crosshairElement);
        }

        const target = state.game.ducks[h.targetIdx];
        if (target) { h.crosshairX = target.x + 18; h.crosshairY = target.y + 18; }
    }

    if (h.phase === 'AIMING') {
        const target = state.game.ducks[h.targetIdx];
        if (!target || !target.alive) {
            h.phase = 'IDLE';
            _removeCrosshair();
            return;
        }

        h.crosshairX += (target.x + 18 - h.crosshairX) * 0.2;
        h.crosshairY += (target.y + 18 - h.crosshairY) * 0.2;
        state.crosshairElement.style.left = (h.crosshairX - 20) + 'px';
        state.crosshairElement.style.top  = (h.crosshairY - 20) + 'px';

        if (now >= h.timer) {
            fireShot(h.crosshairX, h.crosshairY);
            h.ammo--;
            if (h.ammo > 0) {
                h.phase = 'COOLDOWN';
                h.timer = now + 500;
                state.crosshairElement?.classList.remove('visible');
            } else {
                h.phase = 'RELOADING';
                setHunterHUD('hudHunterReloading', '#ffaa00');
                h.timer = now + 1500;
                _removeCrosshair();
            }
            updateHUD();
        }
    }

    if (h.phase === 'COOLDOWN' && now >= h.timer) {
        h.phase = 'AIMING';
        h.timer = now + 600;
        state.crosshairElement?.classList.add('visible');
    }

    if (h.phase === 'RELOADING' && now >= h.timer) {
        h.ammo  = 3;
        h.phase = 'IDLE';
        setHunterHUD('***', 'white');
        updateHUD();
    }
}

function _removeCrosshair() {
    if (state.crosshairElement) {
        state.crosshairElement.remove();
        state.crosshairElement = null;
    }
}
