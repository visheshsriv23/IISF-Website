/**
 * Admin resource registry. One config drives the admin UI (forms + tables)
 * and the backend validation, so adding a field means editing one place.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "url"
  | "email"
  | "date"
  | "datetime"
  | "select"
  | "list"
  | "boolean";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: readonly string[];
  hint?: string;
};

export type ResourceDef = {
  label: string;
  /** Field shown as the row title in the admin table */
  titleField: string;
  /** Extra columns shown in the admin table */
  columns: string[];
  orderBy: { column: string; ascending: boolean };
  fields: FieldDef[];
  /** Submissions are created by the public site; admins can only view/delete them */
  readOnly?: boolean;
};

const sortField: FieldDef = { name: "sort", label: "Sort order", type: "number", hint: "Lower shows first" };
const bySort = { column: "sort", ascending: true };
const newestFirst = { column: "created_at", ascending: false };

export const RESOURCES = {
  startups: {
    label: "Startups",
    titleField: "name",
    columns: ["sector", "stage", "featured"],
    orderBy: bySort,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "slug", label: "URL slug", type: "text", required: true, hint: "lowercase-with-dashes" },
      { name: "tagline", label: "One-liner", type: "text", required: true },
      { name: "sector", label: "Sector", type: "select", required: true, options: ["AgriTech", "EdTech", "HealthTech", "FinTech", "CleanTech", "DeepTech", "Consumer"] },
      { name: "stage", label: "Stage", type: "select", required: true, options: ["Idea", "Prototype", "Seed", "Revenue"] },
      { name: "team_size", label: "Team size", type: "number", required: true },
      { name: "funding", label: "Funding received", type: "text", hint: "e.g. ₹2.5L" },
      { name: "founded", label: "Year founded", type: "number", required: true },
      { name: "logo_url", label: "Logo URL", type: "url" },
      { name: "cover_url", label: "Cover photo URL", type: "url" },
      { name: "problem", label: "Problem", type: "textarea", required: true },
      { name: "solution", label: "Solution", type: "textarea", required: true },
      { name: "founders", label: "Founders", type: "list", hint: "One per line: Name | Role" },
      { name: "milestones", label: "Milestones", type: "list", hint: "One per line: Mar 2025 | What happened" },
      { name: "website", label: "Website", type: "url" },
      { name: "instagram", label: "Instagram URL", type: "url" },
      { name: "linkedin", label: "LinkedIn URL", type: "url" },
      { name: "featured", label: "Show on homepage", type: "boolean" },
      sortField,
    ],
  },
  events: {
    label: "Events",
    titleField: "title",
    columns: ["kind", "starts_at", "status"],
    orderBy: { column: "starts_at", ascending: false },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "URL slug", type: "text", required: true },
      { name: "kind", label: "Type", type: "select", required: true, options: ["Hackathon", "Bootcamp", "Pitch Day", "Workshop", "Talk"] },
      { name: "starts_at", label: "Starts at", type: "datetime", required: true },
      { name: "venue", label: "Venue", type: "text", required: true },
      { name: "status", label: "Status", type: "select", required: true, options: ["upcoming", "closed", "done"] },
      { name: "summary", label: "Short summary", type: "text", required: true },
      { name: "description", label: "Full description", type: "textarea" },
      { name: "register_url", label: "Registration link", type: "url" },
      { name: "cover_url", label: "Cover photo URL", type: "url" },
      { name: "gallery", label: "Gallery", type: "list", hint: "One per line: photo URL | caption" },
    ],
  },
  team_members: {
    label: "Team",
    titleField: "name",
    columns: ["year", "role"],
    orderBy: bySort,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "year", label: "Group", type: "select", required: true, options: ["final", "third", "second", "faculty"], hint: "Move members between years here each session" },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "branch", label: "Branch", type: "text" },
      { name: "fun_fact", label: "Fun fact", type: "text" },
      { name: "photo_url", label: "Photo URL", type: "url" },
      { name: "linkedin", label: "LinkedIn URL", type: "url" },
      { name: "instagram", label: "Instagram URL", type: "url" },
      sortField,
    ],
  },
  programs: {
    label: "Programs",
    titleField: "title",
    columns: ["color"],
    orderBy: bySort,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "blurb", label: "Blurb", type: "textarea", required: true },
      { name: "eligibility", label: "Who can apply", type: "textarea", required: true },
      { name: "how_to", label: "How to access", type: "textarea", required: true },
      { name: "color", label: "Note colour", type: "select", required: true, options: ["lime", "pink", "sun", "blue", "lilac"] },
      sortField,
    ],
  },
  stats: {
    label: "Stats",
    titleField: "label",
    columns: ["value"],
    orderBy: bySort,
    fields: [
      { name: "label", label: "Label", type: "text", required: true },
      { name: "value", label: "Number", type: "number", required: true, hint: "Verified figures only" },
      { name: "prefix", label: "Prefix", type: "text", hint: "e.g. ₹" },
      { name: "suffix", label: "Suffix", type: "text", hint: "e.g. L or +" },
      sortField,
    ],
  },
  marquee_items: {
    label: "Marquee",
    titleField: "text",
    columns: [],
    orderBy: bySort,
    fields: [{ name: "text", label: "Text", type: "text", required: true }, sortField],
  },
  faqs: {
    label: "FAQs",
    titleField: "question",
    columns: [],
    orderBy: bySort,
    fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
      sortField,
    ],
  },
  testimonials: {
    label: "Testimonials",
    titleField: "name",
    columns: ["startup"],
    orderBy: bySort,
    fields: [
      { name: "quote", label: "Quote", type: "textarea", required: true },
      { name: "name", label: "Founder name", type: "text", required: true },
      { name: "startup", label: "Startup", type: "text", required: true },
      sortField,
    ],
  },
  resources: {
    label: "Documents",
    titleField: "title",
    columns: ["category", "published_on"],
    orderBy: { column: "published_on", ascending: false },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "category", label: "Category", type: "select", required: true, options: ["Report", "Policy", "Notice", "Circular", "Form"] },
      { name: "published_on", label: "Published on", type: "date", required: true },
      { name: "file_url", label: "PDF URL", type: "url", required: true },
    ],
  },
  applications: {
    label: "Applications",
    titleField: "idea_title",
    columns: ["founder_name", "email", "stage", "created_at"],
    orderBy: newestFirst,
    readOnly: true,
    fields: [
      { name: "founder_name", label: "Founder", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "branch", label: "Branch", type: "text" },
      { name: "year", label: "Year", type: "text" },
      { name: "team", label: "Team", type: "textarea" },
      { name: "idea_title", label: "Idea", type: "text" },
      { name: "problem", label: "Problem", type: "textarea" },
      { name: "solution", label: "Solution", type: "textarea" },
      { name: "stage", label: "Stage", type: "text" },
      { name: "help_needed", label: "Help needed", type: "list" },
      { name: "deck_url", label: "Pitch deck", type: "url" },
    ],
  },
  committee_applications: {
    label: "Committee",
    titleField: "name",
    columns: ["email", "year", "team_pref", "created_at"],
    orderBy: newestFirst,
    readOnly: true,
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "year", label: "Year", type: "text" },
      { name: "branch", label: "Branch", type: "text" },
      { name: "team_pref", label: "Team", type: "text" },
      { name: "why", label: "Why", type: "textarea" },
    ],
  },
  contact_messages: {
    label: "Inbox",
    titleField: "name",
    columns: ["email", "created_at"],
    orderBy: newestFirst,
    readOnly: true,
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "message", label: "Message", type: "textarea" },
    ],
  },
} as const satisfies Record<string, ResourceDef>;

export type ResourceName = keyof typeof RESOURCES;

export const isResourceName = (value: string): value is ResourceName => value in RESOURCES;
