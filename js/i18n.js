// --- SISTEMA DE IDIOMAS (i18n) ---

const LANGS = {
    es: {
        // ── Título del documento
        pageTitle: 'Feather Exodus - El Exodo de las Plumas',

        // ── Menú principal
        menuContinue:  'CONTINUAR',
        menuNewGame:   'NUEVA PARTIDA',
        menuGallery:   'GALERIA',
        menuOptions:   'OPCIONES',
        menuCredits:   'CREDITOS',
        menuExit:      'SALIR',
        menuCopyright: '©2025 FEATHER EXODUS',

        // ── HUD
        hudLevel:   'NIVEL',
        hudTime:    'TIEMPO',
        hudScore:   'PUNTOS',
        hudHunter:  'CAZADOR',
        hudHunterReloading: 'RECARGANDO',
        hudHunterReady:     '***',

        // ── Indicadores en juego
        playerLabel:    'JUGADOR: PATO',
        transitionMsg:  'VOLANDO A LA SIGUIENTE ZONA!',
        desktopHint:    'WASD: Mover | TAB: Cambiar Pato | ESPACIO: Boost',
        btnSwitch:      'CAMBIAR',
        btnBoost:       'BOOST',
        btnPause:       'II PAUSA',

        // ── Pantalla de nivel
        levelTitle:     'NIVEL',
        levelSub1:      '¡Los patos se van!',
        levelSub2:      'Preparate...',

        // ── Pantalla de game over
        gameOverTitle:  'FIN DEL JUEGO',
        gameOverLevel:  'Nivel:',
        gameOverScore:  'Puntuacion:',
        btnRetry:       'REINTENTAR',

        // ── Nombres de patos
        duckBlack: 'NEGRO',
        duckRed:   'ROJO',
        duckBrown: 'MARRON',

        // ── Modal: Galería
        modalGallery:   'GALERIA',
        galleryLevel1:  'NIVEL 1',
        galleryLevel3:  'NIVEL 3',
        galleryLevel5:  'NIVEL 5',
        galleryLevel7:  'NIVEL 7',
        galleryDesc1:   'Primer vuelo',
        galleryDesc3:   'Rojos en bandada',
        galleryDesc5:   'Plumas marrones',
        galleryDesc7:   'Exodo legendario',
        galleryLocked:   '??? BLOQUEADO',
        galleryUnlocked: '★ DESBLOQUEADO',

        // ── Modal: Opciones
        modalOptions:   'OPCIONES',
        optSound:       'SONIDO',
        optGraphics:    'GRAFICOS',
        optPixelated:   'PIXELADO',
        optSmooth:      'SUAVE',
        optDifficulty:  'DIFICULTAD',
        optNormal:      'NORMAL',
        optHard:        'DIFICIL',
        optLanguage:    'IDIOMA',
        optSave:        '[ GUARDAR ]',
        optSaved:       '[ GUARDADO! ]',

        // ── Modal: Créditos
        modalCredits:   'CREDITOS',
        creditsTitle:   'FEATHER EXODUS',
        creditsSub:     'EL EXODO DE LAS PLUMAS',
        creditsDev:     '— DESARROLLO —',
        creditsDevLine1:'Diseño y programacion',
        creditsDevLine2:'Indie Dev',
        creditsArt:     '— ARTE —',
        creditsArtLine1:'Sprites originales',
        creditsArtLine2:'Nintendo / Duck Hunt (NES)',
        creditsArtLine3:'Dominio publico',
        creditsTest:    '— TESTING —',
        creditsTestSpc: '♥ Rosy ♥',
        creditsTestLine:'Por aguantar cada bug',
        creditsInsp:    '— INSPIRACION —',
        creditsInspLine1:'Duck Hunt — Nintendo 1984',
        creditsInspLine2:'Todos los patos que escaparon',
        creditsTech:    '— TECNOLOGIA —',
        creditsTechLine1:'HTML · CSS · JavaScript',
        creditsTechLine2:'Sin frameworks. Solo codigo.',
        creditsThanks:  'GRACIAS POR JUGAR',

        // ── Modal: Pausa
        modalPause:     'PAUSA',
        pauseLevel:     'NIVEL',
        pauseScore:     'PUNTOS',
        pauseDucks:     'PATOS',
        pauseResume:    'CONTINUAR',
        pauseOptions:   'OPCIONES',
        pauseMainMenu:  'MENU PRINCIPAL',

        // ── Alertas
        alertNoSave:    'No hay partida guardada. Inicia una nueva.',
    },

    en: {
        pageTitle: 'Feather Exodus - The Feather Exodus',

        menuContinue:  'CONTINUE',
        menuNewGame:   'NEW GAME',
        menuGallery:   'GALLERY',
        menuOptions:   'OPTIONS',
        menuCredits:   'CREDITS',
        menuExit:      'EXIT',
        menuCopyright: '©2025 FEATHER EXODUS',

        hudLevel:   'LEVEL',
        hudTime:    'TIME',
        hudScore:   'SCORE',
        hudHunter:  'HUNTER',
        hudHunterReloading: 'RELOADING',
        hudHunterReady:     '***',

        playerLabel:    'PLAYER: DUCK',
        transitionMsg:  'FLYING TO THE NEXT ZONE!',
        desktopHint:    'WASD: Move | TAB: Switch Duck | SPACE: Boost',
        btnSwitch:      'SWITCH',
        btnBoost:       'BOOST',
        btnPause:       'II PAUSE',

        levelTitle:     'LEVEL',
        levelSub1:      'The ducks are leaving!',
        levelSub2:      'Get ready...',

        gameOverTitle:  'GAME OVER',
        gameOverLevel:  'Level:',
        gameOverScore:  'Score:',
        btnRetry:       'RETRY',

        duckBlack: 'BLACK',
        duckRed:   'RED',
        duckBrown: 'BROWN',

        modalGallery:   'GALLERY',
        galleryLevel1:  'LEVEL 1',
        galleryLevel3:  'LEVEL 3',
        galleryLevel5:  'LEVEL 5',
        galleryLevel7:  'LEVEL 7',
        galleryDesc1:   'First flight',
        galleryDesc3:   'Red flock',
        galleryDesc5:   'Brown feathers',
        galleryDesc7:   'Legendary exodus',
        galleryLocked:   '??? LOCKED',
        galleryUnlocked: '★ UNLOCKED',

        modalOptions:   'OPTIONS',
        optSound:       'SOUND',
        optGraphics:    'GRAPHICS',
        optPixelated:   'PIXELATED',
        optSmooth:      'SMOOTH',
        optDifficulty:  'DIFFICULTY',
        optNormal:      'NORMAL',
        optHard:        'HARD',
        optLanguage:    'LANGUAGE',
        optSave:        '[ SAVE ]',
        optSaved:       '[ SAVED! ]',

        modalCredits:   'CREDITS',
        creditsTitle:   'FEATHER EXODUS',
        creditsSub:     'THE FEATHER EXODUS',
        creditsDev:     '— DEVELOPMENT —',
        creditsDevLine1:'Design and programming',
        creditsDevLine2:'Indie Dev',
        creditsArt:     '— ART —',
        creditsArtLine1:'Original sprites',
        creditsArtLine2:'Nintendo / Duck Hunt (NES)',
        creditsArtLine3:'Public domain',
        creditsTest:    '— TESTING —',
        creditsTestSpc: '♥ Rosy ♥',
        creditsTestLine:'For putting up with every bug',
        creditsInsp:    '— INSPIRATION —',
        creditsInspLine1:'Duck Hunt — Nintendo 1984',
        creditsInspLine2:'All the ducks that got away',
        creditsTech:    '— TECHNOLOGY —',
        creditsTechLine1:'HTML · CSS · JavaScript',
        creditsTechLine2:'No frameworks. Just code.',
        creditsThanks:  'THANKS FOR PLAYING',

        modalPause:     'PAUSE',
        pauseLevel:     'LEVEL',
        pauseScore:     'SCORE',
        pauseDucks:     'DUCKS',
        pauseResume:    'RESUME',
        pauseOptions:   'OPTIONS',
        pauseMainMenu:  'MAIN MENU',

        alertNoSave:    'No saved game found. Start a new one.',
    }
};

// Idioma activo
let currentLang = 'es';

/** Devuelve el texto traducido para una clave */
function t(key) {
    return (LANGS[currentLang] && LANGS[currentLang][key]) || LANGS['es'][key] || key;
}

/** Cambia el idioma y actualiza todos los textos del DOM */
function setLang(lang) {
    if (!LANGS[lang]) return;
    currentLang = lang;
    if (state && state.settings) state.settings.language = lang;
    _applyLangToDOM();
}

function _applyLangToDOM() {
    // Título de la página
    document.title = t('pageTitle');

    // Menú principal
    _setText('btn-continue',  t('menuContinue'));
    _setText('btn-newgame',   t('menuNewGame'));
    _setText('btn-gallery',   t('menuGallery'));
    _setText('btn-options',   t('menuOptions'));
    _setText('btn-credits',   t('menuCredits'));
    _setText('btn-exit',      t('menuExit'));
    _setTextDirect('.nes-copyright', t('menuCopyright'));

    // HUD labels
    _setTextDirect('#hud .hud-section:nth-child(1) .hud-label', t('hudLevel'));
    _setTextDirect('#hud .hud-section:nth-child(2) .hud-label', t('hudTime'));
    _setTextDirect('#hud .hud-section:nth-child(3) .hud-label', t('hudScore'));
    _setTextDirect('#hud .hud-section:nth-child(4) .hud-label', t('hudHunter'));

    // Botón pausa
    _setTextDirect('#pause-btn', t('btnPause'));

    // Hint escritorio
    _setTextDirect('#desktop-hint', t('desktopHint'));

    // Botones móviles
    _setTextDirect('#btn-switch', t('btnSwitch'));
    _setTextDirect('#btn-boost',  t('btnBoost'));

    // Pantalla nivel
    _setTextDirect('#screen-level p:first-of-type', t('levelSub1'));
    _setTextDirect('#screen-level p:last-of-type',  t('levelSub2'));

    // Pantalla game over
    _setTextDirect('#screen-over h1',           t('gameOverTitle'));
    _setTextDirect('#restart-btn',              t('btnRetry'));

    // Control indicator — solo si el juego está activo
    if (state.game && state.game.active) updateControlIndicator();
}

// Helpers internos
function _setText(id, text) {
    const el = document.getElementById(id);
    if (!el) return;
    // Preservar el span .arrow si existe
    const arrow = el.querySelector('.arrow');
    if (arrow) {
        el.textContent = '';
        el.appendChild(arrow);
        el.appendChild(document.createTextNode(text));
    } else {
        el.textContent = text;
    }
}
function _setTextDirect(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
}
