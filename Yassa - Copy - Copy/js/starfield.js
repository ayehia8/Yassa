/* ═══════════════════════════════════════════════════
   STARFIELD — Parallax stars + aurora background
   ═══════════════════════════════════════════════════ */

function initStarfield() {
  const canvas = document.getElementById('bgc');
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  // Stars
  const stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * 3000 - 500,
    y: Math.random() * 5000 - 500,
    r: .3 + Math.random() * 2,
    speed: .05 + Math.random() * .2,
    twinkle: Math.random() * Math.PI * 2,
    twinkleSpeed: .01 + Math.random() * .03,
    hue: 330 + Math.random() * 40
  }));

  // Aurora params
  let auroraPhase = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const scrollY = window.scrollY || 0;

    // Aurora glow
    auroraPhase += .003;
    const ay = H * .3 + Math.sin(auroraPhase) * H * .1;
    const grad = ctx.createRadialGradient(W * .5, ay - scrollY * .1, 0, W * .5, ay - scrollY * .1, W * .7);
    grad.addColorStop(0, `hsla(${340 + Math.sin(auroraPhase * .7) * 15}, 70%, 45%, .12)`);
    grad.addColorStop(.4, `hsla(${30 + Math.sin(auroraPhase * .5) * 20}, 65%, 50%, .06)`);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Second aurora
    const grad2 = ctx.createRadialGradient(W * .7, H * .6 - scrollY * .05, 0, W * .7, H * .6 - scrollY * .05, W * .5);
    grad2.addColorStop(0, `hsla(${345 + Math.cos(auroraPhase) * 10}, 60%, 40%, .08)`);
    grad2.addColorStop(1, 'transparent');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, W, H);

    // Stars with parallax
    stars.forEach(s => {
      s.twinkle += s.twinkleSpeed;
      const alpha = .3 + Math.sin(s.twinkle) * .4 + .3;
      const px = ((s.x - scrollY * s.speed * .3) % (W + 100) + W + 100) % (W + 100) - 50;
      const py = ((s.y - scrollY * s.speed) % (H * 3 + 100) + H * 3 + 100) % (H * 3 + 100) - 50;

      if (py < -20 || py > H + 20) return;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `hsl(${s.hue}, 60%, 80%)`;
      ctx.beginPath();
      ctx.arc(px, py, s.r, 0, Math.PI * 2);
      ctx.fill();

      // Glow for bigger stars
      if (s.r > 1.2) {
        ctx.globalAlpha = alpha * .3;
        ctx.shadowColor = `hsl(${s.hue}, 70%, 70%)`;
        ctx.shadowBlur = s.r * 6;
        ctx.beginPath();
        ctx.arc(px, py, s.r * .5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();
    });

    requestAnimationFrame(draw);
  }
  draw();
}
