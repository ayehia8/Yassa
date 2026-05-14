/* ═══════════════════════════════════════════════════
   HEART 3D — Rotating heart canvas renderer
   ═══════════════════════════════════════════════════ */

function initHeart3D() {
  const canvas = document.getElementById('heart3d');
  const ctx    = canvas.getContext('2d');
  canvas.width  = 300;
  canvas.height = 300;

  const CX = 150, CY = 142, SC = 7;

  /* Build heart surface points */
  const points = [];

  // Outline
  for (let t = 0; t < Math.PI * 2; t += .045) {
    const x =  16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    points.push({ x, y, z: 0, orig: true });
  }

  // Interior fill rings
  for (let t = 0; t < Math.PI * 2; t += .17) {
    const bx =  16 * Math.pow(Math.sin(t), 3);
    const by = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    [.25, .5, .75].forEach(r => points.push({ x: bx * r, y: by * r, z: 0 }));
  }

  // Depth variation for 3D surface
  points.forEach(p => {
    const norm = Math.sqrt(p.x * p.x + p.y * p.y);
    p.z = (norm > 0 ? (1 - norm / 18) * 4 : 4) + Math.random() * 1.5 - 0.75;
  });

  /* Animation loop */
  let angle = 0;

  (function draw() {
    ctx.clearRect(0, 0, 300, 300);
    angle += .018;

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // Project and sort by depth
    const projected = points.map(p => {
      const rx = p.x * cos - p.z * sin;
      const rz = p.x * sin + p.z * cos;
      const ry = p.y;
      const persp = 220 / (220 + rz * 1.5);
      return {
        px: CX + rx * SC * persp,
        py: CY + ry * SC * persp,
        depth: rz,
        persp
      };
    }).sort((a, b) => a.depth - b.depth);

    // Draw each point
    projected.forEach(p => {
      const light = .45 + (p.depth / 18 + .5) * .55;
      const alpha = .35 + light * .6;
      const sz    = p.persp * 2.6;
      const hue   = 345;
      const sat   = 68;
      const lig   = Math.round(48 + light * 30);

      ctx.beginPath();
      ctx.arc(p.px, p.py, sz, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue},${sat}%,${lig}%,${alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  })();
}
