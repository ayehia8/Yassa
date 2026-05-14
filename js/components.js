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
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Reveal reason ${r.n}`);

    card.innerHTML = `
      <div class="ci">
        <div class="cf cfront glass-card">
          <div class="card-shimmer"></div>
          <div class="rnum">${r.n}</div>
        </div>
        <div class="cf cback glass-card">
          <div class="card-shimmer"></div>
          <div class="rbtxt">${r.b}</div>
        </div>
      </div>`;

    const flipCard = () => {
      card.querySelector('.ci').style.transform = '';
      card.classList.toggle('flipped');
      const rect = card.getBoundingClientRect();
      burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
      fw(rect.left + rect.width / 2, rect.top + rect.height / 2, 24);
      card.setAttribute('aria-label', card.classList.contains('flipped') ? `Hide reason ${r.n}` : `Reveal reason ${r.n}`);
    };

    card.addEventListener('click', flipCard);

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flipCard();
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
    const number = String(i + 1).padStart(2, '0');
    card.className = `cw fav-card rev ${delays[i]}`;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Reveal favorite ${number}`);

    card.innerHTML = `
      <div class="ci">
        <div class="cf cfront glass-card">
          <div class="card-shimmer"></div>
          <div class="rnum">${number}</div>
        </div>
        <div class="cf cback glass-card">
          <div class="card-shimmer"></div>
          <p class="fav-text">${f.text}</p>
        </div>
      </div>`;

    const flipCard = () => {
      card.classList.toggle('flipped');
      const rc = card.getBoundingClientRect();
      burst(rc.left + rc.width / 2, rc.top + rc.height / 2, 16);
      fw(rc.left + rc.width / 2, rc.top + rc.height / 2, 24);
      card.setAttribute('aria-label', card.classList.contains('flipped') ? `Hide favorite ${number}` : `Reveal favorite ${number}`);
    };

    card.addEventListener('click', flipCard);

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flipCard();
      }
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
