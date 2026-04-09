// --- MODO HISTORIA: INTRO NARRATIVA ANTES DE NUEVA PARTIDA ---

const STORY_SLIDES = [
    {
        icon: '🦆',
        textKey: 'storySlide1',
    },
    {
        icon: '🌿',
        textKey: 'storySlide2',
    },
    {
        icon: '🔫',
        textKey: 'storySlide3',
    },
    {
        icon: '💨',
        textKey: 'storySlide4',
    },
    {
        icon: '🏆',
        textKey: 'storySlide5',
    }
];

/**
 * Detecta si el usuario está en móvil
 */
function _isMobile() {
    return window.matchMedia('(max-width: 768px)').matches
        || ('ontouchstart' in window);
}

/**
 * Construye el bloque de controles según plataforma
 */
function _buildControlsHtml() {
    if (_isMobile()) {
        return `
            <div class="story-controls-block">
                <div class="story-ctrl-title">${t('storyControlsTitle')}</div>
                <div class="story-ctrl-grid">
                    <div class="story-ctrl-item">
                        <span class="story-ctrl-icon">🕹️</span>
                        <span>${t('storyCtrlMoveM')}</span>
                    </div>
                    <div class="story-ctrl-item">
                        <span class="story-ctrl-icon">🔄</span>
                        <span>${t('storyCtrlSwitchM')}</span>
                    </div>
                    <div class="story-ctrl-item">
                        <span class="story-ctrl-icon">⚡</span>
                        <span>${t('storyCtrlBoostM')}</span>
                    </div>
                    <div class="story-ctrl-item">
                        <span class="story-ctrl-icon">⏸️</span>
                        <span>${t('storyCtrlPauseM')}</span>
                    </div>
                </div>
            </div>`;
    }
    return `
        <div class="story-controls-block">
            <div class="story-ctrl-title">${t('storyControlsTitle')}</div>
            <div class="story-ctrl-grid">
                <div class="story-ctrl-item">
                    <span class="story-ctrl-key">W A S D</span>
                    <span>${t('storyCtrlMoveD')}</span>
                </div>
                <div class="story-ctrl-item">
                    <span class="story-ctrl-key">TAB</span>
                    <span>${t('storyCtrlSwitchD')}</span>
                </div>
                <div class="story-ctrl-item">
                    <span class="story-ctrl-key">ESPACIO</span>
                    <span>${t('storyCtrlBoostD')}</span>
                </div>
                <div class="story-ctrl-item">
                    <span class="story-ctrl-key">P / ESC</span>
                    <span>${t('storyCtrlPauseD')}</span>
                </div>
            </div>
        </div>`;
}

/**
 * Muestra la pantalla de historia.
 * onComplete: callback que se llama cuando el jugador decide jugar.
 */
function showStoryScreen(onComplete) {
    let slideIdx = 0;
    const totalSlides = STORY_SLIDES.length + 1; // +1 para la pantalla de controles

    const overlay = document.createElement('div');
    overlay.id = 'story-overlay';
    overlay.className = 'story-overlay';

    function _render() {
        const isControlsSlide = slideIdx === STORY_SLIDES.length;
        const progress = Math.round(((slideIdx + 1) / totalSlides) * 100);

        if (isControlsSlide) {
            overlay.innerHTML = `
                <div class="story-box">
                    <div class="story-progress-bar">
                        <div class="story-progress-fill" style="width:${progress}%"></div>
                    </div>
                    <div class="story-slide story-slide-controls">
                        <div class="story-slide-icon">🎮</div>
                        <div class="story-slide-title">${t('storyControlsHeader')}</div>
                        ${_buildControlsHtml()}
                    </div>
                    <div class="story-nav">
                        <button class="story-btn story-btn-back" id="story-back">◄ ${t('storyBack')}</button>
                        <div class="story-dots">
                            ${Array.from({length: totalSlides}, (_, i) =>
                                `<span class="story-dot ${i === slideIdx ? 'active' : ''}"></span>`
                            ).join('')}
                        </div>
                        <button class="story-btn story-btn-play" id="story-play">▶ ${t('storyPlay')}</button>
                    </div>
                </div>
            `;
        } else {
            const slide = STORY_SLIDES[slideIdx];
            const isFirst = slideIdx === 0;
            overlay.innerHTML = `
                <div class="story-box">
                    <div class="story-progress-bar">
                        <div class="story-progress-fill" style="width:${progress}%"></div>
                    </div>
                    <div class="story-slide">
                        <div class="story-slide-icon">${slide.icon}</div>
                        <div class="story-slide-text">${t(slide.textKey)}</div>
                    </div>
                    <div class="story-nav">
                        ${isFirst
                            ? `<button class="story-btn story-btn-skip" id="story-skip">${t('storySkip')}</button>`
                            : `<button class="story-btn story-btn-back" id="story-back">◄ ${t('storyBack')}</button>`
                        }
                        <div class="story-dots">
                            ${Array.from({length: totalSlides}, (_, i) =>
                                `<span class="story-dot ${i === slideIdx ? 'active' : ''}"></span>`
                            ).join('')}
                        </div>
                        <button class="story-btn story-btn-next" id="story-next">${t('storyNext')} ►</button>
                    </div>
                </div>
            `;
        }

        _bindNav();
    }

    function _bindNav() {
        const nextBtn  = overlay.querySelector('#story-next');
        const backBtn  = overlay.querySelector('#story-back');
        const skipBtn  = overlay.querySelector('#story-skip');
        const playBtn  = overlay.querySelector('#story-play');

        if (nextBtn)  nextBtn.onclick  = () => { slideIdx++; _render(); };
        if (backBtn)  backBtn.onclick  = () => { slideIdx--; _render(); };
        if (skipBtn)  skipBtn.onclick  = _finish;
        if (playBtn)  playBtn.onclick  = _finish;
    }

    function _finish() {
        overlay.classList.add('story-fade-out');
        setTimeout(() => {
            overlay.remove();
            window.removeEventListener('keydown', _onKey);
            onComplete();
        }, 350);
    }

    function _onKey(e) {
        if (!document.body.contains(overlay)) {
            window.removeEventListener('keydown', _onKey);
            return;
        }
        if (e.key === 'ArrowRight' || e.key === 'Enter') {
            if (slideIdx < STORY_SLIDES.length) { slideIdx++; _render(); }
            else _finish();
        }
        if (e.key === 'ArrowLeft' && slideIdx > 0) { slideIdx--; _render(); }
        if (e.key === 'Escape') _finish();
    }

    window.addEventListener('keydown', _onKey);
    _render();
    document.body.appendChild(overlay);
}
