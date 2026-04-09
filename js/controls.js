// --- CONTROLES: TECLADO Y JOYSTICK TÁCTIL ---

function initControls() {
    // Teclado — Tab solo actúa si el juego está activo
    window.addEventListener('keydown', e => {
        state.game.keys[e.key.toLowerCase()] = true;
        if (e.key === 'Tab' && state.game.active) { e.preventDefault(); switchToNextDuck(); }
        if (e.key === ' ')   e.preventDefault();
    });
    window.addEventListener('keyup', e => {
        state.game.keys[e.key.toLowerCase()] = false;
    });

    // Joystick táctil
    const joyZone = document.getElementById('joystick');
    const joyKnob = document.getElementById('joy-knob');

    joyZone.addEventListener('touchstart', e => {
        e.preventDefault();
        state.joystick.active = true;
        handleJoy(e.touches[0], joyZone, joyKnob);
    }, { passive: false });

    joyZone.addEventListener('touchmove', e => {
        e.preventDefault();
        handleJoy(e.touches[0], joyZone, joyKnob);
    }, { passive: false });

    joyZone.addEventListener('touchend', e => {
        e.preventDefault();
        state.joystick.active = false;
        state.joystick.dx = 0;
        state.joystick.dy = 0;
        joyKnob.style.transform = 'translate(-50%, -50%)';
    });

    // Botones móviles
    document.getElementById('btn-switch').addEventListener('touchstart', e => {
        e.preventDefault();
        switchToNextDuck();
    });
    document.getElementById('btn-boost').addEventListener('touchstart', e => {
        e.preventDefault();
        state.game.keys[' '] = true;
    });
    document.getElementById('btn-boost').addEventListener('touchend', e => {
        e.preventDefault();
        state.game.keys[' '] = false;
    });

    // Reintentar
    document.getElementById('restart-btn').addEventListener('click', () => {
        newGame();
        DOM.screenOver.style.display = 'none';
    });
}

function handleJoy(touch, joyZone, joyKnob) {
    const rect = joyZone.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    let dx = touch.clientX - cx;
    let dy = touch.clientY - cy;
    const max  = 30;
    const dist = Math.hypot(dx, dy);
    if (dist > max) { dx = (dx / dist) * max; dy = (dy / dist) * max; }
    joyKnob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    state.joystick.dx = dx / max;
    state.joystick.dy = dy / max;
}
