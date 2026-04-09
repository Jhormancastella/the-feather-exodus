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

// Spritesheet: 375x267px, fondo transparente
// Analizado por píxeles — coordenadas exactas de cada sprite
//
// Fila 2 (y=119 h=28): 9 sprites — 3 tipos × 3 frames vuelo
//   black: cols 0-2  (x: 0, 40, 81)
//   red:   cols 3-5  (x: 130, 170, 211)
//   brown: cols 6-8  (x: 260, 300, 341)
//
// Fila 5 (y=237 h=30): caída
//   col 0 (x=1  w=31) — falling frame 0
//   col 1 (x=48 w=18) — falling frame 1

// Tamaño del div del pato — celda uniforme que cubre el sprite más ancho (34px)
const SW = 34;
const SH = 34;

// Centra un sprite (sx,sy,sw,sh) dentro del div SW×SH
function sprCoord(sx, sy, sw, sh) {
    return {
        bx: -sx + Math.floor((SW - sw) / 2),
        by: -sy + Math.floor((SH - sh) / 2)
    };
}

const SPRITES = {
    black: {
        fly:     [ sprCoord(0,  119, 34, 28),
                   sprCoord(40, 119, 34, 28),
                   sprCoord(81, 119, 32, 28) ],
        falling: [ sprCoord(1,  237, 31, 30),
                   sprCoord(48, 237, 18, 30) ]
    },
    red: {
        fly:     [ sprCoord(130, 119, 34, 28),
                   sprCoord(170, 119, 34, 28),
                   sprCoord(211, 119, 32, 28) ],
        falling: [ sprCoord(1,   237, 31, 30),
                   sprCoord(48,  237, 18, 30) ]
    },
    brown: {
        fly:     [ sprCoord(260, 119, 34, 28),
                   sprCoord(300, 119, 34, 28),
                   sprCoord(341, 119, 32, 28) ],
        falling: [ sprCoord(1,   237, 31, 30),
                   sprCoord(48,  237, 18, 30) ]
    }
};

const DUCK_NAMES = { black: 'NEGRO', red: 'ROJO', brown: 'MARRON' };
