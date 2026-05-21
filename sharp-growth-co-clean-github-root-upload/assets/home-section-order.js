(() => {
  const HOME_PATHS = new Set(['/', '']);

  function normalize(text) {
    return (text || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function sectionContainingText(targetText) {
    const target = normalize(targetText);
    const elements = Array.from(document.querySelectorAll('section, div'));
    for (const element of elements) {
      const ownText = normalize(element.textContent);
      if (!ownText.includes(target)) continue;

      const section = element.closest('section');
      if (section) return section;
    }
    return null;
  }

  function moveClientStoryUnderWhy() {
    if (!HOME_PATHS.has(window.location.pathname)) return;

    const whySection = sectionContainingText('Why Sharp Growth Co.');
    const storySection = sectionContainingText('Client Success Story');

    if (!whySection || !storySection || whySection === storySection) return;

    const currentPrevious = storySection.previousElementSibling;
    if (currentPrevious === whySection) return;

    whySection.insertAdjacentElement('afterend', storySection);
    storySection.dataset.sgcHomeOrder = 'client-story-after-why';
  }

  function scheduleMove() {
    requestAnimationFrame(() => {
      moveClientStoryUnderWhy();
      setTimeout(moveClientStoryUnderWhy, 150);
      setTimeout(moveClientStoryUnderWhy, 600);
    });
  }

  document.addEventListener('DOMContentLoaded', scheduleMove, { once: true });
  window.addEventListener('load', scheduleMove);
  window.addEventListener('popstate', scheduleMove);

  const observer = new MutationObserver(scheduleMove);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  scheduleMove();
})();
