// --- CONFIGURACIÓN Y CONSTANTES ---

const LEVEL_CONFIG = [
    { type: 'black', count: 3, time: 15 },
    { type: 'red',   count: 5, time: 20 },
    { type: 'red',   count: 5, time: 20 },
    { type: 'red',   count: 5, time: 20 },
    { type: 'brown', count: 6, time: 25 },
    { type: 'brown', count: 7, time: 25 },
    { type: 'brown', count: 8, time: 25 }
];

// Coordenadas de sprites en el spritesheet (36x36 px por frame)
const SPRITES = {
    black:   [{ x: 0,   y: 115 }, { x: 36,  y: 115 }, { x: 72,  y: 115 }],
    red:     [{ x: 0,   y: 153 }, { x: 36,  y: 153 }, { x: 72,  y: 153 }],
    brown:   [{ x: 108, y: 115 }, { x: 144, y: 115 }, { x: 180, y: 115 }],
    falling: [{ x: 0,   y: 189 }, { x: 36,  y: 189 }]
};

const SW = 36;
const SH = 36;

const DUCK_NAMES = { black: 'NEGRO', red: 'ROJO', brown: 'MARRON' };
