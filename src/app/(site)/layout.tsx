import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SITE } from "@/lib/site";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Innovation Incubation and Startup Foundation, KNIT Sultanpur",
  alternateName: "IISF KNIT",
  url: SITE.url,
  email: SITE.email,
  address: { "@type": "PostalAddress", addressLocality: "Sultanpur", addressRegion: "Uttar Pradesh", postalCode: "228118", addressCountry: "IN" },
  parentOrganization: { "@type": "CollegeOrUniversity", name: "Kamla Nehru Institute of Technology" },
  sameAs: SITE.socials.map((s) => s.href),
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} />
      <Navbar />
      <main id="main" className="overflow-x-clip">{children}</main>
      <Footer />
    </>
  );
}
