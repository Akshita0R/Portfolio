/* ==========================================================================
   CONTENT — edit this file only. Everything on the site is generated from it.
   ========================================================================== */
window.PORTFOLIO = {
  name: "Akshita R",
  initials: "AR",
  role: "Data Analyst → Associate Product Manager",
  city: "Bengaluru",
  country: "India",
  email: "akshitar2003@gmail.com",
  resumeUrl: "assets/resume.pdf",
  links: [
    { label: "GitHub", url: "https://github.com/Akshita0R" },
    { label: "LinkedIn", url: "https://linkedin.com/in/akshita-r" },
    { label: "MedNear (live)", url: "https://mednearproduct.netlify.app" },
  ],

  // The letter that slides out of the envelope.
  letter: [
    "Dear reader,",
    "I'm Akshita, a Data Analyst with 1.5+ years in enterprise SaaS and, before that, backend engineering in a fintech product team. Now I'm moving into product management, and this envelope is my case for it.",
    "I like problems where the numbers and the people disagree. At CSG I defined 15+ product KPIs and found a 20% funnel drop-off that changed three product decisions. On my own, I took MedNear from a user survey to a live app, then ran a 129-case AI evaluation that told me what not to launch.",
    "Inside, each project is issued as a stamp with its full story on the back. My route is mapped in postmarks, and my skills are declared at customs.",
    "If any of it sparks a conversation, there's a postcard at the end, already addressed to me.",
  ],
  signoff: "Warmly,",

  // Big numbers shown on the postage-meter strip.
  meter: [
    { value: "15+", label: "Product KPIs defined" },
    { value: "~40%", label: "Less manual reporting time" },
    { value: "20%", label: "Funnel drop-off uncovered" },
    { value: "129", label: "Case AI evaluation set" },
    { value: "₹50K", label: "Grant won, patent filed" },
  ],

  // Projects become stamps; the first `featured: true` one gets the big "special issue" spot.
  // motif: "pill" | "funnel" | "pin" | "grid" | "bolt" | "sun" | "waves" | "orbit" | "leaf"
  // ink:   "red" | "blue" | "green" | "ochre" | "plum" | "teal"
  projects: [
    {
      id: "mednear",
      featured: true,
      title: "MedNear",
      tagline: "An AI-assisted medicine-availability app, taken from 0 → 1.",
      denomination: "₹1",
      year: 2026,
      category: "AI Product · 0→1",
      motif: "pill",
      ink: "teal",
      role: "Solo product builder (PM, design, build, evaluation)",
      timeline: "2026",
      stack: ["PRD", "User research", "Supabase (PostgreSQL)", "Gemini API", "CI evaluation"],
      summary: "People waste trips to pharmacies that turn out to be out of stock. MedNear lets them search for a medicine and see which nearby pharmacy actually has it, confirmed by the crowd.",
      outcome: "Launched medicine lookup; held back AI triage after evaluation showed it caught only 20% of emergencies on a blind set.",
      highlights: [
        { value: "30% → 0%", label: "Closed / out-of-stock suggestions" },
        { value: "2 → 1", label: "Taps to directions" },
        { value: "129", label: "Test cases, scored automatically" },
      ],
      links: [{ label: "Live app", url: "https://mednearproduct.netlify.app" }],
      case: [
        { h: "The problem", p: ["Patients and caregivers make costly, wasted trips to pharmacies that turn out to be out of stock, often when they need a medicine urgently.", "I wanted a product that answers one question well: “where should I go now?”"] },
        { h: "Discovery", list: ["Ran a user survey and built personas from the responses.", "Wrote a PRD with user stories, MVP scope and a single success metric: stock accuracy, target 80%."] },
        { h: "Build", list: ["Shipped a working web app using AI-assisted development.", "Medicine search, a pharmacy portal and a metrics dashboard.", "Sign-up, a PostgreSQL (Supabase) backend and crowdsourced stock confirmations."] },
        { h: "Design decision: rank for “where should I go now?”", p: ["Early results surfaced pharmacies that were closed or out of stock. I redesigned the ranking around that one user question."], stats: [{ value: "30% → 0%", label: "Closed/out-of-stock suggestions in test searches" }, { value: "2 → 1", label: "Taps from result to directions" }] },
        { h: "AI evaluation", p: ["Before testing, I set launch bars: ≥95% of emergencies caught and ≥90% lookup accuracy. Then I built a 129-case test set with an automated scorer covering brand names, salts, typos, Hindi, Kannada and emergency queries."], stats: [{ value: "≥95%", label: "Bar: emergencies caught" }, { value: "≥90%", label: "Bar: lookup accuracy" }, { value: "129", label: "Test cases" }] },
        { h: "The go / no-go call", p: ["Rules scored 100% on known cases but caught only 20% of emergencies on a blind set, far below the bar.", "So I launched medicine lookup, blocked AI triage, and routed emergencies to an urgent-help fallback. The evaluation now runs in CI, so the bar is checked on every change."] },
        { h: "What it shows", list: ["Starting from a user problem, not a feature.", "Writing the success metric and launch criteria before building.", "Being willing to not ship the AI part when the evidence says no."] },
      ],
    },
    {
      id: "ecommerce-funnel",
      title: "Funnel Analytics",
      tagline: "Finding where shoppers drop off between cart and checkout.",
      denomination: "₹23",
      year: 2023,
      category: "E-commerce",
      motif: "funnel",
      ink: "red",
      role: "Analyst",
      timeline: "2023",
      stack: ["MySQL", "Power BI", "AWS"],
      summary: "SQL funnel analysis on e-commerce data to find where shoppers abandon their purchase.",
      outcome: "Found a 23% cart-to-checkout drop-off; built 5+ Power BI cohort dashboards.",
      highlights: [{ value: "23%", label: "Cart → checkout drop-off found" }, { value: "5+", label: "Cohort dashboards" }],
      links: [{ label: "GitHub", url: "https://github.com/Akshita0R" }],
      case: [
        { h: "Question", p: ["Where in the purchase funnel are shoppers leaving, and which cohorts leave most?"] },
        { h: "Approach", list: ["Modelled the funnel steps in SQL (MySQL) on AWS.", "Built 5+ cohort dashboards in Power BI to compare segments over time."] },
        { h: "Finding", stats: [{ value: "23%", label: "Drop-off between cart and checkout" }] },
      ],
    },
    {
      id: "urban-parking",
      title: "Urban Parking",
      tagline: "Real-time parking-occupancy analytics for cities.",
      denomination: "₹50K",
      year: 2024,
      category: "Smart city · Data",
      motif: "pin",
      ink: "blue",
      role: "Team member: data pipeline & metrics",
      timeline: "2023 – 2024",
      stack: ["Python", "MongoDB", "AWS"],
      summary: "A real-time pipeline that tracks parking occupancy and turns it into a handful of core metrics.",
      outcome: "Won a ₹50,000 grant; Srishti 2024 and Smart Argothon 2023 finalist; patent filed.",
      highlights: [{ value: "₹50K", label: "Grant won" }, { value: "2×", label: "Hackathon finalist" }, { value: "Patent", label: "Filed" }],
      links: [{ label: "GitHub", url: "https://github.com/Akshita0R" }],
      case: [
        { h: "What it is", p: ["A real-time parking-occupancy pipeline with a defined set of core metrics, built in Python on MongoDB and AWS."] },
        { h: "Recognition", list: ["₹50,000 grant.", "Finalist at Srishti 2024 and Smart Argothon 2023.", "Patent filed."] },
      ],
    },
    {
      id: "kpi-dashboards",
      title: "KPI Dashboards",
      tagline: "15+ product KPIs across 10+ Power BI dashboards at CSG.",
      denomination: "₹15",
      year: 2025,
      category: "Product metrics · Work",
      motif: "grid",
      ink: "plum",
      role: "Data Analyst, Product & Analytics (CSG Systems International)",
      timeline: "Feb 2025 – present",
      stack: ["Power BI", "SQL", "Microsoft Fabric"],
      summary: "Defined and tracked product KPIs with Product and Engineering, and set data-quality standards for the reporting pipeline.",
      outcome: "~40% less manual reporting time; 25% less rework across a 6-person pipeline.",
      highlights: [{ value: "15+", label: "KPIs defined" }, { value: "~40%", label: "Manual reporting time cut" }, { value: "25%", label: "Less rework" }],
      links: [],
      case: [
        { h: "Product metrics & dashboards", list: ["Defined and tracked 15+ product KPIs with Product and Engineering across 10+ Power BI dashboards, cutting manual reporting time by ~40%.", "Set SQL and data-quality standards adopted across a 6-person reporting pipeline, cutting rework by 25% and raising trust in product metrics."] },
        { h: "Funnel analysis & product decisions", list: ["Ran funnel analysis across 5+ reporting workflows and uncovered a 20% drop-off pattern that informed 3 product changes agreed with cross-functional stakeholders.", "Presented data-backed recommendations to Product and Leadership, shaping prioritisation across 10+ sprints."] },
      ],
    },
    {
      id: "fintech-backend",
      title: "Product Backend",
      tagline: "From user-behaviour data to sprint priorities at Volopay.",
      denomination: "₹30",
      year: 2024,
      category: "Fintech · Work",
      motif: "bolt",
      ink: "ochre",
      role: "Backend Engineer, Product Team (Volopay)",
      timeline: "Apr 2024 – Feb 2025",
      stack: ["SQL", "Backend engineering", "PRDs"],
      summary: "Worked alongside Product Managers, turning user-behaviour data into priorities and specs.",
      outcome: "Product-analytics pipeline latency cut by 30%.",
      highlights: [{ value: "30%", label: "Pipeline latency cut" }, { value: "5+", label: "PRDs reviewed" }, { value: "10+", label: "Sprints" }],
      links: [],
      case: [
        { h: "What I did", list: ["Translated user-behaviour data into sprint priorities and feature specs with Product Managers across 10+ sprints.", "Gave technical input on requirements for 5+ PRDs, weighing feasibility and trade-offs against product goals.", "Optimised the SQL queries behind product analytics, cutting pipeline latency by 30%."] },
      ],
    },
  ],

  // Experience & education, drawn as postmarks along a route (latest first).
  route: [
    { when: "Feb 2025 — now", place: "CSG Systems", title: "Data Analyst, Product & Analytics", note: "CSG Systems International · Bengaluru", points: ["15+ product KPIs across 10+ Power BI dashboards; ~40% less manual reporting.", "Found a 20% funnel drop-off that informed 3 product changes.", "Recommendations to Product & Leadership across 10+ sprints."] },
    { when: "Apr 2024 — Feb 2025", place: "Volopay", title: "Backend Engineer, Product Team", note: "Volopay · Bengaluru", points: ["User-behaviour data → sprint priorities with PMs.", "Technical input on 5+ PRDs.", "Product-analytics pipeline latency cut by 30%."] },
    { when: "2021 — 2025", place: "CMR Institute", title: "B.E. Computer Science", note: "CMR Institute of Technology · CGPA 8.78/10", points: [] },
  ],

  honours: ["Merit Scholarship", "Best Mini-Project (Sem 1–5)", "President, Rise Club", "5th, WIE Competition", "₹50K grant", "Srishti 2024 finalist", "Smart Argothon 2023 finalist", "Patent filed"],

  // Skills, declared at customs.
  customs: [
    { category: "Product", items: "User Research · PRD Writing · MVP Scoping · RICE · KPIs · Funnel Analysis · Agile/Scrum" },
    { category: "AI Product", items: "AI Evaluation · Launch Criteria · Human-in-the-Loop Design · Gemini API" },
    { category: "Technical", items: "SQL (MySQL, SQL Server, PostgreSQL) · BigQuery · Python (Pandas, Matplotlib) · Supabase" },
    { category: "Tools", items: "Power BI · Microsoft Fabric · Excel · Jira · Confluence" },
  ],
  customsNote: "Also carrying: a habit of writing the success metric before the first line of code.",
};
