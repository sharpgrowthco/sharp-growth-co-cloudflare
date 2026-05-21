(function () {
  'use strict';

  var BANNER_IMAGE = '/assets/banner-bottom-with-text-ready-to-begin.png';
  var BANNER_LABEL = 'Ready to Begin';
  var BACKGROUND_DESCRIPTION = 'Sharp Growth Co. Ready to Begin banner with laptop growth chart and warm brand background';

  function normalize(text) {
    return (text || '').replace(/\s+/g, ' ').trim();
  }

  function sectionLooksLikeReadyToBegin(section) {
    if (!section) {
      return false;
    }

    var label = section.querySelector('.section-label');
    var labelText = label ? normalize(label.textContent) : '';
    var headingText = Array.prototype.slice.call(section.querySelectorAll('h1,h2,h3')).map(function (heading) {
      return normalize(heading.textContent);
    }).join(' ');
    var fullText = normalize(section.textContent);

    return labelText === BANNER_LABEL ||
      headingText.indexOf('Ready to grow with intention?') !== -1 ||
      fullText.indexOf(BANNER_LABEL) !== -1;
  }

  function isReadyToBeginSection(section) {
    if (!section || section.dataset.readyToBeginBannerChecked === 'true') {
      return false;
    }

    return sectionLooksLikeReadyToBegin(section);
  }

  function enhanceSection(section) {
    section.classList.add('ready-to-begin-image-banner');
    section.dataset.readyToBeginBannerChecked = 'true';
    section.dataset.backgroundImage = BANNER_IMAGE;
    section.dataset.backgroundImageAlt = BACKGROUND_DESCRIPTION;
    section.setAttribute('aria-label', 'Ready to Begin consultation banner for Sharp Growth Co. Alberta marketing agency');

    var content = section.querySelector('.container');
    if (content) {
      content.classList.add('ready-to-begin-banner-content');
    }
  }

  function createReadyToBeginBanner() {
    var footer = document.querySelector('footer');
    var root = document.querySelector('#root');

    if (!footer || !root || document.querySelector('[data-ready-to-begin-injected="true"]')) {
      return null;
    }

    var section = document.createElement('section');
    section.className = 'ready-to-begin-injected-section';
    section.dataset.readyToBeginInjected = 'true';
    section.innerHTML = [
      '<div class="container ready-to-begin-banner-content">',
      '  <div class="section-label">Ready to Begin</div>',
      '  <h2>Ready to grow with intention?</h2>',
      '  <p>Book a free consultation and let\'s talk about how Sharp Growth Co. can help your Alberta business show up, stand out, and scale with strategic marketing, web design, branding, and content creation.</p>',
      '  <div class="ready-to-begin-actions">',
      '    <a class="ready-to-begin-primary" href="https://calendly.com/sharpgrowthco">Book a Custom Growth Plan</a>',
      '    <a class="ready-to-begin-secondary" href="/packages">View Packages</a>',
      '  </div>',
      '</div>'
    ].join('');

    footer.parentNode.insertBefore(section, footer);
    return section;
  }

  function keepOnlyFirstReadyToBeginSection() {
    var readySections = Array.prototype.slice.call(document.querySelectorAll('section')).filter(sectionLooksLikeReadyToBegin);
    if (readySections.length < 2) {
      return;
    }

    var preferredSection = readySections.filter(function (section) {
      return section.dataset.readyToBeginInjected !== 'true';
    })[0] || readySections[0];

    readySections.forEach(function (section) {
      if (section === preferredSection) {
        section.classList.add('sgc-ready-to-begin-preferred');
        section.classList.remove('sgc-ready-to-begin-duplicate-hidden');
        section.hidden = false;
        section.style.removeProperty('display');
        section.removeAttribute('aria-hidden');
        delete section.dataset.readyToBeginDuplicateRemoved;
        return;
      }

      section.classList.add('sgc-ready-to-begin-duplicate-hidden');
      section.classList.remove('sgc-ready-to-begin-preferred');
      section.hidden = true;
      section.style.setProperty('display', 'none', 'important');
      section.setAttribute('aria-hidden', 'true');
      section.dataset.readyToBeginDuplicateRemoved = 'true';
    });
  }

  function enhanceReadyToBeginBanners() {
    var found = false;
    document.querySelectorAll('section').forEach(function (section) {
      if (isReadyToBeginSection(section)) {
        found = true;
        enhanceSection(section);
      }
    });

    if (!found) {
      var created = createReadyToBeginBanner();
      if (created) {
        enhanceSection(created);
      }
    }

    keepOnlyFirstReadyToBeginSection();
  }

  function scheduleEnhancement() {
    window.requestAnimationFrame(function () {
      enhanceReadyToBeginBanners();
      window.setTimeout(enhanceReadyToBeginBanners, 250);
      window.setTimeout(enhanceReadyToBeginBanners, 900);
    });
  }

  document.addEventListener('DOMContentLoaded', scheduleEnhancement);
  window.addEventListener('load', scheduleEnhancement);
  window.addEventListener('popstate', scheduleEnhancement);
  document.addEventListener('click', function () {
    window.setTimeout(scheduleEnhancement, 150);
  }, true);

  if ('MutationObserver' in window) {
    var observer = new MutationObserver(function () {
      scheduleEnhancement();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  scheduleEnhancement();
})();
