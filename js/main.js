/* ═══════════════════════════════════════════════════
   MAIN — Entry point: modal, parallax, scroll reveal, sound
   ═══════════════════════════════════════════════════ */

let mIdx = 0;

/* ── MODAL (big heart → love message) ── */
function initModal() {
  const overlay = document.getElementById('overlay');
  const mtxt    = document.getElementById('mtxt');

  document.getElementById('bh').addEventListener('click', function () {
    const msg = MSGS[mIdx++ % MSGS.length];
    overlay.classList.add('on');
    typeModalMessage(mtxt, msg);

    const r = this.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top  + r.height / 2;
    fw(cx, cy, 80);
    burst(cx, cy, 22);
  });

  document.getElementById('mclose').addEventListener('click', () => overlay.classList.remove('on'));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('on'); });
}

/* ── HERO PARALLAX ── */
function initParallax() {
  const heroName = document.getElementById('hname');

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - .5) * 26;
    const y = (e.clientY / window.innerHeight - .5) * 16;
    heroName.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg)`;
  });

  document.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    const x = (t.clientX / window.innerWidth  - .5) * 15;
    const y = (t.clientY / window.innerHeight - .5) * 10;
    heroName.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg)`;
  }, { passive: true });
}

/* ── SCROLL REVEAL (IntersectionObserver) ── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('on'); observer.unobserve(e.target); }
    });
  }, { threshold: .07 });
  document.querySelectorAll('.rev').forEach(el => observer.observe(el));
}


function playHeartbeat(ctx) {
  function beat() {
    if (ctx.state !== 'running') return;
    const now = ctx.currentTime;
    // First thump
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.frequency.value = 60;
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc1.connect(gain1).connect(ctx.destination);
    osc1.start(now); osc1.stop(now + 0.15);
    // Second thump
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.frequency.value = 50;
    gain2.gain.setValueAtTime(0.1, now + 0.2);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc2.connect(gain2).connect(ctx.destination);
    osc2.start(now + 0.2); osc2.stop(now + 0.35);

    setTimeout(beat, 1200);
  }
  beat();
}

function initMagneticHover() {
  const magnets = document.querySelectorAll('#sound-toggle, .nav-card, .bhbtn');
  magnets.forEach((el) => {
    el.addEventListener('mousemove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const strength = 0.12;
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0) scale(1.01)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* ── ANIMATED DIVIDERS ── */
function initAnimatedDividers() {
  const dividers = document.querySelectorAll('.gline-animated');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('animate'); obs.unobserve(e.target); }
    });
  }, { threshold: .5 });
  dividers.forEach(d => obs.observe(d));
}

/* ── INIT ALL ── */
function init() {
  initLoadingScreen();

  // Effects
  initHeartCursor();
  initFireworks();
  initStarfield();       // replaces initBackgroundCanvas
  initFloatingHearts();
  initHeart3D();
  initProgressBar();
  initSectionParallax();

  // Components
  buildReasonCards();
  buildPromiseList();
  buildFavorites();
  buildDreams();
  initEnvelope();

  // Page behaviour
  initModal();
  initParallax();
  initScrollReveal();
  initTypewriter();
  initMagneticHover();
  initAnimatedDividers();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
