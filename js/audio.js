// --- SISTEMA DE AUDIO ---

const SOUNDS = {
    dog:       'https://res.cloudinary.com/dcqnjn6fe/video/upload/q_auto/f_auto/v1775748471/Voicy_Dog_Barking_vm1eoc.mp3',
    fall:      'https://res.cloudinary.com/dcqnjn6fe/video/upload/q_auto/f_auto/v1775748471/Voicy_Duck_Falling_W_Drop_jydati.mp3',
    shot:      'https://res.cloudinary.com/dcqnjn6fe/video/upload/q_auto/f_auto/v1775748471/Voicy_Gun_Shot_ezrtgg.mp3',
    lose:      'https://res.cloudinary.com/dcqnjn6fe/video/upload/q_auto/f_auto/v1775748472/Voicy_Lose_Sound_1_gei1hp.mp3',
    nextRound: 'https://res.cloudinary.com/dcqnjn6fe/video/upload/q_auto/f_auto/v1775748472/Voicy_Next_Round_yxvh8z.mp3'
};

// Música de fondo del menú
const _menuMusic = new Audio('https://res.cloudinary.com/dcqnjn6fe/video/upload/q_auto/f_auto/v1775750059/sound_background_lw64ov.mp3');
_menuMusic.loop   = true;
_menuMusic.volume = 0.45;
let _fadeOutInterval = null;  // evitar múltiples fade simultáneos

function playMenuMusic() {
    if (!state.settings.soundEnabled) return;
    if (!_menuMusic.paused) return;
    // Cancelar fade out si estaba en curso
    if (_fadeOutInterval) { clearInterval(_fadeOutInterval); _fadeOutInterval = null; }
    _menuMusic.volume = 0.45;
    _menuMusic.play().catch(() => {});
}

function stopMenuMusic() {
    if (_menuMusic.paused) return;
    if (_fadeOutInterval) return; // ya hay un fade en curso
    _fadeOutInterval = setInterval(() => {
        if (_menuMusic.volume > 0.05) {
            _menuMusic.volume = Math.max(0, _menuMusic.volume - 0.05);
        } else {
            _menuMusic.pause();
            _menuMusic.volume = 0.45;
            clearInterval(_fadeOutInterval);
            _fadeOutInterval = null;
        }
    }, 60);
}

// Cache de objetos Audio para reutilizar
const _audioCache = {};

function playSound(name) {
    if (!state.settings.soundEnabled) return;
    const url = SOUNDS[name];
    if (!url) return;

    // Reutilizar instancia cacheada o crear nueva
    if (!_audioCache[name]) {
        _audioCache[name] = new Audio(url);
    }
    const audio = _audioCache[name];
    // Reiniciar si ya estaba sonando
    audio.currentTime = 0;
    audio.play().catch(() => {}); // ignorar errores de autoplay
}

// Para sonidos que pueden sonar simultáneamente (ej. disparos rápidos)
function playSoundClone(name) {
    if (!state.settings.soundEnabled) return;
    const url = SOUNDS[name];
    if (!url) return;
    const audio = new Audio(url);
    audio.play().catch(() => {});
}
