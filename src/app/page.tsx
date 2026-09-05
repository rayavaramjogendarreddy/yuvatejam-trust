"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/data/site-config";
import ContactForm from "@/components/forms/ContactForm";
import SafeImage from "@/components/ui/SafeImage";
import FeaturedSplit from "@/components/content/FeaturedSplit";
import Timeline, { TimelineItem } from "@/components/content/Timeline";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";
import {
  HeartPulse,
  Briefcase,
  Users,
  ShieldAlert,
  GraduationCap,
  Heart,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Award,
  Globe,
  MapPin,
  Phone,
} from "lucide-react";

export default function HomePage() {
  const causes = [
    {
      title: "Health & Medical Camps",
      slug: "health",
      description: "Free medical checkups, eye testing, essential medicines, and hygiene camps in rural communities.",
      icon: HeartPulse,
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/21.jpg",
      badge: "Healthcare",
    },
    {
      title: "Livelihood & Skills",
      slug: "livelihood",
      description: "Skill training workshops for youth and vocational programs to foster self-reliance and employment.",
      icon: Briefcase,
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/14.jpg",
      badge: "Skills",
    },
    {
      title: "Women Empowerment",
      slug: "women-empowerment",
      description: "Tailoring units, micro-enterprise training, and financial literacy to empower women in society.",
      icon: Users,
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/1-1024x1024.jpg",
      badge: "Empowerment",
    },
    {
      title: "Disaster Response",
      slug: "disaster-response",
      description: "Emergency relief packages, clean water, and shelter assistance during floods and natural crises.",
      icon: ShieldAlert,
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/2-1.jpg",
      badge: "Relief",
    },
    {
      title: "Privileged Children",
      slug: "privileged-children",
      description: "Nutritious meal distribution, fun trips, and holistic development for orphaned and vulnerable kids.",
      icon: GraduationCap,
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/13-2.jpg",
      badge: "Child Care",
    },
  ];

  const stats = [
    { label: "Children Educated", value: "49,246+" },
    { label: "Medical Camps Held", value: "50+" },
    { label: "Food Meals Served", value: "25,000+" },
    { label: "Women Empowered", value: "500+" },
  ];

  const milestones: TimelineItem[] = [
    {
      year: "2012",
      title: "Trust Registration & Inception",
      description: "Registered as Yuvatejam Educational & Social Service Trust (Reg. No. 124/2012) in Vuyyuru, Andhra Pradesh.",
      badge: "Founding",
    },
    {
      year: "2015",
      title: "Mission Education Launch",
      description: "Established remedial study centers and scholarship support for non-formal and school-going underprivileged children.",
      badge: "Education",
    },
    {
      year: "2019",
      title: "Healthcare & Sanitation Camps",
      description: "Expanded free health checkup camps, eye testing, and sanitation awareness drives in rural villages.",
      badge: "Health",
    },
    {
      year: "2024 - Present",
      title: "Holistic Community Empowerment",
      description: "State-wide initiatives including Annadhanam food distribution, women's skill workshops, and disaster relief.",
      badge: "Expansion",
    },
  ];

  const events = [
    {
      title: "Free Medical Camp in Govt. Elementary School",
      location: "Andhra Pradesh",
      date: "25th May 2022",
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/21.jpg",
      link: "/happenings/",
    },
    {
      title: "Fun & Educational Trip for Children",
      location: "Krishna District",
      date: "14th November 2023",
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/3-1024x767.jpg",
      link: "/happenings/",
    },
    {
      title: "Annadhanam Food Distribution Drive",
      location: "Vuyyuru",
      date: "15th August 2024",
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/14.jpg",
      link: "/food-distribution/",
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b-4 border-brand-red">
        <div
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url('https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/banner-1024x515.jpg')` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-brand-navy/90" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Badge variant="gold" size="md">
              <Globe className="w-3.5 h-3.5 text-brand-gold" />
              <span>{siteConfig.registrationNo} • Registered Non-Profit NGO</span>
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Empowering Lives <br />
              <span className="text-gradient">Building Hope.</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
              Yuvatejam Educational &amp; Social Service Trust is dedicated to fostering self-reliance, quality education, healthcare, and dignity for children, women, and underserved families across Andhra Pradesh.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/donate-now/"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-red to-brand-darkRed hover:from-brand-darkRed hover:to-brand-red text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-base"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>Donate &amp; Change a Life</span>
              </Link>

              <Link
                href="/about-us/"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold px-6 py-4 rounded-full border border-slate-700 hover:border-slate-600 transition-colors text-base"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4 text-brand-red" />
              </Link>
            </div>

            {/* Key Trust Highlights */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 border-t border-slate-800 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Direct Community Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>80G Tax Exemption</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Transparent Governance</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50/70 rounded-2xl border border-slate-200/60 p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200/60">
          {stats.map((stat, idx) => (
            <div key={stat.label} className={`text-center space-y-1.5 ${idx > 0 ? "pt-6 md:pt-0" : ""}`}>
              <span className="block text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                {stat.value}
              </span>
              <span className="block text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Flagship Program Split Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturedSplit
          subtitle="Flagship Initiative"
          title="Mission Education — Empowering Child Potential"
          description="Education is both the means and the end to a dignified life. Yuvatejam Trust provides basic education, study materials, tutoring, and remedial bridge courses for children under difficult social circumstances."
          imageSrc="https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/3-1024x767.jpg"
          imageAlt="Child Education Initiative"
          badgeText="Education First"
          highlights={[
            "49,246+ Children provided education through 240 study centers",
            "53% Female beneficiaries ensuring equal opportunities for girls",
            "87% Mainstreamed to formal schools after bridge training",
          ]}
          ctaLink="/education/"
          ctaText="Explore Mission Education"
        />
      </section>

      {/* Core Programs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="primary" size="md">
            Our Work
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Key Focus Areas &amp; Programs
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We work holistically across health, livelihood, child protection, and women&apos;s self-reliance to build resilient communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {causes.map((cause, idx) => {
            const Icon = cause.icon;
            return (
              <motion.div
                key={cause.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white rounded-2xl border border-slate-200/70 hover:border-emerald-500/40 hover:shadow-md overflow-hidden flex flex-col group transition-all duration-300 h-auto"
              >
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <SafeImage
                    src={cause.image}
                    alt={cause.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md p-2.5 rounded-xl shadow-sm text-brand-red">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" size="sm" className="bg-slate-900/80 text-white border-0">
                      {cause.badge}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-red transition-colors">
                      {cause.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                      {cause.description}
                    </p>
                  </div>

                  <Link
                    href={`/${cause.slug}/`}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-red hover:text-brand-darkRed transition-colors pt-3 border-t border-slate-100"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Trust History & Milestones Timeline */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-red block mb-2">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Yuvatejam Trust Milestones
            </h2>
          </div>
          <Timeline items={milestones} />
        </div>
      </section>

      {/* Happenings & Recent Activities */}
      <section className="bg-slate-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
                Media &amp; Updates
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                Recent Happenings &amp; Activities
              </h2>
            </div>
            <Link
              href="/happenings/"
              className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-gold hover:text-white transition-colors"
            >
              <span>View All News &amp; Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((evt, idx) => (
              <motion.div
                key={evt.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-800/80 rounded-2xl border border-slate-700/80 overflow-hidden hover:border-brand-gold/50 transition-colors space-y-4 flex flex-col h-auto"
              >
                <div className="relative h-44 w-full bg-slate-800">
                  <SafeImage
                    src={evt.image}
                    alt={evt.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4 text-xs text-brand-gold font-medium">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{evt.date}</span>
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-white leading-snug line-clamp-2">
                      {evt.title}
                    </h3>
                  </div>
                  <Link
                    href={evt.link}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-300 hover:text-white pt-2 border-t border-slate-700/50"
                  >
                    <span>Event Details</span>
                    <ArrowRight className="w-3 h-3 text-brand-red" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50/40 rounded-3xl p-8 md:p-12 border border-emerald-100/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <Badge variant="primary" size="md">
              <Award className="w-3.5 h-3.5" />
              <span>Leadership Vision</span>
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dr. SHAIK Karimulla — Founder &amp; Chairman
            </h2>
            <blockquote className="text-slate-800 italic text-sm sm:text-base leading-relaxed p-4 bg-white/80 rounded-2xl border border-emerald-100/60">
              &quot;True social transformation begins when we empower the youth, educate every child, and stand by families during their times of greatest hardship. At Yuvatejam Trust, our commitment is unwavering.&quot;
            </blockquote>
            <div className="pt-2">
              <Link
                href="/about-founder/"
                className="inline-flex items-center space-x-2 text-sm font-bold text-brand-red hover:text-brand-darkRed"
              >
                <span>Read Founder Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl bg-slate-200">
              <SafeImage
                src="https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/Dr.SHAIK-karimulla-Founder-and-Chairman.jpg"
                alt="Dr. SHAIK Karimulla"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
              Get In Touch
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              We Would Love to Hear From You
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Whether you want to sponsor a child&apos;s education, contribute to healthcare camps, or join as a volunteer, feel free to reach out to us directly.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-slate-50/60 rounded-xl border border-slate-200/60 flex items-start space-x-4">
                <div className="p-2.5 bg-red-50 text-brand-red rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Head Office Address</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {siteConfig.address}, {siteConfig.city}, {siteConfig.state} - {siteConfig.pincode}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50/60 rounded-xl border border-slate-200/60 flex items-start space-x-4">
                <div className="p-2.5 bg-red-50 text-brand-red rounded-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Direct Helpline</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{siteConfig.phone} / {siteConfig.altPhone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/70 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100">
              Send Us a Message
            </h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
