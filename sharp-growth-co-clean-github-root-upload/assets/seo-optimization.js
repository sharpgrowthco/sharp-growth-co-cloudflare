(() => {
  const SITE_URL = 'https://sharpgrowthco.com';
  const BRAND = 'Sharp Growth Co.';
  const DEFAULT_IMAGE = `${SITE_URL}/assets/images/alberta-marketing-agency-homepage-hero-laptop-website-design.webp`;

  const ROUTES = {
    '/': {
      title: 'Sharp Growth Co. | Alberta Marketing Agency for Local Business Growth',
      description: 'Sharp Growth Co. helps Alberta businesses grow with strategic marketing, custom website design, social media management, content creation, branding, and local visibility campaigns.',
      keywords: 'Alberta marketing agency, Okotoks marketing agency, Calgary marketing consultant, website design Alberta, social media management Alberta, local business marketing',
      image: DEFAULT_IMAGE
    },
    '/services': {
      title: 'Marketing Services in Alberta | Web Design, Social Media & Content',
      description: 'Explore Sharp Growth Co. marketing services for Alberta businesses, including custom website design, social media management, content creation, branding, events, and marketing strategy.',
      keywords: 'marketing services Alberta, website design Calgary, web design Okotoks, social media management Alberta, content creation Alberta, branding agency Alberta',
      image: `${SITE_URL}/assets/images/alberta-marketing-agency-services-brand-web-social-media.webp`
    },
    '/about': {
      title: 'About Sharp Growth Co. | Alberta Marketing Strategist Jenna',
      description: 'Meet Jenna, the Alberta marketing strategist behind Sharp Growth Co., helping local businesses build stronger brands, better websites, and more consistent online visibility.',
      keywords: 'Alberta marketing strategist, Okotoks marketing expert, Calgary marketing consultant, Sharp Growth Co founder, local business marketing Alberta',
      image: `${SITE_URL}/assets/images/alberta-marketing-strategist-jenna-founder-headshot.webp`
    },
    '/packages': {
      title: 'Marketing Packages for Alberta Businesses | Sharp Growth Co.',
      description: 'Compare Sharp Growth Co. marketing packages for Alberta businesses, from website design and content creation to full-service local growth plans.',
      keywords: 'marketing packages Alberta, website packages Alberta, social media packages Alberta, local business marketing packages, Okotoks marketing agency pricing',
      image: `${SITE_URL}/assets/images/local-business-marketing-dashboard-alberta-growth-analytics.webp`
    },
    '/contact': {
      title: 'Contact Sharp Growth Co. | Book an Alberta Marketing Consultation',
      description: 'Contact Sharp Growth Co. to book a marketing consultation for website design, social media, content creation, branding, and growth strategy across Alberta.',
      keywords: 'book marketing consultation Alberta, contact marketing agency Okotoks, Calgary marketing consultation, Alberta website design consultation',
      image: DEFAULT_IMAGE
    },
    '/work': {
      title: 'Marketing Portfolio | Alberta Web Design, Branding & Content Work',
      description: 'View Sharp Growth Co. portfolio examples across website design, branding, content creation, social media campaigns, events, and local business marketing in Alberta.',
      keywords: 'marketing portfolio Alberta, website design portfolio Calgary, branding portfolio Alberta, social media portfolio Alberta, Sharp Growth Co work',
      image: `${SITE_URL}/assets/images/website-design-calgary-portfolio-modern-business-site.webp`
    }
  };

  const TEXT_FIXES = new Map([
    ['local Alberta based marketing expert', 'local Alberta-based marketing expert'],
    ['restaurants, salons, spas, real estate, schools etc.', 'restaurants, salons, spas, real estate, schools, and other service-based businesses.'],
    ['helped with integrating and branding an easy-to-use booking website', 'helped integrate and brand an easy-to-use booking website'],
    ['If you\'re looking for someone who is talented, professional, reliable, and genuinely passionate about helping businesses grow!', 'If you\'re looking for someone who is talented, professional, reliable, and genuinely passionate about helping businesses grow, Jenna is the one.']
  ]);

  function normalizePath(pathname) {
    const path = pathname.replace(/\/$/, '') || '/';
    return ROUTES[path] ? path : '/';
  }

  function absoluteUrl(path) {
    const normalized = normalizePath(path);
    return `${SITE_URL}${normalized === '/' ? '/' : normalized}`;
  }

  function upsertMeta(selector, attrs) {
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      document.head.appendChild(el);
    }
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
  }

  function upsertLink(rel, href) {
    let el = document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.rel = rel;
      document.head.appendChild(el);
    }
    el.href = href;
    return el;
  }

  function setJsonLd(id, data) {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  }

  function applyMetadata() {
    const path = normalizePath(window.location.pathname);
    const route = ROUTES[path];
    const canonical = absoluteUrl(path);

    document.title = route.title;
    upsertMeta('meta[name="description"]', { name: 'description', content: route.description });
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: route.keywords });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });
    upsertMeta('meta[name="author"]', { name: 'author', content: BRAND });
    upsertLink('canonical', canonical);

    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: BRAND });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: route.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: route.description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: route.image });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_CA' });

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: route.title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: route.description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: route.image });

    const professionalService = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#business`,
      name: BRAND,
      url: SITE_URL,
      image: DEFAULT_IMAGE,
      description: ROUTES['/'].description,
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Alberta' },
        { '@type': 'City', name: 'Okotoks' },
        { '@type': 'City', name: 'Calgary' },
        { '@type': 'City', name: 'Edmonton' },
        { '@type': 'City', name: 'Red Deer' },
        { '@type': 'City', name: 'Lethbridge' }
      ],
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'AB',
        addressCountry: 'CA'
      },
      founder: {
        '@type': 'Person',
        name: 'Jenna',
        jobTitle: 'Marketing Strategist'
      },
      serviceType: [
        'Marketing Strategy',
        'Website Design',
        'Social Media Management',
        'Content Creation',
        'Branding',
        'Local Event Marketing'
      ],
      sameAs: ['https://calendly.com/sharpgrowthco']
    };

    const breadcrumbItems = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }
    ];
    if (path !== '/') {
      const label = path.slice(1).replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
      breadcrumbItems.push({ '@type': 'ListItem', position: 2, name: label, item: canonical });
    }

    setJsonLd('sgc-business-schema', professionalService);
    setJsonLd('sgc-breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems
    });
  }

  function applyCopyFixes() {
    if (!document.body) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
      let value = node.nodeValue;
      TEXT_FIXES.forEach((replacement, original) => {
        if (value.includes(original)) value = value.split(original).join(replacement);
      });
      if (value !== node.nodeValue) node.nodeValue = value;
    });
  }

  function applyFaqSchema() {
    if (normalizePath(window.location.pathname) !== '/') {
      const existing = document.getElementById('sgc-faq-schema');
      if (existing) existing.remove();
      return;
    }
    setJsonLd('sgc-faq-schema', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What types of businesses do you work with?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sharp Growth Co. specializes in local Alberta businesses, including restaurants, spas, salons, wellness brands, real estate professionals, schools, retail shops, and service providers.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is included in a free consultation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The free consultation is a no-pressure conversation about your business, current marketing, goals, and practical recommendations for improving visibility and growth.'
          }
        },
        {
          '@type': 'Question',
          name: 'What areas of Alberta do you serve?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sharp Growth Co. is based in the Okotoks and Calgary area and works with businesses across Alberta, including Calgary, Edmonton, Red Deer, Lethbridge, and surrounding communities.'
          }
        }
      ]
    });
  }

  function refresh() {
    applyMetadata();
    applyCopyFixes();
    applyFaqSchema();
  }

  const patchHistory = (method) => {
    const original = history[method];
    history[method] = function patchedHistoryMethod(...args) {
      const result = original.apply(this, args);
      window.requestAnimationFrame(refresh);
      return result;
    };
  };

  patchHistory('pushState');
  patchHistory('replaceState');
  window.addEventListener('popstate', () => window.requestAnimationFrame(refresh));
  document.addEventListener('DOMContentLoaded', refresh, { once: true });
  window.addEventListener('load', refresh);
  const observer = new MutationObserver(() => window.requestAnimationFrame(refresh));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  refresh();
})();
