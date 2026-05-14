/* ═══════════════════════════════════════════════════
   COMPONENTS — DOM builders for cards, promises, envelope
   ═══════════════════════════════════════════════════ */

/* ── REASON FLIP CARDS (Glassmorphism) ── */
function buildReasonCards() {
  const grid = document.getElementById('rgrid');
  const delays = ['d1', 'd2', 'd3', 'd1', 'd2', 'd3'];

  REASONS.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = `cw rev ${delays[i]}`;

    card.innerHTML = `
      <div class="ci">
        <div class="cf cfront glass-card">
          <div class="card-shimmer"></div>
          <div class="rnum">${r.n}</div>
          <div class="rtit">${r.t}</div>
          <span class="fhint" style="margin-top:auto">tap to reveal ♡</span>
        </div>
        <div class="cf cback glass-card" style="justify-content:center; align-items:flex-start">
          <div class="card-shimmer"></div>
          <div class="rbtxt" style="text-align:left"><strong style="color:var(--blush);font-size:1.05rem">${r.f}</strong><br><br>${r.b}</div>
        </div>
      </div>`;

    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      const rect = card.getBoundingClientRect();
      burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
      fw(rect.left + rect.width / 2, rect.top + rect.height / 2, 24);
    });

    card.addEventListener('mousemove', (e) => {
      if (card.classList.contains('flipped')) return;
      const rc = card.getBoundingClientRect();
      const x = (e.clientX - rc.left) / rc.width - .5;
      const y = (e.clientY - rc.top) / rc.height - .5;
      card.querySelector('.ci').style.transform =
        `perspective(1200px) rotateY(${x * 24}deg) rotateX(${-y * 16}deg)`;
      // Move shimmer
      const shimmer = card.querySelector('.cfront .card-shimmer');
      if (shimmer) {
        shimmer.style.background =
          `radial-gradient(circle at ${(x + .5) * 100}% ${(y + .5) * 100}%, rgba(212,168,83,.15), transparent 60%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('flipped')) {
        card.querySelector('.ci').style.transform = '';
        const shimmer = card.querySelector('.cfront .card-shimmer');
        if (shimmer) shimmer.style.background = '';
      }
    });

    grid.appendChild(card);
  });
}

/* ── PROMISE LIST ── */
function buildPromiseList() {
  const list = document.getElementById('plist');

  PROMISES.forEach((text, i) => {
    const li = document.createElement('li');
    li.className = `rev d${(i % 5) + 1}`;
    li.innerHTML = `
      <button class="pibtn" aria-label="Seal promise">♡</button>
      <span class="ptext">${text}</span>`;

    const btn = li.querySelector('.pibtn');
    btn.addEventListener('click', () => {
      if (btn.classList.contains('sealed')) return;
      btn.textContent = '♥';
      btn.classList.add('sealed');
      const rc = btn.getBoundingClientRect();
      burst(rc.left + rc.width / 2, rc.top + rc.height / 2, 20);
      fw(rc.left + rc.width / 2, rc.top + rc.height / 2, 30);
    });

    list.appendChild(li);
  });
}

/* ── ENVELOPE ── */
function initEnvelope() {
  const envwrap = document.getElementById('envwrap');
  const env = document.getElementById('env');
  const ehint = document.getElementById('ehint');
  let isOpen = false;

  envwrap.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
      env.classList.add('open');
      ehint.textContent = 'tap to close';
      const r = envwrap.getBoundingClientRect();
      fw(r.left + r.width / 2, r.top + r.height / 2, 55);
      burst(r.left + r.width / 2, r.top + r.height / 2, 24);
    } else {
      env.classList.remove('open');
      ehint.textContent = 'tap to open';
    }
  });
}

/* ── FAVORITES GRID ── */
function buildFavorites() {
  const grid = document.getElementById('favgrid');
  if (!grid) return;
  const delays = ['d1', 'd2', 'd3', 'd1', 'd2', 'd3'];

  FAVORITES.forEach((f, i) => {
    const card = document.createElement('div');
    card.className = `fav-item glass-card rev ${delays[i]}`;
    card.innerHTML = `
      <span class="fav-icon">${f.icon}</span>
      <h3 class="fav-title">${f.title}</h3>
      <p class="fav-text">${f.text}</p>`;
    card.addEventListener('mouseenter', () => {
      const rc = card.getBoundingClientRect();
      burst(rc.left + rc.width / 2, rc.top + rc.height / 2, 6);
    });
    grid.appendChild(card);
  });
}

/* ── DREAMS TIMELINE ── */
function buildDreams() {
  const list = document.getElementById('dreamlist');
  if (!list) return;

  DREAMS.forEach((d, i) => {
    const item = document.createElement('div');
    item.className = `dream-item rev d${(i % 5) + 1}`;
    item.innerHTML = `
      <div class="dream-dot"><span>${d.icon}</span></div>
      <div class="dream-content">
        <p>${d.text}</p>
      </div>`;
    list.appendChild(item);
  });
}
