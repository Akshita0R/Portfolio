/* ==========================================================================
   Stamp, postmark and motif drawing, shared by index.html and case.html.
   ========================================================================== */
window.Stamps = (() => {
  (window.PORTFOLIO?.projects || []).forEach((p, i) => (p.no ??= String(i + 1).padStart(3, "0")));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
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
      pill: () =>
        `<g transform="rotate(-35 50 52)"><rect x="18" y="38" width="64" height="28" rx="14" stroke-width="1.8" /><path d="M 50 38 h -18 a 14 14 0 0 0 0 28 h 18 Z" fill="${H}" /><line x1="50" y1="38" x2="50" y2="66" stroke-width="1.6" /></g>` +
        `<path d="M 74 70 h 8 v -8 h 6 v 8 h 8 v 6 h -8 v 8 h -6 v -8 h -8 Z" fill="currentColor" stroke="none" /><circle cx="22" cy="20" r="3" fill="currentColor" /><circle cx="84" cy="22" r="2" fill="currentColor" />`,
      funnel: () => {
        const rows = [[10, 90], [22, 78], [33, 67], [42, 58]];
        let r = "";
        rows.forEach(([a, b], i) => (r += `<path d="M ${a} ${16 + i * 16} L ${b} ${16 + i * 16} L ${b - 5} ${28 + i * 16} L ${a + 5} ${28 + i * 16} Z" fill="${i === 1 ? H : "none"}" stroke-width="1.6" />`));
        return r + `<line x1="50" y1="80" x2="50" y2="94" stroke-width="2" /><circle cx="50" cy="96" r="2.5" fill="currentColor" />`;
      },
      pin: () => {
        let streets = "";
        for (let i = 0; i < 5; i++) streets += `<line x1="6" y1="${60 + i * 9}" x2="94" y2="${54 + i * 9}" stroke-dasharray="${i % 2 ? "3 3" : "0"}" />`;
        return `${streets}<path d="M 50 74 C 30 50 28 42 28 34 a 22 22 0 0 1 44 0 c 0 8 -2 16 -22 40 Z" fill="${H}" stroke-width="1.8" /><circle cx="50" cy="34" r="9" fill="#fdfaf2" stroke-width="1.6" /><text x="50" y="38.5" text-anchor="middle" font-size="12" font-weight="800" fill="currentColor" stroke="none">P</text>`;
      },
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
    stamp({ ink: p.ink, denom: p.denomination, small: p.year, art: motif(p.motif), name: p.title, sub: `${p.category} · №${p.no}` });


  const now = new Date();
  const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const todayShort = `${String(now.getDate()).padStart(2, "0")} ${MONTHS[now.getMonth()]}`;
  return { esc, postmark, cancellation, motif, stamp, projectStamp, now, todayShort, todayLong: `${todayShort} ${now.getFullYear()}` };
})();
