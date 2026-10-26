/** Site-wide constants: navigation, contact details and socials. */

export const SITE = {
  name: "IISF KNIT Sultanpur",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description: "The incubation centre of KNIT Sultanpur. Seed grants, mentors and a desk for student founders. Got an idea? Apply.",
  email: "iisf@knit.ac.in",
  phone: "+91 5362 240454",
  address: "IISF Incubation Centre, Kamla Nehru Institute of Technology, Sultanpur, Uttar Pradesh 228118",
  mapEmbed: "https://www.google.com/maps?q=Kamla+Nehru+Institute+of+Technology+Sultanpur&output=embed",
  socials: [
    { name: "instagram", label: "Instagram", href: "https://instagram.com" },
    { name: "linkedin", label: "LinkedIn", href: "https://linkedin.com" },
    { name: "youtube", label: "YouTube", href: "https://youtube.com" },
  ],
} as const;

export const NAV = [
  { href: "/about", label: "About" },
  { href: "/startups", label: "Startups" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
] as const;

export const FOOTER_NAV = [...NAV, { href: "/apply", label: "Apply" }, { href: "/resources", label: "Documents" }, { href: "/contact", label: "Contact" }] as const;
