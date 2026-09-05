import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { pagesData } from "@/lib/data/pages-data";
import ContactForm from "@/components/forms/ContactForm";
import VolunteerForm from "@/components/forms/VolunteerForm";
import ContentRenderer from "@/components/content/ContentRenderer";
import DonationCard from "@/components/content/DonationCard";
import InfoCard from "@/components/content/InfoCard";
import Timeline from "@/components/content/Timeline";
import JsonLd from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, ChevronRight, FileText } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(pagesData).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pagesData[slug];

  if (!page) {
    return { title: "Page Not Found" };
  }

  const cleanTitle = page.title && page.title !== "NULL" ? page.title : slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const cleanDesc = page.seoDescription && page.seoDescription !== "NULL" 
    ? page.seoDescription 
    : `Learn more about ${cleanTitle} at Yuvatejam Trust. Educational and social service initiatives in Andhra Pradesh.`;

  return {
    title: cleanTitle,
    description: cleanDesc,
    alternates: {
      canonical: `/${slug}`,
    },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = pagesData[slug];

  if (!page) {
    notFound();
  }

  const isContactPage = slug === "contact-us";
  const isVolunteerPage = slug === "volunteers";
  const isAboutOrTeam = ["about-us", "about-founder", "executive-body-members", "our-team", "organization-profile", "vision", "mission"].includes(slug);
  const isGalleryPage = ["works-gallery", "media-gallery", "work-gallery"].includes(slug);

  const displayTitle = page.title && page.title !== "NULL" ? page.title : slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const aboutMilestones = [
    {
      year: "2012",
      title: "Establishment & Registration",
      description: "Founded in Vuyyuru, Krishna District, Andhra Pradesh to uplift underprivileged rural families.",
      badge: "Founding",
    },
    {
      year: "2016",
      title: "Educational & Health Growth",
      description: "Expanded free tutoring centers, bridge courses, and multi-specialty health checkup camps.",
      badge: "Services",
    },
    {
      year: "2024+",
      title: "Statewide Relief & Development",
      description: "Deploying food relief, women's empowerment units, and disaster response across Andhra Pradesh.",
      badge: "Current Impact",
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://yuvatejamtrust.org/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": displayTitle,
        "item": `https://yuvatejamtrust.org/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen pb-16 space-y-8 md:space-y-12">
      <JsonLd data={breadcrumbSchema} />
      {/* Hero Title Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-brand-navy to-slate-900 text-white py-12 md:py-16 border-b-4 border-brand-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs text-slate-300">
            <Link href="/" className="hover:text-brand-gold transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
            <span className="text-brand-gold font-semibold truncate">{displayTitle}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {displayTitle}
            </h1>
            {isAboutOrTeam && (
              <Badge variant="gold" size="md">
                Trust Heritage
              </Badge>
            )}
            {isGalleryPage && (
              <Badge variant="primary" size="md">
                Media &amp; Photos
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Main Body Column */}
          <div className={`${isContactPage || isVolunteerPage ? "lg:col-span-12" : "lg:col-span-8"} space-y-8 h-auto`}>
            {/* Contact Page Layout */}
            {isContactPage && (
              <div className="space-y-8">
                {page.content && (
                  <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                    <ContentRenderer content={page.content} />
                  </div>
                )}
                <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-brand-red pl-3">
                    Send Us a Message
                  </h2>
                  <ContactForm />
                </div>
              </div>
            )}

            {/* Volunteer Page Layout */}
            {isVolunteerPage && (
              <div className="space-y-8">
                {page.content && (
                  <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                    <ContentRenderer content={page.content} />
                  </div>
                )}
                <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-brand-red pl-3">
                    Join As a Volunteer
                  </h2>
                  <VolunteerForm />
                </div>
              </div>
            )}

            {/* Standard Page Layout */}
            {!isContactPage && !isVolunteerPage && (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-6 h-auto">
                  {page.content && page.content.trim() ? (
                    <ContentRenderer content={page.content} />
                  ) : (
                    <div className="py-12 text-center space-y-4">
                      <FileText className="w-12 h-12 text-brand-red mx-auto opacity-80" />
                      <h3 className="text-xl font-bold text-slate-800">
                        {displayTitle} Information
                      </h3>
                      <p className="text-slate-600 text-sm max-w-md mx-auto">
                        For detailed information regarding {displayTitle}, please contact Yuvatejam Educational &amp; Social Service Trust headquarters or reach out directly.
                      </p>
                      <Link
                        href="/contact-us/"
                        className="inline-flex items-center space-x-2 bg-brand-red text-white text-xs font-bold px-5 py-2.5 rounded-full shadow hover:bg-brand-darkRed transition-colors"
                      >
                        <span>Contact Us</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Additional Timeline for About Pages */}
                {isAboutOrTeam && (
                  <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100">
                    <Timeline items={aboutMilestones} title="Key Trust Milestones" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sticky Sidebar Column */}
          {!isContactPage && !isVolunteerPage && (
            <div className="lg:col-span-4 space-y-6 sticky top-24">
              <DonationCard compact />
              <InfoCard />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
