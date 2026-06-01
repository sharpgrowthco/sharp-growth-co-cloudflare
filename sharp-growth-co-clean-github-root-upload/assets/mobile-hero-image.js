(() => {
  function enhanceHomeHeroImage() {
    if (window.location.pathname !== '/' && window.location.pathname !== '') return;

    const candidates = Array.from(document.images).filter((img) => {
      const src = img.currentSrc || img.src || '';
      const alt = img.alt || '';
      return src.includes('homepage-hero-laptop') || src.includes('HomepageHero') || alt.toLowerCase().includes('homepage hero') || alt.toLowerCase().includes('laptop website design');
    });

    const heroImage = candidates[0];
    if (!heroImage) return;

    heroImage.dataset.sgcHomeHero = 'true';
    heroImage.style.objectFit = window.innerWidth <= 767 ? 'cover' : '';
    heroImage.style.objectPosition = window.innerWidth <= 767 ? 'left center' : '';

    const section = heroImage.closest('section') || heroImage.parentElement;
    if (section) section.classList.add('sgc-mobile-home-hero');
  }

  document.addEventListener('DOMContentLoaded', enhanceHomeHeroImage, { once: true });
  window.addEventListener('load', enhanceHomeHeroImage);
  window.addEventListener('resize', enhanceHomeHeroImage);
  const observer = new MutationObserver(enhanceHomeHeroImage);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  enhanceHomeHeroImage();
})();
