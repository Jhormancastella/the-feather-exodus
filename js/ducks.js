// --- PATOS: spawn, física, animación, muerte, switch ---

function spawnDuck(type) {
    const el = document.createElement('div');
    el.className = 'duck';
    el.innerHTML = '<div class="duck-health"><div class="duck-health-fill"></div></div>';
    DOM.gameContainer.appendChild(el);

    const duck = {
        el, type,
        x: 50 + Math.random() * (DOM.gameContainer.offsetWidth  - 100),
        y: 100 + Math.random() * 200,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        dir: 1, frame: 0,
        alive: true, health: 100, invincible: 0,
        fallInterval: null
    };
    _applySprite(duck, SPRITES[type].fly[0]);
    state.game.ducks.push(duck);
}

function _applySprite(duck, coord) {
    duck.el.style.backgroundPosition = `${coord.bx}px ${coord.by}px`;
}

function updatePhysics() {
    const g   = state.game;
    const joy = state.joystick;
    const limitW   = DOM.gameContainer.offsetWidth  - SW;
    const limitH   = DOM.gameContainer.offsetHeight - SH;
    // En móvil reservar espacio para los controles táctiles
    const mobileCtrl = document.getElementById('mobile-controls');
    const ctrlH = (mobileCtrl && mobileCtrl.offsetHeight > 0) ? mobileCtrl.offsetHeight : 0;
    const groundY  = limitH - Math.max(70, ctrlH + 10);
    const ceilingY = 70;

    g.ducks.forEach((duck, idx) => {
        if (!duck.alive) return;

        if (g.transitioning) {
            duck.x += duck.vx;
            duck.y += duck.vy;
            duck.el.style.left = duck.x + 'px';
            duck.el.style.top  = duck.y + 'px';
            return;
        }

        let ix = 0, iy = 0;

        if (idx === g.currentDuckIdx) {
            if (g.keys['w'] || g.keys['arrowup'])    iy = -1;
            if (g.keys['s'] || g.keys['arrowdown'])  iy =  1;
            if (g.keys['a'] || g.keys['arrowleft'])  ix = -1;
            if (g.keys['d'] || g.keys['arrowright']) ix =  1;
            if (joy.active) { ix = joy.dx; iy = joy.dy; }

            const boosting = g.keys[' '] && g.boost > 0;
            const speed = boosting ? 4.5 : 2.5;
            if (ix !== 0 || iy !== 0) {
                duck.vx = ix * speed;
                duck.vy = iy * speed;
                if (boosting) {
                    g.boost -= 0.5;
                    // Invencibilidad mientras dura el boost — el cazador no puede impactar
                    duck.invincible = Math.max(duck.invincible, 1.5);
                }
            }
            if (ix > 0) duck.dir =  1;
            if (ix < 0) duck.dir = -1;
        } else {
            // 🦆 FLOCK FOLLOW: Los patos NPC siguen al pato controlado con comportamiento orgánico
            const playerDuck = g.ducks[g.currentDuckIdx];
            if (playerDuck && playerDuck.alive) {
                _updateFlockBehavior(duck, idx, playerDuck, g.ducks);
            } else {
                // Comportamiento aleatorio si no hay líder
                if (Math.abs(duck.vx) < 0.3) duck.vx = Math.random() > 0.5 ? 1 : -1;
                if (Math.random() < 0.03)    duck.vy = (Math.random() - 0.5) * 2;
            }
            duck.dir = duck.vx > 0 ? 1 : -1;
        }

        duck.x += duck.vx;
        duck.y += duck.vy;

        if (duck.x <= 0)      { duck.x = 0;      duck.vx =  Math.abs(duck.vx); duck.dir =  1; }
        if (duck.x >= limitW) { duck.x = limitW; duck.vx = -Math.abs(duck.vx); duck.dir = -1; }
        if (duck.y <= ceilingY) { duck.y = ceilingY; duck.vy =  Math.abs(duck.vy); }
        if (duck.y >= groundY)  { duck.y = groundY;  duck.vy = -Math.abs(duck.vy); }

        duck.el.style.left      = duck.x + 'px';
        duck.el.style.top       = duck.y + 'px';
        duck.el.style.transform = duck.dir === -1 ? 'scaleX(-1)' : 'scaleX(1)';

        if (duck.invincible > 0) {
            duck.invincible -= 0.5;
            duck.el.style.opacity = (Math.floor(duck.invincible) % 2 === 0) ? '0.5' : '1';
        } else {
            duck.el.style.opacity = '1';
        }
    });

    if (!g.keys[' '] && g.boost < 100) g.boost = Math.min(100, g.boost + 0.2);
}

// 🦆 SISTEMA DE BANDADA: Comportamiento orgánico de seguimiento
function _updateFlockBehavior(duck, idx, playerDuck, allDucks) {
    // Cada pato NPC sigue al jugador o al pato anterior en la formación
    const target = (idx === 0) ? playerDuck : allDucks[idx - 1];
    if (!target || !target.alive) return;

    // Distancia objetivo: separación natural en formación en V
    const desiredDist = 55 + (idx * 8); // Más lejos = más atrás en la formación
    const dx = target.x - duck.x;
    const dy = target.y - duck.y;
    const dist = Math.hypot(dx, dy);

    // 🎯 ATRACCIÓN: Si está lejos, se acerca suavemente
    if (dist > desiredDist) {
        const force = 0.03 + (idx * 0.005); // Los de atrás siguen con más delay
        duck.vx += (dx / dist) * force;
        duck.vy += (dy / dist) * force;
    }
    // 🚫 REPULSIÓN: Si está muy cerca, se aleja para no amontonarse
    else if (dist < 30) {
        duck.vx -= (dx / dist) * 0.08;
        duck.vy -= (dy / dist) * 0.08;
    }

    // 🔄 SEPARACIÓN: Evitar colisión con otros patos NPC (comportamiento de bandada)
    allDucks.forEach((other, i) => {
        if (i === idx || i === state.game.currentDuckIdx || !other.alive) return;
        const sepX = duck.x - other.x;
        const sepY = duck.y - other.y;
        const sepDist = Math.hypot(sepX, sepY);
        if (sepDist < 35 && sepDist > 0) {
            // Fuerza de separación suave
            duck.vx += (sepX / sepDist) * 0.04;
            duck.vy += (sepY / sepDist) * 0.04;
        }
    });

    // ⚡ COHESIÓN: Tendencia a mantenerse cerca del centro de la bandada
    if (dist > desiredDist * 1.5) {
        duck.vx += (dx / dist) * 0.02;
        duck.vy += (dy / dist) * 0.02;
    }

    // 🎮 SINCRONIZACIÓN DE VELOCIDAD: La bandada acelera si el jugador usa boost
    const playerBoosting = state.game.keys[' '] && state.game.boost > 0;
    if (playerBoosting) {
        // Los NPCs aceleran para no quedarse atrás durante el boost
        const boostFollow = 0.8; // 80% de la velocidad del boost
        if (Math.abs(duck.vx) < 4) duck.vx += Math.sign(dx) * 0.1;
        if (Math.abs(duck.vy) < 4) duck.vy += Math.sign(dy) * 0.1;
    }

    // 🧭 LIMITAR VELOCIDAD MÁXIMA de NPCs (para que el jugador pueda superarlos si quiere)
    const maxSpeed = playerBoosting ? 4 : 2.8;
    const currentSpeed = Math.hypot(duck.vx, duck.vy);
    if (currentSpeed > maxSpeed) {
        duck.vx = (duck.vx / currentSpeed) * maxSpeed;
        duck.vy = (duck.vy / currentSpeed) * maxSpeed;
    }
}

function updateAllSprites() {
    state.game.ducks.forEach(duck => {
        if (!duck.alive) return;
        duck.frame = (duck.frame + 1) % 3;
        _applySprite(duck, SPRITES[duck.type].fly[duck.frame]);
    });
}

// Función utilitaria compartida para color de barra de vida
function healthColor(hp) {
    if (hp < 40) return 'red';
    if (hp < 70) return 'orange';
    return '#0f0';
}

function damageDuck(duck, amount) {
    duck.health -= amount;
    duck.invincible = 0.5;
    const fill = duck.el.querySelector('.duck-health-fill');
    if (fill) {
        fill.style.width      = Math.max(0, duck.health) + '%';
        fill.style.background = healthColor(duck.health);
    }
    if (duck.health <= 0) killDuck(duck);
}

function killDuck(duck) {
    duck.alive = false;
    duck.el.classList.remove('controlled');
    duck.el.style.transform = 'none';
    _applySprite(duck, SPRITES[duck.type].falling[0]);
    playSound('fall');  // Solo sonido de caída, sin risa

    let fallY     = duck.y;
    let fallFrame = 0;
    duck.fallInterval = setInterval(() => {
        fallY += 4;
        fallFrame = (fallFrame + 1) % 2;
        _applySprite(duck, SPRITES[duck.type].falling[fallFrame]);
        duck.el.style.top = fallY + 'px';
        if (fallY > DOM.gameContainer.offsetHeight) {
            clearInterval(duck.fallInterval);
            duck.fallInterval = null;
            duck.el.style.display = 'none';
        }
    }, 60);

    if (state.game.ducks[state.game.currentDuckIdx] === duck) switchToNextDuck();
    updateHUD();
    if (state.game.ducks.filter(d => d.alive).length === 0) endGame();
}

function switchToNextDuck() {
    const g = state.game;
    let next     = (g.currentDuckIdx + 1) % g.ducks.length;
    let attempts = 0;
    while (!g.ducks[next].alive && attempts < g.ducks.length) {
        next = (next + 1) % g.ducks.length;
        attempts++;
    }
    if (g.ducks[next].alive) {
        g.ducks[g.currentDuckIdx].el.classList.remove('controlled');
        g.currentDuckIdx = next;
        g.ducks[g.currentDuckIdx].el.classList.add('controlled');
        updateControlIndicator();
    }
}
