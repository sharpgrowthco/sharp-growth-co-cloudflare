(() => {
  const BANNER_URL = '/assets/alberta-marketing-agency-mountain-hero-banner.webp';
  const BANNER_ALT = 'Premium Alberta marketing agency mountain hero banner for local business growth pages.';
  const TARGET_HEADINGS = [
    'Full-service marketing, done for you.',
    'Built for Alberta businesses ready to show up and stand out.',
    'Packages built for every stage of growth.',
    'Apply to work together.'
  ];

  const normalize = (value) => String(value || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const targetSet = new Set(TARGET_HEADINGS.map(normalize));

  function enhanceBanner(section) {
    if (!section || section.dataset.sgBannerEnhanced === 'true') return;

    section.dataset.sgBannerEnhanced = 'true';
    section.classList.add('sg-alberta-page-banner');
    section.setAttribute('role', 'img');
    section.setAttribute('aria-label', BANNER_ALT);
    Object.assign(section.style, {
      backgroundColor: 'oklch(0.185 0.025 55)',
      backgroundImage: `linear-gradient(rgba(23, 18, 14, 0.60), rgba(23, 18, 14, 0.60)), url("${BANNER_URL}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      isolation: 'isolate'
    });

    section.querySelectorAll('h1, p, span').forEach((element) => {
      element.style.textShadow = '0 2px 14px rgba(0, 0, 0, 0.58)';
    });
  }

  function applyBannerImages() {
    document.querySelectorAll('h1').forEach((heading) => {
      const headingText = normalize(heading.textContent);
      if (!targetSet.has(headingText)) return;
      const section = heading.closest('section');
      enhanceBanner(section);
    });
  }

  applyBannerImages();
  window.addEventListener('load', applyBannerImages);
  window.addEventListener('popstate', () => setTimeout(applyBannerImages, 80));

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  history.pushState = function (...args) {
    const result = originalPushState.apply(this, args);
    setTimeout(applyBannerImages, 80);
    return result;
  };
  history.replaceState = function (...args) {
    const result = originalReplaceState.apply(this, args);
    setTimeout(applyBannerImages, 80);
    return result;
  };

  const observer = new MutationObserver(() => applyBannerImages());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
