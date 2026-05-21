(() => {
  const FORM_NAME = 'contact';
  const FIELD_MAP = [
    { selector: 'input[placeholder="Jane Smith"]', name: 'name' },
    { selector: 'input[placeholder="Your Business Name"]', name: 'business_name' },
    { selector: 'input[placeholder="jane@yourbusiness.com"]', name: 'email' },
    { selector: 'input[placeholder="(555) 000-0000"]', name: 'phone' },
    { selector: 'input[placeholder="www.yourbusiness.com"]', name: 'website_url' },
    { selector: 'input[placeholder="@yourbusiness"]', name: 'instagram_handle' },
    { selector: 'textarea[placeholder^="Share your goals"]', name: 'message' },
  ];

  const SERVICE_LABELS = [
    'Website Design & Development',
    'Social Media Management',
    'Content Creation',
    'Marketing Strategy',
    'Events & Promotions',
    'Branding & Creative Direction',
    'Custom Growth Plan',
  ];

  const normalise = (value) => (value || '').replace(/\s+/g, ' ').trim();

  const findContactForm = () => {
    const forms = Array.from(document.querySelectorAll('form'));
    return forms.find((form) => {
      const text = normalise(form.textContent);
      return text.includes('Your Information') && text.includes('Services Interested In') && text.includes('Apply to Work Together');
    }) || null;
  };

  const ensureHiddenInput = (form, name, value = '') => {
    let input = form.querySelector(`input[type="hidden"][name="${name}"]`);
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      form.prepend(input);
    }
    input.value = value;
    return input;
  };

  const applyFieldNames = (form) => {
    FIELD_MAP.forEach(({ selector, name }) => {
      const field = form.querySelector(selector);
      if (field) field.setAttribute('name', name);
    });
  };

  const getServiceButtons = (form) => Array.from(form.querySelectorAll('button[type="button"]')).filter((button) => {
    const label = normalise(button.textContent);
    return SERVICE_LABELS.includes(label);
  });

  const buttonIsSelected = (button) => {
    const ariaPressed = button.getAttribute('aria-pressed');
    if (ariaPressed === 'true') return true;
    if (button.classList.contains('active') || button.classList.contains('selected')) return true;
    const style = window.getComputedStyle(button);
    const background = style.backgroundColor || '';
    const color = style.color || '';
    return background.includes('80, 61, 40') || background.includes('39, 22, 12') || color.includes('255');
  };

  const updateSelectedServices = (form) => {
    const buttons = getServiceButtons(form);
    const selected = buttons
      .filter(buttonIsSelected)
      .map((button) => normalise(button.textContent));
    ensureHiddenInput(form, 'services_interested_in', selected.join(', '));
  };

  const encodeFormData = (form) => {
    const data = new FormData(form);
    data.set('form-name', FORM_NAME);
    data.set('bot-field', '');
    return new URLSearchParams(data).toString();
  };

  const submitToNetlify = (form) => {
    if (form.dataset.sgcNetlifySubmitting === 'true') return;
    form.dataset.sgcNetlifySubmitting = 'true';

    applyFieldNames(form);
    updateSelectedServices(form);
    ensureHiddenInput(form, 'form-name', FORM_NAME);
    ensureHiddenInput(form, 'bot-field', '');

    window.fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData(form),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Netlify Forms submission failed with status ${response.status}`);
      }
      form.dataset.sgcNetlifySubmitted = 'true';
    }).catch((error) => {
      form.dataset.sgcNetlifyError = error.message || 'Netlify Forms submission failed';
      console.error('[Sharp Growth Co.] Contact form could not be sent to Netlify Forms.', error);
    }).finally(() => {
      window.setTimeout(() => {
        form.dataset.sgcNetlifySubmitting = 'false';
      }, 1000);
    });
  };

  const enhanceForm = () => {
    const form = findContactForm();
    if (!form || form.dataset.sgcNetlifyEnhanced === 'true') return;

    form.dataset.sgcNetlifyEnhanced = 'true';
    form.setAttribute('name', FORM_NAME);
    form.setAttribute('method', 'POST');
    form.setAttribute('action', '/thank-you/');
    form.setAttribute('data-netlify', 'true');
    form.setAttribute('netlify', 'true');
    form.setAttribute('data-netlify-honeypot', 'bot-field');

    ensureHiddenInput(form, 'form-name', FORM_NAME);
    ensureHiddenInput(form, 'bot-field', '');
    ensureHiddenInput(form, 'services_interested_in', '');

    applyFieldNames(form);
    updateSelectedServices(form);

    getServiceButtons(form).forEach((button) => {
      button.addEventListener('click', () => {
        window.setTimeout(() => updateSelectedServices(form), 0);
      });
    });

    form.addEventListener('submit', () => {
      submitToNetlify(form);
    }, true);
  };

  const observer = new MutationObserver(enhanceForm);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceForm);
  } else {
    enhanceForm();
  }
})();
