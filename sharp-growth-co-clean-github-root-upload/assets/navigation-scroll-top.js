(function () {
  'use strict';

  var INTERNAL_PAGE_PATHS = {
    '/': '/',
    '/home': '/',
    '/services': '/services/',
    '/about': '/about/',
    '/packages': '/packages/',
    '/contact': '/contact/',
    '/work': '/work/',
    '/thank-you': '/thank-you/'
  };

  function withoutTrailingSlash(pathname) {
    if (!pathname || pathname === '/') {
      return '/';
    }
    return pathname.replace(/\/+$/, '') || '/';
  }

  function normalizeInternalHref(href) {
    if (!href) {
      return null;
    }

    var url;
    try {
      url = new URL(href, window.location.origin);
    } catch (error) {
      return null;
    }

    if (url.origin !== window.location.origin) {
      return null;
    }

    var normalizedPath = withoutTrailingSlash(url.pathname);
    var canonicalPath = INTERNAL_PAGE_PATHS[normalizedPath];
    if (!canonicalPath) {
      return null;
    }

    return canonicalPath + url.search + url.hash;
  }

  function scrollToTop() {
    var html = document.documentElement;
    var previousBehavior = html.style.scrollBehavior;

    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);

    window.requestAnimationFrame(function () {
      window.scrollTo(0, 0);
    });

    window.setTimeout(function () {
      window.scrollTo(0, 0);
      html.style.scrollBehavior = previousBehavior;
    }, 80);
  }

  function shouldIgnoreClick(event, anchor) {
    return Boolean(
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      anchor.hasAttribute('download') ||
      (anchor.getAttribute('target') || '').toLowerCase() === '_blank'
    );
  }

  document.addEventListener('click', function (event) {
    var anchor = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!anchor || shouldIgnoreClick(event, anchor)) {
      return;
    }

    var destination = normalizeInternalHref(anchor.getAttribute('href'));
    if (!destination) {
      return;
    }

    var current = withoutTrailingSlash(window.location.pathname) + window.location.search + window.location.hash;
    var destinationComparable = withoutTrailingSlash(new URL(destination, window.location.origin).pathname) + new URL(destination, window.location.origin).search + new URL(destination, window.location.origin).hash;

    event.preventDefault();
    event.stopImmediatePropagation();

    if (current === destinationComparable) {
      scrollToTop();
      return;
    }

    scrollToTop();
    window.location.assign(destination);
  }, true);

  window.addEventListener('pageshow', scrollToTop);
  window.addEventListener('popstate', scrollToTop);
  window.addEventListener('hashchange', scrollToTop);
})();
