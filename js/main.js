/* PLUMBING_V 4 — Bespoke Studio · meccanica invisibile canonica.
   ────────────────────────────────────────────────────────────────
   CONFINE (inviolabile): questo file contiene SOLO plumbing — la meccanica
   che il visitatore non percepisce come design. NIENTE markup di sezioni,
   NIENTE stile, NIENTE struttura: concept, griglia, tipografia, hero e
   animazioni-firma si progettano DA ZERO per ogni cliente (GATE #3).
   Se qui dentro scivola del layout, questo diventa il nuovo scheletro
   condiviso — cioè il difetto "copia-incolla" che il metodo combatte.

   Come si usa: si COPIA nella cartella js/ del sito e si adatta la sola
   costante SITE. Le animazioni-firma del sito si scrivono nel proprio
   main.js DOPO questo file (o in coda a questo file, sotto il marcatore).
   Ogni bug nuovo si corregge QUI (bump PLUMBING_V + changelog nel README)
   e poi nel sito: mai il contrario.

   Fix già incorporati (non rimuovere):
   - ScrollTrigger registrato SUBITO allo script load, MAI dentro l'intro
     o un setTimeout (bug APF #5 del 16/7: race col watchdog → sezioni
     che sparivano allo scroll).
   - Reveal con once:true (niente re-animazioni da zero ri-scorrendo).
   - Watchdog 1,5s che forza visibile e UCCIDE i trigger non scattati.
   - Lightbox su [hidden] + override CSS !important (bug: display:flex
     batteva [hidden] e la lightbox restava visibile).
   - Foto-contenuto MAI lazy (regola workflow §8): il plumbing non tocca
     il loading, ma il lint lo verifica.
   - Orari Europe/Rome con finestre multiple e scavalco di mezzanotte
     (pattern Il Cavallante 18:00–00:30). */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO — l'unica parte da adattare ══════════ */
  var SITE = {
    slug: 'arte-e-follia',
    whatsapp: {
      number: '', // WhatsApp non dichiarato: si prenota su Treatwell o al telefono (02 8940 4709)
      message: '',
      ids: [],
    },
    /* Treatwell e la loro minipagina (28/9/2026): dal martedì al giovedì 9:30–19:30, il venerdì 9:30–19, il sabato 9–18,
       domenica e lunedì chiuso. Google dice venerdì fino alle 19:30: in nota per Kristian */
    hours: {
      0: [],
      1: [],
      2: [['09:30', '19:30']],
      3: [['09:30', '19:30']],
      4: [['09:30', '19:30']],
      5: [['09:30', '19:00']],
      6: [['09:00', '18:00']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1800,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 1120,
    EN: {
      "m.salta": "Skip to the chapters",
      "m.top": "Arte & Follia Milano, back to the top",
      "m.scala": "The tone scale: the chapters",
      "m.lingua": "Language",
      "m.menu": "Open the menu",
      "m.capitoli": "Chapters",
      "m.ingrandisci": "Enlarge the photo",
      "m.lightbox": "Enlarged photo",
      "m.chiudi": "Close",
      "m.livello": "level",
      "t.prenota": "Book",
      "s.1": "1, black: the beginning",
      "s.2": "2, darkest brown: listening first",
      "s.3": "3, dark brown: colour",
      "s.4": "4, medium brown: the reds",
      "s.5": "5, light brown: colour correction",
      "s.6": "6, dark blonde: highlights",
      "s.7": "7, medium blonde: balayage",
      "s.8": "8, light blonde: air touch",
      "s.9": "9, very light blonde: care",
      "s.10": "10, lightest blonde: the team",
      "v.1": "The beginning",
      "v.2": "Listening first",
      "v.3": "Colour",
      "v.4": "The reds",
      "v.5": "Colour correction",
      "v.6": "Highlights",
      "v.7": "Balayage",
      "v.8": "Air touch",
      "v.9": "Care",
      "v.10": "The team",
      "v.recensioni": "Reviews",
      "v.dove": "Where and when",
      "l.1": "black",
      "l.2": "darkest brown",
      "l.3": "dark brown",
      "l.4": "medium brown",
      "l.5": "light brown",
      "l.6": "dark blonde",
      "l.7": "medium blonde",
      "l.8": "light blonde",
      "l.9": "very light blonde",
      "l.10": "lightest blonde",
      "h.titolo": "A play of light.",
      "h.chi": "Arte &amp; Follia, hair salon at Via Giuseppe Meda 37, Milan. Specialists in blondes and advanced balayage and air touch techniques.",
      "h.come": "Our job is to bring light into hair, one tone at a time. This page does the same: it starts from black and gets lighter, all the way to the lightest blonde.",
      "h.prenota": "Book on Treatwell",
      "h.chiama": "Call",
      "h.treatwell": "on Treatwell · 4,227 reviews",
      "h.google": "on Google · 205 reviews",
      "h.ciocca": "A lock of brown hair lightened with the air touch technique: luminous blonde, with a dark, soft root",
      "h.aria": "Air touch: the air blows away the shorter hairs, and only the longer ones get lightened.",
      "h.ancora": "Blow again",
      "c2.t": "Listening first.",
      "c2.loro": "«Because every transformation begins by listening to the person in front of us and ends with a smile in front of the mirror.»",
      "c2.fonte": "Arte &amp; Follia, on Instagram (translated from Italian)",
      "c2.p": "Before choosing the technique we talk: what hair you have, what colour you want, how much light. Personal consultation, hair care and a team with ten years of experience.",
      "c2.alt": "The salon: the verdigris plaster wall with the golden lettering Arte &amp; Follia, the four round mirrors and the black chairs on the marble floor",
      "c2.cap": "The salon: the verdigris plaster, their golden signature, the four round mirrors.",
      "c3.t": "Colour.",
      "c3.p": "Root colour or full colour, with a blow-dry or with a cut and blow-dry. And, for those who prefer it, without ammonia.",
      "c3.s1": "Root colour",
      "c3.s2": "Full colour",
      "c3.s3": "Ammonia-free colour",
      "c3.s4": "2-in-1 colour",
      "c3.s5": "Lightening, ten strands",
      "c3.alt": "Wavy copper hair, seen from behind, on a black salon chair",
      "c3.cap": "A warm copper, with waves.",
      "c4.t": "The reds.",
      "c4.p": "Ruby, burgundy, mahogany: on brown bases the red tones light up.",
      "c4.loro": "«Ruby red has a unique character… impossible to go unnoticed!»",
      "c4.fonte": "Arte &amp; Follia, on Instagram (translated from Italian)",
      "c4.alt": "Wavy burgundy hair with a dark root, seen from behind, in the salon",
      "c4.cap": "«From brunette to a burgundy full of character», they write.",
      "c5.t": "Colour correction.",
      "c5.loro": "«We turned a home-made colour into a sophisticated natural base, enriched with warm, enveloping mahogany shades. Because every mistake can become a new beginning.»",
      "c5.fonte": "Arte &amp; Follia, on Instagram (translated from Italian)",
      "c5.alt": "Two drawn locks of hair: on the left a home-made colour, with a dark root, an orange band and dull ends; on the right the same lock corrected, brown with mahogany tones",
      "c5.prima": "Before: the home-made colour.",
      "c5.dopo": "After: the natural base, with mahogany shades.",
      "c6.t": "Highlights.",
      "c6.p": "The classic ways to add light, done well: highlights, foil highlights, «sun light» effects.",
      "c6.s1": "Highlights",
      "c6.s2": "Foil highlights",
      "c6.s3": "Sun light effects",
      "c6.alt": "Long hair seen from behind, brown at the root and lighter towards the ends, spread open with the hands",
      "c6.cap": "Natural root, lightened lengths.",
      "c7.t": "Balayage.",
      "c7.loro": "«After: we brightened the look with lighter, luminous highlights, creating a multidimensional effect <span class=\"taglio\">[…]</span> while the root stays soft and blended for an elegant result that is easy to manage»",
      "c7.fonte": "Arte &amp; Follia, on Instagram (translated from Italian)",
      "c7.alt": "Long wavy blonde hair with a dark, soft root, seen from behind in front of a yellow wall",
      "c7.cap": "The blended root, the light lengths.",
      "c7.cit": "«I was really happy with my balayage, done to perfection by Veronica.»",
      "c7.chi": "Sara, on Google (translated from Italian)",
      "c8.t": "Air touch.",
      "c8.p": "A lock is taken and, with the hairdryer, the air blows away the shorter hairs; only the longer ones get lightened. Then the short ones fall back among the light ones: the blonde comes out luminous and natural, with no hard lines.",
      "c8.alt": "Air touch in four drawn locks: the brown lock; the air moves the short hairs; the long ones turn blonde; the short ones fall back among the blonde",
      "c8.f1": "The lock",
      "c8.f2": "The air blows away the short ones",
      "c8.f3": "The long ones get lighter",
      "c8.f4": "The short ones fall back",
      "c8.loro": "«Luminous blonde, natural and full of reflections. A play of light that brings out every movement and lights up the face.»",
      "c8.fonte": "Arte &amp; Follia, on Instagram (translated from Italian)",
      "c8.s1": "Air touch, short hair",
      "c8.s2": "Medium",
      "c8.s3": "Long",
      "c8.s4": "Extra long",
      "c9.t": "Care.",
      "c9.p": "Toner and gloss to finish the colour; then the treatments, for hair that needs strength and shine.",
      "c9.h1": "For the colour",
      "c9.h2": "For the hair",
      "c9.h3": "For the scalp",
      "c9.s1": "Toner",
      "c9.s2": "Gloss",
      "c9.s3": "Anti-frizz",
      "c9.s4": "Hair botox",
      "c9.s5": "Collagen plumping treatment",
      "c9.s6": "Reconstruction, also with steam",
      "c9.s7": "Nashi Argan",
      "c9.s8": "Purifying scalp peeling",
      "c10.t": "The team.",
      "c10.p": "There are five of them, and on Treatwell each one has her own 4.9.",
      "c10.e.r": "Colourist, owner since 2016",
      "c10.e.n": "from 727 reviews",
      "c10.e.p": "exceptional · expert · attention to detail · skilled",
      "c10.el.n": "from 561 reviews",
      "c10.el.p": "attentive · skilled · professional · precise",
      "c10.r.n": "from 388 reviews",
      "c10.r.p": "professional · expert · exceptional · skilled",
      "c10.v.n": "from 262 reviews",
      "c10.v.p": "exceptional · professional",
      "c10.va.n": "from 153 reviews",
      "c10.nota": "The words are the ones customers choose most often on Treatwell.",
      "c10.alt": "A long braid on a training head, held by a pearl hair clip, on the work counter",
      "c10.h": "And then cuts and blow-dries.",
      "c10.s1": "Cut and blow-dry",
      "c10.s2": "Short, medium or long blow-dry",
      "c10.s3": "Extension blow-dry",
      "c10.s4": "Men’s cut, scissors or clippers",
      "c10.s5": "Cut for boys and girls up to 7 years old",
      "r.t": "What people say.",
      "r.vt": "on Treatwell, 4,227 verified reviews",
      "r.vg": "on Google, 205 reviews",
      "r.google": "on Google",
      "r.nota": "From the reviews on Google, in Italian, as they were written.",
      "d.t": "Where and when.",
      "d.mezzi": "Trams 3 and 15 stop a few steps away, at the Via Meda - Via Spaventa stop. The 90/91 trolleybus at Viale Tibaldi; the M2 at Romolo and at Famagosta, about a kilometre away.",
      "d.orari": "Opening hours",
      "g.lun": "Monday",
      "g.mar": "Tuesday",
      "g.mer": "Wednesday",
      "g.gio": "Thursday",
      "g.ven": "Friday",
      "g.sab": "Saturday",
      "g.dom": "Sunday",
      "g.chiuso": "closed",
      "d.tel": "Phone",
      "d.strada": "Directions",
      "d.mappa": "Map: Arte &amp; Follia, Via Giuseppe Meda 37, Milan",
      "d.alt": "The reception desk at the entrance: black, with the golden letters ARTE &amp; FOLLIA MILANO, the grey marble top and the shelves behind",
      "d.cap": "The desk at the entrance.",
      "q.t": "Questions",
      "q.1": "How do I book?",
      "q.1r": "Online on Treatwell, or by phone: 02 8940 4709.",
      "q.2": "What is air touch?",
      "q.2r": "It is a lightening technique: with the hairdryer the shorter hairs of the lock are separated and only the longer ones are lightened. The blonde comes out luminous and natural, with no hard lines.",
      "q.3": "Do you do ammonia-free colour?",
      "q.3r": "Yes: root colour or full colour, also without ammonia, with a blow-dry or with a cut and blow-dry.",
      "q.4": "Do you cut children’s hair?",
      "q.4r": "Yes: the cut for boys and girls up to 7 years old. And the men’s cut, with scissors or clippers.",
      "z.cred": "Demo website made by <a href=\"https://bespokestud.io\" rel=\"noopener\">Bespoke Studio</a> · services and ratings from Treatwell, photos and reviews from the Google listing, their words from their Instagram (September 2026). The locks of hair are drawn.",
      "z.su": "Back to the top ↑"
    },
    LANGS: null,
    RTL: ['ar', 'he', 'fa', 'ur'],
    HOURS_I18N: null,
  };
  /* normalizzazione: EN storico -> LANGS */
  if (!SITE.LANGS) SITE.LANGS = SITE.EN && Object.keys(SITE.EN).length ? { en: SITE.EN } : {};
  var LANG_CODES = Object.keys(SITE.LANGS);   // senza 'it', che è il DOM
  /* ═════════════════════════════════════════════════════════════════ */

  /* ---------- WhatsApp wiring ---------- */
  if (SITE.whatsapp.number) {
    var waHref = 'https://wa.me/' + SITE.whatsapp.number + '?text=' +
      encodeURIComponent(SITE.whatsapp.message);
    SITE.whatsapp.ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.href = waHref; el.target = '_blank'; el.rel = 'noopener'; }
    });
  }

  /* ---------- GSAP: registrazione IMMEDIATA + reveal + watchdog ---------- */
  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll(SITE.revealSelector);
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) {
        els.forEach(function (el) {
          ScrollTrigger.getAll().forEach(function (st) {
            if (st.trigger === el && !st.progress) st.kill();
          });
        });
      }
      gsap.set(els, { opacity: 1, y: 0, x: 0 });
    }
  }
  // FIX FOUC (18/7): il watchdog è SOLO un fallback se GSAP non c'è (o reduced-motion).
  // Rivelare in anticipo tutti i .reveal mentre gli scroll-trigger sono attivi causava il
  // flash (scompaiono/ricompaiono) sotto la piega. Con GSAP attivo, rivelano gli ScrollTrigger.
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    // reveal generico: le animazioni-FIRMA del sito vanno oltre questo,
    // ma si registrano ANCHE LORO subito, mai dopo l'intro.
    // ⚠️ REGOLA ANTI-FLASH (18/7): un elemento .reveal deve avere UNA SOLA animazione che
    // ne porta l'opacità a 1. Se un elemento ha una FIRMA che ne anima l'opacità (stagger,
    // timeline, ecc.), ESCLUDILO da qui via SITE.revealSelector (es. '.reveal:not(.mondo)'),
    // altrimenti il reveal generico + la firma si sovrappongono e l'elemento FLASHA.
    // immediateRender:false → lo stato "from" (opacity:0) NON viene ri-applicato ad ogni
    // ScrollTrigger.refresh() (che scatta al window.load mentre scrolli) → niente flash su refresh.
    gsap.utils.toArray(SITE.revealSelector).forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  } else {
    // fallback senza GSAP: IntersectionObserver + classe
    if ('IntersectionObserver' in window && !reducedMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add(SITE.inViewClass); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(SITE.revealSelector).forEach(function (el) { io.observe(el); });
    } else {
      showAllReveals();
    }
  }

  /* ---------- intro skippabile (NON gate-a nulla) ---------- */
  var intro = document.getElementById(SITE.introId);
  /* ⚠️ L'hook si legge AL MOMENTO DELLA CHIAMATA, mai catturato per valore
     qui. Il codice-firma vive sotto il marcatore di fine plumbing — cioè
     gira DOPO questa riga — quindi `window.bespokeHeroEntrance ||
     function(){}` congelava la funzione vuota e l'entrata dell'hero non
     partiva più: titolo a opacity 0 per sempre, hero vuota sul live.
     (20/7/2026, riprodotto a schermo su Benessere Futuro #159.) */
  function heroEntrance() {
    if (typeof window.bespokeHeroEntrance === 'function') window.bespokeHeroEntrance();
  }
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 700);
    heroEntrance();
  }
  // rimozione IMMEDIATA (niente fade): serve quando qualcosa deve stare sopra
  // l'intro subito, es. l'apertura del menu. Durante il fade l'intro resta
  // hit-testable e i link del drawer non sono cliccabili.
  function killIntroNow() {
    if (!intro) return;
    var el = intro; intro = null;
    el.remove();
    heroEntrance();
  }
  if (reducedMotion || !intro) {
    if (intro) { intro.remove(); intro = null; }
    /* ⚠️ setTimeout 0 NON è decorativo: senza intro questo ramo gira in modo
       SINCRONO, cioè PRIMA che il codice-firma — che sta sotto il marcatore
       di fine plumbing, dentro questa stessa IIFE — abbia assegnato
       `window.bespokeHeroEntrance`. Il risultato è un'entrata dell'hero MUTA:
       nessun errore, elementi visibili, animazione semplicemente mai partita.
       Rimandando di un tick la IIFE è conclusa e l'hook esiste.
       (14/8/2026, A.S.FA. Sicilia: misurato h1 a opacity 1 già al load.)
       Cugino del bug `hero-hook-congelato` del 20/7: lì l'hook era catturato
       troppo presto, qui è CHIAMATO troppo presto. */
    setTimeout(heroEntrance, 0);
  } else {
    setTimeout(hideIntro, SITE.introDuration);
    setTimeout(hideIntro, 6000); // safety net: l'intro non può incastrarsi
    intro.addEventListener('click', hideIntro);
  }

  /* ---------- burger menu (inert + focus + Escape + resize) ---------- */
  var burger = document.getElementById('burger');
  /* 26/7/2026 (Il Papiro #168) — IL PANNELLO SI RISOLVE DA `aria-controls`.
     Il canone apriva sempre `#mainNav`, dando per scontato che la nav
     desktop FOSSE anche il drawer. Molti siti invece hanno un drawer
     separato (`#mobile-menu`) con `hidden`, mentre `#mainNav` su mobile è
     `display:none`: il burger aggiungeva `nav-open` a un elemento nascosto
     e il menu non si apriva. È la stessa decisione già presa il 20/7 per
     qa-motion — «è lì che il markup accessibile dice qual è il pannello» —
     che però non era mai rientrata qui. */
  var nav = (function () {
    var byAria = burger && burger.getAttribute('aria-controls');
    return (byAria && document.getElementById(byAria)) || document.getElementById('mainNav');
  })();
  if (burger && nav) {
    var navUsaHidden = nav.hasAttribute('hidden');
    var lastFocus = null;
    var closeNav = function () {
      nav.classList.remove('nav-open');
      if (navUsaHidden) nav.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };
    var openNav = function () {
      // L'intro ha z-index alto ed è figlia del body: se è ancora a schermo
      // copre il drawer (che vive nello stacking context dell'header) e i link
      // risultano non cliccabili. Aprire il menu chiude l'intro.
      // (bug trovato da qa-motion su Linea Uomo, 19/7/2026 → PLUMBING_V 2)
      if (typeof killIntroNow === 'function') killIntroNow();
      lastFocus = document.activeElement;
      if (navUsaHidden) nav.hidden = false;
      nav.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      var first = nav.querySelector('a, button');
      if (first) first.focus();
    };
    burger.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > SITE.breakpointMenu) closeNav();
    });
  }

  /* ---------- lightbox accessibile ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) {
      lightboxImg.src = src; lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    };
    var closeLb = function () {
      lightbox.hidden = true; lightboxImg.src = '';
      document.body.style.overflow = '';
      if (opener) { opener.focus(); opener = null; }
    };
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        var img = btn.querySelector('img');
        openLb(btn.getAttribute('data-full'), img ? img.alt : '');
      });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLb();
    });
  }

  /* ---------- orari dinamici Europe/Rome (finestre multiple + scavalco) ---------- */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
      });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var toMin = function (hm) {
    var a = hm.split(':');
    return parseInt(a[0], 10) * 60 + parseInt(a[1], 10);
  };
  var fmt = function (m) {
    m = m % 1440;
    return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2);
  };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var HOURS_BASE = {
    it: { open: 'Aperto ora', closesAt: 'chiude alle ', opensToday: 'Chiuso · apre oggi alle ',
          opensOn: 'Chiuso · apre {day} alle ', closed: 'Chiuso', days: DAYS_IT },
    en: { open: 'Open now', closesAt: 'closes at ', opensToday: 'Closed · opens today at ',
          opensOn: 'Closed · opens {day} at ', closed: 'Closed', days: DAYS_EN },
  };
  /* risolve le etichette orari per la lingua richiesta, con fallback en -> it */
  function strings(lang) {
    var custom = (SITE.HOURS_I18N && SITE.HOURS_I18N[lang]) || null;
    var base = HOURS_BASE[lang] || HOURS_BASE.en;
    if (!custom) return base;
    var outp = {};
    Object.keys(HOURS_BASE.it).forEach(function (k) {
      outp[k] = custom[k] !== undefined ? custom[k] : base[k];
    });
    return outp;
  }

  function hoursState() {
    var now = romeNow();
    // finestra del giorno corrente
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) {
      var s = toMin(wins[i][0]), e = toMin(wins[i][1]);
      if (now.mins >= s && now.mins < Math.min(e, 1440)) {
        return { open: true, day: now.day, closesAt: fmt(e) };
      }
    }
    // coda dopo mezzanotte della sera PRIMA
    var prev = (now.day + 6) % 7;
    var pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) {
      var pe = toMin(pw[j][1]);
      if (pe > 1440 && now.mins < pe - 1440) {
        return { open: true, day: prev, closesAt: fmt(pe) };
      }
    }
    // chiuso: prossima apertura (oggi o nei prossimi 7 giorni)
    for (var k = 0; k < wins.length; k++) {
      if (now.mins < toMin(wins[k][0])) {
        return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) };
      }
    }
    for (var d = 1; d <= 7; d++) {
      var nd = (now.day + d) % 7;
      var nw = SITE.hours[nd] || [];
      if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) };
    }
    return { open: false, day: now.day };
  }

  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) {
      row.classList.toggle(SITE.todayClass,
        parseInt(row.getAttribute('data-day'), 10) === st.day);
    });
    if (!el) return;
    /* V4: le etichette si risolvono per lingua corrente, non con un booleano
       en/it. Fallback a catena lingua -> en -> it, così un sito con AR o FR
       che non traduce lo stato orari resta comunque leggibile. */
    var L = strings(root.lang);
    var txt;
    if (st.open) {
      txt = L.open + ' · ' + L.closesAt + st.closesAt;
    } else if (st.opensToday) {
      txt = L.opensToday + st.opensToday;
    } else if (st.opensAt !== undefined) {
      txt = L.opensOn.replace('{day}', L.days[st.opensDay]) + st.opensAt;
    } else {
      txt = L.closed;
    }
    el.textContent = txt;
  }
  renderHours();
  setInterval(renderHours, 60000);

  /* ---------- i18n overlay (EN sopra l'IT del DOM) ---------- */
  var originals = {}; // attr -> key -> testo IT
  var I18N_ATTRS = [
    ['data-i18n', null],
    ['data-i18n-aria', 'aria-label'],
    ['data-i18n-alt', 'alt'],
    ['data-i18n-placeholder', 'placeholder'],
    ['data-i18n-title', 'title'],
  ];
  function setLang(lang) {
    /* V4: qualunque lingua dichiarata in SITE.LANGS, non più solo 'en'.
       'it' resta la lingua del DOM: nessun dizionario, nessuna sostituzione.
       Una lingua sconosciuta ricade su 'it' invece di rompere la pagina. */
    root.lang = (lang === 'it' || LANG_CODES.indexOf(lang) !== -1) ? lang : 'it';
    root.dir = SITE.RTL.indexOf(root.lang) !== -1 ? 'rtl' : 'ltr';
    var dict = SITE.LANGS[root.lang] || null;
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr);
        var store = originals[dattr];
        /* innerHTML, NON textContent: gli elementi tradotti contengono
           quasi sempre markup (<strong>, <br>) e con textContent il primo
           passaggio a EN lo appiattisce — tornando in italiano il grassetto
           non torna più. I valori del dizionario sono statici e scritti da
           noi. (20/7/2026: la flotta era già così, il boilerplate no.) */
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = dict && dict[key] !== undefined ? dict[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    /* stato visivo della coppia di bottoni lingua, se il sito la usa */
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === root.lang;
      b.classList.toggle('is-on', on);
      if (b.tagName === 'BUTTON') b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  /* 26/7/2026 (Il Papiro #168) — SI CABLANO ENTRAMBE LE FORME DI SELETTORE.
     Il canone conosceva solo il toggle singolo `#langToggle`, ma nella
     flotta esiste da tempo anche la COPPIA di bottoni `[data-lang]`
     (Warsa, Mido…): `i18n-roundtrip` era già stato insegnato a riconoscerle
     il 20/7, il plumbing no. Chi copiava il boilerplate e usava la coppia
     si ritrovava il cambio lingua MORTO, e nessun lint statico se ne
     accorgeva (lo becca solo qa-motion, a runtime). */
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    /* V4: il toggle singolo CICLA sull'anello ['it', ...LANG_CODES].
       Con due lingue il comportamento è identico a prima (it <-> en). */
    var RING = ['it'].concat(LANG_CODES);
    langToggle.addEventListener('click', function () {
      var i = RING.indexOf(root.lang);
      setLang(RING[(i + 1) % RING.length]);
    });
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  try {
    var saved = localStorage.getItem(SITE.slug + '-lang');
    if (saved && saved !== 'it' && LANG_CODES.indexOf(saved) !== -1) setLang(saved);
  } catch (e) {}

  /* ---------- action-bar mobile (opzionale: #actionBar) ---------- */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () {
      actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════ FINE PLUMBING — da qui in giù SOLO il codice-firma
     del sito (animazioni e interazioni uniche del cliente), che si
     registra comunque SUBITO, mai dentro setTimeout/intro. ══════════ */

  /* ══════════ ARTE & FOLLIA — «Un gioco di luce.» ══════════
     La pagina è la scala dei toni: ogni capitolo è un'altezza di tono, dal nero al biondo extra chiaro, e la testata prende
     il colore del livello in cui ti trovi.
     la FIRMA — l'air touch: nell'apertura una ciocca castana (livello 4) è appesa alla pinza d'oro. Un soffio d'aria solleva
     e sposta i capelli più corti; si schiariscono solo i lunghi, dalle punte verso l'alto (la radice resta scura e
     sfumata); l'aria si ferma e i corti ricadono fra i lunghi con un'oscillazione smorzata. L'etichetta conta da 4.0 a 9.0.
     Stato finale = l'HTML/SVG (i lunghi già schiariti, i corti a riposo, «9.0 · biondo chiarissimo»). Senza JS e con
     reduced-motion: lo stato finale. L'attesa è la classe firma-attesa dell'head (gli stop ai colori castani via CSS), tolta
     dall'head dopo 2,5 s se il codice non arriva. Un rAF a tempo: la firma non dipende da GSAP.
     La funzione dei capelli è la stessa del generatore (_aef_ciocche.mjs). */
  function puntiCapello(s, piega, alza) {
    var P = [], N = 10;
    for (var i = 0; i <= N; i++) {
      var t = i / N;
      var onda = s.a * Math.sin(s.f + t * 6.2832 * s.r) * Math.min(1, t * 1.6);
      var ciocca = s.c * Math.sin(s.q + t * 5.65) * Math.pow(t, 1.15);
      P.push([s.x + s.p * Math.pow(t, 1.4) + ciocca + onda + piega * Math.pow(t, 1.8), s.y + s.l * t - alza * Math.pow(t, 2.2)]);
    }
    return P;
  }
  function dCapello(P) {
    var r = function (v) { return Math.round(v * 10) / 10; };
    var d = 'M' + r(P[0][0]) + ' ' + r(P[0][1]);
    for (var i = 0; i < P.length - 1; i++) {
      var p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
      d += 'C' + r(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + r(p1[1] + (p2[1] - p0[1]) / 6) + ' ' + r(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + r(p2[1] - (p3[1] - p1[1]) / 6) + ' ' + r(p2[0]) + ' ' + r(p2[1]);
    }
    return d;
  }
  var DATI = {"vb":{"w":320,"h":780,"cx":160},"grad":{"lg":[[0,"#3B2A20","#34251B"],[0.16,"#4A3326","#3F2B1F"],[0.36,"#8E6B46","#4A3224"],[0.58,"#C9A774","#523828"],[0.8,"#E3CB9C","#5A3E2B"],[1,"#EFDFBC","#614331"]],"lr":[[0,"#4A3326","#3A281D"],[0.22,"#7C5B3D","#4A3224"],[0.42,"#D4B585","#56392A"],[0.7,"#F1E2C0","#62432F"],[1,"#F8ECD3","#6B4A35"]],"sc":[[0,"#33241B","#33241B"],[0.4,"#4A3224","#46301F"],[1,"#6A4A33","#5E412D"]]},"capelli":[{"x":152.1,"y":71.9,"l":574.6,"p":-9.8,"a":3.4,"r":1.6,"f":1.61,"c":14.1,"q":5.14,"w":1.65,"o":0.55,"g":"lr","v":11.9},{"x":160.4,"y":68.1,"l":643.2,"p":3.9,"a":1.9,"r":1.26,"f":3.16,"c":13.4,"q":5.27,"w":1.3,"o":0.55,"g":"lg","v":15.3},{"x":140.5,"y":68.1,"l":312.9,"p":-13.2,"a":3.1,"r":1.68,"f":5.06,"c":12.1,"q":5.08,"w":1.21,"o":0.55,"g":"sc","v":98.7},{"x":163.3,"y":72.6,"l":658.4,"p":7.6,"a":2.3,"r":1.3,"f":5.07,"c":12.8,"q":5.3,"w":1.43,"o":0.56,"g":"lg","v":8.6},{"x":130.3,"y":68.3,"l":586.3,"p":-29.2,"a":3.8,"r":1.83,"f":3.51,"c":11.2,"q":5.36,"w":1.67,"o":0.56,"g":"lg","v":6.8},{"x":139.4,"y":69.5,"l":328.6,"p":-29.5,"a":1.6,"r":1.65,"f":4.98,"c":12,"q":5.3,"w":0.81,"o":0.56,"g":"sc","v":121.1},{"x":186.2,"y":71.8,"l":295.7,"p":27.2,"a":4.1,"r":1.35,"f":5.69,"c":12.2,"q":5.28,"w":1.23,"o":0.56,"g":"sc","v":141.8},{"x":137.7,"y":68.3,"l":572.1,"p":-28.4,"a":3.6,"r":1.86,"f":0.4,"c":12.6,"q":5.33,"w":1.18,"o":0.56,"g":"lg","v":9},{"x":142.4,"y":71.7,"l":643.9,"p":-27.4,"a":3,"r":1.83,"f":5.42,"c":12.1,"q":5.06,"w":1.75,"o":0.57,"g":"lg","v":10.6},{"x":183.2,"y":72.8,"l":636.3,"p":21.3,"a":2,"r":1.68,"f":2.41,"c":11.5,"q":5.37,"w":1.73,"o":0.57,"g":"lg","v":11.8},{"x":145.6,"y":69.8,"l":411.8,"p":-22.4,"a":2.3,"r":1.54,"f":2.93,"c":13.8,"q":5.03,"w":1.28,"o":0.57,"g":"sc","v":103.1},{"x":142,"y":71.8,"l":644.1,"p":-11.7,"a":3.4,"r":1.11,"f":5.17,"c":13.8,"q":5.05,"w":1.94,"o":0.57,"g":"lg","v":7.8},{"x":134.7,"y":70.6,"l":594.3,"p":-20.4,"a":9.6,"r":1.7,"f":0.91,"c":11.7,"q":5.11,"w":1.55,"o":0.57,"g":"lg","v":15.1},{"x":180.8,"y":71.8,"l":623.9,"p":16.1,"a":3,"r":1.41,"f":2.11,"c":14.1,"q":5.38,"w":1.59,"o":0.57,"g":"lg","v":11.5},{"x":171.3,"y":70.7,"l":576.9,"p":11.6,"a":4.2,"r":1.31,"f":1.41,"c":13.5,"q":5.36,"w":1.38,"o":0.58,"g":"lr","v":15.6},{"x":146.4,"y":72.6,"l":646.6,"p":-18.4,"a":2.9,"r":1.39,"f":1.2,"c":13.6,"q":5.18,"w":1.08,"o":0.58,"g":"lr","v":13.9},{"x":147.1,"y":72.4,"l":604.4,"p":-19.7,"a":2.9,"r":1.24,"f":1.38,"c":12.8,"q":5.34,"w":1.75,"o":0.58,"g":"lg","v":12.2},{"x":180.5,"y":70.4,"l":374.6,"p":25.6,"a":3.9,"r":1.16,"f":5.41,"c":12.3,"q":5.37,"w":1.16,"o":0.59,"g":"sc","v":90.7},{"x":164.2,"y":69.7,"l":618.2,"p":3.7,"a":4.4,"r":1.19,"f":0.02,"c":13.7,"q":5.12,"w":1.4,"o":0.59,"g":"lg","v":8.1},{"x":142.1,"y":70.7,"l":353.6,"p":-23.6,"a":3.7,"r":1.82,"f":2.38,"c":11.6,"q":5.19,"w":1.26,"o":0.59,"g":"sc","v":135},{"x":173.1,"y":72.3,"l":643.8,"p":9.2,"a":3.5,"r":1.47,"f":0.58,"c":12.4,"q":5.13,"w":1.59,"o":0.59,"g":"lg","v":12.7},{"x":178.2,"y":71.2,"l":629.4,"p":17.5,"a":3.5,"r":1.63,"f":4.42,"c":11.7,"q":5.37,"w":1.05,"o":0.6,"g":"lg","v":14.7},{"x":132.1,"y":70,"l":357.7,"p":-36.4,"a":1.8,"r":1.2,"f":1.86,"c":11.1,"q":5.2,"w":1.24,"o":0.6,"g":"sc","v":139.9},{"x":161.9,"y":70.9,"l":659.3,"p":6.1,"a":2.2,"r":1.24,"f":1.81,"c":13.7,"q":5.31,"w":1.62,"o":0.6,"g":"lr","v":15.9},{"x":186.1,"y":68.7,"l":381.4,"p":19.4,"a":1.9,"r":1.49,"f":6.14,"c":11.4,"q":5.17,"w":1.13,"o":0.6,"g":"sc","v":99.1},{"x":179.7,"y":69.5,"l":453,"p":44.5,"a":5.2,"r":1.56,"f":4.23,"c":12.2,"q":5.15,"w":1.02,"o":0.6,"g":"sc","v":114.7},{"x":187.4,"y":69.9,"l":319.8,"p":32.6,"a":4.2,"r":1.16,"f":1.85,"c":11.7,"q":5.08,"w":0.87,"o":0.6,"g":"sc","v":104.5},{"x":133.7,"y":72.9,"l":639,"p":-19,"a":2.6,"r":1.8,"f":4.57,"c":11.5,"q":5.27,"w":0.93,"o":0.6,"g":"lg","v":8.5},{"x":161.2,"y":72.9,"l":564.4,"p":-3.7,"a":3.3,"r":1.15,"f":3.32,"c":12.7,"q":5.25,"w":1.37,"o":0.61,"g":"lg","v":6.2},{"x":163.8,"y":68.8,"l":639.3,"p":1.7,"a":2.9,"r":1.52,"f":4.62,"c":12,"q":5.19,"w":1.6,"o":0.61,"g":"lg","v":11.2},{"x":157,"y":68.7,"l":665.5,"p":5.8,"a":4.5,"r":1.51,"f":0.91,"c":11.2,"q":5.2,"w":1.46,"o":0.61,"g":"lr","v":11.2},{"x":172.7,"y":71.9,"l":573.6,"p":6.6,"a":4.1,"r":1.78,"f":0.35,"c":12,"q":5.19,"w":1.33,"o":0.61,"g":"lg","v":15.5},{"x":171.7,"y":72.1,"l":642.1,"p":14.8,"a":4.5,"r":1.37,"f":1.5,"c":12.5,"q":5.29,"w":1.73,"o":0.61,"g":"lg","v":15.7},{"x":174.5,"y":71.2,"l":650.7,"p":17.9,"a":2.5,"r":1.3,"f":5.98,"c":13.7,"q":5.12,"w":1.13,"o":0.61,"g":"lg","v":10.8},{"x":145.7,"y":68.1,"l":356.5,"p":-13.9,"a":3.7,"r":1.38,"f":2.88,"c":13.8,"q":5.13,"w":1.38,"o":0.61,"g":"sc","v":135},{"x":162,"y":70.1,"l":322.7,"p":5.6,"a":2.2,"r":1.54,"f":4.63,"c":13.9,"q":5.19,"w":1.16,"o":0.62,"g":"sc","v":88.2},{"x":184,"y":70.9,"l":632.5,"p":20.8,"a":2.5,"r":1.84,"f":5.05,"c":12.8,"q":5.17,"w":1.7,"o":0.62,"g":"lg","v":9},{"x":178.7,"y":71,"l":595.7,"p":23.3,"a":4.4,"r":1.46,"f":3.58,"c":12,"q":5.24,"w":1.69,"o":0.62,"g":"lg","v":13.7},{"x":173.9,"y":69.8,"l":323.5,"p":17.9,"a":3.7,"r":1.72,"f":4.94,"c":13.5,"q":5.25,"w":0.87,"o":0.62,"g":"sc","v":131.2},{"x":176.6,"y":68.5,"l":374.6,"p":15.7,"a":3.8,"r":1.19,"f":5.67,"c":11.8,"q":5.1,"w":1.26,"o":0.63,"g":"sc","v":111.2},{"x":186.5,"y":69.8,"l":608.3,"p":19.5,"a":1.9,"r":1.42,"f":5.71,"c":13,"q":5.36,"w":1.9,"o":0.63,"g":"lr","v":12.4},{"x":186.9,"y":72.6,"l":574.3,"p":21.2,"a":3.5,"r":1.8,"f":1.3,"c":13,"q":5.31,"w":1.58,"o":0.63,"g":"lr","v":7.4},{"x":151.8,"y":72.7,"l":635.8,"p":-13.5,"a":4.3,"r":1.75,"f":4.11,"c":11.3,"q":5.14,"w":1.67,"o":0.64,"g":"lr","v":7.3},{"x":185.3,"y":71.6,"l":362.7,"p":23.6,"a":4,"r":1.89,"f":2.91,"c":11.9,"q":5.23,"w":1.13,"o":0.64,"g":"sc","v":137.8},{"x":134.8,"y":72.9,"l":578.2,"p":-34.5,"a":2.2,"r":1.41,"f":3.76,"c":11.3,"q":5.15,"w":1.58,"o":0.64,"g":"lg","v":11},{"x":145.5,"y":72.9,"l":286,"p":-11,"a":2.5,"r":1.28,"f":1.92,"c":11.4,"q":5.11,"w":1.15,"o":0.64,"g":"sc","v":105.5},{"x":188.4,"y":69.1,"l":414.6,"p":27.5,"a":2,"r":1.38,"f":3.59,"c":12.5,"q":5.08,"w":0.92,"o":0.64,"g":"sc","v":104.5},{"x":188.2,"y":70.1,"l":640.5,"p":38.5,"a":4.3,"r":1.82,"f":3.29,"c":12,"q":5.04,"w":1.88,"o":0.65,"g":"lg","v":8.3},{"x":155.1,"y":71,"l":647.5,"p":-13.8,"a":3.8,"r":1.7,"f":4.64,"c":11.4,"q":5.14,"w":1.42,"o":0.65,"g":"lg","v":6.3},{"x":177.8,"y":68.9,"l":583.4,"p":13.3,"a":4.3,"r":1.34,"f":2.95,"c":14.1,"q":5.08,"w":1.82,"o":0.65,"g":"lg","v":9.6},{"x":136.9,"y":70.6,"l":591.7,"p":-29.4,"a":3.6,"r":1.21,"f":2.8,"c":13.3,"q":5.16,"w":1.64,"o":0.65,"g":"lr","v":6.5},{"x":155.4,"y":69.7,"l":433.2,"p":-11.1,"a":4.2,"r":1.36,"f":3.6,"c":11.1,"q":5.03,"w":1.26,"o":0.65,"g":"sc","v":142.7},{"x":132.2,"y":70.6,"l":618.7,"p":-24.8,"a":1.8,"r":1.46,"f":1.62,"c":11.9,"q":5.07,"w":1.46,"o":0.66,"g":"lg","v":8.1},{"x":150.4,"y":71.3,"l":317.9,"p":-9.5,"a":3.8,"r":1.22,"f":3.48,"c":11.8,"q":5.06,"w":0.97,"o":0.66,"g":"sc","v":104.4},{"x":160.6,"y":71.2,"l":617.9,"p":0.4,"a":4.4,"r":1.58,"f":2.99,"c":13.1,"q":5.37,"w":1.35,"o":0.66,"g":"lg","v":6.4},{"x":183.9,"y":70.8,"l":448.8,"p":21.7,"a":2.1,"r":1.2,"f":1.61,"c":13.1,"q":5.27,"w":1.46,"o":0.66,"g":"sc","v":97.2},{"x":186.7,"y":72.6,"l":562.4,"p":30.7,"a":2.9,"r":1.16,"f":0,"c":11.9,"q":5.04,"w":1.67,"o":0.66,"g":"lr","v":12.4},{"x":152.5,"y":71.1,"l":318.5,"p":-8.5,"a":3.3,"r":1.19,"f":5.77,"c":11.8,"q":5.25,"w":1.48,"o":0.66,"g":"sc","v":130.6},{"x":188.4,"y":72,"l":605.6,"p":36.7,"a":2.5,"r":1.54,"f":5.76,"c":13.2,"q":5.25,"w":1.8,"o":0.67,"g":"lr","v":9.8},{"x":154.4,"y":69.7,"l":303.2,"p":-13.9,"a":2,"r":1.89,"f":4.32,"c":11.8,"q":5.35,"w":1.07,"o":0.67,"g":"sc","v":128.3},{"x":141.8,"y":70.2,"l":366.2,"p":-20.6,"a":3.6,"r":1.32,"f":3.24,"c":12,"q":5.26,"w":1.07,"o":0.67,"g":"sc","v":144.7},{"x":130.5,"y":72.3,"l":642.7,"p":-33.8,"a":2.9,"r":1.11,"f":4.77,"c":12.2,"q":5.03,"w":1.03,"o":0.67,"g":"lg","v":7.4},{"x":187.5,"y":68.3,"l":382.8,"p":23.3,"a":3.2,"r":1.2,"f":1.23,"c":11.5,"q":5.15,"w":1.49,"o":0.67,"g":"sc","v":106.9},{"x":134.1,"y":68.2,"l":653.4,"p":-22,"a":2.7,"r":1.69,"f":1.47,"c":12.7,"q":5.12,"w":1.6,"o":0.67,"g":"lr","v":7.9},{"x":186.3,"y":72.1,"l":653.7,"p":29.6,"a":2.1,"r":1.17,"f":0.81,"c":12.1,"q":5.25,"w":1.87,"o":0.68,"g":"lg","v":7.4},{"x":140.2,"y":72.8,"l":581.4,"p":-23.7,"a":2.5,"r":1.3,"f":2.54,"c":11.4,"q":5.35,"w":1.32,"o":0.68,"g":"lg","v":7.6},{"x":136.7,"y":68.6,"l":660.6,"p":-16.2,"a":2.1,"r":1.12,"f":0.97,"c":13.4,"q":5.17,"w":1.05,"o":0.68,"g":"lg","v":12},{"x":157.3,"y":70.1,"l":624.5,"p":-10.5,"a":2.2,"r":1.64,"f":4.26,"c":13.3,"q":5.31,"w":1.3,"o":0.69,"g":"lg","v":9},{"x":133.4,"y":69.3,"l":620.1,"p":-36.1,"a":2.5,"r":1.58,"f":0.34,"c":11.2,"q":5.07,"w":1.59,"o":0.69,"g":"lr","v":6.6},{"x":139,"y":68.6,"l":597.2,"p":-18,"a":4.1,"r":1.88,"f":3.87,"c":11.5,"q":5.34,"w":1.96,"o":0.69,"g":"lg","v":7.3},{"x":187.7,"y":72.5,"l":575.4,"p":35,"a":3.8,"r":1.33,"f":6.17,"c":13.6,"q":5.25,"w":1.48,"o":0.69,"g":"lg","v":15.3},{"x":159.6,"y":70.3,"l":646.1,"p":6.6,"a":3.1,"r":1.15,"f":3.61,"c":13.4,"q":5.24,"w":1.08,"o":0.69,"g":"lg","v":7.4},{"x":162.8,"y":68.2,"l":384.6,"p":11.2,"a":3.6,"r":1.17,"f":4.7,"c":12.4,"q":5.31,"w":1.51,"o":0.69,"g":"sc","v":90},{"x":140.5,"y":71.6,"l":611.5,"p":-25.1,"a":2.3,"r":1.43,"f":5.7,"c":12.4,"q":5.31,"w":1.52,"o":0.7,"g":"lg","v":9},{"x":176.2,"y":72,"l":365.7,"p":13.4,"a":2.2,"r":1.58,"f":4.37,"c":12.4,"q":5.32,"w":0.9,"o":0.7,"g":"sc","v":132.4},{"x":178.4,"y":68.2,"l":422.1,"p":17.6,"a":2.5,"r":1.43,"f":2.87,"c":12.8,"q":5.3,"w":1.24,"o":0.7,"g":"sc","v":123.9},{"x":180.6,"y":70.7,"l":580.1,"p":28.5,"a":1.6,"r":1.34,"f":1.16,"c":11.3,"q":5.16,"w":1.77,"o":0.7,"g":"lg","v":15.5},{"x":184.5,"y":72.8,"l":668.5,"p":20.6,"a":3.1,"r":1.15,"f":1,"c":13.9,"q":5.27,"w":1.24,"o":0.7,"g":"lr","v":15.8},{"x":152.8,"y":70.2,"l":322,"p":-5.5,"a":1.6,"r":1.16,"f":0.6,"c":11.2,"q":5.17,"w":0.87,"o":0.7,"g":"sc","v":127.9},{"x":170.7,"y":71.7,"l":597.2,"p":19,"a":4.2,"r":1.18,"f":3.83,"c":12.6,"q":5.02,"w":1.8,"o":0.7,"g":"lr","v":8.2},{"x":149.8,"y":71.8,"l":333.9,"p":-9.7,"a":4.4,"r":1.53,"f":3.66,"c":11.1,"q":5.21,"w":1.3,"o":0.71,"g":"sc","v":110.9},{"x":146,"y":69.9,"l":409.1,"p":-11.8,"a":3.1,"r":1.62,"f":4.14,"c":11.9,"q":5.1,"w":1.42,"o":0.71,"g":"sc","v":125},{"x":139,"y":71.6,"l":641,"p":-31.2,"a":4.7,"r":1.71,"f":6.22,"c":11.9,"q":5.07,"w":1.64,"o":0.71,"g":"lr","v":10.2},{"x":142,"y":71.8,"l":568.5,"p":-11.7,"a":4.3,"r":1.37,"f":0.13,"c":11.8,"q":5.03,"w":1.34,"o":0.71,"g":"lg","v":13.6},{"x":159.9,"y":68.7,"l":627.6,"p":-3.6,"a":3.1,"r":1.14,"f":0.93,"c":12.3,"q":5.11,"w":1.79,"o":0.71,"g":"lg","v":13.3},{"x":154.7,"y":70.4,"l":577.6,"p":-6.3,"a":4.3,"r":1.46,"f":2.08,"c":14,"q":5.29,"w":1.13,"o":0.71,"g":"lg","v":15.5},{"x":131.8,"y":72.6,"l":272.4,"p":-26.1,"a":3.9,"r":1.38,"f":3.67,"c":11.1,"q":5.03,"w":0.97,"o":0.71,"g":"sc","v":111.4},{"x":163.3,"y":72.5,"l":576.1,"p":10,"a":3.4,"r":1.2,"f":2.06,"c":12.3,"q":5.37,"w":1.93,"o":0.71,"g":"lg","v":14.4},{"x":156.3,"y":69.1,"l":613.4,"p":-12.3,"a":3.9,"r":1.69,"f":3.22,"c":12.8,"q":5.26,"w":0.99,"o":0.72,"g":"lr","v":13.7},{"x":162,"y":69,"l":650.8,"p":-2.4,"a":1.8,"r":1.84,"f":4.46,"c":12.4,"q":5.28,"w":1,"o":0.72,"g":"lg","v":11},{"x":146.9,"y":69.1,"l":607.8,"p":-15.4,"a":2.9,"r":1.51,"f":2.94,"c":11.6,"q":5.07,"w":1.83,"o":0.72,"g":"lr","v":7},{"x":136.1,"y":70.6,"l":655.8,"p":-24.1,"a":2.2,"r":1.42,"f":0.91,"c":13.9,"q":5.32,"w":1.64,"o":0.72,"g":"lg","v":15.6},{"x":158.8,"y":72.2,"l":564.3,"p":4.4,"a":4.3,"r":1.69,"f":1.15,"c":12.8,"q":5.33,"w":1.27,"o":0.73,"g":"lg","v":11.4},{"x":130.5,"y":71.8,"l":605.1,"p":-26.1,"a":2.8,"r":1.49,"f":4.76,"c":13,"q":5.26,"w":1.08,"o":0.73,"g":"lg","v":12.2},{"x":170.1,"y":68.5,"l":382.7,"p":21.8,"a":6.4,"r":1.86,"f":4.82,"c":13.7,"q":5.05,"w":1.22,"o":0.73,"g":"sc","v":123.5},{"x":140.4,"y":71.3,"l":573.9,"p":-27.2,"a":3.1,"r":1.31,"f":0.58,"c":11.8,"q":5.3,"w":1.47,"o":0.73,"g":"lr","v":13.1},{"x":188.1,"y":73,"l":436.7,"p":23.2,"a":2.5,"r":1.14,"f":3.98,"c":11.6,"q":5.35,"w":0.84,"o":0.73,"g":"sc","v":135.3},{"x":174.1,"y":72.4,"l":656.9,"p":22.1,"a":2.9,"r":1.32,"f":3.05,"c":13.8,"q":5.07,"w":1.54,"o":0.73,"g":"lr","v":15.4},{"x":132.5,"y":71,"l":653.9,"p":-37.1,"a":3.4,"r":1.49,"f":1.69,"c":11.4,"q":5.36,"w":0.9,"o":0.73,"g":"lg","v":12.5},{"x":152.4,"y":71.2,"l":369.9,"p":-12.3,"a":2.2,"r":1.78,"f":2.69,"c":12.4,"q":5.35,"w":1.15,"o":0.74,"g":"sc","v":93.2},{"x":165.9,"y":71.2,"l":583.8,"p":6.1,"a":3.5,"r":1.75,"f":1.9,"c":11.5,"q":5.32,"w":1.09,"o":0.74,"g":"lr","v":8},{"x":142.1,"y":71.7,"l":652.6,"p":-18.2,"a":3.1,"r":1.51,"f":2.27,"c":11.6,"q":5.05,"w":1.3,"o":0.74,"g":"lg","v":14.6},{"x":149.1,"y":70.8,"l":626.3,"p":-16.1,"a":2.6,"r":1.45,"f":2.28,"c":11.2,"q":5.04,"w":1.12,"o":0.74,"g":"lg","v":11.2},{"x":136.1,"y":68.4,"l":669,"p":-31.6,"a":3.2,"r":1.41,"f":2.55,"c":11.6,"q":5.22,"w":1.29,"o":0.74,"g":"lg","v":8.2},{"x":169.8,"y":72.4,"l":575.4,"p":10.5,"a":3.9,"r":1.27,"f":0.55,"c":13.5,"q":5.23,"w":1.21,"o":0.74,"g":"lg","v":11.1},{"x":185.8,"y":72.9,"l":623.7,"p":34.9,"a":4,"r":1.87,"f":0.92,"c":11.3,"q":5.22,"w":1.26,"o":0.74,"g":"lg","v":13.7},{"x":175,"y":68.8,"l":594.5,"p":11.5,"a":1.7,"r":1.35,"f":0.49,"c":11.5,"q":5.22,"w":1.26,"o":0.74,"g":"lg","v":9.6},{"x":163.4,"y":71.3,"l":406.4,"p":1.1,"a":4.3,"r":1.63,"f":4.73,"c":12.2,"q":5.09,"w":1.52,"o":0.74,"g":"sc","v":113.5},{"x":177.3,"y":68.1,"l":573.6,"p":25.9,"a":3.3,"r":1.85,"f":0.94,"c":13,"q":5.24,"w":1.06,"o":0.74,"g":"lg","v":12.4},{"x":165.9,"y":72.9,"l":596.4,"p":13.1,"a":4.1,"r":1.63,"f":2.94,"c":13.4,"q":5.37,"w":1.22,"o":0.75,"g":"lg","v":7},{"x":171.6,"y":72.3,"l":631.6,"p":14.7,"a":1.5,"r":1.25,"f":4.06,"c":11.6,"q":5.15,"w":2,"o":0.75,"g":"lg","v":10.5},{"x":171.4,"y":71.9,"l":656.7,"p":9.9,"a":3.8,"r":1.18,"f":2.25,"c":11.3,"q":5.07,"w":1.4,"o":0.75,"g":"lg","v":16},{"x":151.9,"y":70.6,"l":667.3,"p":-15,"a":2.7,"r":1.64,"f":1.15,"c":12.4,"q":5.29,"w":1.34,"o":0.75,"g":"lg","v":13.9},{"x":156.5,"y":68.1,"l":562.7,"p":-0.4,"a":4.3,"r":1.83,"f":3.29,"c":13.2,"q":5.17,"w":1.67,"o":0.75,"g":"lg","v":9.4},{"x":154.6,"y":68.7,"l":438.3,"p":-6.3,"a":4,"r":1.25,"f":6.14,"c":13.5,"q":5.26,"w":1.27,"o":0.75,"g":"sc","v":100.5},{"x":159.1,"y":70.9,"l":355.9,"p":2.6,"a":2.8,"r":1.53,"f":0.74,"c":12.1,"q":5.07,"w":1.4,"o":0.75,"g":"sc","v":124.3},{"x":172.1,"y":72.9,"l":420.5,"p":17.8,"a":2,"r":1.87,"f":1.13,"c":13.1,"q":5.16,"w":1.36,"o":0.75,"g":"sc","v":96.9},{"x":137.2,"y":69.3,"l":606.8,"p":-32.4,"a":1.9,"r":1.22,"f":3.08,"c":13.8,"q":5.15,"w":1.36,"o":0.75,"g":"lg","v":7.4},{"x":151.7,"y":72.7,"l":572,"p":-4.5,"a":2,"r":1.33,"f":1.1,"c":13.8,"q":5.09,"w":1.46,"o":0.76,"g":"lg","v":14},{"x":156.4,"y":70.1,"l":569.2,"p":-3.5,"a":2.5,"r":1.69,"f":6.09,"c":13.2,"q":5.1,"w":1.14,"o":0.76,"g":"lg","v":7.2},{"x":160.5,"y":71.5,"l":614.4,"p":5.9,"a":3.7,"r":1.29,"f":2.06,"c":13.2,"q":5.08,"w":0.94,"o":0.76,"g":"lg","v":14.4},{"x":130.5,"y":71.4,"l":584.6,"p":-35.1,"a":4.2,"r":1.68,"f":4.46,"c":12.3,"q":5.31,"w":1.72,"o":0.77,"g":"lg","v":14.8},{"x":145.2,"y":71.7,"l":588.9,"p":-12.6,"a":2,"r":1.85,"f":0.08,"c":11.8,"q":5.23,"w":1.08,"o":0.77,"g":"lr","v":13.2},{"x":147,"y":70.4,"l":601.7,"p":-14.9,"a":2.4,"r":1.38,"f":4.74,"c":11.7,"q":5.37,"w":1.79,"o":0.78,"g":"lr","v":12},{"x":158.1,"y":71.4,"l":456,"p":-3,"a":4.3,"r":1.4,"f":2.94,"c":13.9,"q":5.07,"w":1.34,"o":0.78,"g":"sc","v":135.7},{"x":149.7,"y":68.9,"l":624.3,"p":-13.2,"a":4.3,"r":1.36,"f":6.01,"c":13.9,"q":5.07,"w":1.69,"o":0.78,"g":"lg","v":14.2},{"x":179.7,"y":71,"l":604.2,"p":19.6,"a":3.9,"r":1.47,"f":2.46,"c":12.1,"q":5.2,"w":1.99,"o":0.78,"g":"lg","v":12.5},{"x":175.6,"y":69.4,"l":358.6,"p":19.9,"a":1.9,"r":1.7,"f":6.28,"c":12.5,"q":5.11,"w":1.41,"o":0.78,"g":"sc","v":110.4},{"x":181.4,"y":70,"l":469.2,"p":15.3,"a":2.7,"r":1.19,"f":5.63,"c":11.8,"q":5.37,"w":1,"o":0.78,"g":"sc","v":102},{"x":187.7,"y":72,"l":349.8,"p":32.1,"a":1.6,"r":1.26,"f":0.61,"c":13.6,"q":5.27,"w":0.96,"o":0.78,"g":"sc","v":133.8},{"x":174.9,"y":69.6,"l":621.6,"p":19.8,"a":2.8,"r":1.4,"f":1.57,"c":12.7,"q":5.15,"w":1.43,"o":0.78,"g":"lg","v":14.1},{"x":132,"y":68.5,"l":424.6,"p":-32.8,"a":2.5,"r":1.22,"f":5.34,"c":13.3,"q":5.05,"w":1.57,"o":0.78,"g":"sc","v":103.4},{"x":165.3,"y":71.8,"l":564.4,"p":-0.7,"a":4.4,"r":1.24,"f":4.85,"c":13,"q":5.26,"w":1.28,"o":0.79,"g":"lr","v":14.4},{"x":185.8,"y":70.5,"l":579.9,"p":24.5,"a":3,"r":1.54,"f":5.72,"c":12.6,"q":5.04,"w":1.41,"o":0.79,"g":"lg","v":8.9},{"x":169.3,"y":70,"l":439,"p":1.5,"a":2.6,"r":1.8,"f":3.99,"c":13.9,"q":5.29,"w":1.34,"o":0.79,"g":"sc","v":120.8},{"x":160.1,"y":69.9,"l":624.1,"p":-2.1,"a":1.7,"r":1.13,"f":4.21,"c":12.5,"q":5.26,"w":1.33,"o":0.8,"g":"lg","v":14.1},{"x":153.5,"y":69.6,"l":443.7,"p":1.2,"a":2.8,"r":1.28,"f":5.58,"c":11.1,"q":5.07,"w":1.06,"o":0.8,"g":"sc","v":90.9},{"x":157,"y":72.7,"l":405.3,"p":-11.1,"a":3.2,"r":1.35,"f":4.51,"c":13.6,"q":5.07,"w":1.16,"o":0.8,"g":"sc","v":112.8},{"x":141.8,"y":69.7,"l":630.8,"p":-18.1,"a":3,"r":1.42,"f":1.59,"c":13.8,"q":5.19,"w":1.34,"o":0.8,"g":"lg","v":14.2},{"x":149.5,"y":72.2,"l":668.8,"p":-6.6,"a":2.6,"r":1.7,"f":1.01,"c":13.3,"q":5.07,"w":1.67,"o":0.8,"g":"lg","v":12.5},{"x":174.1,"y":70,"l":276.1,"p":11.4,"a":2.4,"r":1.33,"f":3.66,"c":13,"q":5.27,"w":0.8,"o":0.8,"g":"sc","v":91.5},{"x":168.1,"y":72.6,"l":665.2,"p":16.9,"a":4,"r":1.16,"f":5.21,"c":11.1,"q":5.06,"w":1.22,"o":0.8,"g":"lr","v":9.5},{"x":155.1,"y":71.1,"l":565.8,"p":-11.9,"a":1.7,"r":1.23,"f":5.17,"c":12.1,"q":5.15,"w":1.94,"o":0.81,"g":"lg","v":8.3},{"x":183.3,"y":69.9,"l":330,"p":20.1,"a":2.9,"r":1.88,"f":6.27,"c":14,"q":5.07,"w":1.58,"o":0.81,"g":"sc","v":95.8},{"x":136.8,"y":70.8,"l":449.3,"p":-18.8,"a":3.6,"r":1.64,"f":4.56,"c":12.5,"q":5.38,"w":0.93,"o":0.81,"g":"sc","v":103.2},{"x":177.8,"y":68.1,"l":590.4,"p":23.9,"a":1.6,"r":1.79,"f":4.83,"c":12.9,"q":5.29,"w":1.54,"o":0.81,"g":"lr","v":12.1},{"x":169.2,"y":72.5,"l":594.9,"p":15.8,"a":2.8,"r":1.76,"f":5.46,"c":11.3,"q":5.14,"w":1.27,"o":0.82,"g":"lg","v":9.8},{"x":175.6,"y":68.7,"l":563.4,"p":24.2,"a":2.7,"r":1.76,"f":4.35,"c":13.5,"q":5.07,"w":1.6,"o":0.82,"g":"lg","v":13.4},{"x":175.5,"y":70.1,"l":579.3,"p":21.7,"a":2.4,"r":1.5,"f":3.36,"c":12.5,"q":5.14,"w":1.07,"o":0.82,"g":"lg","v":8.7},{"x":149,"y":70.1,"l":452.2,"p":-14.2,"a":1.6,"r":1.21,"f":6.09,"c":11.7,"q":5.38,"w":1.35,"o":0.82,"g":"sc","v":125.8},{"x":143.3,"y":69.9,"l":285.6,"p":-24.5,"a":2,"r":1.64,"f":5.41,"c":13.7,"q":5.07,"w":1.58,"o":0.82,"g":"sc","v":111},{"x":162.8,"y":68.9,"l":326.9,"p":-5.9,"a":2.3,"r":1.5,"f":0.35,"c":12.3,"q":5.08,"w":1.48,"o":0.82,"g":"sc","v":134.6},{"x":161.1,"y":70.6,"l":580.7,"p":-2.1,"a":2.8,"r":1.33,"f":0.81,"c":12,"q":5.34,"w":1.38,"o":0.83,"g":"lg","v":11.7},{"x":154.2,"y":69.9,"l":659.3,"p":-22,"a":6.3,"r":1.22,"f":2.08,"c":12.7,"q":5.03,"w":1.82,"o":0.83,"g":"lg","v":8.2},{"x":146.4,"y":72.8,"l":454.4,"p":-18.8,"a":4.2,"r":1.69,"f":1.5,"c":12.2,"q":5.21,"w":1.36,"o":0.83,"g":"sc","v":91.6},{"x":181.5,"y":69.5,"l":395.7,"p":25.4,"a":1.9,"r":1.38,"f":5.94,"c":13.1,"q":5.22,"w":1.3,"o":0.83,"g":"sc","v":94.4},{"x":181.2,"y":70.1,"l":463.2,"p":16.5,"a":4.2,"r":1.35,"f":1.58,"c":12.1,"q":5.29,"w":1,"o":0.83,"g":"sc","v":107.3},{"x":182.5,"y":69.7,"l":317.1,"p":29,"a":3.2,"r":1.68,"f":5.05,"c":11.3,"q":5.31,"w":1.33,"o":0.83,"g":"sc","v":119.5},{"x":175.8,"y":72.1,"l":598.4,"p":21.5,"a":2.6,"r":1.79,"f":2.29,"c":13.8,"q":5.31,"w":1.04,"o":0.84,"g":"lg","v":11.8},{"x":166.1,"y":69.9,"l":653.6,"p":-1.7,"a":1.7,"r":1.3,"f":2.83,"c":13,"q":5.09,"w":1.53,"o":0.84,"g":"lr","v":12.4},{"x":166.5,"y":68.3,"l":597.7,"p":3.6,"a":2.7,"r":1.5,"f":3.16,"c":13.1,"q":5.14,"w":1.82,"o":0.84,"g":"lr","v":15.9},{"x":155.5,"y":72,"l":660.7,"p":-10.8,"a":4.3,"r":1.78,"f":4.02,"c":13.2,"q":5.09,"w":0.95,"o":0.84,"g":"lg","v":6.7},{"x":184.5,"y":72.9,"l":577.7,"p":44.3,"a":9.5,"r":1.61,"f":0.85,"c":12.7,"q":5.17,"w":1.03,"o":0.85,"g":"lr","v":7.4},{"x":177.7,"y":71.5,"l":376.9,"p":22,"a":3.7,"r":1.15,"f":1.95,"c":13.1,"q":5.31,"w":1.51,"o":0.85,"g":"sc","v":86.6},{"x":156.3,"y":68.8,"l":640,"p":-6.7,"a":2.1,"r":1.17,"f":0.66,"c":13.2,"q":5.36,"w":1.08,"o":0.85,"g":"lg","v":7.7},{"x":166.9,"y":69.7,"l":308.9,"p":3.4,"a":4.1,"r":1.87,"f":2.78,"c":12.3,"q":5.08,"w":1.45,"o":0.85,"g":"sc","v":116.8},{"x":140,"y":72.3,"l":583.5,"p":-27.9,"a":4.2,"r":1.8,"f":4.3,"c":12.3,"q":5.05,"w":1.35,"o":0.85,"g":"lg","v":14.6},{"x":183.2,"y":69,"l":275.6,"p":31.4,"a":3.1,"r":1.31,"f":4.95,"c":11.2,"q":5.34,"w":0.81,"o":0.85,"g":"sc","v":88.6},{"x":134.6,"y":68.3,"l":373.9,"p":-31.9,"a":3,"r":1.31,"f":1.2,"c":11.3,"q":5.16,"w":1.35,"o":0.85,"g":"sc","v":93.7},{"x":167.8,"y":70.9,"l":316.2,"p":8.2,"a":3.3,"r":1.3,"f":2.82,"c":12.8,"q":5.35,"w":1.27,"o":0.86,"g":"sc","v":125.1},{"x":189.7,"y":72.4,"l":414.8,"p":24,"a":3.1,"r":1.17,"f":2.19,"c":13.7,"q":5.11,"w":0.84,"o":0.86,"g":"sc","v":100.5},{"x":130.8,"y":68.4,"l":626.8,"p":-28.4,"a":3.1,"r":1.46,"f":2.12,"c":13,"q":5.17,"w":1.06,"o":0.86,"g":"lg","v":11.9},{"x":136.2,"y":72.1,"l":653.7,"p":-24.2,"a":1.7,"r":1.77,"f":0.91,"c":11.7,"q":5.06,"w":1.05,"o":0.87,"g":"lr","v":13},{"x":152.5,"y":68.2,"l":384.9,"p":-6.3,"a":3.5,"r":1.47,"f":3.42,"c":12.7,"q":5.22,"w":1.57,"o":0.88,"g":"sc","v":101.7},{"x":176.8,"y":68.7,"l":669,"p":17.9,"a":4.4,"r":1.29,"f":2.22,"c":12.2,"q":5.19,"w":1.16,"o":0.88,"g":"lr","v":7.6},{"x":147.2,"y":71.3,"l":410,"p":-7.5,"a":2.3,"r":1.12,"f":5.5,"c":11.2,"q":5.04,"w":1.27,"o":0.89,"g":"sc","v":125.4},{"x":171.9,"y":70.2,"l":378.6,"p":16.4,"a":1.9,"r":1.2,"f":4.38,"c":11.8,"q":5.23,"w":1.03,"o":0.89,"g":"sc","v":111.5},{"x":159.2,"y":69.3,"l":584.2,"p":-0.1,"a":2.6,"r":1.65,"f":4.36,"c":11.2,"q":5.22,"w":1.76,"o":0.89,"g":"lg","v":15.6},{"x":189.7,"y":71.3,"l":662.5,"p":34.5,"a":4.2,"r":1.63,"f":4.91,"c":11.2,"q":5.35,"w":0.93,"o":0.89,"g":"lg","v":13.1},{"x":139.8,"y":70.4,"l":397,"p":-23.7,"a":3.9,"r":1.57,"f":2.73,"c":11.5,"q":5.37,"w":1.09,"o":0.89,"g":"sc","v":120.8},{"x":158.5,"y":72.7,"l":567.9,"p":3.8,"a":2.1,"r":1.2,"f":0.55,"c":13.2,"q":5.08,"w":1.52,"o":0.9,"g":"lr","v":15.2},{"x":133.1,"y":69,"l":654.9,"p":-25.7,"a":11.2,"r":1.43,"f":3.08,"c":11.1,"q":5.27,"w":0.92,"o":0.9,"g":"lg","v":14.6},{"x":188.1,"y":68.4,"l":276.5,"p":31.8,"a":4.4,"r":1.52,"f":6.13,"c":13.3,"q":5.12,"w":1.18,"o":0.9,"g":"sc","v":87.9},{"x":136.2,"y":70.7,"l":427.3,"p":-31.6,"a":3,"r":1.35,"f":3.25,"c":13.4,"q":5.14,"w":1.47,"o":0.9,"g":"sc","v":104.9},{"x":152.4,"y":69.8,"l":322.6,"p":-12.5,"a":3.7,"r":1.54,"f":3.06,"c":13.8,"q":5.16,"w":1.43,"o":0.9,"g":"sc","v":89.5},{"x":155.3,"y":68.7,"l":656.7,"p":-20,"a":10.5,"r":1.4,"f":1.51,"c":12.2,"q":5.17,"w":1.87,"o":0.9,"g":"lg","v":10.7},{"x":134.2,"y":69.7,"l":667.5,"p":-20.3,"a":2.4,"r":1.58,"f":0.65,"c":13.9,"q":5.08,"w":1.41,"o":0.91,"g":"lr","v":14},{"x":138.8,"y":68.3,"l":652.2,"p":-17.2,"a":4.3,"r":1.67,"f":1.37,"c":13.6,"q":5.13,"w":1.92,"o":0.91,"g":"lg","v":7.4},{"x":173.3,"y":70.1,"l":569.9,"p":13.3,"a":3.2,"r":1.55,"f":5.93,"c":12.6,"q":5.37,"w":1.95,"o":0.91,"g":"lg","v":14.4},{"x":159.6,"y":68.1,"l":663.7,"p":1,"a":2,"r":1.43,"f":3.43,"c":13.9,"q":5.14,"w":1.55,"o":0.91,"g":"lg","v":13.4},{"x":158.8,"y":71.9,"l":584,"p":-2.1,"a":1.9,"r":1.26,"f":5.99,"c":11.9,"q":5.13,"w":1.73,"o":0.92,"g":"lr","v":6.3},{"x":146.3,"y":71.2,"l":669,"p":-16.6,"a":2,"r":1.26,"f":5.33,"c":11.5,"q":5.11,"w":1.01,"o":0.92,"g":"lr","v":12.3},{"x":139.6,"y":68.7,"l":651.4,"p":-14.3,"a":1.6,"r":1.78,"f":3.06,"c":11.2,"q":5.1,"w":1.21,"o":0.92,"g":"lg","v":12.2},{"x":154.5,"y":68.3,"l":358.9,"p":0.8,"a":4,"r":1.61,"f":0.25,"c":13.3,"q":5.2,"w":1.3,"o":0.93,"g":"sc","v":102.2},{"x":184.5,"y":72.8,"l":642.5,"p":23.2,"a":3.5,"r":1.6,"f":4.09,"c":11.7,"q":5.17,"w":1.12,"o":0.93,"g":"lg","v":7.9},{"x":148.7,"y":69.6,"l":665.1,"p":-19.9,"a":4.3,"r":1.62,"f":1.15,"c":11.4,"q":5.37,"w":1.63,"o":0.93,"g":"lg","v":6.2},{"x":186.4,"y":72.4,"l":664.5,"p":30.6,"a":2.2,"r":1.24,"f":1.94,"c":11.6,"q":5.22,"w":1.51,"o":0.94,"g":"lg","v":9.6},{"x":154.1,"y":69.7,"l":579.3,"p":-12.5,"a":3.7,"r":1.5,"f":4.01,"c":14,"q":5.3,"w":1.31,"o":0.94,"g":"lr","v":13.2},{"x":156.7,"y":72.9,"l":428.3,"p":-1.9,"a":2.1,"r":1.2,"f":1.8,"c":12.3,"q":5.38,"w":1.34,"o":0.94,"g":"sc","v":118.8},{"x":167.1,"y":70.9,"l":577.4,"p":-1.4,"a":2.2,"r":1.18,"f":0.4,"c":11.8,"q":5.07,"w":1.12,"o":0.94,"g":"lg","v":13},{"x":173.6,"y":72.9,"l":429.1,"p":9.1,"a":8.9,"r":1.76,"f":1.82,"c":12.8,"q":5.17,"w":0.96,"o":0.95,"g":"sc","v":112.9},{"x":167.3,"y":70.1,"l":325.6,"p":6.2,"a":2.1,"r":1.36,"f":3.68,"c":11.4,"q":5.11,"w":1.46,"o":0.95,"g":"sc","v":140},{"x":144.7,"y":68,"l":457.6,"p":-21.5,"a":3.7,"r":1.24,"f":6.1,"c":13,"q":5.11,"w":1.38,"o":0.95,"g":"sc","v":143.1},{"x":146.3,"y":70.8,"l":661.5,"p":-16.3,"a":2.8,"r":1.53,"f":4.89,"c":13.8,"q":5.18,"w":1.52,"o":0.95,"g":"lr","v":6.4},{"x":144.5,"y":68.3,"l":567,"p":-15.8,"a":2.8,"r":1.69,"f":5.18,"c":11.8,"q":5.31,"w":0.95,"o":0.96,"g":"lg","v":7.2},{"x":177.9,"y":71,"l":662,"p":21.4,"a":3.2,"r":1.82,"f":4.9,"c":13,"q":5.05,"w":1.15,"o":0.96,"g":"lg","v":14.3},{"x":143.3,"y":69.3,"l":655.5,"p":-11.4,"a":3.4,"r":1.73,"f":6.1,"c":13.8,"q":5.22,"w":1.32,"o":0.96,"g":"lg","v":12.8},{"x":131.7,"y":71.8,"l":590.3,"p":-33.1,"a":1.6,"r":1.43,"f":0.74,"c":13.4,"q":5.27,"w":1.29,"o":0.96,"g":"lg","v":12.3},{"x":189.5,"y":69.2,"l":596.8,"p":38.9,"a":2.3,"r":1.84,"f":1.75,"c":12.3,"q":5.19,"w":1.73,"o":0.96,"g":"lg","v":9.9},{"x":179.7,"y":68.5,"l":431.6,"p":13.4,"a":4.1,"r":1.62,"f":5.92,"c":13.2,"q":5.26,"w":1.53,"o":0.96,"g":"sc","v":115.9}]};
  var NOMI = {
    it: ['nero', 'bruno', 'castano scuro', 'castano', 'castano chiaro', 'biondo scuro', 'biondo', 'biondo chiaro', 'biondo chiarissimo', 'biondo extra chiaro'],
    en: ['black', 'darkest brown', 'dark brown', 'medium brown', 'light brown', 'dark blonde', 'medium blonde', 'light blonde', 'very light blonde', 'lightest blonde'],
  };
  var TEMPI = { attesa: 350, ariaSu: 750, rilascio: 2650, luceDa: 950, luceDura: 2150, fine: 4050 };
  var figura = document.getElementById('ciocca');
  var svgC = figura && figura.querySelector('.ciocca__svg');
  var capelliEl = svgC ? svgC.querySelectorAll('.capello') : [];
  var arie = svgC ? svgC.querySelectorAll('.aria') : [];
  var numEl = figura && figura.querySelector('.tono__n');
  var nomeEl = figura && figura.querySelector('.tono__nome');
  var soffia = document.getElementById('soffiaAncora');
  var dRiposo = [].map.call(capelliEl, function (p) { return p.getAttribute('d'); });
  var STOP = {};
  ['lg', 'lr', 'sc'].forEach(function (g) { var gr = svgC && svgC.querySelector('#g-' + g); STOP[g] = gr ? gr.querySelectorAll('stop') : []; });
  var faseC = 'fatta', rafC = 0, guardiaC = 0, ultimoN = 0;

  var rgb = function (h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; };
  var GR = {};
  Object.keys(DATI.grad).forEach(function (g) { GR[g] = DATI.grad[g].map(function (st) { return { o: st[0], fin: rgb(st[1]), ini: rgb(st[2]) }; }); });
  var misto = function (a, b, t) { return 'rgb(' + Math.round(a[0] + (b[0] - a[0]) * t) + ',' + Math.round(a[1] + (b[1] - a[1]) * t) + ',' + Math.round(a[2] + (b[2] - a[2]) * t) + ')'; };
  var dolce = function (t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };

  /* la luce: si schiariscono prima le punte (offset 1), poi il fronte sale; la radice resta com'è */
  function mettiLuce(tau) {
    Object.keys(GR).forEach(function (g) {
      GR[g].forEach(function (st, i) {
        var el = STOP[g][i];
        if (el) el.style.stopColor = misto(st.ini, st.fin, dolce((tau * 1.35 - (1 - st.o)) / 0.35));
      });
    });
  }
  function togliLuce() {
    Object.keys(STOP).forEach(function (g) { [].forEach.call(STOP[g], function (el) { el.style.removeProperty('stop-color'); }); });
  }
  /* il vento: sale in 0,75 s, tiene (con un tremito), poi si ferma e ogni capello torna giù con un'oscillazione smorzata */
  function mettiCapelli(t) {
    var rel = t >= TEMPI.rilascio;
    var e = t < TEMPI.attesa ? 0 : 1 - Math.pow(1 - Math.min(1, (t - TEMPI.attesa) / TEMPI.ariaSu), 3);
    for (var i = 0; i < capelliEl.length; i++) {
      var sc = DATI.capelli[i], piega;
      if (!rel) piega = sc.v * e * (1 + 0.12 * Math.sin(t / 95 + sc.f));
      else {
        var dt = t - TEMPI.rilascio;
        piega = sc.v * (1 + 0.12 * Math.sin(TEMPI.rilascio / 95 + sc.f)) * Math.exp(-dt / 330) * Math.cos(dt / 520 * 6.2832);
      }
      capelliEl[i].setAttribute('d', dCapello(puntiCapello(sc, piega, piega * (sc.g === 'sc' ? 0.7 : 0.2))));
    }
  }
  /* le righe d'aria: un trattino che attraversa la ciocca da sinistra, una riga dopo l'altra */
  function mettiAria(t) {
    for (var i = 0; i < arie.length; i++) {
      var t0 = TEMPI.attesa + i * 170, per = 900;
      if (t < t0 || t > TEMPI.rilascio + 300) { arie[i].style.opacity = '0'; continue; }
      var u = ((t - t0) % per) / per;
      var spegni = t > TEMPI.rilascio ? Math.max(0, 1 - (t - TEMPI.rilascio) / 300) : 1;
      arie[i].style.strokeDashoffset = (0.34 - u * 1.5).toFixed(3);
      arie[i].style.opacity = (0.62 * Math.sin(u * Math.PI) * spegni).toFixed(3);
    }
  }
  function mettiEtichetta(tau) {
    var n = 4 + Math.round(5 * dolce(tau));
    if (n === ultimoN || !numEl || !nomeEl) return;
    ultimoN = n;
    numEl.textContent = n + '.0';
    nomeEl.textContent = NOMI[root.lang === 'en' ? 'en' : 'it'][n - 1];
  }
  function chiudiCiocca() {
    cancelAnimationFrame(rafC); rafC = 0;
    clearTimeout(guardiaC);
    for (var i = 0; i < capelliEl.length; i++) capelliEl[i].setAttribute('d', dRiposo[i]);
    [].forEach.call(arie, function (a) { a.style.removeProperty('opacity'); a.style.removeProperty('stroke-dashoffset'); });
    togliLuce();
    if (figura) { figura.classList.remove('ciocca--corso'); figura.setAttribute('data-firma', 'fatta'); }
    root.classList.remove('firma-attesa');
    faseC = 'fatta';
  }
  function soffiaCiocca() {
    /* dalla classe d'attesa agli stili in linea senza cambiare un pixel: prima i colori castani in linea, poi via la classe */
    mettiLuce(0);
    ultimoN = 0; mettiEtichetta(0);
    figura.classList.add('ciocca--corso');
    root.classList.remove('firma-attesa');
    faseC = 'corre'; figura.setAttribute('data-firma', 'corre');
    var t0 = null;
    function fotogramma(ts) {
      rafC = 0;
      if (t0 === null) t0 = ts;
      var t = ts - t0;
      mettiCapelli(t);
      mettiAria(t);
      var tau = Math.max(0, Math.min(1, (t - TEMPI.luceDa) / TEMPI.luceDura));
      mettiLuce(tau); mettiEtichetta(tau);
      if (t >= TEMPI.fine) { chiudiCiocca(); return; }
      rafC = requestAnimationFrame(fotogramma);
    }
    clearTimeout(guardiaC);
    /* se il rAF si ferma (scheda in background) la pagina va comunque allo stato finale */
    guardiaC = setTimeout(chiudiCiocca, TEMPI.fine + 2000);
    rafC = requestAnimationFrame(fotogramma);
  }
  function inVistaCiocca() {
    if (!svgC) return false;
    var r = svgC.getBoundingClientRect(), vh = window.innerHeight || 800;
    return r.top < vh * 0.85 && r.bottom > vh * 0.25;
  }

  /* la testata prende il colore del livello sotto di lei; la scala dei campioni segna dove sei */
  var testata = document.getElementById('testata');
  var zone = [].slice.call(document.querySelectorAll('main [data-livello]'));
  var campioni = [].slice.call(document.querySelectorAll('.scala__tono'));
  var livelloOra = '';
  function aggiornaTestata() {
    if (!testata) return;
    var y = testata.offsetHeight + 2, val = '1';
    for (var i = 0; i < zone.length; i++) {
      var r = zone[i].getBoundingClientRect();
      if (r.top <= y && r.bottom > y) { val = zone[i].getAttribute('data-livello'); break; }
      if (i === zone.length - 1 && r.bottom <= y) val = zone[i].getAttribute('data-livello');
    }
    if (val === livelloOra) return;
    livelloOra = val;
    testata.setAttribute('data-livello', val);
    campioni.forEach(function (c, k) { if (String(k + 1) === val) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current'); });
  }
  var tickTestata = 0;
  window.addEventListener('scroll', function () {
    if (tickTestata) return;
    tickTestata = requestAnimationFrame(function () { tickTestata = 0; aggiornaTestata(); });
  }, { passive: true });
  window.addEventListener('resize', aggiornaTestata);
  aggiornaTestata();

  /* lo stato degli orari anche in «Dove e quando», col pallino verde quando è aperto */
  function copiaStato() {
    var primo = document.getElementById(SITE.hoursStatusId);
    if (!primo) return;
    var aperto = hoursState().open;
    ['orarioStato', 'orarioStato2'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (el !== primo) el.textContent = primo.textContent;
      el.classList.toggle('is-aperto', aperto);
    });
  }
  copiaStato();
  setInterval(copiaStato, 60000);
  new MutationObserver(function () {
    copiaStato();
    /* l'etichetta della ciocca nella lingua giusta anche a metà corsa */
    if (faseC === 'corre' && numEl && nomeEl && ultimoN) nomeEl.textContent = NOMI[root.lang === 'en' ? 'en' : 'it'][ultimoN - 1];
  }).observe(root, { attributes: true, attributeFilter: ['lang'] });

  if (figura && svgC && capelliEl.length === DATI.capelli.length) {
    try { clearTimeout(window.__attesaCiocca); } catch (e) {}
    window.__ciocca = {
      stato: function () { return { fase: faseC, n: numEl ? numEl.textContent : '', corso: figura.classList.contains('ciocca--corso') }; },
      capelli: function () { return [].map.call(capelliEl, function (p) { return p.getAttribute('d'); }); },
      riposo: dRiposo,
    };
    var daFare = !reducedMotion && root.classList.contains('firma-attesa');
    /* la pagina aperta su un capitolo (#balayage): il browser ci scorre dopo, la firma non si vedrebbe */
    var ancora = location.hash && location.hash.length > 1 && location.hash !== '#apertura';
    if (!daFare || ancora || !inVistaCiocca()) chiudiCiocca();
    else soffiaCiocca();
    window.addEventListener('resize', function () { if (faseC === 'corre') chiudiCiocca(); });
    if (soffia) soffia.addEventListener('click', function () { if (faseC === 'fatta' && !reducedMotion) soffiaCiocca(); });
  }
})();
