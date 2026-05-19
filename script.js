(function() {
  let splashDismissed = false;

  function dismissSplash(e) {
    if (splashDismissed) return;
    splashDismissed = true;

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const vid = document.getElementById('bgvideo');
    if (vid) {
      vid.muted = true;
      vid.defaultMuted = true;
      vid.play().then(() => {
        vid.classList.add('loaded');
      }).catch(() => {
        vid.classList.add('loaded');
      });
    }

    const splash = document.getElementById('splash');
    if (splash) {
      splash.classList.add('hide');
      setTimeout(() => splash.remove(), 1000);
    }
  }

  const splashBtn = document.getElementById('splash-btn');
  if (splashBtn) {
    splashBtn.addEventListener('touchend', dismissSplash, { passive: false });
    splashBtn.addEventListener('click', function(e) {
      if (!splashDismissed) dismissSplash(e);
    });
  }

  const container = document.getElementById('particles');
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${Math.random() * 100}%;
      bottom:${Math.random() * 25}%;
      animation-duration:${(Math.random() * 6 + 5).toFixed(1)}s;
      animation-delay:${(Math.random() * 8).toFixed(1)}s;
    `;
    container.appendChild(p);
  }

  document.querySelectorAll('.notif').forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (e.target.closest('#splash')) return;
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        width:${size}px;
        height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
      `;
      btn.style.position = 'relative';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
})();
