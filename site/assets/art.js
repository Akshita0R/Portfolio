/* ==========================================================================
   Line-art illustrations, drawn as SVG. Everything strokes in currentColor,
   and the shared #rough filter (in the page) gives the hand-drawn wobble.
   ========================================================================== */
window.Art = (() => {
  const svg = (vb, inner, label = "") =>
    `<svg viewBox="${vb}" class="art" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}><g filter="url(#rough)">${inner}</g></svg>`;
  const lines = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
  const hatch = (x, y, w, h, gap = 7) =>
    lines(Math.floor((w + h) / gap), (i) => {
      const d = i * gap;
      const x1 = x + Math.max(0, d - h), y1 = y + Math.min(h, d);
      const x2 = x + Math.min(w, d), y2 = y + Math.max(0, d - w);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-width="1" />`;
    });
  const person = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
      <circle cx="0" cy="-62" r="9" /><path d="M -9 -64 q -2 18 6 22 M 9 -64 q 2 18 -6 22" />
      <path d="M -8 -50 L -14 -10 L 14 -10 L 8 -50 Z" /><line x1="-6" y1="-10" x2="-7" y2="10" /><line x1="6" y1="-10" x2="7" y2="10" />
      <path d="M -11 12 h 6 M 5 12 h 6" /><path d="M -12 -30 l -4 16 M 12 -30 l 3 16" /></g>`;

  // The commuter on the platform: a back view, and a front view shown when the cursor comes close.
  const commuter = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" class="who">
      ${lines(7, (i) => `<line x1="${-16 + i * 5}" y1="6" x2="${-11 + i * 5}" y2="-2" stroke-width="1" />`)}
      <path d="M -12 -48 C -16 -30 -16 -18 -14 -6 L 14 -6 C 16 -18 16 -30 12 -48 Q 0 -54 -12 -48 Z" fill="var(--panel)" />
      <path d="M -9 -6 L -10 0 M 9 -6 L 10 0" /><path d="M -14 1 h 9 M 5 1 h 9" stroke-width="3" />
      <path d="M -12 -40 l -5 22 M 12 -40 l 5 22" />
      <g class="who__back"><circle cx="0" cy="-64" r="11" fill="currentColor" /><path d="M -11 -64 C -12 -52 -10 -46 -4 -44 L 4 -44 C 10 -46 12 -52 11 -64" fill="currentColor" /></g>
      <g class="who__front"><circle cx="0" cy="-64" r="11" fill="var(--panel)" /><path d="M -11 -62 C -12 -52 -10 -46 -6 -44 M 11 -62 C 12 -52 10 -46 6 -44 M -11 -64 Q -8 -78 0 -76 Q 9 -77 11 -64 Q 4 -70 -4 -68 Z" fill="currentColor" />
        <circle cx="-4" cy="-62" r="1.3" fill="currentColor" /><circle cx="4" cy="-62" r="1.3" fill="currentColor" /><path d="M -3 -57 q 3 2.5 6 0" stroke-width="1.4" /></g>
    </g>`;

  // Home panel: station platform with a "towards work" sign.
  const platform = () => svg("0 0 520 300", `
    <path d="M 0 40 L 520 40 M 0 52 L 520 52" />
    <rect x="70" y="52" width="46" height="200" /><path d="M 62 52 h 62 M 62 252 h 62" />
    ${hatch(70, 52, 46, 200, 12)}
    <rect x="190" y="70" width="150" height="34" rx="3" /><path d="M 240 52 v 18 M 290 52 v 18" />
    <text x="205" y="93" font-size="15" fill="currentColor" stroke="none" font-family="IBM Plex Mono, monospace">WORK  →</text>
    <rect x="300" y="78" width="28" height="18" rx="2" /><path d="M 306 87 h 16 M 316 82 l 6 5 -6 5" />
    <path d="M 0 252 L 520 252 M 0 262 L 520 262" />
    <path d="M 0 282 L 520 282" stroke-dasharray="14 10" />
    <path d="M 360 230 h 120 M 368 230 v 22 M 472 230 v 22 M 356 222 h 128" />
    ${commuter(268, 262, 1.25)}
    <rect x="330" y="140" width="56" height="22" rx="4" /><text x="336" y="155" font-size="9" fill="currentColor" stroke="none" font-family="IBM Plex Mono, monospace">next: 2m</text>
    <path d="M 150 252 l 0 -30 M 146 222 h 8" /><circle cx="150" cy="214" r="8" />
  `, "A metro platform with a sign pointing towards work");

  // Home panel: inside a metro coach. Each window is a project link.
  // Tiny icons shown inside the train windows (centred on 0,0, about 30px).
  const icons = {
    pharmacy: `<rect x="-14" y="-14" width="28" height="28" rx="5" /><path d="M -4 -9 h 8 v 5 h 5 v 8 h -5 v 5 h -8 v -5 h -5 v -8 h 5 Z" />`,
    dashboard: `<path d="M -16 12 H 16" /><rect x="-12" y="0" width="5" height="12" /><rect x="-3" y="-8" width="5" height="20" /><rect x="6" y="-14" width="5" height="26" />`,
    server: `<rect x="-12" y="-15" width="24" height="30" rx="3" /><path d="M -12 -5 H 12 M -12 5 H 12" /><circle cx="-6" cy="-10" r="1.6" fill="currentColor" /><circle cx="-6" cy="0" r="1.6" fill="currentColor" /><circle cx="-6" cy="10" r="1.6" fill="currentColor" />`,
    parking: `<rect x="-14" y="-14" width="28" height="28" rx="5" /><text x="0" y="8" text-anchor="middle" font-size="22" font-weight="700" fill="currentColor" stroke="none" font-family="Newsreader, Georgia, serif">P</text>`,
    funnel: `<path d="M -16 -12 H 16 L 4 2 V 14 H -4 V 2 Z" /><path d="M -10 -5 H 10" />`,
  };

  // Home panel: inside a metro coach. Each window is a project you can open.
  // `groups`: [{ label, items: [{ title, scene, href }] }], one carriage per group.
  const train = (groups) => {
    const ww = 190, wh = 124, wy = 76, gap = 28, edge = 40, gangway = 90;
    let x = edge;
    const parts = [], poles = [edge / 2];
    groups.forEach((g, gi) => {
      const start = x;
      g.items.forEach((w, i) => {
        const cx = x + ww / 2;
        parts.push(`<a href="${w.href}" class="art__link" aria-label="Go to ${w.title}">
          <rect x="${x}" y="${wy}" width="${ww}" height="${wh}" rx="12" fill="var(--panel)" />
          <rect x="${x + 8}" y="${wy + 8}" width="${ww - 16}" height="${wh - 16}" rx="8" />
          <g transform="translate(${cx} ${wy + 33})">${icons[w.scene] || ""}</g>
          <text x="${cx}" y="${wy + 74}" text-anchor="middle" font-size="17" fill="currentColor" stroke="none" font-family="Newsreader, Georgia, serif">${w.title}</text>
          <rect x="${cx - 30}" y="${wy + 86}" width="60" height="20" rx="10" />
          <text x="${cx}" y="${wy + 100}" text-anchor="middle" font-size="9.5" fill="currentColor" stroke="none" font-family="IBM Plex Mono, monospace" letter-spacing="1">VIEW ↓</text>
        </a>`);
        x += ww;
        if (i < g.items.length - 1) { poles.push(x + gap / 2); x += gap; }
      });
      const mid = (start + x) / 2, sw = 150;
      parts.push(`<path d="M ${mid - 40} 30 v 12 M ${mid + 40} 30 v 12" /><rect x="${mid - sw / 2}" y="42" width="${sw}" height="24" rx="3" fill="currentColor" />
        <text x="${mid}" y="59" text-anchor="middle" font-size="12" letter-spacing="3" fill="var(--panel)" stroke="none" font-family="IBM Plex Mono, monospace">${g.label} →</text>`);
      if (gi < groups.length - 1) {
        const gx = x + gangway / 2;
        parts.push(`<path d="M ${x + 14} 30 V 290 M ${x + gangway - 14} 30 V 290" stroke-width="3" />
          <path d="M ${x + 24} 60 ${lines(9, (k) => `L ${k % 2 ? gx + 14 : gx - 14} ${84 + k * 22}`)}" stroke-width="1.4" />`);
        x += gangway;
      } else poles.push(x + edge / 2);
    });
    const W = x + edge;
    return svg(`0 0 ${W} 300`, `
      <path d="M 0 20 H ${W} M 0 30 H ${W}" />
      ${poles.map((p) => `<path d="M ${p} 30 V 290" stroke-width="3" />`).join("")}
      ${parts.join("")}
      <path d="M 20 214 h ${W - 40} a 18 18 0 0 1 0 36 h -${W - 40} a 18 18 0 0 1 0 -36 Z" />
      ${lines(Math.floor(W / 100), (i) => `<path d="M ${80 + i * 100} 216 q 6 16 0 32" stroke-width="1.2" />`)}
      <path d="M 0 290 H ${W}" /><path d="M 0 266 H ${W}" stroke-dasharray="3 9" />
    `, "Inside the metro: a Projects carriage and a Work carriage; each window jumps to that item");
  };

  // Project scenes ----------------------------------------------------------
  const pharmacy = () => svg("0 0 600 400", `
    <path d="M 60 360 H 560" />
    <rect x="90" y="140" width="250" height="220" />
    <path d="M 80 140 h 270 l -14 -40 h -242 Z" />
    ${lines(6, (i) => `<path d="M ${94 + i * 42} 140 q 21 26 42 0" />`)}
    <rect x="182" y="40" width="66" height="66" rx="8" />
    <path d="M 205 52 h 20 v 18 h 18 v 20 h -18 v 18 h -20 v -18 h -18 v -20 h 18 Z" transform="translate(-3 -6) scale(1)" />
    <rect x="110" y="180" width="110" height="110" />
    ${lines(3, (i) => `<path d="M 110 ${215 + i * 26} h 110" />`)}
    ${lines(6, (i) => `<rect x="${118 + i * 16}" y="${196 + (i % 2) * 4}" width="10" height="${17 - (i % 2) * 4}" rx="2" /><rect x="${120 + i * 16}" y="${226}" width="8" height="15" rx="2" />`)}
    <rect x="250" y="220" width="70" height="140" /><circle cx="308" cy="292" r="3" fill="currentColor" />
    <path d="M 250 260 h 70" stroke-dasharray="4 4" />
    <rect x="410" y="120" width="120" height="220" rx="18" />
    <path d="M 450 134 h 40" />
    <rect x="426" y="158" width="88" height="22" rx="11" /><circle cx="440" cy="169" r="5" /><path d="M 444 173 l 4 4" />
    <path d="M 470 200 c -18 0 -28 14 -28 26 c 0 18 28 46 28 46 c 0 0 28 -28 28 -46 c 0 -12 -10 -26 -28 -26 Z" />
    <circle cx="470" cy="226" r="9" />
    <rect x="430" y="290" width="80" height="26" rx="13" />
    <path d="M 410 300 C 380 320 360 330 330 330" stroke-dasharray="6 7" />
    ${person(380, 360, 0.95)}
  `, "A pharmacy storefront and a phone showing a map pin");

  const dashboard = () => svg("0 0 600 400", `
    <path d="M 40 330 H 560" /><path d="M 70 330 v 50 M 530 330 v 50" />
    <rect x="130" y="60" width="320" height="210" rx="10" />
    <path d="M 270 270 l -10 40 h 60 l -10 -40 M 240 312 h 100" />
    <rect x="150" y="80" width="80" height="44" rx="4" /><text x="162" y="110" font-size="22" fill="currentColor" stroke="none" font-family="Newsreader, Georgia, serif">15+</text>
    <rect x="240" y="80" width="80" height="44" rx="4" /><text x="250" y="110" font-size="22" fill="currentColor" stroke="none" font-family="Newsreader, Georgia, serif">~40%</text>
    <rect x="330" y="80" width="100" height="44" rx="4" /><path d="M 340 112 l 16 -10 14 6 18 -14 16 4 12 -10" />
    ${lines(7, (i) => `<rect x="${160 + i * 26}" y="${250 - [40, 62, 50, 84, 70, 100, 92][i]}" width="16" height="${[40, 62, 50, 84, 70, 100, 92][i]}" />`)}
    <path d="M 160 250 H 430" />
    <path d="M 355 160 L 430 160 L 430 250 L 355 250 Z" stroke-dasharray="3 5" /><path d="M 362 230 Q 380 170 400 200 T 425 170" />
    <path d="M 470 290 h 36 v 34 a 8 8 0 0 1 -8 8 h -20 a 8 8 0 0 1 -8 -8 Z M 506 298 q 14 2 0 18" />
    <path d="M 480 280 q 6 -10 0 -18 M 494 280 q 6 -10 0 -18" />
    <path d="M 80 330 l 10 -40 h 30 l 10 40" /><path d="M 105 290 c -20 -30 -10 -50 0 -60 c 10 10 20 30 0 60 M 105 280 c -30 -10 -36 -30 -32 -40 M 105 280 c 26 -16 30 -30 28 -40" />
    <rect x="470" y="70" width="46" height="46" transform="rotate(8 493 93)" /><path d="M 478 88 h 28 M 478 98 h 20" transform="rotate(8 493 93)" />
  `, "A desk with a monitor full of KPI charts");

  const server = () => svg("0 0 600 400", `
    <path d="M 40 360 H 560" />
    ${lines(2, (r) => `<rect x="${90 + r * 120}" y="80" width="96" height="280" rx="6" />` + lines(6, (i) => `<rect x="${100 + r * 120}" y="${96 + i * 42}" width="76" height="30" rx="3" /><circle cx="${112 + r * 120}" cy="${111 + i * 42}" r="3" fill="currentColor" /><path d="M ${124 + r * 120} ${111 + i * 42} h 40" />`))}
    <rect x="370" y="90" width="150" height="96" rx="12" transform="rotate(-8 445 138)" />
    <g transform="rotate(-8 445 138)"><rect x="388" y="112" width="30" height="22" rx="3" /><path d="M 388 123 h 30 M 403 112 v 22" /><path d="M 388 160 h 60 M 460 160 h 30" /></g>
    <path d="M 400 220 h 100 v 120 h -100 Z" /><path d="M 470 220 v 26 h 30" />
    <text x="414" y="268" font-size="20" fill="currentColor" stroke="none" font-family="Newsreader, Georgia, serif">PRD</text>
    <path d="M 414 290 h 70 M 414 304 h 56 M 414 318 h 64" stroke-width="1.4" />
    <path d="M 310 150 C 340 130 350 130 368 140" stroke-dasharray="5 6" /><path d="M 362 132 l 8 8 -10 4" />
    <path d="M 330 300 C 350 300 370 290 398 280" stroke-dasharray="5 6" /><path d="M 388 274 l 10 6 -8 8" />
    <text x="330" y="60" font-size="16" fill="currentColor" stroke="none" font-family="IBM Plex Mono, monospace">-30% latency</text>
  `, "Server racks, a payment card and a PRD document");

  const parking = () => svg("0 0 600 400", `
    <rect x="50" y="60" width="380" height="290" rx="8" />
    <path d="M 50 205 H 430" stroke-dasharray="14 10" />
    ${lines(6, (i) => `<path d="M ${50 + i * 63} 60 v 70 M ${50 + i * 63} 350 v -70" />`)}
    ${[0, 2, 3, 5].map((i) => `<rect x="${64 + i * 63}" y="72" width="36" height="52" rx="10" /><path d="M ${70 + i * 63} 90 h 24 M ${70 + i * 63} 108 h 24" />`).join("")}
    ${[1, 2, 4].map((i) => `<rect x="${64 + i * 63}" y="288" width="36" height="52" rx="10" /><path d="M ${70 + i * 63} 306 h 24 M ${70 + i * 63} 324 h 24" />`).join("")}
    <path d="M 500 186 V 130" stroke-width="3" /><rect x="470" y="70" width="60" height="60" rx="8" />
    <text x="487" y="114" font-size="38" font-weight="700" fill="currentColor" stroke="none" font-family="Newsreader, Georgia, serif">P</text>
    <path d="M 270 150 c -16 0 -26 12 -26 24 c 0 16 26 42 26 42 c 0 0 26 -26 26 -42 c 0 -12 -10 -24 -26 -24 Z" /><circle cx="270" cy="174" r="8" />
    <rect x="450" y="190" width="110" height="80" rx="6" />
    ${lines(5, (i) => `<rect x="${462 + i * 19}" y="${258 - [20, 34, 48, 40, 54][i]}" width="11" height="${[20, 34, 48, 40, 54][i]}" />`)}
  `, "A parking lot seen from above, with a P sign and occupancy chart");

  const funnel = () => svg("0 0 600 400", `
    <path d="M 150 120 H 450 L 340 250 V 330 H 260 V 250 Z" />
    ${lines(3, (i) => `<path d="M ${175 + i * 30} ${150 + i * 32} H ${425 - i * 30}" />`)}
    ${hatch(268, 252, 64, 76, 10)}
    <path d="M 120 40 h 26 l 26 60 h 120 l 16 -40 h -150" /><circle cx="186" cy="112" r="8" /><circle cx="272" cy="112" r="8" />
    ${lines(4, (i) => `<rect x="${196 + i * 24}" y="${68 - (i % 2) * 8}" width="18" height="18" rx="3" transform="rotate(${i * 12 - 18} ${205 + i * 24} ${77})" />`)}
    <path d="M 470 180 c 20 10 30 30 20 50" stroke-dasharray="5 6" /><rect x="480" y="236" width="70" height="40" rx="6" />
    <text x="490" y="263" font-size="20" fill="currentColor" stroke="none" font-family="Newsreader, Georgia, serif">23%</text>
    <path d="M 60 360 H 540" />
    ${lines(5, (i) => `<rect x="${80 + i * 22}" y="${360 - [60, 48, 36, 26, 14][i]}" width="14" height="${[60, 48, 36, 26, 14][i]}" />`)}
  `, "A shopping cart dropping into a funnel, with a 23% drop-off label");

  // About + play + sidebar ------------------------------------------------------
  const station = () => svg("0 0 460 340", `
    <path d="M 20 320 H 440" />
    <path d="M 70 320 V 120 L 230 70 L 390 120 V 320" />
    <rect x="160" y="140" width="140" height="44" rx="4" /><text x="230" y="170" text-anchor="middle" font-size="22" fill="currentColor" stroke="none" font-family="Newsreader, Georgia, serif">ABOUT</text>
    <circle cx="230" cy="105" r="16" /><text x="230" y="111" text-anchor="middle" font-size="17" font-weight="700" fill="currentColor" stroke="none" font-family="Newsreader, Georgia, serif">M</text>
    <path d="M 170 320 V 210 h 120 V 320" />${lines(6, (i) => `<path d="M ${170} ${222 + i * 17} h 120" stroke-width="1.2" />`)}
    <path d="M 100 320 v -60 M 360 320 v -60" /><path d="M 90 260 h 20 M 350 260 h 20" />
    <path d="M 410 320 v -70 c -30 -10 -30 -60 0 -70 c 30 10 30 60 0 70" />
    ${person(130, 320, 0.9)}
  `, "A metro station entrance with an ABOUT sign");

  const construction = () => svg("0 0 420 260", `
    <path d="M 40 240 H 380" />
    <path d="M 70 240 V 60 M 350 240 V 60" stroke-width="4" />
    <rect x="130" y="20" width="160" height="34" rx="4" /><text x="210" y="43" text-anchor="middle" font-size="15" fill="currentColor" stroke="none" font-family="IBM Plex Mono, monospace">STOP: PLAY</text>
    <path d="M 210 54 v 14" />
    <g transform="rotate(-8 210 120)"><rect x="50" y="100" width="320" height="36" />${lines(12, (i) => `<path d="M ${60 + i * 27} 136 l 18 -36" stroke-width="5" />`)}</g>
    <g transform="rotate(10 210 180)"><rect x="50" y="166" width="320" height="30" />${lines(12, (i) => `<path d="M ${60 + i * 27} 196 l 15 -30" stroke-width="5" />`)}</g>
    ${person(110, 240, 0.9)}
  `, "Under construction tape across a station gate");

  const miniTrain = () => svg("0 0 200 70", `
    <path d="M 10 56 H 190" /><path d="M 18 50 V 18 a 8 8 0 0 1 8 -8 H 160 q 26 0 30 30 v 10 Z" />
    ${lines(4, (i) => `<rect x="${28 + i * 30}" y="18" width="20" height="14" rx="2" />`)}
    <path d="M 160 18 q 18 2 22 18 h -22 Z" /><circle cx="50" cy="56" r="5" /><circle cx="140" cy="56" r="5" />
    <path d="M 0 64 H 200" stroke-dasharray="4 6" />
  `);

  const avatar = (initials) => svg("0 0 60 60", `
    <circle cx="30" cy="30" r="27" />
    <text x="30" y="37" text-anchor="middle" font-size="19" fill="currentColor" stroke="none" font-family="Newsreader, Georgia, serif">${initials}</text>
  `);

  const scenes = { pharmacy, dashboard, server, parking, funnel };
  return { platform, train, station, construction, miniTrain, avatar, scene: (k) => (scenes[k] || dashboard)() };
})();
