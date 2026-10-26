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

  const projects = P.projects.filter((p) => p.type !== "experience");
  const roles = P.projects.filter((p) => p.type === "experience");

  // Home panels
  $('[data-art="platform"]').innerHTML = Art.platform() + '<div class="bubble" data-bubble role="status"></div><span class="dot-cursor" aria-hidden="true" data-dot></span>';

  // Platform: the cursor is a dot; the commuter chats and turns to face you when you come close.
  const plat = $('[data-art="platform"]'), bubble = $("[data-bubble]"), dot = $("[data-dot]"), who = $(".who", plat);
  const LINES = [
    "you can scroll ahead, I'll catch up",
    "the purple line is always packed at 9",
    "mind the gap… between the data and the users",
    "checking which pharmacy is open. old habit.",
    "next stop: work →",
    "I'd A/B test this platform if I could",
  ];
  let line = -1;
  const place = () => {
    const pr = plat.getBoundingClientRect(), wr = who.getBoundingClientRect();
    bubble.style.left = `${wr.right - pr.left + 8}px`;
    bubble.style.top = `${wr.top - pr.top + 2}px`;
  };
  plat.addEventListener("pointerenter", () => {
    line = (line + 1) % LINES.length;
    bubble.textContent = LINES[line];
    place();
    plat.classList.add("is-chatting");
  });
  plat.addEventListener("pointermove", (e) => {
    const pr = plat.getBoundingClientRect(), wr = who.getBoundingClientRect();
    if (e.pointerType === "mouse") {
      plat.classList.add("has-dot");
      dot.style.transform = `translate(${e.clientX - pr.left}px, ${e.clientY - pr.top}px)`;
    }
    const near = Math.hypot(e.clientX - (wr.left + wr.width / 2), e.clientY - (wr.top + wr.height / 2)) < 140;
    plat.classList.toggle("is-near", near);
  });
  plat.addEventListener("pointerleave", () => plat.classList.remove("is-chatting", "is-near", "has-dot"));
  const win = (p) => ({ title: p.short || p.title, scene: p.scene, href: `#card-${p.id}` });
  $('[data-art="train"]').insertAdjacentHTML("beforeend", Art.train([
    { label: "PROJECTS", items: projects.map(win) },
    { label: "WORK", items: roles.map(win) },
  ]));
  // A window click scrolls down to its card and highlights it.
  $('[data-art="train"]').addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='#card-']");
    if (!a) return;
    e.preventDefault();
    const card = document.getElementById(a.getAttribute("href").slice(1));
    card.classList.add("is-in");
    card.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
    card.classList.remove("is-flash");
    void card.offsetWidth;
    card.classList.add("is-flash");
    track("section", "train-" + card.dataset.case);
  });

  const ticket = $("[data-ticket]");
  $("[data-stamp]").innerHTML = `Validated<br>${today.slice(0, 6)}<br>${time}`;
  ticket.addEventListener("click", (e) => {
    const first = !ticket.classList.contains("is-stamped");
    if (e.detail) {
      // Mouse/touch click: ink lands where the stamp came down (keyboard keeps the default spot).
      const r = ticket.getBoundingClientRect();
      ticket.style.setProperty("--sx", `${Math.min(Math.max(e.clientX - r.left, 30), r.width - 30)}px`);
      ticket.style.setProperty("--sy", `${Math.min(Math.max(e.clientY - r.top, 20), r.height - 20)}px`);
      ticket.classList.add("is-placed");
    }
    ticket.classList.remove("is-stamped");
    void ticket.offsetWidth; // restart the stamp animation
    ticket.classList.add("is-stamped");
    if (first) track("envelope", "ticket-stamped");
  });

  // The pointer becomes a rubber stamp over the ticket panel (mouse only).
  const panel = $(".ticket-panel"), stamper = $("[data-stamper]");
  panel.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = panel.getBoundingClientRect();
    panel.classList.add("has-stamper");
    // Hotspot is the stamp face, at about (30%, 66%) of the 110px drawing.
    stamper.style.transform = `translate(${e.clientX - r.left - 33}px, ${e.clientY - r.top - 73}px)`;
  });
  panel.addEventListener("pointerleave", () => panel.classList.remove("has-stamper"));
  panel.addEventListener("pointerdown", () => stamper.classList.add("is-down"));
  addEventListener("pointerup", () => stamper.classList.remove("is-down"));

  // Recruiter mode: the same content as a plain, scannable résumé.
  const rmode = $("[data-rmode]");
  const rbtn = $("[data-recruiter]");
  rmode.innerHTML = `
    <div class="rmode__bar">
      <a class="btn" href="${esc(P.resumeUrl)}" target="_blank" rel="noopener" data-resume-r>Download PDF ↗</a>
      ${P.links.map((l) => `<a class="btn btn--line" href="${esc(l.url)}" ${l.url.startsWith("mailto") ? "" : 'target="_blank" rel="noopener"'}>${esc(l.label)}</a>`).join("")}
      <button class="btn btn--line" type="button" data-recruiter-exit>← Illustrated site</button>
    </div>
    <h1>${esc(P.name)}</h1>
    <p class="rmode__sub">${esc(P.now.text)} → ${esc(P.next.text)} · ${esc(P.city)} · <a href="mailto:${esc(P.email)}">${esc(P.email)}</a></p>
    <p class="rmode__summary">${esc(P.summary)}</p>
    <h2>Experience</h2>
    ${P.experience.map((x) => `<div class="rrow"><div><h3>${esc(x.org)}</h3><div class="rrow__role">${esc(x.role)}</div></div><div class="rrow__when">${esc(x.when)}<br>${esc(x.where)}</div>
      <ul>${x.points.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`).join("")}
    <h2>Projects</h2>
    ${projects.map((p) => `<div class="rrow"><div><h3>${esc(p.title)}</h3><div class="rrow__role">${esc(p.label)} · ${esc(p.tools)}</div></div><div class="rrow__when">${esc(p.year)}<br><a href="${caseUrl(p)}">Case study →</a></div></div>`).join("")}
    <h2>Education</h2>
    ${P.education.map((x) => `<div class="rrow"><div><h3>${esc(x.org)}</h3><div class="rrow__role">${esc(x.role)}</div></div><div class="rrow__when">${esc(x.when)}</div></div>`).join("")}
    <h2>Skills</h2>
    <dl class="skills">${P.skills.map((s) => `<div><dt>${esc(s.group)}</dt><dd>${esc(s.items)}</dd></div>`).join("")}</dl>
    <h2>Awards</h2>
    <ul class="rrow" style="display:block;padding-left:1.1em;color:var(--soft)">${P.awards.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
  const setRecruiter = (on, user) => {
    document.body.classList.toggle("is-recruiter", on);
    rmode.hidden = !on;
    rbtn.setAttribute("aria-pressed", String(on));
    rbtn.textContent = on ? "Exit recruiter mode" : "Recruiter mode";
    const url = new URL(location.href);
    on ? url.searchParams.set("mode", "recruiter") : url.searchParams.delete("mode");
    history.replaceState(null, "", url);
    if (!on) sizeCanvas();
    if (user) {
      scrollTo(0, 0);
      if (on) track("section", "recruiter-mode");
    }
  };
  rbtn.addEventListener("click", () => setRecruiter(!document.body.classList.contains("is-recruiter"), true));
  $("[data-recruiter-exit]").addEventListener("click", () => setRecruiter(false, true));
  $("[data-resume-r]").addEventListener("click", () => track("resume", "recruiter-mode"));
  if (new URLSearchParams(location.search).get("mode") === "recruiter") setRecruiter(true, false);

  // Work cards
  const card = (p) => `<a class="card reveal${p.wide ? " card--wide" : ""}" id="card-${esc(p.id)}" href="${caseUrl(p)}" data-case="${esc(p.id)}">
      <div class="card__art">${Art.scene(p.scene)}</div>
      <span class="card__more">View case study →</span>
      <div class="card__info" aria-hidden="true">${esc(p.intro.split(". ")[0])}.
        <dl><dt>Role</dt><dd>${esc(p.role)}</dd><dt>Team</dt><dd>${esc(p.team)}</dd><dt>When</dt><dd>${esc(p.timeline)}</dd></dl>
      </div>
      <span class="card__label">${esc(p.label)}<small>${esc(p.title)} · ${esc(p.year)}</small></span>
    </a>`;
  $("[data-cards]").innerHTML = projects.map(card).join("");
  $("[data-roles-cards]").innerHTML = roles.map(card).join("");
  $$(".cards").forEach((el) => el.addEventListener("click", (e) => {
    const c = e.target.closest("[data-case]");
    if (c) track("project", c.dataset.case);
  }));

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
    if (!r.width) return;
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
  addEventListener("resize", () => {
    if (!canvas.width || !canvas.getBoundingClientRect().width) return sizeCanvas(); // hidden (recruiter mode)
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    sizeCanvas();
    ctx.putImageData(img, 0, 0);
  });

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
