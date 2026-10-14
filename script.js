/* =====================================================================
   BIRTHDAY SURPRISE — script.js
   Vanilla JavaScript only. No libraries, no backend.

   ✏️ EVERYTHING YOU NEED TO PERSONALIZE IS IN THE CONFIG BELOW.
   Look for the ✏️ marks. You never need to touch the code under it.
   ===================================================================== */

/* ---------------------------------------------------------------------
   ✏️ PERSONALIZE HERE
   Tip: inside any text you can use {name}, {nickname}, {yourName}, {date}
   and they will be replaced automatically.
   --------------------------------------------------------------------- */
const birthdayConfig = {
  // ✏️ Her name (shown in big script lettering)
  girlfriendName: "my cute bebes",

  // ✏️ Pet name used in the heading: "Happy Birthday, <nickname>!"
  nickname: "My Princess",

  // ✏️ The main birthday message (typed out on the hero + final screen)
  birthdayMessage:
    "Today the whole world celebrates you, but nobody celebrates you quite like I do. I hope this day is as beautiful as you are.",

  // ✏️ Your name (letter signature, final screen, footer)
  yourName: "YOUR_BABY",

  // ✏️ Her birthday, e.g. "14 October". Leave as "HER_BIRTHDAY_DATE" to hide it.
  specialDate: "OCOTOBER15",

  // ✏️ Short line under her name on the hero
  heroSubtitle: "A little world, made just for you.",

  // ✏️ PHOTOS — put your pictures in the assets/ folder.
  // Add or remove lines freely (4–6 photos look best).
  photos: [
    { src: "assets/picture1.jpeg", caption: "My favourite smile" },
    { src: "assets/picture2.jpeg", caption: "Missing this face" },
    { src: "assets/picture3.jpeg", caption: "My girl, my home" },
    { src: "assets/picture4.jpeg", caption: "Beautiful, even from far away" }
    // { src: "assets/photo5.jpg", caption: "Your caption" },
    // { src: "assets/photo6.jpg", caption: "Your caption" },
  ],

  // ✏️ LETTER — each line is one paragraph. Replace with your own words,
  // real memories and inside jokes. Add or remove lines freely.
  letterParagraphs: [
     "My dearest {name},",
    "Today I wish I could be right next to you. Since I can't, I made you this little world instead.",
    "The distance between us is hard, but it has only made me surer of you. Wherever you are, you are my home.",
    "One day this will be a story we tell together. Until then, I choose you every single day.",
    "Happy birthday, {nickname}. I love you."
  ],
  // ✏️ Sign-off above your name at the end of the letter
  letterSignOff: "Forever yours,",

  // ✏️ QUIZ — every option has its own cute reply. No wrong answers.
  quiz: [
    {
      question: "Who is the most special person in my world?",
      options: [
        { label: "You 💖", reply: "Correct! It was always you. 😘" },
        { label: "Definitely you ✨", reply: "Great minds think alike — it's you, always." },
        { label: "Hmm… you? 🙈", reply: "You got it. (There was never another answer.)" }
      ]
    },
    {
      question: "What makes our little world beautiful?",
      options: [
        { label: "Us, together 🌙", reply: "Yes — every moment, big or small, is better with you." },
        { label: "Every little laugh 😄", reply: "Your laugh is my favourite sound in the world." },
        { label: "All of the above 💞", reply: "Smart answer. It's everything, and it's you." }
      ]
    },
    {
      question: "Ready for one more surprise?",
      options: [
        { label: "Yes, please! 🎁", reply: "Then scroll down — the best part is waiting for you…" },
        { label: "Always 😍", reply: "Good, because I saved the best for last…" }
      ]
    }
  ],

  // ✏️ Your personal promise / wish, shown on the final screen
  finalPromise:
    "I promise to keep choosing you, to keep making you smile, and to love you a little more with every birthday we celebrate together.",

  // ✏️ Music file (put a legally usable file here, see the guide)
  musicSrc: "assets/our-song.mp3"
};

/* =====================================================================
   APP CODE — you don't need to edit anything below this line
   ===================================================================== */
(() => {
  'use strict';

  const cfg = birthdayConfig;

  /* ---------- Small helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const rand = (min, max) => Math.random() * (max - min) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Respect the visitor's "reduce motion" accessibility setting
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReduced = () => motionQuery.matches;

  const PLACEHOLDER_DATE = 'HER_BIRTHDAY_DATE';
  const HEART_COLORS = ['#ff6b9a', '#ff3d6e', '#ffb3c7', '#f6d58b', '#c9a7ff'];

  /* ---------- Element references ---------- */
  const el = {
    intro: $('#intro'), openBtn: $('#openBtn'),
    app: $('#app'), hero: $('#hero'), heroMessage: $('#heroMessage'),
    heroBtn: $('#heroBtn'), heroSparkles: $('#heroSparkles'), heroDate: $('#heroDate'),
    cakeBtn: $('#cakeBtn'), cakeHint: $('#cakeHint'),
    gallery: $('#gallery'), memories: $('#memories'),
    letterClosed: $('#letterClosed'), readLetterBtn: $('#readLetterBtn'),
    letterPaper: $('#letterPaper'), letterBody: $('#letterBody'),
    quizStage: $('#quizStage'), quizDots: $('#quizDots'), quizProgress: $('#quizProgress'),
    quizQuestion: $('#quizQuestion'), quizOptions: $('#quizOptions'),
    quizFeedback: $('#quizFeedback'), quizNext: $('#quizNext'),
    quizDone: $('#quizDone'), quizRestart: $('#quizRestart'),
    finalBtn: $('#finalBtn'), finale: $('#finale'), finaleClose: $('#finaleClose'),
    finaleBack: $('#finaleBack'), finaleMessage: $('#finaleMessage'),
    finalePromise: $('#finalePromise'), finaleSign: $('#finaleSign'),
    finaleHearts: $('#finaleHearts'),
    lightbox: $('#lightbox'), lbClose: $('#lbClose'), lbPrev: $('#lbPrev'),
    lbNext: $('#lbNext'), lbFrame: $('#lbFrame'), lbImg: $('#lbImg'),
    lbCaption: $('#lbCaption'), lbCount: $('#lbCount'), lbFile: $('#lbFile'),
    musicBtn: $('#musicBtn'), musicStatus: $('#musicStatus'), bgm: $('#bgm'),
    stars: $('#stars'), floaters: $('#floaters'), petals: $('#petals'),
    canvas: $('#confetti')
  };

  /* =====================================================================
     1. PERSONALIZATION
     ===================================================================== */

  /** Replace {name}, {nickname}, {yourName}, {date} inside any text. */
  function fill(text = '') {
    const tokens = {
      name: cfg.girlfriendName,
      nickname: cfg.nickname,
      yourName: cfg.yourName,
      date: cfg.specialDate
    };
    return String(text).replace(/\{(name|nickname|yourName|date)\}/g, (_, key) => tokens[key]);
  }

  /** Put config values into every element marked with data-bind="..." */
  function applyConfig() {
    const values = {
      name: cfg.girlfriendName,
      nickname: cfg.nickname,
      yourName: cfg.yourName,
      date: cfg.specialDate,
      message: fill(cfg.birthdayMessage),
      subtitle: fill(cfg.heroSubtitle),
      promise: fill(cfg.finalPromise),
      signoff: fill(cfg.letterSignOff)
    };
    $$('[data-bind]').forEach((node) => {
      const key = node.dataset.bind;
      if (key in values) node.textContent = values[key];
    });
    document.title = `Happy Birthday, ${cfg.girlfriendName}! 💌`;
    if (!cfg.specialDate || cfg.specialDate === PLACEHOLDER_DATE) el.heroDate.hidden = true;
  }

  /* =====================================================================
     2. TYPEWRITER
     ===================================================================== */
  async function typeInto(node, text, speed = 40, token = null) {
    node.textContent = '';
    if (prefersReduced()) { node.textContent = text; return; }
    node.classList.add('is-typing');
    for (const char of Array.from(text)) {
      if (token && token.cancelled) break;
      node.textContent += char;
      await sleep(speed);
    }
    node.classList.remove('is-typing');
  }

  /* =====================================================================
     3. CONFETTI (canvas + requestAnimationFrame, runs only when needed)
     ===================================================================== */
  const ctx = el.canvas.getContext('2d');
  const CONFETTI_COLORS = ['#ff9ecb', '#ff4d79', '#f6d58b', '#ffffff', '#c9a7ff', '#ffb3c7'];
  const MAX_PARTICLES = 450;
  let particles = [];
  let rafId = null;
  let viewW = 0;
  let viewH = 0;

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    viewW = window.innerWidth;
    viewH = window.innerHeight;
    el.canvas.width = Math.round(viewW * dpr);
    el.canvas.height = Math.round(viewH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function heartPath(c, s) {
    c.beginPath();
    c.moveTo(0, s * 0.4);
    c.bezierCurveTo(-s * 1.1, -s * 0.2, -s * 0.5, -s, 0, -s * 0.4);
    c.bezierCurveTo(s * 0.5, -s, s * 1.1, -s * 0.2, 0, s * 0.4);
    c.closePath();
  }

  /** Shoot a burst of confetti from (x, y) in viewport pixels. */
  function confettiBurst(x, y, count = 70, { angle = -Math.PI / 2, spread = Math.PI * 2, power = 12 } = {}) {
    if (prefersReduced()) return;
    const room = MAX_PARTICLES - particles.length;
    const total = Math.min(count, room);
    for (let i = 0; i < total; i++) {
      const a = angle + rand(-spread / 2, spread / 2);
      const speed = rand(0.45, 1) * power;
      particles.push({
        x, y,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed,
        size: rand(6, 11),
        rot: rand(0, Math.PI * 2),
        vr: rand(-0.25, 0.25),
        color: pick(CONFETTI_COLORS),
        shape: pick(['rect', 'rect', 'circle', 'heart']),
        life: 0,
        max: rand(90, 170)
      });
    }
    if (!rafId && particles.length) rafId = requestAnimationFrame(tickConfetti);
  }

  function tickConfetti() {
    ctx.clearRect(0, 0, viewW, viewH);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life++;
      p.vx *= 0.985;
      p.vy = p.vy * 0.985 + 0.22; // drag + gravity
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      if (p.life >= p.max || p.y > viewH + 30) { particles.splice(i, 1); continue; }

      const fade = p.life > p.max - 30 ? (p.max - p.life) / 30 : 1;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, fade);
      ctx.fillStyle = p.color;
      if (p.shape === 'rect') {
        ctx.scale(Math.cos(p.life * 0.15 + p.rot), 1); // fake paper flutter
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        heartPath(ctx, p.size / 2);
        ctx.fill();
      }
      ctx.restore();
    }
    if (particles.length) {
      rafId = requestAnimationFrame(tickConfetti);
    } else {
      rafId = null;
      ctx.clearRect(0, 0, viewW, viewH);
    }
  }

  /* =====================================================================
     4. HEARTS, PETALS, STARS, SPARKLES
     ===================================================================== */

  /** Hearts that burst outward from a point (used when opening the surprise). */
  function heartBurst(x, y, count = 22) {
    if (prefersReduced()) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const h = document.createElement('span');
      const angle = rand(0, Math.PI * 2);
      const dist = rand(80, 230);
      h.className = 'burst-heart';
      h.textContent = pick(['♥', '♥', '❤', '💖', '💗']);
      h.style.left = `${x}px`;
      h.style.top = `${y}px`;
      h.style.fontSize = `${rand(14, 30)}px`;
      h.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
      h.style.setProperty('--dy', `${Math.sin(angle) * dist - 60}px`);
      h.style.setProperty('--rot', `${rand(-60, 60)}deg`);
      h.addEventListener('animationend', () => h.remove());
      frag.append(h);
    }
    document.body.append(frag);
  }

  /** One slow floating heart inside `container` (capped so it stays light). */
  function spawnHeart(container, cap = 16, { size = [14, 30], dur = [9, 16] } = {}) {
    if (container.childElementCount >= cap) return;
    const h = document.createElement('span');
    h.className = 'floating-heart';
    h.textContent = '♥';
    h.style.setProperty('--x', `${rand(2, 96)}%`);
    h.style.setProperty('--s', `${rand(size[0], size[1])}px`);
    h.style.setProperty('--c', pick(HEART_COLORS));
    h.style.setProperty('--dur', `${rand(dur[0], dur[1])}s`);
    h.style.setProperty('--drift', `${rand(-60, 60)}px`);
    h.addEventListener('animationend', () => h.remove());
    container.append(h);
  }

  let floatTimer = null;
  function startFloaters() {
    if (prefersReduced() || floatTimer) return;
    spawnHeart(el.floaters);
    floatTimer = setInterval(() => spawnHeart(el.floaters), 900);
  }
  function stopFloaters() {
    clearInterval(floatTimer);
    floatTimer = null;
  }
  // Pause the effect when the tab is hidden (saves battery)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopFloaters(); else startFloaters();
  });

  function buildStars() {
    const count = window.innerWidth < 600 ? 40 : 70;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      const size = rand(1, 2.6);
      s.className = 'star';
      s.style.left = `${rand(0, 100)}%`;
      s.style.top = `${rand(0, 100)}%`;
      s.style.width = s.style.height = `${size}px`;
      s.style.setProperty('--d', `${rand(3, 7)}s`);
      s.style.setProperty('--delay', `${rand(0, 6)}s`);
      frag.append(s);
    }
    el.stars.append(frag);
  }

  function buildPetals() {
    const count = window.innerWidth < 600 ? 9 : 14;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'petal';
      p.style.setProperty('--x', `${rand(0, 100)}%`);
      p.style.setProperty('--w', `${rand(9, 15)}px`);
      p.style.setProperty('--dur', `${rand(10, 18)}s`);
      p.style.setProperty('--delay', `-${rand(0, 14)}s`);
      p.style.setProperty('--sway', `${rand(-90, 90)}px`);
      frag.append(p);
    }
    el.petals.append(frag);
  }

  function buildSparkles() {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 14; i++) {
      const s = document.createElement('span');
      s.className = 'sparkle';
      s.textContent = '✦';
      s.style.left = `${rand(4, 94)}%`;
      s.style.top = `${rand(6, 90)}%`;
      s.style.setProperty('--s', `${rand(10, 22)}px`);
      s.style.setProperty('--d', `${rand(3, 6)}s`);
      s.style.setProperty('--delay', `${rand(0, 5)}s`);
      frag.append(s);
    }
    el.heroSparkles.append(frag);
  }

  /* ---------- Subtle scroll parallax (throttled with rAF) ---------- */
  let parallaxQueued = false;
  function onScroll() {
    if (parallaxQueued || prefersReduced()) return;
    parallaxQueued = true;
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--scroll', String(window.scrollY));
      parallaxQueued = false;
    });
  }

  /* ---------- Reveal-on-scroll ---------- */
  function setupReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window) || prefersReduced()) {
      items.forEach((n) => n.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    items.forEach((n) => io.observe(n));
  }

  function scrollToSection(id) {
    const target = $(id);
    if (target) target.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' });
  }

  /* =====================================================================
     5. OPENING SCREEN → HERO
     ===================================================================== */
  let opened = false;

  async function openSurprise() {
    if (opened) return;
    opened = true;
    el.openBtn.disabled = true;

    const r = el.openBtn.getBoundingClientRect();
    heartBurst(r.left + r.width / 2, r.top + r.height / 2, 28);

    el.intro.classList.add('is-leaving');
    await sleep(prefersReduced() ? 0 : 900);

    el.intro.hidden = true;
    el.app.hidden = false;
    document.body.classList.remove('no-scroll');
    window.scrollTo(0, 0);
    el.petals.classList.add('is-on');
    requestAnimationFrame(() => el.app.classList.add('is-entered'));
    el.hero.focus({ preventScroll: true });

    startHeroSequence();
  }

  async function startHeroSequence() {
    await sleep(prefersReduced() ? 0 : 500);
    confettiBurst(viewW * 0.12, viewH * 0.95, 70, { angle: -1.15, spread: 0.8, power: 22 });
    confettiBurst(viewW * 0.88, viewH * 0.95, 70, { angle: -Math.PI + 1.15, spread: 0.8, power: 22 });
    await sleep(prefersReduced() ? 0 : 500);
    confettiBurst(viewW * 0.5, viewH * 0.38, 80, { power: 12 });
    typeInto(el.heroMessage, fill(cfg.birthdayMessage), 38);
  }

  /* ---------- Cake: tap to blow out / relight ---------- */
  let blown = false;
  function toggleCandles() {
    blown = !blown;
    el.cakeBtn.classList.toggle('is-blown', blown);
    el.cakeBtn.setAttribute('aria-pressed', String(blown));
    el.cakeHint.textContent = blown
      ? 'Wish made… I hope it comes true 💫'
      : 'Tap the candles to make a wish 🕯️';
    if (blown) {
      const r = el.cakeBtn.getBoundingClientRect();
      confettiBurst(r.left + r.width / 2, r.top + 30, 90, { power: 14 });
    }
  }

  /* =====================================================================
     6. GALLERY + LIGHTBOX
     ===================================================================== */
  const TILTS = [-3, 2.5, -2, 3, -2.5, 2];

  function buildGallery() {
    const photos = cfg.photos;
    if (!photos.length) { el.memories.hidden = true; return; }

    photos.forEach((photo, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'polaroid reveal';
      btn.style.setProperty('--rot', `${TILTS[index % TILTS.length]}deg`);
      btn.setAttribute('aria-label', `Open memory ${index + 1}: ${photo.caption}`);

      const frame = document.createElement('span');
      frame.className = 'polaroid__photo';

      const img = document.createElement('img');
      img.alt = photo.alt || photo.caption;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.addEventListener('error', () => frame.classList.add('is-missing')); // missing file → friendly placeholder
      img.src = photo.src;

      const placeholder = document.createElement('span');
      placeholder.className = 'polaroid__placeholder';
      const icon = document.createElement('span');
      icon.className = 'polaroid__placeholder-icon';
      icon.textContent = '📷';
      const file = document.createElement('span');
      file.textContent = photo.src;
      placeholder.append(icon, file);

      frame.append(img, placeholder);

      const caption = document.createElement('span');
      caption.className = 'polaroid__caption';
      caption.textContent = photo.caption;

      btn.append(frame, caption);
      btn.addEventListener('click', () => openLightbox(index, btn));
      el.gallery.append(btn);
    });
  }

  let lbIndex = 0;
  let lbTrigger = null;

  function showPhoto(index) {
    const photos = cfg.photos;
    lbIndex = (index + photos.length) % photos.length;
    const photo = photos[lbIndex];

    el.lbFrame.classList.remove('is-missing');
    el.lbImg.onerror = () => el.lbFrame.classList.add('is-missing');
    el.lbImg.src = photo.src;
    el.lbImg.alt = photo.alt || photo.caption;
    el.lbFile.textContent = photo.src;
    el.lbCaption.textContent = photo.caption;
    el.lbCount.textContent = `${lbIndex + 1} / ${photos.length}`;

    // Restart the fade-in animation
    el.lbFrame.classList.remove('fade-in');
    void el.lbFrame.offsetWidth;
    el.lbFrame.classList.add('fade-in');
  }

  function openLightbox(index, trigger) {
    lbTrigger = trigger;
    const single = cfg.photos.length < 2;
    el.lbPrev.hidden = single;
    el.lbNext.hidden = single;
    showPhoto(index);
    if (typeof el.lightbox.showModal === 'function') el.lightbox.showModal();
    else el.lightbox.setAttribute('open', '');
  }

  function closeLightbox() {
    if (typeof el.lightbox.close === 'function') {
      if (el.lightbox.open) el.lightbox.close();
    } else {
      el.lightbox.removeAttribute('open');
      if (lbTrigger) lbTrigger.focus();
    }
  }

  /* =====================================================================
     7. LETTER
     ===================================================================== */
  function buildLetter() {
    const lines = cfg.letterParagraphs.map((text) => {
      const p = document.createElement('p');
      p.className = 'letter__line';
      p.textContent = fill(text);
      return p;
    });
    el.letterBody.replaceChildren(...lines);
  }

  function keepInView(node) {
    const r = node.getBoundingClientRect();
    if (r.bottom > window.innerHeight - 60) {
      node.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'center' });
    }
  }

  async function readLetter() {
    el.readLetterBtn.disabled = true;
    el.letterClosed.hidden = true;
    el.letterPaper.classList.add('is-open');

    const lines = $$('.letter__line', el.letterPaper); // paragraphs, then signature
    await sleep(prefersReduced() ? 0 : 700);
    for (const line of lines) {
      line.classList.add('is-shown');
      keepInView(line);
      await sleep(prefersReduced() ? 0 : 1200);
    }
    const last = lines[lines.length - 1].getBoundingClientRect();
    heartBurst(last.left + last.width * 0.8, last.top + last.height / 2, 14);
  }

  /* =====================================================================
     8. QUIZ (playful and optional)
     ===================================================================== */
  const quiz = { index: 0, answered: false };

  function renderQuiz() {
    const questions = cfg.quiz;
    const q = questions[quiz.index];
    quiz.answered = false;

    el.quizProgress.textContent = `Question ${quiz.index + 1} of ${questions.length}`;
    el.quizQuestion.textContent = fill(q.question);
    el.quizFeedback.textContent = '';
    el.quizFeedback.classList.remove('is-visible');
    el.quizNext.hidden = true;

    el.quizDots.replaceChildren(...questions.map((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'quiz__dot' + (i === quiz.index ? ' is-active' : i < quiz.index ? ' is-done' : '');
      return dot;
    }));

    el.quizOptions.replaceChildren(...q.options.map((opt) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'quiz__option';
      b.textContent = fill(opt.label);
      b.addEventListener('click', () => chooseAnswer(b, opt));
      return b;
    }));
  }

  function chooseAnswer(btn, option) {
    if (quiz.answered) return;
    quiz.answered = true;

    $$('.quiz__option', el.quizOptions).forEach((b) => { b.disabled = true; });
    btn.classList.add('is-picked');

    el.quizFeedback.textContent = fill(option.reply);
    el.quizFeedback.classList.add('is-visible');

    const r = btn.getBoundingClientRect();
    confettiBurst(r.left + r.width / 2, r.top + r.height / 2, 40, { angle: -Math.PI / 2, spread: Math.PI, power: 12 });

    const isLast = quiz.index === cfg.quiz.length - 1;
    el.quizNext.textContent = isLast ? 'Finish ✨' : 'Next →';
    el.quizNext.hidden = false;
    el.quizNext.focus({ preventScroll: true });
  }

  function nextQuestion() {
    if (quiz.index >= cfg.quiz.length - 1) {
      el.quizStage.hidden = true;
      el.quizDone.hidden = false;
      return;
    }
    quiz.index++;
    renderQuiz();
  }

  function restartQuiz() {
    quiz.index = 0;
    el.quizDone.hidden = true;
    el.quizStage.hidden = false;
    renderQuiz();
  }

  /* =====================================================================
     9. FINAL SURPRISE (full-screen cinematic overlay)
     ===================================================================== */
  let finaleRun = null;       // lets us cancel the sequence when closed
  let finaleHeartTimer = null;

  async function openFinale() {
    const run = { cancelled: false };
    finaleRun = run;

    // Reset the overlay
    el.finaleMessage.textContent = '';
    el.finalePromise.hidden = true;
    el.finaleSign.hidden = true;
    el.finaleBack.hidden = true;
    el.finaleHearts.replaceChildren();

    el.finale.hidden = false;
    el.app.inert = true;
    document.body.classList.add('no-scroll');
    void el.finale.offsetWidth; // let the browser register the starting state
    el.finale.classList.add('is-active');
    el.finaleClose.focus({ preventScroll: true });

    if (!prefersReduced()) {
      finaleHeartTimer = setInterval(
        () => spawnHeart(el.finaleHearts, 36, { size: [18, 44], dur: [6, 11] }), 280);
    }

    await sleep(prefersReduced() ? 0 : 1400);
    if (run.cancelled) return;

    // A few confetti salvos
    for (let i = 0; i < 5 && !run.cancelled; i++) {
      confettiBurst(rand(0.15, 0.85) * viewW, rand(0.15, 0.5) * viewH, 70, { power: 13 });
      await sleep(prefersReduced() ? 0 : 450);
    }
    if (run.cancelled) return;

    await typeInto(el.finaleMessage, fill(cfg.birthdayMessage), 40, run);
    if (run.cancelled) return;

    el.finalePromise.hidden = false;
    await sleep(prefersReduced() ? 0 : 1300);
    if (run.cancelled) return;

    el.finaleSign.hidden = false;
    await sleep(prefersReduced() ? 0 : 900);
    if (run.cancelled) return;

    el.finaleBack.hidden = false;
    confettiBurst(viewW / 2, viewH * 0.55, 100, { power: 15 });
    el.finale.scrollTo({ top: el.finale.scrollHeight, behavior: prefersReduced() ? 'auto' : 'smooth' });
  }

  async function closeFinale() {
    if (el.finale.hidden) return;
    if (finaleRun) finaleRun.cancelled = true;
    clearInterval(finaleHeartTimer);
    finaleHeartTimer = null;

    el.finale.classList.remove('is-active');
    await sleep(prefersReduced() ? 0 : 1100);

    el.finale.hidden = true;
    el.finaleHearts.replaceChildren();
    el.app.inert = false;
    document.body.classList.remove('no-scroll');
    el.finalBtn.focus({ preventScroll: true });
  }

  /* =====================================================================
     10. MUSIC (optional — never autoplays)
     ===================================================================== */
  let musicNoteTimer = null;

  function setMusicUI(playing) {
    el.musicBtn.classList.toggle('is-playing', playing);
    el.musicBtn.setAttribute('aria-pressed', String(playing));
    el.musicBtn.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
    el.musicStatus.textContent = playing ? 'Playing ♪' : 'Music off';
  }

  function musicUnavailable(message = 'Song not added yet 🎵') {
    setMusicUI(false);
    el.musicStatus.textContent = message;
    clearTimeout(musicNoteTimer);
    musicNoteTimer = setTimeout(() => setMusicUI(!el.bgm.paused), 3500);
  }

  async function toggleMusic() {
    if (!el.bgm.paused) { el.bgm.pause(); return; }
    try {
      await el.bgm.play();
    } catch (err) {
      // NotSupportedError = file missing / unreadable; anything else = browser blocked it
      musicUnavailable(err && err.name === 'NotSupportedError' ? 'Song not added yet 🎵' : 'Tap again to play');
    }
  }

  /* =====================================================================
     11. WIRE EVERYTHING UP
     ===================================================================== */
  function init() {
    applyConfig();
    buildStars();
    buildPetals();
    buildSparkles();
    buildGallery();
    buildLetter();
    renderQuiz();
    setupReveal();
    resizeCanvas();
    startFloaters();

    if (cfg.musicSrc) el.bgm.setAttribute('src', cfg.musicSrc);
    el.bgm.volume = 0.6;

    // Opening + hero
    el.openBtn.addEventListener('click', openSurprise);
    el.heroBtn.addEventListener('click', () => {
      const r = el.heroBtn.getBoundingClientRect();
      confettiBurst(r.left + r.width / 2, r.top, 60, { angle: -Math.PI / 2, spread: Math.PI, power: 14 });
      scrollToSection('#memories');
    });
    el.cakeBtn.addEventListener('click', toggleCandles);

    // Lightbox
    el.lbClose.addEventListener('click', closeLightbox);
    el.lbPrev.addEventListener('click', () => showPhoto(lbIndex - 1));
    el.lbNext.addEventListener('click', () => showPhoto(lbIndex + 1));
    el.lightbox.addEventListener('click', (e) => {
      // Click on the dark backdrop (outside photo and buttons) closes it
      if (!e.target.closest('.lightbox__frame, .lightbox__nav, .lightbox__close')) closeLightbox();
    });
    el.lightbox.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') showPhoto(lbIndex - 1);
      if (e.key === 'ArrowRight') showPhoto(lbIndex + 1);
    });
    el.lightbox.addEventListener('close', () => { if (lbTrigger) lbTrigger.focus(); });

    // Letter + quiz
    el.readLetterBtn.addEventListener('click', readLetter);
    el.quizNext.addEventListener('click', nextQuestion);
    el.quizRestart.addEventListener('click', restartQuiz);

    // Final surprise
    el.finalBtn.addEventListener('click', openFinale);
    el.finaleClose.addEventListener('click', closeFinale);
    el.finaleBack.addEventListener('click', closeFinale);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !el.finale.hidden) closeFinale();
    });

    // Music
    el.musicBtn.addEventListener('click', toggleMusic);
    el.bgm.addEventListener('play', () => setMusicUI(true));
    el.bgm.addEventListener('pause', () => setMusicUI(false));
    el.bgm.addEventListener('error', () => musicUnavailable());

    // Page-level listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 150);
    });
  }

  init();
})();