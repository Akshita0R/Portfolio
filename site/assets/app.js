/* ==========================================================================
   POSTMARKED — renders content.js into the page and wires the interactions.
   ========================================================================== */
(() => {
  const P = window.PORTFOLIO;
  const { esc, postmark, cancellation, motif, stamp, projectStamp, now, todayShort, todayLong } = window.Stamps;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const track = (type, label) => window.track && window.track(type, label);
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* ----------------------------------------------------------- render --- */

  const fill = (sel, html) => $$(sel).forEach((el) => (el.innerHTML = html));
  fill("[data-name]", esc(P.name));
  fill("[data-role]", esc(P.role));
  fill("[data-today]", todayLong);
  fill("[data-year]", now.getFullYear());
  fill("[data-signoff]", esc(P.signoff));
  fill("[data-brand]", `№ ${esc(P.initials)}-${now.getFullYear()}`);
  fill("[data-letter-place]", `${esc(P.city)}, ${esc(P.country)}`);
  fill("[data-seal]", esc(P.initials));
  document.title = `${P.name} — Postmarked`;

  $("[data-from]").innerHTML = `From<br><b>${esc(P.name)}</b><br>${esc(P.role)}<br>${esc(P.city)}, ${esc(P.country)}<br>${esc(P.email)}`;
  $("[data-hero-stamp]").innerHTML = stamp({
    ink: "red", denom: "1st", small: "Class", art: motif("portrait", P.initials),
    name: P.name, sub: P.country, cls: "stamp--hero",
  });
  $("[data-cancel]").innerHTML = cancellation();
  $("[data-postmark]").innerHTML = postmark({ top: P.city, bottom: P.country, mid: todayShort, sub: now.getFullYear() });

  $("[data-letter]").innerHTML = P.letter.map((t) => `<p>${esc(t)}</p>`).join("");
  $$("[data-resume]").forEach((a) => {
    a.href = P.resumeUrl;
    a.addEventListener("click", () => track("resume", "download"));
  });

  // Airmail tape + postage meter
  const tape = `${P.name} · Par avion · Product · Data · AI · ${P.city} · `;
  fill("[data-tape]", `<span>${esc(tape.repeat(4))}</span><span aria-hidden="true">${esc(tape.repeat(4))}</span>`);
  $("[data-meter]").innerHTML = P.meter
    .map((m, i) => `<li class="meter__cell reveal" style="transition-delay:${i * 80}ms"><b>${esc(m.value)}</b><span class="mono">${esc(m.label)}</span></li>`)
    .join("");

  // Collection: featured "special issue" + the album
  const caseUrl = (p) => `case.html?id=${encodeURIComponent(p.id)}`;
  const featured = P.projects.find((p) => p.featured);
  const rest = P.projects.filter((p) => p !== featured);
  const years = P.projects.map((p) => p.year);
  $("[data-collection-lede]").textContent =
    `${P.projects.length} issues, ${Math.min(...years)}–${Math.max(...years)}. Each stamp has its full story on the back.`;
  const highlights = (p) =>
    `<ul class="highlights">${(p.highlights || []).map((h) => `<li><b>${esc(h.value)}</b><span>${esc(h.label)}</span></li>`).join("")}</ul>`;
  if (featured) {
    $("[data-featured]").innerHTML = `
      <a class="featured__stamp" href="${caseUrl(featured)}" aria-label="${esc(featured.title)} case study">
        <span class="album__mount" aria-hidden="true"></span>${projectStamp(featured)}
        <span class="postmark featured__pm" aria-hidden="true">${postmark({ top: "Special issue", bottom: "First day cover", mid: String(featured.year), sub: `№ ${featured.no}` })}</span>
      </a>
      <div class="featured__text">
        <p class="mono kicker">Special issue · №${esc(featured.no)} · ${esc(featured.category)}</p>
        <h3>${esc(featured.title)}</h3>
        <p class="featured__tagline">${esc(featured.tagline)}</p>
        <p>${esc(featured.summary)}</p>
        ${highlights(featured)}
        <div class="catalogue__links">
          <a class="btn" href="${caseUrl(featured)}" data-case="${esc(featured.id)}">Read the case study →</a>
          ${featured.links.map((l) => `<a class="btn btn--ghost" href="${esc(l.url)}" target="_blank" rel="noopener" data-out="${esc(featured.id)}-${esc(l.label)}">${esc(l.label)} ↗</a>`).join("")}
        </div>
      </div>`;
  }
  $("[data-stamps]").innerHTML = rest
    .map((p, i) => `<li class="album__item reveal" style="transition-delay:${(i % 4) * 90}ms">
      <button class="album__btn" type="button" data-project="${esc(p.id)}" style="--tilt:${[-2.2, 1.4, -0.8, 2.4, -1.6, 0.9][i % 6]}deg" aria-label="${esc(p.title)}: open catalogue entry">
        <span class="album__mount" aria-hidden="true"></span>
        ${projectStamp(p)}
        <span class="album__caption"><span class="mono">Cat. №${esc(p.no)}</span><span class="mono album__cta">Read entry →</span></span>
      </button></li>`)
    .join("");

  // Catalogue dialog (quick look; links through to the full case study)
  const dialog = $("[data-catalogue]");
  function openProject(id) {
    const p = P.projects.find((x) => x.id === id);
    if (!p) return;
    $("[data-catalogue-body]").innerHTML = `
      <div class="catalogue__side">${projectStamp(p)}
        <div class="postmark" aria-hidden="true">${postmark({ top: p.category, bottom: "First day of issue", mid: String(p.year), sub: `№ ${p.no}` })}</div>
      </div>
      <div>
        <p class="mono kicker">Catalogue entry · №${esc(p.no)}</p>
        <h3 id="cat-title">${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        <dl>
          <dt>Issued</dt><dd>${esc(p.timeline || p.year)}</dd>
          <dt>Role</dt><dd>${esc(p.role)}</dd>
          <dt>Printed with</dt><dd>${p.stack.map(esc).join(" · ")}</dd>
          <dt>Outcome</dt><dd>${esc(p.outcome)}</dd>
        </dl>
        <div class="catalogue__links">
          <a class="btn" href="${caseUrl(p)}" data-case="${esc(p.id)}">Full case study →</a>
          ${p.links.map((l) => `<a class="btn btn--ghost" href="${esc(l.url)}" target="_blank" rel="noopener" data-out="${esc(p.id)}-${esc(l.label)}">${esc(l.label)} ↗</a>`).join("")}
        </div>
      </div>`;
    dialog.showModal();
    track("project", p.id);
  }
  $("[data-stamps]").addEventListener("click", (e) => {
    const b = e.target.closest("[data-project]");
    if (b) openProject(b.dataset.project);
  });
  document.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close(); // backdrop
    const out = e.target.closest("[data-out]");
    if (out) track("link", out.dataset.out);
  });

  // Route
  $("[data-route]").innerHTML = P.route
    .map((r, i) => `<li class="route__stop reveal">
      <div class="postmark" style="--tilt:${i % 2 ? 9 : -11}deg" aria-hidden="true">${postmark({ top: r.place, bottom: P.city, mid: (r.when.match(/\d{4}/) || [""])[0], sub: r.when.includes("now") ? "IN TRANSIT" : "" })}</div>
      <div class="route__card"><p class="mono" style="margin:0;color:var(--ink-faint)">${esc(r.when)}</p>
        <h3>${esc(r.title)}</h3><p class="route__place">${esc(r.note)}</p>
        ${r.points.length ? `<ul class="route__points">${r.points.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}</div>
    </li>`)
    .join("");
  $("[data-honours]").innerHTML = P.honours
    .map((h, i) => `<li class="honour" style="--rot:${[-3, 2, -1.5, 3, -2.5, 1, -1, 2.5][i % 8]}deg">${esc(h)}</li>`)
    .join("");

  // Customs
  $("[data-customs]").innerHTML = P.customs
    .map((c) => `<tr><td>${esc(c.items)}</td><td class="mono">${esc(c.category)}</td></tr>`)
    .join("");
  $("[data-customs-note]").textContent = P.customsNote;

  // Postcard
  $("[data-card-stamp]").innerHTML = stamp({ ink: "blue", denom: "Reply", small: "Paid", art: motif("portrait", P.initials), name: P.initials, sub: P.country });
  $("[data-card-addr]").innerHTML = `${esc(P.name)}<br>c/o this portfolio<br>${esc(P.city)}, ${esc(P.country)}`;
  $("[data-card-sent]").innerHTML = `<div class="postmark">${postmark({ top: "Posted · thank you", bottom: P.city, mid: todayShort, sub: "SENT" })}</div>`;
  $("[data-links]").innerHTML = [
    `<li><a href="mailto:${esc(P.email)}" data-link="email">${esc(P.email)}</a></li>`,
    ...P.links.map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener" data-link="${esc(l.label)}">${esc(l.label)} ↗</a></li>`),
  ].join("");
  $("[data-links]").addEventListener("click", (e) => {
    const a = e.target.closest("[data-link]");
    if (a) track("link", a.dataset.link);
  });

  const form = $("[data-postcard]");
  const status = $("[data-card-status]");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Posting…";
    const data = new FormData(form);
    try {
      // Netlify Forms picks this up automatically when hosted on Netlify.
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      if (!res.ok) throw new Error(res.status);
      form.classList.add("is-sent");
      status.textContent = "Delivered. I'll write back soon.";
      track("postcard", "sent");
      form.reset();
    } catch {
      // No form backend (local preview, Vercel, etc.): fall back to the mail app.
      const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
      status.textContent = "Opening your mail app instead…";
      track("postcard", "mailto");
      location.href = `mailto:${P.email}?subject=${encodeURIComponent("A postcard from your portfolio")}&body=${encodeURIComponent(body)}`;
    }
  });

  /* --------------------------------------------------------- envelope --- */
  const env = $("[data-envelope]");
  const openBtn = $("[data-open]");
  openBtn.addEventListener("click", () => {
    if (env.classList.contains("is-open")) return $("#letter").scrollIntoView();
    env.classList.add("is-flipped", "is-open");
    openBtn.innerHTML = 'Read the letter <span aria-hidden="true">↓</span>';
    track("envelope", "open");
    setTimeout(() => $("#letter").scrollIntoView(), reducedMotion ? 0 : 2600);
  });

  /* ------------------------------------------------- reveal + sections --- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.isIntersecting && (en.target.classList.add("is-in"), io.unobserve(en.target))),
    { threshold: 0.15 }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  const seen = new Set();
  const navLinks = $$(".nav__links a");
  const sio = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const id = en.target.id;
        navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
        if (!seen.has(id)) (seen.add(id), track("section", id));
      }),
    { rootMargin: "-45% 0px -45% 0px" }
  );
  $$("[data-section]").forEach((s) => sio.observe(s));

  /* ------------------------------------------------------- ink stamps --- */
  const layer = $("[data-ink-layer]");
  const toggle = $("[data-ink-toggle]");
  const WORDS = ["Approved", "Air mail", "Priority", "Fragile", "First class", "Hire me?", "Handle with care", "Express"];
  const COLORS = ["var(--red)", "var(--blue)", "var(--stamp-ink)"];
  let inkOn = true;
  try { inkOn = localStorage.getItem("ink") !== "off"; } catch {}
  const setInk = (on) => {
    inkOn = on;
    toggle.setAttribute("aria-pressed", String(on));
    try { localStorage.setItem("ink", on ? "on" : "off"); } catch {}
  };
  setInk(inkOn);
  toggle.addEventListener("click", () => setInk(!inkOn));

  let inkCount = 0;
  document.addEventListener("click", (e) => {
    if (!inkOn || e.button !== 0) return;
    if (e.target.closest("a, button, input, textarea, label, select, dialog, form, .nav, .stamp-wrap")) return;
    const sel = getSelection();
    if (sel && !sel.isCollapsed) return;
    const mark = document.createElement("div");
    const round = Math.random() < 0.35;
    mark.className = `ink${round ? " ink--round" : ""}`;
    mark.innerHTML = round ? `Received<br>${todayShort}<br>${now.getFullYear()}` : esc(WORDS[inkCount % WORDS.length]);
    mark.style.left = `${e.pageX}px`;
    mark.style.top = `${e.pageY}px`;
    mark.style.setProperty("--rot", `${(Math.random() * 30 - 15).toFixed(1)}deg`);
    mark.style.setProperty("--c", COLORS[inkCount % COLORS.length]);
    layer.appendChild(mark);
    if (++inkCount === 1) track("ink", "first-stamp");
    const live = layer.querySelectorAll(".ink:not(.is-fading)");
    if (live.length > 12) {
      const old = live[0];
      old.classList.add("is-fading");
      setTimeout(() => old.remove(), 1200);
    }
  });
})();
