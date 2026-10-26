/* ==========================================================================
   CONTENT — edit this file only. Everything on the site is generated from it.
   All values below are SAMPLE placeholders: replace them with your resume.
   ========================================================================== */
window.PORTFOLIO = {
  name: "Your Name",
  initials: "YN",
  role: "Software Engineer & Product Builder",
  city: "Bengaluru",
  country: "India",
  email: "you@example.com",
  resumeUrl: "assets/resume.pdf", // drop your PDF at this path
  links: [
    { label: "GitHub", url: "https://github.com/your-handle" },
    { label: "LinkedIn", url: "https://linkedin.com/in/your-handle" },
  ],

  // The letter that slides out of the envelope. Keep it short and personal.
  letter: [
    "Dear reader,",
    "Thanks for opening this. I build software that people actually enjoy using: fast interfaces, honest data, and systems that don't fall over at 2am.",
    "Inside you'll find my collection: each project is issued as a stamp, with its catalogue entry on the back. My route so far is mapped in postmarks, and my skills are declared at customs.",
    "If something here makes you curious, there's a postcard at the end, already addressed to me.",
  ],
  signoff: "Warmly,",

  // Each project becomes a postage stamp. `motif` picks the stamp artwork:
  // "sun" | "waves" | "grid" | "orbit" | "leaf" | "bolt"
  // `ink` picks the colourway: "red" | "blue" | "green" | "ochre" | "plum" | "teal"
  projects: [
    {
      id: "001",
      title: "Ledgerline",
      denomination: "₹25",
      year: 2025,
      category: "Fintech",
      motif: "grid",
      ink: "blue",
      role: "Lead developer",
      stack: ["React", "Node.js", "PostgreSQL"],
      summary: "A personal finance tracker that turns bank SMS alerts into a clean monthly ledger.",
      outcome: "1,200+ active users in the first three months; median entry time cut from 40s to 3s.",
      links: [{ label: "Live", url: "#" }, { label: "Code", url: "#" }],
    },
    {
      id: "002",
      title: "Monsoon",
      denomination: "₹10",
      year: 2025,
      category: "Data viz",
      motif: "waves",
      ink: "teal",
      role: "Solo project",
      stack: ["D3.js", "Python", "Pandas"],
      summary: "An interactive atlas of 50 years of Indian rainfall data, district by district.",
      outcome: "Featured in a university data-journalism course; 18k visits.",
      links: [{ label: "Live", url: "#" }],
    },
    {
      id: "003",
      title: "Campus Run",
      denomination: "₹5",
      year: 2024,
      category: "Mobile",
      motif: "bolt",
      ink: "red",
      role: "Frontend & design",
      stack: ["Flutter", "Firebase"],
      summary: "Food-delivery app for a college campus, run by students for students.",
      outcome: "Handled 400 orders/day at peak with a team of four.",
      links: [{ label: "Case study", url: "#" }],
    },
    {
      id: "004",
      title: "Sprout",
      denomination: "₹15",
      year: 2024,
      category: "ML",
      motif: "leaf",
      ink: "green",
      role: "ML engineer",
      stack: ["PyTorch", "FastAPI"],
      summary: "Plant-disease classifier that works offline on low-end Android phones.",
      outcome: "94% accuracy on 38 classes; model under 6 MB.",
      links: [{ label: "Paper", url: "#" }, { label: "Code", url: "#" }],
    },
    {
      id: "005",
      title: "Orbit",
      denomination: "₹50",
      year: 2023,
      category: "Dev tools",
      motif: "orbit",
      ink: "plum",
      role: "Creator",
      stack: ["TypeScript", "VS Code API"],
      summary: "A VS Code extension that visualises module dependencies as a live orbit map.",
      outcome: "3k installs, 120 GitHub stars.",
      links: [{ label: "Marketplace", url: "#" }],
    },
    {
      id: "006",
      title: "Daybreak",
      denomination: "₹2",
      year: 2023,
      category: "Web",
      motif: "sun",
      ink: "ochre",
      role: "Freelance",
      stack: ["Astro", "Tailwind"],
      summary: "Website and booking flow for a small yoga studio.",
      outcome: "Online bookings went from 0 to 60% of all sessions.",
      links: [{ label: "Live", url: "#" }],
    },
  ],

  // Experience, education, milestones: drawn as postmarks along a route.
  route: [
    { when: "2025 — now", place: "Acme Labs", title: "Software Engineer", note: "Payments platform. Shipped the new checkout used by 2M users." },
    { when: "2024", place: "Startup Co.", title: "SDE Intern", note: "Built internal analytics dashboards in React + Go." },
    { when: "2021 — 2025", place: "Your University", title: "B.Tech, Computer Science", note: "CGPA 8.9 · Coding club lead · 2 hackathon wins." },
  ],

  // Skills, declared at customs. `qty` is a 1–5 proficiency rating.
  customs: [
    { item: "JavaScript / TypeScript", qty: 5 },
    { item: "React · Next.js", qty: 5 },
    { item: "Node.js · Express", qty: 4 },
    { item: "Python · FastAPI", qty: 4 },
    { item: "SQL · PostgreSQL", qty: 4 },
    { item: "Figma · UI design", qty: 3 },
    { item: "Docker · CI/CD", qty: 3 },
  ],
  customsNote: "Also carrying: curiosity, clear writing, and a habit of leaving code better than I found it.",
};
