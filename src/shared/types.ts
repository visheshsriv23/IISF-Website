/** Domain types shared by the frontend and backend. Mirrors supabase/migrations. */

export type Accent = "lime" | "pink" | "sun" | "blue" | "lilac";

export type Startup = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  sector: string;
  stage: "Idea" | "Prototype" | "Seed" | "Revenue";
  team_size: number;
  funding: string;
  founded: number;
  logo_url: string | null;
  cover_url: string | null;
  problem: string;
  solution: string;
  /** "Name | Role" per entry */
  founders: string[];
  /** "Mar 2025 | Won pitch day" per entry */
  milestones: string[];
  website: string | null;
  instagram: string | null;
  linkedin: string | null;
  featured: boolean;
  sort: number;
};

export type EventStatus = "upcoming" | "closed" | "done";

export type IISFEvent = {
  id: string;
  slug: string;
  title: string;
  kind: "Hackathon" | "Bootcamp" | "Pitch Day" | "Workshop" | "Talk";
  starts_at: string;
  venue: string;
  summary: string;
  description: string;
  register_url: string | null;
  status: EventStatus;
  cover_url: string | null;
  /** "url | caption" per entry; url may be empty for placeholders */
  gallery: string[];
};

export type TeamYear = "final" | "third" | "second" | "faculty";

export type TeamMember = {
  id: string;
  name: string;
  year: TeamYear;
  role: string;
  branch: string;
  fun_fact: string;
  photo_url: string | null;
  linkedin: string | null;
  instagram: string | null;
  sort: number;
};

export type Program = {
  id: string;
  title: string;
  blurb: string;
  eligibility: string;
  how_to: string;
  color: Accent;
  sort: number;
};

export type Stat = { id: string; label: string; value: number; prefix: string; suffix: string; sort: number };
export type MarqueeItem = { id: string; text: string; sort: number };
export type Faq = { id: string; question: string; answer: string; sort: number };
export type Testimonial = { id: string; quote: string; name: string; startup: string; sort: number };

export type Resource = {
  id: string;
  title: string;
  category: "Report" | "Policy" | "Notice" | "Circular" | "Form";
  published_on: string;
  file_url: string;
};

export type ContentMap = {
  startups: Startup;
  events: IISFEvent;
  team_members: TeamMember;
  programs: Program;
  stats: Stat;
  marquee_items: MarqueeItem;
  faqs: Faq;
  testimonials: Testimonial;
  resources: Resource;
};

export type ContentKey = keyof ContentMap;
