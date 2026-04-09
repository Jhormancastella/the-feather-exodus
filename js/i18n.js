// --- SISTEMA DE IDIOMAS (i18n) ---

const LANGS = {
    es: {
        // ── Título del documento
        pageTitle: 'Feather Exodus - El Exodo de las Plumas',

        // ── Menú principal
        menuStart:     'INICIAR',
        menuContinue:  'CONTINUAR',
        menuNewGame:   'NUEVA PARTIDA',
        menuBack:      'ATRÁS',
        menuGallery:   'GALERIA',
        menuOptions:   'OPCIONES',
        menuCredits:   'CREDITOS',
        menuExit:      'SALIR',
        menuCopyright: '©2026 FEATHER EXODUS',
        menuTitleLine1: 'ÉXODO',
        menuTitleLine2: 'DE PLUMAS',

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
        galleryLevel9:  'NIVEL 9',
        galleryDesc1:   'Primer vuelo',
        galleryDesc3:   'Rojos en bandada',
        galleryDesc5:   'Plumas marrones',
        galleryDesc7:   'Exodo legendario',
        galleryDesc9:   'El ultimo vuelo',
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
        modalCredits:      'CREDITOS',
        creditsTitle1:     'FEATHER EXODUS',
        creditsTitle2:     'ÉXODO DE PLUMAS',
        creditsSub:        'EL ÉXODO DE LAS PLUMAS',
        creditsDev:        '— DESARROLLO —',
        creditsDevLine1:   'Diseño y programacion',
        creditsDevLine2:   'Jhorman Castella',
        creditsArt:        '— ARTE —',
        creditsArtLine1:   'Sprites originales',
        creditsArtLine2:   'Nintendo / Duck Hunt (NES)',
        creditsArtLine3:   'Dominio publico',
        creditsTest:       '— TESTING —',
        creditsTestSpc:    '♥ Rosy ♥',
        creditsTestLine:   'Por aguantar cada bug',
        creditsInsp:       '— INSPIRACION —',
        creditsInspLine1:  'Duck Hunt — Nintendo 1984',
        creditsInspLine2:  'Todos los patos que escaparon',
        creditsTech:       '— TECNOLOGIA —',
        creditsTechLine1:  'HTML · CSS · JavaScript',
        creditsTechLine2:  'Sin frameworks. Solo codigo.',
        creditsRepo:       '— REPOSITORIO —',
        creditsRepoLine1:  'github.com/Jhormancastella',
        creditsRepoLine2:  'the-feather-exodus',
        creditsVersion:    'VERSION 1.0.0',
        creditsThanks:     'GRACIAS POR JUGAR',

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

        // ── Modo Historia
        storySlide1: 'Cada otoño, miles de patos migratorios emprenden el gran éxodo.\nVuelan en bandada hacia tierras cálidas, guiados solo por el instinto y el viento.',
        storySlide2: 'Pero este año, la ruta de migración cruza los territorios de caza.\nLos pantanos, los bosques y los cielos abiertos están llenos de peligro.',
        storySlide3: 'Un cazador acecha en las sombras. Su perro olfatea el aire.\nCada disparo puede ser el último para la bandada.',
        storySlide4: 'Tú eres uno de ellos. Guía a tus compañeros.\nEsquiva las balas, usa el boost para escapar y lleva a la bandada al otro lado.',
        storySlide5: '¡La migración depende de ti!\nSobrevive a todos los niveles y completa el éxodo de las plumas.',

        storyControlsHeader: '¿Cómo jugar?',
        storyControlsTitle:  'CONTROLES',
        storyCtrlMoveD:      'Mover el pato',
        storyCtrlSwitchD:    'Cambiar de pato',
        storyCtrlBoostD:     'Boost de velocidad',
        storyCtrlPauseD:     'Pausar',
        storyCtrlMoveM:      'Joystick — Mover',
        storyCtrlSwitchM:    'Botón CAMBIAR',
        storyCtrlBoostM:     'Botón BOOST',
        storyCtrlPauseM:     'Botón PAUSA',

        storyNext:  'SIGUIENTE',
        storyBack:  'ATRÁS',
        storySkip:  'SALTAR',
        storyPlay:  'JUGAR',
    },

    en: {
        pageTitle: 'Feather Exodus - The Feather Exodus',

        menuStart:     'START',
        menuContinue:  'CONTINUE',
        menuNewGame:   'NEW GAME',
        menuBack:      'BACK',
        menuGallery:   'GALLERY',
        menuOptions:   'OPTIONS',
        menuCredits:   'CREDITS',
        menuExit:      'EXIT',
        menuCopyright: '©2026 FEATHER EXODUS',
        menuTitleLine1: 'FEATHER',
        menuTitleLine2: 'EXODUS',

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
        galleryLevel9:  'LEVEL 9',
        galleryDesc1:   'First flight',
        galleryDesc3:   'Red flock',
        galleryDesc5:   'Brown feathers',
        galleryDesc7:   'Legendary exodus',
        galleryDesc9:   'The last flight',
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

        modalCredits:      'CREDITS',
        creditsTitle1:     'FEATHER EXODUS',
        creditsTitle2:     'FEATHER EXODUS',
        creditsSub:        'THE FEATHER EXODUS',
        creditsDev:        '— DEVELOPMENT —',
        creditsDevLine1:   'Design and programming',
        creditsDevLine2:   'Jhorman Castella',
        creditsArt:        '— ART —',
        creditsArtLine1:   'Original sprites',
        creditsArtLine2:   'Nintendo / Duck Hunt (NES)',
        creditsArtLine3:   'Public domain',
        creditsTest:       '— TESTING —',
        creditsTestSpc:    '♥ Rosy ♥',
        creditsTestLine:   'For putting up with every bug',
        creditsInsp:       '— INSPIRATION —',
        creditsInspLine1:  'Duck Hunt — Nintendo 1984',
        creditsInspLine2:  'All the ducks that got away',
        creditsTech:       '— TECHNOLOGY —',
        creditsTechLine1:  'HTML · CSS · JavaScript',
        creditsTechLine2:  'No frameworks. Just code.',
        creditsRepo:       '— REPOSITORY —',
        creditsRepoLine1:  'github.com/Jhormancastella',
        creditsRepoLine2:  'the-feather-exodus',
        creditsVersion:    'VERSION 1.0.0',
        creditsThanks:     'THANKS FOR PLAYING',

        modalPause:     'PAUSE',
        pauseLevel:     'LEVEL',
        pauseScore:     'SCORE',
        pauseDucks:     'DUCKS',
        pauseResume:    'RESUME',
        pauseOptions:   'OPTIONS',
        pauseMainMenu:  'MAIN MENU',

        alertNoSave:    'No saved game found. Start a new one.',

        // ── Story Mode
        storySlide1: 'Every autumn, thousands of migratory ducks begin the great exodus.\nThey fly in flocks toward warmer lands, guided only by instinct and wind.',
        storySlide2: 'But this year, the migration route crosses hunting territories.\nSwamps, forests and open skies are full of danger.',
        storySlide3: 'A hunter lurks in the shadows. His dog sniffs the air.\nEvery shot could be the last for the flock.',
        storySlide4: 'You are one of them. Lead your companions.\nDodge the bullets, use boost to escape and guide the flock to safety.',
        storySlide5: 'The migration depends on you!\nSurvive all levels and complete the feather exodus.',

        storyControlsHeader: 'How to play?',
        storyControlsTitle:  'CONTROLS',
        storyCtrlMoveD:      'Move the duck',
        storyCtrlSwitchD:    'Switch duck',
        storyCtrlBoostD:     'Speed boost',
        storyCtrlPauseD:     'Pause',
        storyCtrlMoveM:      'Joystick — Move',
        storyCtrlSwitchM:    'SWITCH button',
        storyCtrlBoostM:     'BOOST button',
        storyCtrlPauseM:     'PAUSE button',

        storyNext:  'NEXT',
        storyBack:  'BACK',
        storySkip:  'SKIP',
        storyPlay:  'PLAY',
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

    // Título del menú (líneas del logo)
    _setTextDirect('#menu-title-1', t('menuTitleLine1'));
    _setTextDirect('#menu-title-2', t('menuTitleLine2'));

    // Menú principal
    _setText('btn-start',    t('menuStart'));
    _setText('btn-continue', t('menuContinue'));
    _setText('btn-newgame',  t('menuNewGame'));
    _setText('btn-back',     t('menuBack'));
    _setText('btn-gallery',  t('menuGallery'));
    _setText('btn-options',  t('menuOptions'));
    _setText('btn-credits',  t('menuCredits'));
    _setText('btn-exit',     t('menuExit'));
    _setTextDirect('.nes-copyright', t('menuCopyright'));

    // HUD labels
    _setTextDirect('#hud .hud-section:nth-child(1) .hud-label', t('hudLevel'));
    _setTextDirect('#hud .hud-section:nth-child(2) .hud-label', t('hudTime'));
    _setTextDirect('#hud .hud-section:nth-child(3) .hud-label', t('hudScore'));
    _setTextDirect('#hud .hud-section:nth-child(4) .hud-label', t('hudHunter'));

    // Botón pausa — solo actualizar aria-label, el texto ⏸ es fijo
    const pb = document.querySelector('#pause-btn');
    if (pb) pb.setAttribute('aria-label', t('btnPause'));

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
