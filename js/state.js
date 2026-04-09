// --- ESTADO GLOBAL DEL JUEGO ---

const state = {
    game: {
        active: false,
        score: 0,
        level: 0,
        timeLeft: 0,
        transitioning: false,
        ducks: [],
        currentDuckIdx: 0,
        boost: 100,
        hunter: { phase: 'IDLE', timer: 0, ammo: 3, targetIdx: -1, crosshairX: 0, crosshairY: 0 },
        keys: {},
        saved: false
    },

    unlockedImages: { level1: false, level3: false, level5: false, level7: false, level9: false },

    settings: {
        soundEnabled: true,
        graphicsQuality: 'pixelated',
        language: 'es'
    },

    // Handles de loops/intervalos
    animationId: null,
    spriteInterval: null,
    scoreInterval: null,

    // Joystick táctil
    joystick: { active: false, dx: 0, dy: 0 },

    // Referencia al crosshair del cazador
    crosshairElement: null
};

/** Resetea solo la parte del juego activo (no settings ni unlocks) */
function resetGameState() {
    state.game = {
        active: true,
        score: 0,
        level: 0,
        timeLeft: 0,
        transitioning: false,
        ducks: [],
        currentDuckIdx: 0,
        boost: 100,
        hunter: { phase: 'IDLE', timer: 0, ammo: 3, targetIdx: -1, crosshairX: 0, crosshairY: 0 },
        keys: {},
        saved: true
    };
}
