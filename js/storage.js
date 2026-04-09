// --- PERSISTENCIA (localStorage) ---

const SAVE_KEY = 'featherExodusSave';

function saveGameProgress() {
    const g = state.game;
    // No guardar si no hay nada relevante
    if (!g.active && g.level === 0 && g.score === 0) return;
    const save = {
        score:   g.score,
        level:   g.level,
        unlocked: state.unlockedImages,
        options: {
            sound:    state.settings.soundEnabled,
            graphics: state.settings.graphicsQuality,
            language: state.settings.language
        }
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    g.saved = true;
}

function loadGameProgress() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    try {
        const data = JSON.parse(raw);
        state.game.score = data.score || 0;
        state.game.level = data.level || 0;
        if (data.unlocked) state.unlockedImages = data.unlocked;
        if (data.options) {
            state.settings.soundEnabled    = data.options.sound    ?? true;
            state.settings.graphicsQuality = data.options.graphics ?? 'pixelated';
            // Idioma: usar guardado o caer en español
            state.settings.language = data.options.language || 'es';
            currentLang             = state.settings.language;
        }
        return true;
    } catch (e) {
        return false;
    }
}

function clearGameProgress() {
    localStorage.removeItem(SAVE_KEY);
    state.game.saved = false;
}

function hasSaveData() {
    return !!localStorage.getItem(SAVE_KEY);
}

function getTopScore() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return 0;
    try { return JSON.parse(raw).score || 0; } catch (e) { return 0; }
}

function updateUnlocksByLevel(levelIdx) {
    if (levelIdx >= 1) state.unlockedImages.level1 = true;
    if (levelIdx >= 3) state.unlockedImages.level3 = true;
    if (levelIdx >= 5) state.unlockedImages.level5 = true;
    if (levelIdx >= 7) state.unlockedImages.level7 = true;
    if (levelIdx >= 9) state.unlockedImages.level9 = true;
    saveGameProgress();
}
