/* ==========================================================================
   Sidebar + metro-line menu, shared by index.html and case.html.
   ========================================================================== */
window.Shell = (() => {
  const P = window.PORTFOLIO;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const STOPS = ["home", "projects", "work", "about", "play"];

  function render({ base = "", current = null } = {}) {
    document.querySelector("[data-side]").innerHTML = `
      <a class="side__avatar" href="${base}#home" aria-label="Home">${Art.avatar(P.name.split(" ").map((w) => w[0]).join(""))}</a>
      <p class="side__name"><a href="${base}#home">${esc(P.first)}<br>${esc(P.last)}</a></p>
      <p class="side__quote">${esc(P.quote)}</p>
      <dl class="side__meta">
        ${[P.now, P.prev, P.next].map((m) => `<div><dt>${esc(m.label)}</dt><dd>${esc(m.text)}</dd></div>`).join("")}
      </dl>
      <div class="side__foot">
        <div class="side__train">${Art.walker()}</div>
        <button class="btn" type="button" data-recruiter aria-pressed="false">Recruiter mode</button>
        <a class="side__pdf" href="${esc(P.resumeUrl)}" target="_blank" rel="noopener" data-resume>Résumé PDF ↗</a>
      </div>`;
    document.querySelector("[data-metro]").innerHTML = `
      <nav class="metro__line" aria-label="Sections">
        <span class="metro__fill" data-fill></span>
        ${STOPS.map((s) => `<a class="metro__stop" href="${base}#${s}" data-stop-link="${s}"><span class="metro__dot"></span><span class="metro__label">${s}</span></a>`).join("")}
      </nav>`;
    document.querySelector("[data-resume]").addEventListener("click", () => window.track && window.track("resume", "download"));
    if (current) setCurrent(current);
  }

  function setCurrent(stop) {
    const i = STOPS.indexOf(stop);
    document.querySelectorAll("[data-stop-link]").forEach((a, j) => {
      a.classList.toggle("is-current", j === i);
      a.classList.toggle("is-passed", j < i);
      if (j === i) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
    const fill = document.querySelector("[data-fill]");
    if (fill) fill.style.width = `${(Math.max(i, 0) / (STOPS.length - 1)) * 100}%`;
  }

  return { render, setCurrent, esc, STOPS };
})();
