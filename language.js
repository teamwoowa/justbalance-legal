(() => {
  const sections = [...document.querySelectorAll('.section[id^="sec-"]')];
  const available = sections.map(section => section.id.slice(4).toLowerCase());
  const normalize = value => String(value || '').trim().replaceAll('_', '-').toLowerCase();
  function resolveLanguage(value) {
    const requested = normalize(value);
    if (!available.length) return /^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/.test(requested) ? requested : 'en';
    if (available.includes(requested)) return requested;
    const base = requested.split('-')[0];
    if (available.includes(base)) return base;
    return available.includes('en') ? 'en' : available[0];
  }
  window.setLang = value => {
    const language = resolveLanguage(value);
    document.documentElement.lang = language;
    for (const section of sections) {
      const selected = section.id.slice(4).toLowerCase() === language;
      section.classList.toggle('active', selected);
      section.hidden = !selected;
      section.lang = section.id.slice(4);
      if (selected) {
        const heading = section.querySelector('h1');
        if (heading) document.title = `${heading.textContent} – JustBalance`;
      }
    }
    for (const button of document.querySelectorAll('.lang-toggle button[id^="btn-"]')) {
      const selected = button.id.slice(4).toLowerCase() === language;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    }
    const current = new URL(window.location.href);
    current.searchParams.set('lang', language);
    history.replaceState(null, '', current);
    for (const link of document.querySelectorAll('a[href]')) {
      const target = new URL(link.getAttribute('href'), current);
      if (target.origin === current.origin && /\/(?:index|privacy|terms)\.html$/.test(target.pathname)) {
        target.searchParams.set('lang', language);
        link.href = target.href;
      }
    }
    return language;
  };
  const requested = new URL(window.location.href).searchParams.get('lang');
  setLang(requested || navigator.languages?.[0] || navigator.language || document.documentElement.lang);
})();
