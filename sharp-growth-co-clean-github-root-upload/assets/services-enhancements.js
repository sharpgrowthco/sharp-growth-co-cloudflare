(() => {
  const routeIsServices = () => window.location.pathname === '/services' || window.location.hash.includes('/services');

  const websiteBannerImage = '/assets/banner-website-laptop.png';

  const webCards = [
    {
      title: 'Custom Website Design',
      description: 'Fully bespoke designs built around your brand — no templates, no shortcuts.',
      image: '/assets/images/alberta-web-design-custom-website-design-service-card.webp',
      alt: 'Custom website design service card for Alberta web design and local business growth.'
    },
    {
      title: 'Mobile-First Builds',
      description: 'Every site is designed for mobile first, then scaled beautifully to desktop.',
      image: '/assets/images/calgary-website-design-mobile-first-responsive-build-service-card.webp',
      alt: 'Mobile-first responsive website design service card for Calgary and Alberta local businesses.'
    },
    {
      title: 'Fast & Conversion-Focused',
      description: 'Speed-optimized builds with clear calls-to-action that turn visitors into leads.',
      image: '/assets/images/okotoks-web-design-fast-conversion-focused-website-service-card.webp',
      alt: 'Fast conversion-focused Okotoks web design service card with growth and performance visuals.'
    },
    {
      title: 'SEO-Ready Structure',
      description: 'Clean headings, metadata, and site architecture that search engines love.',
      image: '/assets/images/alberta-web-design-seo-ready-website-structure-service-card.webp',
      alt: 'SEO-ready Alberta web design service card showing search performance analytics and ranking structure.'
    },
    {
      title: 'Landing Pages & Funnels',
      description: 'Targeted pages for campaigns, launches, and service-specific promotions.',
      image: '/assets/images/calgary-marketing-consultant-landing-page-funnel-service-card.webp',
      alt: 'Calgary marketing consultant landing page and funnel service card for lead generation strategy.'
    },
    {
      title: 'Refreshes & Redesigns',
      description: "Already have a site? I'll modernize it to match your brand and goals.",
      image: '/assets/images/okotoks-web-design-website-refresh-redesign-service-card.webp',
      alt: 'Okotoks web design website refresh and redesign service card showing a premium before and after redesign.'
    }
  ];

  const mainServiceTitles = [
    'Social Media Management',
    'Content Creation',
    'Marketing Strategy',
    'Events & Promotions',
    'Branding & Creative Direction'
  ];

  function normalize(text) {
    return (text || '').replace(/\s+/g, ' ').trim();
  }

  function findHeading(title, tags = 'h2,h3') {
    return Array.from(document.querySelectorAll(tags)).find((el) => normalize(el.textContent) === title);
  }

  function setupActiveToggle(card) {
    if (!card || card.dataset.sgcInteractiveReady === 'true') return;
    card.dataset.sgcInteractiveReady = 'true';
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', () => {
      const alreadyActive = card.classList.contains('sgc-service-is-active');
      document.querySelectorAll('.sgc-service-is-active').forEach((el) => el.classList.remove('sgc-service-is-active'));
      if (!alreadyActive) card.classList.add('sgc-service-is-active');
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.click();
      }
    });
  }

  function findWebsiteCard(heading) {
    let card = heading;
    while (card && card.parentElement && card.parentElement !== document.body) {
      const className = card.className ? card.className.toString() : '';
      const hasCardShape = className.includes('p-6') || className.includes('rounded') || className.includes('border');
      const containsOnlyThisFeature = card.querySelector('h3') === heading;
      if (hasCardShape && containsOnlyThisFeature) return card;
      card = card.parentElement;
    }
    return heading.parentElement;
  }

  function ensureBackgroundLayers(card, image) {
    card.querySelectorAll(':scope > .sgc-web-card-bg, :scope > .sgc-web-card-overlay').forEach((el) => el.remove());

    const bg = document.createElement('span');
    bg.className = 'sgc-web-card-bg';
    bg.setAttribute('aria-hidden', 'true');
    bg.style.backgroundImage = `url("${image}")`;

    const overlay = document.createElement('span');
    overlay.className = 'sgc-web-card-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    card.prepend(overlay);
    card.prepend(bg);
  }

  function applyCardCopy(card, config) {
    const heading = card.querySelector('h3');
    if (heading) heading.textContent = config.title;

    const paragraphs = Array.from(card.querySelectorAll('p'));
    const description = paragraphs.find((p) => normalize(p.textContent).length > 0) || paragraphs[0];
    if (description) description.textContent = config.description;
  }

  function findWebsiteSection() {
    const heading = findHeading('Website Design & Development', 'h2');
    if (!heading) return null;

    let node = heading;
    let best = null;
    while (node && node.parentElement && node !== document.body) {
      const text = normalize(node.textContent);
      const hasCards = webCards.every((config) => text.includes(config.title));
      const hasCta = text.includes('GET A WEBSITE QUOTE') || text.includes('Get a Website Quote');
      if (hasCards && hasCta) best = node;
      node = node.parentElement;
    }

    return best || heading.closest('section') || heading.parentElement;
  }

  function ensureWebsiteBannerLayers(section) {
    if (!section) return;
    section.classList.add('sgc-website-design-hero');
    section.dataset.sgcHeroBannerImage = websiteBannerImage;
    section.style.setProperty('--sgc-website-hero-image', `url("${websiteBannerImage}")`);

    const layerNames = [
      'sgc-website-hero-image-layer',
      'sgc-website-hero-gradient-layer',
      'sgc-website-hero-shimmer-layer',
      'sgc-website-hero-streak-layer'
    ];

    layerNames.forEach((className) => {
      if (section.querySelector(`:scope > .${className}`)) return;
      const layer = document.createElement('span');
      layer.className = className;
      layer.setAttribute('aria-hidden', 'true');
      section.prepend(layer);
    });
  }

  function enhanceWebsiteHeroBanner() {
    ensureWebsiteBannerLayers(findWebsiteSection());
  }

  function enhanceWebsiteCards() {
    webCards.forEach((config) => {
      const heading = findHeading(config.title, 'h3');
      if (!heading) return;
      const card = findWebsiteCard(heading);
      if (!card) return;
      applyCardCopy(card, config);
      card.classList.add('sgc-web-feature-card');
      card.setAttribute('aria-label', `${config.title}: ${config.alt}`);
      card.dataset.sgcSeoImage = config.image;
      card.dataset.sgcSeoAlt = config.alt;
      card.style.setProperty('--sgc-card-bg', `url("${config.image}")`);
      card.style.backgroundImage = 'none';
      card.style.borderRadius = '16px';
      ensureBackgroundLayers(card, config.image);
      setupActiveToggle(card);
    });
  }

  function enhanceMainServiceBoxes() {
    mainServiceTitles.forEach((title) => {
      const heading = findHeading(title, 'h2');
      if (!heading) return;
      let card = heading;
      while (card && card.parentElement && !card.className.toString().includes('grid-cols-1 lg:grid-cols-12')) {
        card = card.parentElement;
      }
      if (!card || card === document.body) return;
      card.classList.add('sgc-main-service-box');
      setupActiveToggle(card);
    });
  }

  const homeServiceTitles = [
    'Website Design & Development',
    'Social Media Management',
    'Content Creation',
    'Marketing Strategy',
    'Events & Promotions',
    'Branding & Creative Direction'
  ];

  function findHomeServicesSection() {
    const heading = findHeading('Everything your brand needs to grow', 'h2');
    return heading ? heading.closest('section') || heading.parentElement : null;
  }

  function enhanceHomeServiceCards() {
    const section = findHomeServicesSection();
    if (!section) return;
    section.classList.add('sgc-home-services-section');

    homeServiceTitles.forEach((title) => {
      const heading = Array.from(section.querySelectorAll('h3')).find((el) => normalize(el.textContent) === title);
      if (!heading) return;

      let card = heading.parentElement;
      while (card && card !== section && !card.querySelector('img')) {
        card = card.parentElement;
      }
      while (card && card.parentElement && card.parentElement !== section && card.querySelectorAll('h3').length !== 1) {
        card = card.parentElement;
      }
      if (!card || card === section) return;

      const image = card.querySelector('img');
      if (!image) return;

      card.classList.add('sgc-home-service-card');
      image.classList.add('sgc-home-service-card-image');
      image.removeAttribute('width');
      image.removeAttribute('height');
      image.style.position = 'absolute';
      image.style.inset = '0';
      image.style.width = '100%';
      image.style.height = '100%';
      image.style.maxWidth = 'none';
      image.style.objectFit = 'cover';
      image.style.objectPosition = 'center center';
    });
  }

  function keepPreferredReadyToBeginSection() {
    if (!routeIsServices()) return;

    const readySections = Array.from(document.querySelectorAll('section'))
      .filter((section) => {
        const text = normalize(section.textContent);
        const headings = Array.from(section.querySelectorAll('h1,h2,h3')).map((heading) => normalize(heading.textContent)).join(' ');
        return text.includes('Ready to Begin') || headings.includes('Ready to grow with intention?');
      });

    if (readySections.length < 2) return;

    readySections.forEach((section, index) => {
      if (index === 0) {
        section.classList.add('sgc-ready-to-begin-preferred');
        section.classList.remove('sgc-ready-to-begin-duplicate-hidden');
        section.hidden = false;
        section.style.removeProperty('display');
        section.removeAttribute('aria-hidden');
        return;
      }

      section.classList.add('sgc-ready-to-begin-duplicate-hidden');
      section.hidden = true;
      section.style.setProperty('display', 'none', 'important');
      section.setAttribute('aria-hidden', 'true');
      section.dataset.readyToBeginDuplicateRemoved = 'true';
    });
  }

  function enhanceServicesPage() {
    if (!routeIsServices()) return;
    enhanceMainServiceBoxes();
    enhanceWebsiteCards();
    enhanceWebsiteHeroBanner();
    keepPreferredReadyToBeginSection();
  }

  function enhanceAllPages() {
    enhanceHomeServiceCards();
    enhanceServicesPage();
  }

  let queued = false;
  function scheduleEnhance() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(() => {
      queued = false;
      enhanceAllPages();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleEnhance);
  } else {
    scheduleEnhance();
  }

  window.addEventListener('popstate', scheduleEnhance);
  window.addEventListener('hashchange', scheduleEnhance);
  document.addEventListener('click', () => setTimeout(scheduleEnhance, 80), true);

  const observer = new MutationObserver(scheduleEnhance);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
