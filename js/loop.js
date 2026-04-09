// --- GAME LOOP Y PUNTUACIÓN PASIVA ---

let lastTimestamp = 0;

function gameLoop(now) {
    if (!state.game.active) return;

    if (now - lastTimestamp >= 1000 && !state.game.transitioning) {
        lastTimestamp = now;
        state.game.timeLeft--;
        if (state.game.timeLeft <= 0) startTransition();
        updateHUD();
    }

    updatePhysics();
    updateHunterAI(now);
    if (state.game.transitioning) checkTransitionEnd();

    state.animationId = requestAnimationFrame(gameLoop);
}

function startScoreInterval() {
    stopScoreInterval();
    state.scoreInterval = setInterval(() => {
        if (state.game.active && !state.game.transitioning) {
            state.game.score += state.game.ducks.filter(d => d.alive).length * 10;
            updateHUD();
        }
    }, 1000);
}

function stopScoreInterval() {
    if (state.scoreInterval) {
        clearInterval(state.scoreInterval);
        state.scoreInterval = null;
    }
}

function startSpriteInterval() {
    stopSpriteInterval();
    state.spriteInterval = setInterval(updateAllSprites, 120);
}

function stopSpriteInterval() {
    if (state.spriteInterval) {
        clearInterval(state.spriteInterval);
        state.spriteInterval = null;
    }
}

function stopLoop() {
    if (state.animationId) {
        cancelAnimationFrame(state.animationId);
        state.animationId = null;
    }
    // Limpiar intervals de caída de patos huérfanos
    state.game.ducks.forEach(d => {
        if (d.fallInterval) { clearInterval(d.fallInterval); d.fallInterval = null; }
    });
    // Limpiar crosshair del cazador si quedó visible
    if (state.crosshairElement) {
        state.crosshairElement.remove();
        state.crosshairElement = null;
    }
    stopSpriteInterval();
    stopScoreInterval();
}
