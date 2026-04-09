// --- FLUJO PRINCIPAL: newGame, continueGame, loadLevel, transición, endGame ---

function loadLevel(levelIndex) {
    const g = state.game;
    g.level        = levelIndex;
    g.transitioning = false;

    const config = LEVEL_CONFIG[levelIndex] || LEVEL_CONFIG[LEVEL_CONFIG.length - 1];
    g.timeLeft = config.time;

    // Limpiar patos anteriores
    g.ducks.forEach(d => d.el && d.el.remove());
    g.ducks = [];

    for (let i = 0; i < config.count; i++) spawnDuck(config.type);

    g.currentDuckIdx = 0;
    if (g.ducks[0]) g.ducks[0].el.classList.add('controlled');

    updateHUD();
    updateControlIndicator();
    if (levelIndex > 0) showLevelScreen(levelIndex);
    updateUnlocksByLevel(levelIndex);
    saveGameProgress();
}

function newGame() {
    stopLoop();
    state.game.ducks.forEach(d => d.el && d.el.remove());
    resetGameState();
    state.unlockedImages = { level1: false, level3: false, level5: false, level7: false };

    _startGameSession();
    saveGameProgress();
}

function continueGame() {
    if (!loadGameProgress()) {
        alert(t('alertNoSave'));
        return;
    }
    stopLoop();
    state.game.ducks.forEach(d => d.el && d.el.remove());
    state.game.active       = true;
    state.game.transitioning = false;
    state.game.ducks        = [];
    state.game.hunter       = { phase: 'IDLE', timer: 0, ammo: 3, targetIdx: -1, crosshairX: 0, crosshairY: 0 };
    state.game.keys         = {};

    _startGameSession();
}

function _startGameSession() {
    loadLevel(state.game.level);
    DOM.gameContainer.style.display = 'block';
    DOM.mainMenu.style.display      = 'none';
    lastTimestamp = 0;
    state.animationId = requestAnimationFrame(gameLoop);
    startSpriteInterval();
    startScoreInterval();
}

function startTransition() {
    state.game.transitioning = true;
    setTransitionIndicator();
    state.game.ducks.forEach(d => {
        if (d.alive) {
            d.vx  = (Math.random() - 0.5) * 2;
            d.vy  = -3;
            d.dir = d.vx > 0 ? 1 : -1;
        }
    });
}

function checkTransitionEnd() {
    if (state.game.ducks.every(d => !d.alive || d.y < -50)) {
        state.game.transitioning = false;
        loadLevel(state.game.level + 1);
    }
}

function endGame() {
    state.game.active = false;
    stopLoop();
    showGameOverScreen();
    saveGameProgress();
}
