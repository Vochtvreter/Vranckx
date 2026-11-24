/* Shared site behaviour for all three designs.
   1. SITE: every outbound URL lives here. A value of null means "not available yet":
      any element that points at it is removed, so the page never shows a dead link.
   2. Mobile menu, newsletter form and current-year helpers. */
window.SITE = {
  email: 'listen@ernstvranckx.be',
  phone: '+32496512842',
  buyCd: 'https://www.paypal.com/cgi-bin/webscr?business=ernst.vranckx%40hotmail.com&cmd=_xclick&amount=22.00&item_name=Ernst%20Vranckx%20Trio%20-%20Black%20Is%20The%20Colour%20(CD)&currency_code=EUR&add=1',
  listen: {
    apple: 'https://music.apple.com/be/album/black-is-the-colour/1735852999?i=1735853000',
    spotify: null
  },
  albums: {
    'black-is-the-colour': { apple: 'https://music.apple.com/be/album/black-is-the-colour/1735852999?i=1735853000', buy: 'buyCd' },
    'things-as-they-are': { apple: 'https://music.apple.com/be/album/things-as-they-are-feat-paul-g-ulrich-kris-duerinckx/1498624574', buy: null },
    'songs-dances':       { apple: 'https://music.apple.com/be/album/songs-dances/1512898739', buy: null },
    'a-childs-blessing':  { apple: 'https://music.apple.com/be/album/a-childs-blessing/1513079355', buy: null },
    'aquarelle':          { apple: null, buy: null }
  },
  listenAll: null,     // page or smart link with every streaming service
  pressAll: null,      // page with the full press archive
  pressKit: null,      // zip/page with hi-res photos, bios and technical rider
  socials: { instagram: null, facebook: null, youtube: null },
  privacy: null,       // privacy statement (needed once the newsletter is live)
  newsletter: null,    // form endpoint of the mailing-list service
  langs: { nl: '#', fr: null, de: null, en: null }
};

/* Booking e-mail with a ready-to-fill template */
SITE.bookingMail = 'mailto:' + SITE.email + '?subject=' + encodeURIComponent('Boekingsaanvraag') +
  '&body=' + encodeURIComponent('Datum:\nZaal en stad:\nBezetting (trio of kwartet):\nBericht:\n');

(function(){
  function lookup(path){
    let v = path.split('.').reduce((o,k)=> (o && k in o) ? o[k] : null, SITE);
    if (typeof v === 'string' && v in SITE && typeof SITE[v] === 'string') v = SITE[v]; // alias, e.g. buy: 'buyCd'
    return v;
  }
  /* <a data-link="listen.spotify"> gets its href, or is removed when the URL is missing.
     data-link-remove="closest-selector" removes a wrapper instead of just the link. */
  function applyLinks(root){
    (root||document).querySelectorAll('[data-link]').forEach(el=>{
      const url = lookup(el.dataset.link);
      if (url) { if (el.tagName === 'A') el.href = url; return; }
      const wrap = el.dataset.linkRemove ? el.closest(el.dataset.linkRemove) : null;
      (wrap || el).remove();
    });
    /* Language switch: only languages that exist are shown; with one language the switch disappears */
    document.querySelectorAll('[data-langs]').forEach(box=>{
      box.querySelectorAll('[data-lang]').forEach(a=>{ const u = SITE.langs[a.dataset.lang]; if(!u) a.remove(); else a.href = u; });
      if (box.querySelectorAll('[data-lang]').length < 2) box.remove();
    });
  }

  /* Mobile menu: [data-menu-toggle] opens/closes [data-menu] */
  function initMenu(){
    const btn = document.querySelector('[data-menu-toggle]'), menu = document.querySelector('[data-menu]');
    if (!btn || !menu) return;
    function set(open){
      btn.setAttribute('aria-expanded', open);
      menu.classList.toggle('open', open);
      document.documentElement.classList.toggle('menu-open', open);
      btn.querySelector('[data-menu-label]') && (btn.querySelector('[data-menu-label]').textContent = open ? 'Sluit' : 'Menu');
      if (open) { const f = menu.querySelector('a,button'); f && f.focus(); } else btn.focus({preventScroll:true});
    }
    btn.addEventListener('click', ()=> set(btn.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', e=>{ if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', e=>{ if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') set(false); });
    matchMedia('(min-width: 981px)').addEventListener('change', e=>{ if (e.matches && menu.classList.contains('open')) set(false); });
  }

  /* Newsletter: real <form>; posts to SITE.newsletter when configured, otherwise shows the success state (prototype). */
  function initNewsletter(){
    document.querySelectorAll('form[data-newsletter]').forEach(form=>{
      const input = form.querySelector('input[type=email]'), msg = form.querySelector('[data-msg]');
      /* data-formal on the form switches the messages to 'u/uw' (design A's tone of voice) */
      const T = form.hasAttribute('data-formal')
        ? { bad:'Dit e-mailadres klopt niet. Controleer het even.', empty:'Vul uw e-mailadres in.', ok:'Dank u! Bevestig uw inschrijving via de mail die u ontvangt.' }
        : { bad:'Dit e-mailadres klopt niet. Controleer het even.', empty:'Vul je e-mailadres in.', ok:'Bedankt! Bevestig je inschrijving via de mail die je ontvangt.' };
      if (SITE.newsletter) { form.action = SITE.newsletter; form.method = 'post'; }
      form.addEventListener('submit', e=>{
        if (!input.checkValidity()) {
          e.preventDefault();
          msg.textContent = input.value ? T.bad : T.empty;
          msg.dataset.state = 'error'; input.setAttribute('aria-invalid','true'); input.focus(); return;
        }
        if (SITE.newsletter) return;
        e.preventDefault();
        input.removeAttribute('aria-invalid');
        msg.textContent = T.ok;
        msg.dataset.state = 'ok'; form.reset();
      });
      input.addEventListener('input', ()=>{ if (msg.dataset.state === 'error') { msg.textContent=''; msg.dataset.state=''; input.removeAttribute('aria-invalid'); } });
    });
  }

  function init(){
    document.querySelectorAll('[data-booking]').forEach(a=> a.href = SITE.bookingMail);
    applyLinks(); initMenu(); initNewsletter();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.SiteLinks = { apply: applyLinks };
})();
