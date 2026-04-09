// --- HUD Y INDICADORES EN PANTALLA ---

// Referencias DOM cacheadas (se asignan en game.js al iniciar)
const DOM = {};

function cacheDOMRefs() {
    DOM.uiScore       = document.getElementById('ui-score');
    DOM.uiLevel       = document.getElementById('ui-level');
    DOM.uiTime        = document.getElementById('ui-time');
    DOM.uiHunter      = document.getElementById('ui-hunter');
    DOM.controlInd    = document.getElementById('control-indicator');
    DOM.screenLevel   = document.getElementById('screen-level');
    DOM.screenOver    = document.getElementById('screen-over');
    DOM.nextLvlNum    = document.getElementById('next-lvl-num');
    DOM.finalLevel    = document.getElementById('final-level');
    DOM.finalScore    = document.getElementById('final-score');
    DOM.mainMenu      = document.getElementById('main-menu');
    DOM.gameContainer = document.getElementById('game-container');
    DOM.menuTopscore  = document.getElementById('menu-topscore');
    DOM.pauseBtn      = document.getElementById('pause-btn');

    // Botón pausa
    DOM.pauseBtn.addEventListener('click', () => showPause());
}

function updateHUD() {
    const g = state.game;
    DOM.uiScore.textContent = g.score;
    DOM.uiLevel.textContent = g.level + 1;
    const t = Math.max(0, g.timeLeft);
    DOM.uiTime.textContent  = t < 10 ? `0${t}` : t;
}

function updateControlIndicator() {
    const duck = state.game.ducks[state.game.currentDuckIdx];
    if (duck) {
        DOM.controlInd.textContent   = `${t('playerLabel')} ${t('duck' + duck.type.charAt(0).toUpperCase() + duck.type.slice(1))}`;
        DOM.controlInd.style.borderColor = '#0ff';
    }
}

function showLevelScreen(levelIndex) {
    DOM.nextLvlNum.textContent    = levelIndex + 1;
    DOM.screenLevel.style.display = 'flex';
    setTimeout(() => DOM.screenLevel.style.display = 'none', 1500);
}

function showGameOverScreen() {
    const g = state.game;
    DOM.finalLevel.textContent   = g.level + 1;
    DOM.finalScore.textContent   = g.score;
    DOM.screenOver.style.display = 'flex';
}

function setTransitionIndicator() {
    DOM.controlInd.textContent       = t('transitionMsg');
    DOM.controlInd.style.borderColor = '#fff';
}

function setHunterHUD(text, color) {
    DOM.uiHunter.textContent = text === '***' ? '***' : t(text);
    DOM.uiHunter.style.color = color;
}
