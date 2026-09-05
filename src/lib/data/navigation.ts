import { NavItem } from "@/types/content";

export const mainNav: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "About Us",
    href: "/about-us/",
    children: [
      { title: "Overview", href: "/about-us/" },
      { title: "Vision", href: "/vision/" },
      { title: "Mission", href: "/mission/" },
      { title: "About Founder", href: "/about-founder/" },
      { title: "Executive Body Members", href: "/executive-body-members/" },
      { title: "Our Team", href: "/our-team/" },
      { title: "Organization Profile", href: "/organization-profile/" },
    ],
  },
  {
    title: "Our Work",
    href: "/overview/",
    children: [
      { title: "Overview", href: "/overview/" },
      { title: "Education", href: "/education/" },
      { title: "Health", href: "/health/" },
      { title: "Livelihood", href: "/livelihood/" },
      { title: "Women Empowerment", href: "/women-empowerment/" },
      { title: "Disaster Response", href: "/disaster-response/" },
      { title: "Privileged Children", href: "/privileged-children/" },
      { title: "Education Program", href: "/education-program/" },
      { title: "Food Distribution", href: "/food-distribution/" },
      { title: "Independence Days", href: "/independent-days/" },
    ],
  },
  {
    title: "Get Involved",
    href: "/individual-support/",
    children: [
      { title: "Individual Support", href: "/individual-support/" },
      { title: "Corporate Partnerships", href: "/corporate-partnerships/" },
      { title: "Institutional Alliances", href: "/institutional-alliances/" },
      { title: "Schools & Colleges", href: "/schools/" },
      { title: "Volunteers", href: "/volunteers/" },
      { title: "Careers", href: "/careers/" },
    ],
  },
  {
    title: "Media Centre",
    href: "/happenings/",
    children: [
      { title: "Happenings & Events", href: "/happenings/" },
      { title: "Press Releases", href: "/press-releases/" },
      { title: "Print/Online Media", href: "/works-gallery/" },
      { title: "Media Gallery", href: "/media-gallery/" },
      { title: "Work Gallery", href: "/work-gallery/" },
      { title: "Annual Report", href: "/annual-report/" },
      { title: "Newsletter", href: "/newsletter/" },
      { title: "Stories of Change", href: "/stories-of-change/" },
    ],
  },
  { title: "FAQs", href: "/faqs/" },
  { title: "Contact Us", href: "/contact-us/" },
];

export const footerNav = {
  quickLinks: [
    { title: "About Yuvatejam Trust", href: "/about-us/" },
    { title: "Our Core Vision", href: "/vision/" },
    { title: "Founder's Message", href: "/about-founder/" },
    { title: "Executive Body", href: "/executive-body-members/" },
    { title: "Our Leadership Team", href: "/our-team/" },
    { title: "Frequently Asked Questions", href: "/faqs/" },
  ],
  causes: [
    { title: "Education Initiatives", href: "/education/" },
    { title: "Healthcare & Camps", href: "/health/" },
    { title: "Livelihood & Skill Training", href: "/livelihood/" },
    { title: "Women Empowerment", href: "/women-empowerment/" },
    { title: "Disaster Relief Operations", href: "/disaster-response/" },
    { title: "Support for Privileged Children", href: "/privileged-children/" },
  ],
  getInvolved: [
    { title: "Volunteer with Us", href: "/volunteers/" },
    { title: "Individual Donation", href: "/donate-now/" },
    { title: "Corporate Social Responsibility", href: "/corporate-partnerships/" },
    { title: "Institutional Alliances", href: "/institutional-alliances/" },
    { title: "School Partnerships", href: "/schools/" },
    { title: "Career Opportunities", href: "/careers/" },
  ],
};
