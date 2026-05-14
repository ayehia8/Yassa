/* ═══════════════════════════════════════════════════
   LOADING — Cinematic heartbeat loading screen
   ═══════════════════════════════════════════════════ */

function initLoadingScreen() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const params = new URLSearchParams(window.location.search);
  const shouldSkip = params.get('skipLoader') === '1' || sessionStorage.getItem('intro_seen') === 'true';

  if (shouldSkip) {
    document.body.classList.add('page-ready');
    loader.remove();

    if (params.get('skipLoader') === '1') {
      params.delete('skipLoader');
      const cleanUrl = `${window.location.pathname}${params.toString() ? `?${params}` : ''}${window.location.hash}`;
      window.history.replaceState({}, '', cleanUrl);
    }

    return;
  }

  let progress = 0;
  const bar = loader.querySelector('.loader-bar-fill');
  const interval = setInterval(() => {
    progress += Math.random() * 5 + 2;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      const text = loader.querySelector('.loader-text');
      if (text) {
        text.textContent = "tap to enter ♡";
        text.style.cursor = "pointer";
      }
      loader.style.cursor = "pointer";
      
      loader.addEventListener('click', () => {
        loader.classList.add('loaded');
        document.body.classList.add('page-ready');
        sessionStorage.setItem('intro_seen', 'true');
        setTimeout(() => loader.remove(), 1200);
      }, { once: true });
    }
    if (bar) bar.style.width = progress + '%';
  }, 180);
}
