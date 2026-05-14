/* ═══════════════════════════════════════════════════
   AUDIO — Persistent background music across pages
   ═══════════════════════════════════════════════════ */

function initPersistentAudio() {
  const btn = document.getElementById('sound-toggle');
  const bgmusic = document.getElementById('bgmusic');
  
  if (!bgmusic) return;

  let isPlaying = sessionStorage.getItem('bgmusic_playing') === 'true';
  const savedTime = sessionStorage.getItem('bgmusic_time');

  if (savedTime) {
    bgmusic.currentTime = parseFloat(savedTime);
  }

  function updateButton() {
    if (!btn) return;
    btn.textContent = isPlaying ? '♫' : '♪';
    if (isPlaying) {
      btn.classList.add('sound-on');
    } else {
      btn.classList.remove('sound-on');
    }
  }

  // Sync state to sessionStorage
  bgmusic.addEventListener('timeupdate', () => {
    sessionStorage.setItem('bgmusic_time', bgmusic.currentTime);
  });

  bgmusic.addEventListener('play', () => {
    isPlaying = true;
    sessionStorage.setItem('bgmusic_playing', 'true');
    updateButton();
  });

  bgmusic.addEventListener('pause', () => {
    isPlaying = false;
    sessionStorage.setItem('bgmusic_playing', 'false');
    updateButton();
  });

  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (bgmusic.paused) {
        bgmusic.play().catch(console.error);
      } else {
        bgmusic.pause();
      }
    });
  }

  // Auto-resume if it was playing on the previous page
  if (isPlaying) {
    bgmusic.muted = false;
    bgmusic.volume = 1;
    bgmusic.play().catch(() => {
      // If blocked, wait for user interaction
      const engage = () => {
        bgmusic.play();
        document.removeEventListener('click', engage);
      };
      document.addEventListener('click', engage, { once: true });
    });
  } else {
    // If it wasn't playing, try to play on first click if there's no stored state
    if (sessionStorage.getItem('bgmusic_playing') === null) {
      const engage = () => {
        bgmusic.play();
        document.removeEventListener('click', engage);
      };
      document.addEventListener('click', engage, { once: true });
    }
  }

  updateButton();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPersistentAudio);
} else {
  initPersistentAudio();
}
