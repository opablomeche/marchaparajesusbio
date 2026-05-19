(function() {
  const vid = document.getElementById('bgvideo');
  if (!vid) return;
  vid.muted = true;
  vid.defaultMuted = true;
  vid.setAttribute('muted', '');
  vid.setAttribute('playsinline', '');
  vid.setAttribute('disablepictureinpicture', '');
  vid.setAttribute('disableremoteplayback', '');

  function play() {
    if (vid.paused) vid.play().catch(() => {});
  }

  vid.addEventListener('loadedmetadata', play);
  vid.addEventListener('canplay', play);
  document.addEventListener('touchstart', play, { once: true });
  setInterval(play, 2000);

  const container = document.getElementById('particles');
  if (container) {
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
  }

  document.querySelectorAll('.notif').forEach(btn => {
    btn.addEventListener('click', function(e) {
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
