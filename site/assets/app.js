/* ==========================================================================
   POSTMARKED — renders content.js into the page and wires the interactions.
   ========================================================================== */
(() => {
  const P = window.PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const track = (type, label) => window.track && window.track(type, label);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const now = new Date();
  const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const todayShort = `${String(now.getDate()).padStart(2, "0")} ${MONTHS[now.getMonth()]}`;
  const todayLong = `${todayShort} ${now.getFullYear()}`;
  let uid = 0;

  /* ----------------------------------------------------------- drawing --- */

  // Circular date-stamp: text on the ring, date in the middle.
  function postmark({ top, bottom, mid, sub }) {
    const id = `pm${++uid}`;
    const fit = (t, base, max) => Math.max(6.5, Math.min(base, (base * max) / Math.max(t.length, 1)));
    top = String(top).toUpperCase();
    bottom = String(bottom).toUpperCase();
    return `<svg viewBox="0 0 120 120" role="presentation">
      <defs>
        <path id="${id}t" d="M 17,60 A 43,43 0 0 1 103,60" />
        <path id="${id}b" d="M 9,60 A 51,51 0 0 0 111,60" />
      </defs>
      <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" stroke-width="2.6" />
      <circle cx="60" cy="60" r="36" fill="none" stroke="currentColor" stroke-width="1.4" />
      <text font-size="${fit(top, 10.5, 15)}"><textPath href="#${id}t" startOffset="50%" text-anchor="middle">${esc(top)}</textPath></text>
      <text font-size="${fit(bottom, 9, 15)}"><textPath href="#${id}b" startOffset="50%" text-anchor="middle">${esc(bottom)}</textPath></text>
      <line x1="27" y1="47" x2="93" y2="47" stroke="currentColor" stroke-width="1.2" />
      <line x1="27" y1="74" x2="93" y2="74" stroke="currentColor" stroke-width="1.2" />
      <text x="60" y="65" font-size="${fit(mid, 14, 7)}" text-anchor="middle" font-weight="500">${esc(mid)}</text>
      ${sub ? `<text x="60" y="86" font-size="8" text-anchor="middle">${esc(sub)}</text>` : ""}
      <text x="12" y="64" font-size="9">★</text><text x="100" y="64" font-size="9">★</text>
    </svg>`;
  }

  // Wavy cancellation lines that run across the stamp.
  function cancellation() {
    const lines = [];
    for (let i = 0; i < 6; i++) {
      const y = 8 + i * 10;
      let d = `M 0 ${y}`;
      for (let x = 0; x <= 300; x += 20) d += ` Q ${x + 10} ${y + (i % 2 ? 5 : -5)} ${x + 20} ${y}`;
      lines.push(`<path d="${d}" />`);
    }
    return `<svg viewBox="0 0 300 66" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="2.2">${lines.join("")}</svg>`;
  }

  // Engraved-style artwork for each stamp. All monochrome, coloured by the ink.
  function motif(name, extra = "") {
    const id = `h${++uid}`;
    const defs = `<defs><pattern id="${id}" width="3.4" height="3.4" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><line x1="0" y1="0" x2="0" y2="3.4" stroke="currentColor" stroke-width="1.3" /></pattern></defs>`;
    const H = `url(#${id})`;
    const art = {
      sun: () => {
        let rays = "";
        for (let i = 0; i < 13; i++) {
          const a = Math.PI + (i * Math.PI) / 12;
          rays += `<line x1="${50 + 30 * Math.cos(a)}" y1="${66 + 30 * Math.sin(a)}" x2="${50 + 42 * Math.cos(a)}" y2="${66 + 42 * Math.sin(a)}" />`;
        }
        let sea = "";
        for (let y = 72; y < 98; y += 5) sea += `<line x1="${8 + (y - 72)}" y1="${y}" x2="${92 - (y - 72)}" y2="${y}" />`;
        return `<path d="M 26 66 A 24 24 0 0 1 74 66 Z" fill="${H}" stroke="currentColor" stroke-width="1.6" />${rays}${sea}`;
      },
      waves: () => {
        let w = "";
        for (let i = 0; i < 7; i++) {
          const y = 42 + i * 8;
          w += `<path d="M 4 ${y} q 11 -9 23 0 t 23 0 t 23 0 t 23 0" />`;
        }
        return `<circle cx="70" cy="22" r="12" fill="${H}" />${w}`;
      },
      grid: () => {
        const hs = [28, 46, 36, 62, 54, 76];
        let bars = "";
        hs.forEach((h, i) => (bars += `<rect x="${12 + i * 13}" y="${90 - h}" width="9" height="${h}" fill="${H}" stroke="currentColor" stroke-width="1.2" />`));
        return `<line x1="6" y1="90.5" x2="94" y2="90.5" stroke-width="2" /><polyline points="16,58 29,42 42,50 55,26 68,32 81,10" stroke-width="1.6" fill="none" />${bars}`;
      },
      orbit: () =>
        `<ellipse cx="50" cy="54" rx="42" ry="15" transform="rotate(-24 50 54)" /><ellipse cx="50" cy="54" rx="42" ry="15" transform="rotate(36 50 54)" />` +
        `<circle cx="50" cy="54" r="15" fill="${H}" stroke="currentColor" stroke-width="1.6" /><circle cx="86" cy="36" r="4" fill="currentColor" /><circle cx="22" cy="86" r="3" fill="currentColor" /><circle cx="18" cy="24" r="2.4" fill="currentColor" />`,
      leaf: () => {
        let veins = "";
        for (let i = 0; i < 6; i++) {
          const y = 30 + i * 10;
          veins += `<line x1="50" y1="${y + 6}" x2="${30 + i * 1.5}" y2="${y - 4}" /><line x1="50" y1="${y + 6}" x2="${70 - i * 1.5}" y2="${y - 4}" />`;
        }
        return `<path d="M 50 10 C 86 30 84 74 50 92 C 16 74 14 30 50 10 Z" fill="${H}" stroke="currentColor" stroke-width="1.8" /><line x1="50" y1="14" x2="50" y2="98" stroke-width="2" />${veins}`;
      },
      bolt: () =>
        `<circle cx="50" cy="54" r="40" /><circle cx="50" cy="54" r="32" stroke-dasharray="2 3" />` +
        `<polygon points="56,14 26,60 46,60 40,94 74,44 53,44" fill="${H}" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />`,
      portrait: () =>
        `<circle cx="50" cy="50" r="40" fill="${H}" /><circle cx="50" cy="50" r="40" /><circle cx="50" cy="50" r="31" fill="#fdfaf2" stroke="currentColor" />` +
        `<text x="50" y="61" text-anchor="middle" font-size="30" font-weight="800" fill="currentColor" stroke="none" style="font-family:var(--serif)">${esc(extra)}</text>`,
    };
    return `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.4" role="presentation">${defs}${(art[name] || art.sun)()}</svg>`;
  }

  function stamp({ ink, denom, small, art, name, sub, cls = "" }) {
    return `<div class="stamp-wrap"><div class="stamp ${cls}"><div class="stamp__frame ink-${ink}">
      <div class="stamp__top"><span class="stamp__denom">${esc(denom)}</span><span class="stamp__small">${esc(small)}</span></div>
      <div class="stamp__art">${art}</div>
      <div class="stamp__bottom"><span class="stamp__name">${esc(name)}</span><span class="stamp__small">${esc(sub)}</span></div>
    </div></div></div>`;
  }

  const projectStamp = (p) =>
    stamp({ ink: p.ink, denom: p.denomination, small: p.year, art: motif(p.motif), name: p.title, sub: `${p.category} · №${p.id}` });

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

  // Collection
  const years = P.projects.map((p) => p.year);
  $("[data-collection-lede]").textContent =
    `${P.projects.length} issues, ${Math.min(...years)}–${Math.max(...years)}. Pick any stamp to read its catalogue entry.`;
  $("[data-stamps]").innerHTML = P.projects
    .map((p, i) => `<li class="album__item reveal" style="transition-delay:${(i % 3) * 90}ms">
      <button class="album__btn" type="button" data-project="${esc(p.id)}" style="--tilt:${[-2.2, 1.4, -0.8, 2.4, -1.6, 0.9][i % 6]}deg" aria-label="${esc(p.title)}: open catalogue entry">
        <span class="album__mount" aria-hidden="true"></span>
        ${projectStamp(p)}
        <span class="album__caption"><span class="mono">Cat. №${esc(p.id)}</span><span class="mono album__cta">Read entry →</span></span>
      </button></li>`)
    .join("");

  // Catalogue dialog
  const dialog = $("[data-catalogue]");
  function openProject(id) {
    const p = P.projects.find((x) => x.id === id);
    if (!p) return;
    $("[data-catalogue-body]").innerHTML = `
      <div class="catalogue__side">${projectStamp(p)}
        <div class="postmark" aria-hidden="true">${postmark({ top: p.category, bottom: "First day of issue", mid: String(p.year), sub: `№ ${p.id}` })}</div>
      </div>
      <div>
        <p class="mono kicker">Catalogue entry · №${esc(p.id)}</p>
        <h3 id="cat-title">${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        <dl>
          <dt>Issued</dt><dd>${esc(p.year)}</dd>
          <dt>Face value</dt><dd>${esc(p.denomination)}</dd>
          <dt>Role</dt><dd>${esc(p.role)}</dd>
          <dt>Printed with</dt><dd>${p.stack.map(esc).join(" · ")}</dd>
          <dt>Outcome</dt><dd>${esc(p.outcome)}</dd>
          <dt>Perforation</dt><dd>12½, line perf</dd>
        </dl>
        <div class="catalogue__links">${p.links
          .map((l, i) => `<a class="btn ${i ? "btn--ghost" : ""}" href="${esc(l.url)}" target="_blank" rel="noopener" data-out="${esc(p.id)}-${esc(l.label)}">${esc(l.label)} ↗</a>`)
          .join("")}</div>
      </div>`;
    dialog.showModal();
    track("project", p.id + "-" + p.title);
  }
  $("[data-stamps]").addEventListener("click", (e) => {
    const b = e.target.closest("[data-project]");
    if (b) openProject(b.dataset.project);
  });
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close(); // backdrop
    const out = e.target.closest("[data-out]");
    if (out) track("link", out.dataset.out);
  });

  // Route
  $("[data-route]").innerHTML = P.route
    .map((r, i) => `<li class="route__stop reveal">
      <div class="postmark" style="--tilt:${i % 2 ? 9 : -11}deg" aria-hidden="true">${postmark({ top: r.place, bottom: P.city, mid: (r.when.match(/\d{4}/) || [""])[0], sub: r.when.includes("now") ? "IN TRANSIT" : "" })}</div>
      <div class="route__card"><p class="mono" style="margin:0;color:var(--ink-faint)">${esc(r.when)}</p>
        <h3>${esc(r.title)}</h3><p class="route__place">${esc(r.place)}</p><p>${esc(r.note)}</p></div>
    </li>`)
    .join("");

  // Customs
  $("[data-customs]").innerHTML = P.customs
    .map((c) => `<tr><td>${esc(c.item)}</td><td><span class="qty" aria-label="${c.qty} out of 5">${"●".repeat(c.qty)}<i>${"○".repeat(5 - c.qty)}</i></span></td></tr>`)
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
