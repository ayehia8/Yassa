/* ═══════════════════════════════════════════════════
   EFFECTS — Cursor, sparkles, fireworks, progress bar
   ═══════════════════════════════════════════════════ */

/* ── HEART CURSOR + TRAIL ── */
function initHeartCursor() {
  const hcur = document.getElementById('hcur');
  let lastT = 0;

  document.addEventListener('mousemove', (e) => {
    hcur.style.left = e.clientX + 'px';
    hcur.style.top  = e.clientY + 'px';

    const now = Date.now();
    if (now - lastT > 100) {
      lastT = now;
      spawnTrail(e.clientX, e.clientY);
    }
  });

  document.addEventListener('click', (e) => {
    burst(e.clientX, e.clientY, 10);
    spawnTrail(e.clientX, e.clientY);
  });
}

function spawnTrail(x, y) {
  const el = document.createElement('div');
  el.className = 'trail';
  el.textContent = '♥';
  el.style.cssText =
    `left:${x}px;top:${y}px;` +
    `font-size:${7 + Math.random() * 10}px;` +
    `color:hsl(${338 + Math.random() * 22},72%,${56 + Math.random() * 24}%)`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 920);
}

/* ── SPARKLE BURST ── */
function burst(x, y, n = 10) {
  for (let i = 0; i < n; i++) {
    const s = document.createElement('div');
    s.className = 'spk';
    const a = (Math.PI * 2 * i / n) + Math.random() * .4;
    const d = 30 + Math.random() * 55;
    s.style.cssText =
      `left:${x}px;top:${y}px;` +
      `width:${3 + Math.random() * 5}px;height:${3 + Math.random() * 5}px;` +
      `background:${Math.random() > .5 ? 'var(--gold)' : 'var(--rose2)'}`;
    s.style.setProperty('--dx', Math.cos(a) * d + 'px');
    s.style.setProperty('--dy', Math.sin(a) * d + 'px');
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 700);
  }
}

/* ── FIREWORKS CANVAS ── */
const fwCanvas = document.getElementById('fwc');
const fwCtx    = fwCanvas.getContext('2d');
let fwParticles = [];
let fwRunning   = false;
const FW_COLORS = ['#d45e79','#e16c8c','#d8b56f','#f7d2da','#f0c878','#ff8ca6','#ffd2e1'];

function initFireworks() {
  fwCanvas.width = window.innerWidth; fwCanvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    fwCanvas.width = window.innerWidth; fwCanvas.height = window.innerHeight;
  });
}

function fw(cx, cy, n = 50) {
  for (let i = 0; i < n; i++) {
    const a = Math.PI * 2 * Math.random();
    const sp = 2.8 + Math.random() * 8.5;
    fwParticles.push({
      x: cx, y: cy,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp - 2.8,
      life: 1,
      dec: .011 + Math.random() * .018,
      sz: 2.8 + Math.random() * 5.2,
      gravity: .07 + Math.random() * .08,
      drag: .958 + Math.random() * .02,
      col: FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)],
      heart: Math.random() > .55
    });
  }
  if (!fwRunning) runFW();
}

function runFW() {
  fwRunning = true;
  (function loop() {
    fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
    fwParticles = fwParticles.filter(p => p.life > 0);
    fwParticles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.life -= p.dec;
      fwCtx.save(); fwCtx.globalAlpha = Math.max(0, p.life * 1.05); fwCtx.fillStyle = p.col;
      if (p.heart) {
        const s = p.sz;
        fwCtx.translate(p.x, p.y); fwCtx.beginPath(); fwCtx.moveTo(0, s * .4);
        fwCtx.bezierCurveTo(s * 1.3, -s * .55, s * 2.4, s * .4, 0, s * 2);
        fwCtx.bezierCurveTo(-s * 2.4, s * .4, -s * 1.3, -s * .55, 0, s * .4);
        fwCtx.fill();
      } else {
        fwCtx.beginPath(); fwCtx.arc(p.x, p.y, p.sz / 2, 0, Math.PI * 2); fwCtx.fill();
      }
      fwCtx.restore();
    });
    if (fwParticles.length > 0) requestAnimationFrame(loop);
    else { fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height); fwRunning = false; }
  })();
}

/* ── FLOATING HEART EMOJIS ── */
function initFloatingHearts() {
  const wrap = document.getElementById('fhwrap');
  ['♥','♡','❤','💕','💗','💖'].forEach(emoji => {
    for (let j = 0; j < 4; j++) {
      const el = document.createElement('div'); el.className = 'fh'; el.textContent = emoji;
      el.style.cssText =
        `font-size:${.7 + Math.random() * 1.3}rem;left:${Math.random() * 100}%;` +
        `animation-duration:${13 + Math.random() * 15}s;animation-delay:${Math.random() * 15}s;` +
        `color:hsl(${335 + Math.random() * 25},65%,${54 + Math.random() * 22}%)`;
      wrap.appendChild(el);
    }
  });
}

/* ── SCROLL PROGRESS BAR ── */
function initProgressBar() {
  const bar = document.getElementById('scroll-progress-fill');
  const heartIcon = document.getElementById('scroll-heart');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.min(scrollTop / docHeight * 100, 100);
    bar.style.width = pct + '%';
    if (heartIcon) {
      heartIcon.style.left = pct + '%';
      heartIcon.style.opacity = pct > 1 ? '1' : '0';
    }
  }, { passive: true });
}

/* ── SECTION PARALLAX DEPTH ── */
function initSectionParallax() {
  const sections = document.querySelectorAll('.parallax-section');
  if (!sections.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (center - window.innerHeight / 2) * .03;
      sec.style.transform = `translateY(${offset}px)`;
    });
  }, { passive: true });
}
