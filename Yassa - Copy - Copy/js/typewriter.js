/* ═══════════════════════════════════════════════════
   TYPEWRITER — Typing animation for letter & modal
   ═══════════════════════════════════════════════════ */

function initTypewriter() {
  const letterEl = document.querySelector('.letter');
  if (!letterEl) return;

  const paragraphs = letterEl.querySelectorAll('p');
  const originals = [];
  paragraphs.forEach(p => {
    originals.push(p.innerHTML);
    p.innerHTML = '';
    p.style.visibility = 'hidden';
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        obs.unobserve(entry.target);
        typeSequence(paragraphs, originals, 0);
      }
    });
  }, { threshold: 0.3 });
  obs.observe(letterEl);
}

function typeSequence(paragraphs, originals, idx) {
  if (idx >= paragraphs.length) return;
  const p = paragraphs[idx];
  const html = originals[idx];
  p.style.visibility = 'visible';
  p.classList.add('typing');

  typeHTML(p, html, 0, () => {
    p.classList.remove('typing');
    setTimeout(() => typeSequence(paragraphs, originals, idx + 1), 300);
  });
}

function typeHTML(el, html, i, cb) {
  if (i >= html.length) { if (cb) cb(); return; }

  // Skip HTML tags — render them instantly
  if (html[i] === '<') {
    const close = html.indexOf('>', i);
    if (close !== -1) {
      el.innerHTML = html.substring(0, close + 1);
      setTimeout(() => typeHTML(el, html, close + 1, cb), 0);
      return;
    }
  }

  el.innerHTML = html.substring(0, i + 1);
  const delay = html[i] === '.' || html[i] === ',' ? 80 : 18 + Math.random() * 22;
  setTimeout(() => typeHTML(el, html, i + 1, cb), delay);
}

function typeModalMessage(el, text, cb) {
  el.textContent = '';
  let i = 0;
  (function next() {
    if (i >= text.length) { if (cb) cb(); return; }
    el.textContent += text[i++];
    setTimeout(next, 30 + Math.random() * 40);
  })();
}
