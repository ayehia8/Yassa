/* ═══════════════════════════════════════════════════
   LOADING — Cinematic heartbeat loading screen
   ═══════════════════════════════════════════════════ */

function initLoadingScreen() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  let progress = 0;
  const bar = loader.querySelector('.loader-bar-fill');
  const interval = setInterval(() => {
    progress += Math.random() * 5 + 2;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      const text = loader.querySelector('.loader-text');
      if (text) {
        text.textContent = "tap to enter 💘";
        text.style.cursor = "pointer";
      }
      loader.style.cursor = "pointer";
      
      loader.addEventListener('click', () => {
        loader.classList.add('loaded');
        document.body.classList.add('page-ready');
        setTimeout(() => loader.remove(), 1200);
      }, { once: true });
    }
    if (bar) bar.style.width = progress + '%';
  }, 180);
}
