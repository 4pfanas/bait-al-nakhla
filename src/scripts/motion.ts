// All page motion: Lenis smooth scroll + GSAP ScrollTrigger.
// Only transform, opacity and clip-path are animated. Reduced motion skips everything.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const isRTL = () => root.dir === 'rtl';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const DESKTOP = '(min-width: 1024px)';
const MOBILE = '(max-width: 1023px)';

const $ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) =>
  scope.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) =>
  Array.from(scope.querySelectorAll<T>(sel));

export function initMotion() {
  initLangSwitch();
  initHeader();

  if (reduceMotion || !root.classList.contains('js-motion')) return;

  try {
    const lenis = initLenis();
    const mm = gsap.matchMedia();
    initHero();
    initStory(mm);
    initDishes(mm);
    initRooms(mm);
    initReserve();
    initFades();
    initMagnetic();
    root.classList.add('motion-ready');

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh, { once: true });
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) lenis.resize();
    });
  } catch (err) {
    console.error('[motion] disabled:', err);
    root.classList.remove('js-motion');
    gsap.globalTimeline.clear();
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.set('[data-hero-line],[data-hero-fade],[data-hero-arch],[data-hero-pattern]', { clearProps: 'all' });
  }
}

/* ───────── Smooth scroll ───────── */
function initLenis() {
  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.6 });
      if (id === '#main') target.focus({ preventScroll: true });
    });
  });
  return lenis;
}

/* ───────── Header: tint after scroll, hide on the way down ───────── */
function initHeader() {
  const header = $('[data-header]');
  if (!header) return;
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    if (y > lastY + 6 && y > 240) header.classList.add('is-hidden');
    else if (y < lastY - 6) header.classList.remove('is-hidden');
    if (Math.abs(y - lastY) > 6) lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
  onScroll();
}

/* ───────── Hero ───────── */
function initHero() {
  const hero = $('[data-hero]');
  if (!hero) return;
  const rot = isRTL() ? 20 : -20;

  gsap
    .timeline({ delay: 0.2, defaults: { ease: 'expo.out' } })
    .to($$('[data-hero-line]', hero), { y: 0, duration: 1.4, stagger: 0.12 }, 0)
    .to($('[data-hero-arch]', hero), { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' }, 0.1)
    .fromTo($('[data-hero-img]', hero), { scale: 1.25 }, { scale: 1, duration: 2.4 }, 0.1)
    .fromTo(
      $('[data-hero-pattern]', hero),
      { opacity: 0, scale: 0.75, rotation: rot },
      { opacity: 0.4, scale: 1, rotation: 0, duration: 2.4 },
      0,
    )
    .to($$('[data-hero-fade]', hero), { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 }, 0.75);

  const scrub = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
  gsap.to($('[data-hero-pattern-inner]', hero), {
    rotation: isRTL() ? -60 : 60,
    scale: 1.3,
    ease: 'none',
    scrollTrigger: scrub,
  });
  gsap.to($('[data-hero-copy]', hero), { yPercent: -15, opacity: 0, ease: 'none', scrollTrigger: scrub });
  gsap.to($('[data-hero-parallax]', hero), { yPercent: 8, ease: 'none', scrollTrigger: scrub });
}

/* ───────── Story: pinned, words light up, arch draws itself ───────── */
function initStory(mm: gsap.MatchMedia) {
  const section = $('[data-story]');
  if (!section) return;
  const words = $$('.story-word', section);
  const statement = $('[data-story-statement]', section)!;
  const path = $('[data-story-path]', section);
  const arch = $('[data-story-arch]', section);
  const facts = $$('[data-story-fact]', section);

  const states = () => {
    gsap.set(words, { opacity: 0.15 });
    gsap.set(path, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(arch, { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(facts, { opacity: 0, y: 24 });
  };

  mm.add(DESKTOP, () => {
    states();
    const span = words.length * 0.1;
    gsap
      .timeline({
        scrollTrigger: { trigger: section, start: 'top top', end: '+=140%', pin: true, scrub: 0.6, anticipatePin: 1 },
      })
      .to(words, { opacity: 1, stagger: 0.1, duration: 0.3, ease: 'none' }, 0)
      .to(arch, { clipPath: 'inset(0% 0% 0% 0%)', duration: span * 0.5, ease: 'power2.out' }, 0)
      .to(path, { strokeDashoffset: 0, duration: span * 0.7, ease: 'none' }, 0.1)
      .to(facts, { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' }, '>-0.2');
  });

  mm.add(MOBILE, () => {
    states();
    gsap.to(words, {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: { trigger: statement, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
    });
    const archScrub = { trigger: arch, start: 'top 90%', end: 'top 35%', scrub: 0.6 };
    gsap.to(arch, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: archScrub });
    gsap.to(path, { strokeDashoffset: 0, ease: 'none', scrollTrigger: archScrub });
    gsap.to(facts, {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: { trigger: facts[0], start: 'top 90%' },
    });
  });
}

/* ───────── Signature plates: horizontal reel on desktop ───────── */
function initDishes(mm: gsap.MatchMedia) {
  const section = $('[data-dishes]');
  if (!section) return;
  const track = $('[data-dishes-track]', section)!;
  const cards = $$('[data-dish]', section);
  const imgs = cards.map((c) => $('[data-dish-img]', c)!);
  const progress = $('[data-dishes-progress]', section);

  mm.add(DESKTOP, () => {
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const sign = isRTL() ? 1 : -1;
    const setters = imgs.map((img) => gsap.quickSetter(img, 'xPercent'));

    // Progress line + inner-image parallax: each photo drifts against the reel's motion.
    const update = (p: number) => {
      if (progress) gsap.set(progress, { scaleX: p });
      const vw = window.innerWidth;
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        setters[i](((r.left + r.width / 2 - vw / 2) / vw) * -10);
      });
    };

    gsap.to(track, {
      x: () => sign * dist(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${dist()}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => update(self.progress),
        onRefresh: (self) => update(self.progress),
      },
    });
  });

  mm.add(MOBILE, () => {
    cards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 48,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: card, start: 'top 85%' },
      });
      gsap.fromTo(
        imgs[i],
        { yPercent: -5 },
        { yPercent: 5, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } },
      );
    });
  });
}

/* ───────── Rooms: offset parallax + masked captions ───────── */
function initRooms(mm: gsap.MatchMedia) {
  const rooms = $$('[data-room]');
  if (!rooms.length) return;

  rooms.forEach((room) => {
    gsap.from($$('[data-mask]', room), {
      yPercent: 110,
      duration: 1.2,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: $('figcaption', room), start: 'top 92%' },
    });
    gsap.fromTo(
      $('[data-room-img]', room),
      { scale: 1.12 },
      { scale: 1, ease: 'none', scrollTrigger: { trigger: room, start: 'top bottom', end: 'bottom 30%', scrub: true } },
    );
  });

  mm.add(DESKTOP, () => {
    rooms.forEach((room) => {
      const speed = Number(room.dataset.speed ?? 10);
      gsap.fromTo(
        room,
        { yPercent: speed / 2 },
        {
          yPercent: -speed / 2,
          ease: 'none',
          scrollTrigger: { trigger: room, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });
  });
}

/* ───────── Reserve ───────── */
function initReserve() {
  const section = $('[data-reserve]');
  if (!section) return;
  gsap.from($$('[data-reserve-word]', section), {
    yPercent: 105,
    duration: 1.3,
    stagger: 0.09,
    ease: 'expo.out',
    scrollTrigger: { trigger: $('#reserve-title'), start: 'top 82%' },
  });
  gsap.fromTo(
    $('[data-reserve-bg]', section),
    { scale: 1 },
    { scale: 1.08, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } },
  );
}

/* ───────── Generic fade-ups ───────── */
function initFades() {
  $$('[data-fade]').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 32,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });
}

/* ───────── Magnetic button (fine pointers only) ───────── */
function initMagnetic() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  $$('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo(gsap.utils.clamp(-8, 8, (e.clientX - r.left - r.width / 2) * 0.15));
      yTo(gsap.utils.clamp(-8, 8, (e.clientY - r.top - r.height / 2) * 0.3));
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* ───────── Language switch: remember choice, short fade out ───────── */
function initLangSwitch() {
  $$<HTMLAnchorElement>('[data-lang-switch]').forEach((a) => {
    a.addEventListener('click', (e) => {
      try {
        localStorage.setItem('bn-lang', a.hreflang);
      } catch {
        /* storage unavailable: ignore */
      }
      if (reduceMotion || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      root.classList.add('is-leaving');
      window.setTimeout(() => (window.location.href = a.href), 300);
    });
  });
  window.addEventListener('pageshow', () => root.classList.remove('is-leaving'));
}
