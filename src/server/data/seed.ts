/**
 * PLACEHOLDER CONTENT. Every name, number and story here is a stand-in
 * and must be replaced with verified content before launch (brief §11).
 *
 * Used by `npm run db:seed` and as a read-only fallback when Supabase isn't configured.
 */
import type { ContentKey, ContentMap } from "@/shared/types";

type Seed = { [K in ContentKey]: ContentMap[K][] };

const withIds = <T extends object>(prefix: string, rows: T[]) =>
  rows.map((row, i) => ({ id: `${prefix}-${i + 1}`, ...row }));

export const seed: Seed = {
  stats: withIds("stat", [
    { label: "Funding deployed", value: 30, prefix: "₹", suffix: "L", sort: 1 },
    { label: "Startups incubated", value: 15, prefix: "", suffix: "+", sort: 2 },
    { label: "Events held", value: 40, prefix: "", suffix: "+", sort: 3 },
    { label: "Students involved", value: 1200, prefix: "", suffix: "+", sort: 4 },
  ]),

  marquee_items: withIds("mq", [
    "₹30L funded", "15+ startups", "Built at KNIT", "Mentors on call", "Apply now", "जुगाड़ से जीनियस तक",
  ].map((text, i) => ({ text, sort: i }))),

  programs: withIds("prog", [
    {
      title: "Seed Grants",
      blurb: "Seed grants so you can stop asking your parents for money. Up to ₹5L for a working prototype.",
      eligibility: "KNIT students and alumni (within 3 years of graduating) with a prototype or a solid validation story.",
      how_to: "Apply through the site → screening call → pitch to the panel → paperwork → money.",
      color: "sun" as const,
      sort: 1,
    },
    {
      title: "Mentorship",
      blurb: "Founders, alumni and faculty who've been there. Weekly office hours, zero judgement.",
      eligibility: "Anyone with an idea. Literally anyone.",
      how_to: "Book a slot from the office-hours sheet after your first chat with the committee.",
      color: "pink" as const,
      sort: 2,
    },
    {
      title: "Workspace",
      blurb: "Desks, Wi-Fi that actually works, a whiteboard wall and a never-empty chai kettle.",
      eligibility: "Incubated teams get dedicated desks. Pre-incubation teams get hot desks.",
      how_to: "Ask the committee for a desk once your application is in.",
      color: "blue" as const,
      sort: 3,
    },
    {
      title: "Legal & IP",
      blurb: "Company registration, founder agreements and patents, minus the headache.",
      eligibility: "Incubated startups.",
      how_to: "Raise a request with your IISF point of contact.",
      color: "lilac" as const,
      sort: 4,
    },
    {
      title: "Workshops",
      blurb: "Pitching, product, growth and fundraising sessions run by people who actually ship.",
      eligibility: "Open to all KNIT students.",
      how_to: "Watch the Events page and register.",
      color: "lime" as const,
      sort: 5,
    },
  ]),

  startups: withIds("su", [
    {
      slug: "kisankart", name: "KisanKart", tagline: "Farm-to-mandi logistics for Sultanpur's farmers.",
      sector: "AgriTech", stage: "Revenue" as const, team_size: 6, funding: "₹5L", founded: 2023,
      problem: "Small farmers lose up to a third of their margin to middlemen and transport delays.",
      solution: "A WhatsApp-first booking system that pools transport across villages and gets live mandi prices.",
      founders: ["Aarav Mishra | CEO", "Neha Yadav | Ops"], milestones: ["Aug 2023 | Idea at IISF bootcamp", "Jan 2024 | ₹2L seed grant", "Jun 2025 | 500 farmers onboarded"],
      featured: true, sort: 1,
    },
    {
      slug: "padhai-pal", name: "PadhaiPal", tagline: "Hinglish doubt-solving for Hindi-medium engineering students.",
      sector: "EdTech", stage: "Seed" as const, team_size: 4, funding: "₹3L", founded: 2024,
      problem: "Hindi-medium students struggle with English-heavy engineering material.",
      solution: "Short video explanations and peer doubt rooms in Hinglish, mapped to the AKTU syllabus.",
      founders: ["Riya Singh | CEO", "Kunal Verma | CTO"], milestones: ["Feb 2024 | Won IISF Pitch Day", "Sep 2024 | 2,000 learners"],
      featured: true, sort: 2,
    },
    {
      slug: "nabz", name: "Nabz", tagline: "₹999 pulse oximeter + app for rural PHCs.",
      sector: "HealthTech", stage: "Prototype" as const, team_size: 3, funding: "₹1.5L", founded: 2025,
      problem: "Rural health centres lack affordable, connected vitals monitoring.",
      solution: "A low-cost device that syncs readings to a simple dashboard for ASHA workers.",
      founders: ["Ishaan Gupta | Hardware", "Fatima Khan | Product"], milestones: ["Mar 2025 | First prototype", "Aug 2025 | Pilot at 2 PHCs"],
      featured: true, sort: 3,
    },
    {
      slug: "solar-saathi", name: "SolarSaathi", tagline: "Pay-as-you-go solar for small shops.",
      sector: "CleanTech", stage: "Seed" as const, team_size: 5, funding: "₹4L", founded: 2024,
      problem: "Power cuts kill small-shop sales, and solar is too expensive upfront.",
      solution: "Rent-to-own solar kits with UPI micro-payments.",
      founders: ["Dev Tripathi | CEO"], milestones: ["Oct 2024 | 20 shops powered"],
      featured: true, sort: 4,
    },
    {
      slug: "hisaab", name: "Hisaab", tagline: "Voice-based bookkeeping for kirana stores.",
      sector: "FinTech", stage: "Idea" as const, team_size: 2, funding: "—", founded: 2026,
      problem: "Kirana owners still track credit in notebooks.",
      solution: "Speak the entry in Hindi and the app logs it, then sends reminders on WhatsApp.",
      founders: ["Ananya Pandey | Founder", "Rohit Maurya | Dev"], milestones: ["Feb 2026 | Joined pre-incubation"],
      featured: true, sort: 5,
    },
    {
      slug: "circuit-kaksha", name: "CircuitKaksha", tagline: "Remote electronics labs over the browser.",
      sector: "DeepTech", stage: "Prototype" as const, team_size: 4, funding: "₹2L", founded: 2025,
      problem: "Most colleges can't afford enough lab hardware for every student.",
      solution: "Real circuits you control from a browser, shared across colleges.",
      founders: ["Sneha Rai | CEO", "Arjun Patel | Embedded"], milestones: ["Jan 2026 | Live with 3 labs"],
      featured: false, sort: 6,
    },
  ].map((s) => ({ logo_url: null, cover_url: null, website: null, instagram: null, linkedin: null, ...s }))),

  events: withIds("ev", [
    {
      slug: "hack-sultanpur-2026", title: "Hack Sultanpur 2026", kind: "Hackathon" as const,
      starts_at: "2026-11-21T09:00:00+05:30", venue: "Central Library, KNIT", status: "upcoming" as const,
      summary: "36 hours, unlimited chai, ₹1L in prizes.",
      description: "Build anything that solves a real problem for Tier-2 India. Teams of 2–4. Mentors on the floor all night.",
      register_url: "https://unstop.com", gallery: [],
    },
    {
      slug: "pitch-day-winter", title: "Pitch Day: Winter Edition", kind: "Pitch Day" as const,
      starts_at: "2026-12-12T11:00:00+05:30", venue: "Seminar Hall, Admin Block", status: "upcoming" as const,
      summary: "5 minutes, 1 slide deck, real seed money on the table.",
      description: "Shortlisted teams pitch to the IISF panel. Winners get seed grants and a desk in the incubation centre.",
      register_url: "https://forms.gle", gallery: [],
    },
    {
      slug: "founder-bootcamp-2026", title: "Founder Bootcamp", kind: "Bootcamp" as const,
      starts_at: "2026-08-30T10:00:00+05:30", venue: "IISF Incubation Centre", status: "done" as const,
      summary: "Two days from idea to MVP plan.",
      description: "Customer interviews, lean canvases and a lot of sticky notes.",
      register_url: null, gallery: [" | Customer interview drills", " | Lean canvas wall", " | Day 2 demo hour"],
    },
    {
      slug: "ideathon-2026", title: "Ideathon 2026", kind: "Workshop" as const,
      starts_at: "2026-03-14T10:00:00+05:30", venue: "Auditorium", status: "done" as const,
      summary: "200 ideas, 1 afternoon.",
      description: "First-years pitched their wildest ideas in 60 seconds each.",
      register_url: null, gallery: [" | 60-second pitches", " | The winning team"],
    },
  ].map((e) => ({ cover_url: null, ...e }))),

  team_members: withIds("tm", [
    { name: "Dr. A. K. Srivastava", year: "faculty" as const, role: "Faculty Coordinator", branch: "Mechanical Engg.", fun_fact: "Signs every grant letter with a fountain pen." },
    { name: "Dr. P. Shukla", year: "faculty" as const, role: "Faculty Co-coordinator", branch: "Computer Science", fun_fact: "Has mentored 12 startups and counting." },
    { name: "Aditi Sharma", year: "final" as const, role: "President", branch: "CSE", fun_fact: "Has pitched in front of 400 people and still hates phone calls." },
    { name: "Rahul Yadav", year: "final" as const, role: "Vice President", branch: "ECE", fun_fact: "Runs on 4 cups of chai a day." },
    { name: "Simran Kaur", year: "final" as const, role: "Head of Events", branch: "IT", fun_fact: "Planned a hackathon in 9 days. Never again." },
    { name: "Vivek Tiwari", year: "third" as const, role: "Design Lead", branch: "CSE", fun_fact: "Owns 37 sticker packs." },
    { name: "Pooja Verma", year: "third" as const, role: "Content Lead", branch: "Civil", fun_fact: "Writes every caption in under 3 minutes." },
    { name: "Mohit Singh", year: "third" as const, role: "Tech Lead", branch: "CSE", fun_fact: "Built this site's first draft in a weekend." },
    { name: "Sana Ali", year: "second" as const, role: "Outreach", branch: "EE", fun_fact: "Knows every canteen worker by name." },
    { name: "Karan Dubey", year: "second" as const, role: "Events", branch: "ME", fun_fact: "Can set up 50 chairs in 4 minutes." },
    { name: "Nidhi Mishra", year: "second" as const, role: "Design", branch: "IT", fun_fact: "Draws doodles in every lecture. Including this one." },
  ].map((m, i) => ({ photo_url: null, linkedin: "https://linkedin.com", instagram: "https://instagram.com", sort: i, ...m }))),

  faqs: withIds("faq", [
    { question: "I only have an idea. Can I still apply?", answer: "Yes! Half our startups started as a 2am shower thought. Apply and we'll help you shape it.", sort: 1 },
    { question: "Do I need a team?", answer: "Nope. Solo founders are welcome, and we can introduce you to co-founders.", sort: 2 },
    { question: "Does IISF take equity?", answer: "Seed grants are equity-free. Check the Resources page for the official policy.", sort: 3 },
    { question: "I'm in first year. Too early?", answer: "Never too early. Come to events, hang around the centre and pitch when you're ready.", sort: 4 },
    { question: "How long does screening take?", answer: "Usually 2–3 weeks from submission to a pitch slot.", sort: 5 },
  ]),

  testimonials: withIds("tst", [
    { quote: "We walked in with a notebook sketch. Six months later we had paying farmers. IISF picked up every 2am call.", name: "Aarav Mishra", startup: "KisanKart", sort: 1 },
    { quote: "The mentorship hit different. Real founders telling us our idea was bad, then helping us fix it.", name: "Riya Singh", startup: "PadhaiPal", sort: 2 },
    { quote: "Seed grant + a desk + people who believed in a hardware startup from Sultanpur. That's rare.", name: "Ishaan Gupta", startup: "Nabz", sort: 3 },
  ]),

  resources: withIds("res", [
    { title: "IISF Startup Policy 2025", category: "Policy" as const, published_on: "2025-07-01", file_url: "#" },
    { title: "Annual Report 2024–25", category: "Report" as const, published_on: "2025-06-15", file_url: "#" },
    { title: "Seed Grant Guidelines", category: "Policy" as const, published_on: "2025-04-10", file_url: "#" },
    { title: "Notice: Pitch Day Winter Shortlist", category: "Notice" as const, published_on: "2026-10-20", file_url: "#" },
    { title: "Incubation Agreement Template", category: "Form" as const, published_on: "2025-01-05", file_url: "#" },
  ]),
};
