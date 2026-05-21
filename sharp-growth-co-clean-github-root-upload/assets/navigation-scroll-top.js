(function () {
  'use strict';

  function scrollToTop() {
    window.requestAnimationFrame(function () {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });

    window.setTimeout(function () {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 120);

    window.setTimeout(function () {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 450);
  }

  function isTopNavigationElement(element) {
    if (!element) {
      return false;
    }

    var header = element.closest('header');
    var nav = element.closest('nav');
    var text = (element.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
    var isPrimaryTopButton = text === 'book a consultation' || text === 'home' || text === 'services' || text === 'about' || text === 'packages' || text === 'contact';

    return Boolean((header || nav) && isPrimaryTopButton);
  }

  document.addEventListener('click', function (event) {
    var target = event.target && event.target.closest ? event.target.closest('a, button') : null;

    if (!isTopNavigationElement(target)) {
      return;
    }

    scrollToTop();
  }, true);

  window.addEventListener('popstate', scrollToTop);
  window.addEventListener('hashchange', scrollToTop);
})();
