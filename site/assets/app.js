/* ==========================================================================
   Home page: renders content.js and wires the ticket, menu and doodle pad.
   ========================================================================== */
(() => {
  const P = window.PORTFOLIO;
  const { esc } = Shell;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const track = (type, label) => window.track && window.track(type, label);
  const caseUrl = (p) => `case.html?id=${encodeURIComponent(p.id)}`;

  const now = new Date();
  const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const today = `${String(now.getDate()).padStart(2, "0")} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  Shell.render({ base: "" });
  const fill = (sel, v) => $$(sel).forEach((el) => (el.textContent = v));
  fill("[data-today]", today);
  fill("[data-time]", time);
  fill("[data-city]", P.city);
  fill("[data-name]", P.name);
  fill("[data-year]", now.getFullYear());

  // Home panels
  $('[data-art="platform"]').innerHTML = Art.platform();
  $('[data-art="train"]').insertAdjacentHTML("beforeend", Art.train(
    P.projects.map((p) => ({ title: p.short || p.title, scene: p.scene, href: caseUrl(p) }))
  ));

  const ticket = $("[data-ticket]");
  $("[data-stamp]").innerHTML = `Validated<br>${today.slice(0, 6)}<br>${time}`;
  ticket.addEventListener("click", () => {
    const first = !ticket.classList.contains("is-stamped");
    ticket.classList.remove("is-stamped");
    void ticket.offsetWidth; // restart the stamp animation
    ticket.classList.add("is-stamped");
    if (first) track("envelope", "ticket-stamped");
  });

  // Work cards
  $("[data-cards]").innerHTML = P.projects
    .map((p) => `<a class="card reveal${p.wide ? " card--wide" : ""}" href="${caseUrl(p)}" data-case="${esc(p.id)}">
      <div class="card__art">${Art.scene(p.scene)}</div>
      <span class="card__more">View case study →</span>
      <div class="card__info" aria-hidden="true">${esc(p.intro.split(". ")[0])}.
        <dl><dt>Role</dt><dd>${esc(p.role)}</dd><dt>Team</dt><dd>${esc(p.team)}</dd><dt>When</dt><dd>${esc(p.timeline)}</dd></dl>
      </div>
      <span class="card__label">${esc(p.label)}<small>${esc(p.title)} · ${esc(p.year)}</small></span>
    </a>`)
    .join("");
  $("[data-cards]").addEventListener("click", (e) => {
    const c = e.target.closest("[data-case]");
    if (c) track("project", c.dataset.case);
  });

  // About
  $("[data-about-title]").textContent = P.about.title;
  $("[data-about-body]").innerHTML = P.about.body.map((t) => `<p>${esc(t)}</p>`).join("");
  $("[data-resume-link]").href = P.resumeUrl;
  $("[data-resume-link]").addEventListener("click", () => track("resume", "about"));
  $("[data-roles]").innerHTML = P.about.roles.map((r) => `<li><span>${esc(r.org)}</span><span>${esc(r.role)}</span></li>`).join("");
  $("[data-skills]").innerHTML = P.skills.map((s) => `<div><dt>${esc(s.group)}</dt><dd>${esc(s.items)}</dd></div>`).join("");
  $('[data-art="station"]').innerHTML = Art.station();
  $("[data-polaroid]").innerHTML = `<div class="polaroid__img">${P.photo ? `<img src="${esc(P.photo)}" alt="${esc(P.name)}">` : Art.avatar(P.name.split(" ").map((w) => w[0]).join(""))}</div><figcaption class="polaroid__cap">hi, I'm ${esc(P.first)}!</figcaption>`;

  // Play + contact
  $('[data-art="construction"]').innerHTML = Art.construction();
  $("[data-contact]").innerHTML = P.links
    .map((l, i) => `<a class="btn${i ? " btn--line" : ""}" href="${esc(l.url)}" ${l.url.startsWith("mailto") ? "" : 'target="_blank" rel="noopener"'} data-link="${esc(l.label)}">${esc(l.label)} ↗</a>`)
    .join("");
  $("[data-contact]").addEventListener("click", (e) => {
    const a = e.target.closest("[data-link]");
    if (a) track("link", a.dataset.link);
  });

  // Doodle pad
  const canvas = $("[data-doodle]");
  const ctx = canvas.getContext("2d");
  const sizeCanvas = () => {
    const r = canvas.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.lineCap = ctx.lineJoin = "round";
    ctx.lineWidth = 2.4;
    ctx.strokeStyle = "#2350dc";
  };
  sizeCanvas();
  let drawing = false, drew = false, last = null;
  const pos = (e) => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  canvas.addEventListener("pointerdown", (e) => { drawing = true; last = pos(e); canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener("pointermove", (e) => {
    if (!drawing) return;
    const p = pos(e);
    ctx.beginPath(); ctx.moveTo(...last); ctx.lineTo(...p); ctx.stroke();
    last = p;
    if (!drew) (drew = true, track("ink", "doodle"));
  });
  ["pointerup", "pointercancel"].forEach((t) => canvas.addEventListener(t, () => (drawing = false)));
  $("[data-clear]").addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height));
  addEventListener("resize", () => { const img = ctx.getImageData(0, 0, canvas.width, canvas.height); sizeCanvas(); ctx.putImageData(img, 0, 0); });

  // Reveal on scroll
  const io = new IntersectionObserver((es) => es.forEach((en) => en.isIntersecting && (en.target.classList.add("is-in"), io.unobserve(en.target))), { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));

  // Metro menu follows the scroll; each stop is tracked once.
  const seen = new Set();
  const stops = $$("[data-stop]");
  const onScroll = () => {
    const y = innerHeight * 0.4;
    let cur = stops[0];
    stops.forEach((s) => s.getBoundingClientRect().top <= y && (cur = s));
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = stops[stops.length - 1];
    Shell.setCurrent(cur.dataset.stop);
    if (!seen.has(cur.id)) (seen.add(cur.id), track("section", cur.id));
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
