// Shared client & mock store for Yuvatejam Trust public interactions and admin synchronization

export interface VolunteerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  interest: string;
  status: "Approved" | "Pending" | "Under Review";
  notes?: string;
  date: string;
}

export interface EnquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "New" | "Read" | "Replied" | "Archived";
  date: string;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  amount: number;
  panNumber: string;
  program: string;
  paymentMethod: string;
  transactionId: string;
  date: string;
  receiptNumber: string;
}

const DEFAULT_VOLUNTEERS: VolunteerRecord[] = [
  { id: "v1", name: "K. Rajesh Kumar", email: "rajesh.k@gmail.com", phone: "+91 98480 12345", location: "Vuyyuru", interest: "Vidya Deevena Tutoring", status: "Approved", date: "2026-09-04" },
  { id: "v2", name: "P. Lakshmi Prasanna", email: "lakshmi.p@yahoo.com", phone: "+91 94401 56789", location: "Vijayawada", interest: "Women Empowerment Workshops", status: "Approved", date: "2026-09-02" },
  { id: "v3", name: "M. Venkateswarlu", email: "venkat.m@outlook.com", phone: "+91 99890 98765", location: "Penamaluru", interest: "Free Medical Camps", status: "Pending", date: "2026-09-05" },
  { id: "v4", name: "T. Anitha", email: "anitha.t@gmail.com", phone: "+91 91770 43210", location: "Kankipadu", interest: "Annadhanam Food Distribution", status: "Under Review", date: "2026-09-03" },
];

const DEFAULT_ENQUIRIES: EnquiryRecord[] = [
  { id: "e1", name: "S. Rama Rao", email: "ramarao.s@gmail.com", phone: "+91 98481 22334", subject: "Conducting Medical Camp in Pamidimukkala Village", message: "We would like to request Yuvatejam Trust to organize a free rural eye checkup camp in our village.", status: "New", date: "2026-09-08" },
  { id: "e2", name: "G. V. Subbarao", email: "gvsubba@yahoo.co.in", phone: "+91 98492 44556", subject: "Sponsorship for Vidya Deevena Study Material", message: "Our local association wants to sponsor notebooks and geometry kits for 100 rural students.", status: "Replied", date: "2026-09-06" },
  { id: "e3", name: "Dr. K. Srinivas", email: "srinivas.md@health.org", phone: "+91 94403 77889", subject: "Voluntary Doctor Service for Health Camps", message: "I am a general physician willing to volunteer on weekends for rural community clinics.", status: "Read", date: "2026-09-04" },
];

const DEFAULT_DONATIONS: DonationRecord[] = [
  { id: "d1", donorName: "Chavali Sitaram", amount: 25000, panNumber: "ABCDE1234F", program: "Mission Education (Vidya Deevena)", paymentMethod: "UPI / NetBanking", transactionId: "TXN983241029", date: "2026-09-05", receiptNumber: "YT/2026-27/089" },
  { id: "d2", donorName: "V. Lakshmi Narayana", amount: 15000, panNumber: "BGHPK4592L", program: "Annadhanam Meals Drive", paymentMethod: "Card", transactionId: "TXN772183910", date: "2026-09-03", receiptNumber: "YT/2026-27/088" },
  { id: "d3", donorName: "R. M. Krishna Rao", amount: 50000, panNumber: "AANPK8819Q", program: "Women Vocational Tailoring Kits", paymentMethod: "Bank Transfer", transactionId: "TXN550192837", date: "2026-08-29", receiptNumber: "YT/2026-27/087" },
];

// Volunteer Helper Functions
export function getVolunteers(): VolunteerRecord[] {
  if (typeof window === "undefined") return DEFAULT_VOLUNTEERS;
  try {
    const data = localStorage.getItem("yt_volunteers");
    if (!data) {
      localStorage.setItem("yt_volunteers", JSON.stringify(DEFAULT_VOLUNTEERS));
      return DEFAULT_VOLUNTEERS;
    }
    return JSON.parse(data);
  } catch {
    return DEFAULT_VOLUNTEERS;
  }
}

export function addVolunteer(volunteer: Omit<VolunteerRecord, "id" | "date" | "status">): VolunteerRecord {
  const list = getVolunteers();
  const newRec: VolunteerRecord = {
    ...volunteer,
    id: "v_" + Date.now(),
    status: "Pending",
    date: new Date().toISOString().split("T")[0],
  };
  const updated = [newRec, ...list];
  if (typeof window !== "undefined") {
    localStorage.setItem("yt_volunteers", JSON.stringify(updated));
    window.dispatchEvent(new Event("yt_data_updated"));
  }
  return newRec;
}

// Enquiry Helper Functions
export function getEnquiries(): EnquiryRecord[] {
  if (typeof window === "undefined") return DEFAULT_ENQUIRIES;
  try {
    const data = localStorage.getItem("yt_enquiries");
    if (!data) {
      localStorage.setItem("yt_enquiries", JSON.stringify(DEFAULT_ENQUIRIES));
      return DEFAULT_ENQUIRIES;
    }
    return JSON.parse(data);
  } catch {
    return DEFAULT_ENQUIRIES;
  }
}

export function addEnquiry(enquiry: Omit<EnquiryRecord, "id" | "date" | "status">): EnquiryRecord {
  const list = getEnquiries();
  const newRec: EnquiryRecord = {
    ...enquiry,
    id: "e_" + Date.now(),
    status: "New",
    date: new Date().toISOString().split("T")[0],
  };
  const updated = [newRec, ...list];
  if (typeof window !== "undefined") {
    localStorage.setItem("yt_enquiries", JSON.stringify(updated));
    window.dispatchEvent(new Event("yt_data_updated"));
  }
  return newRec;
}

// Donation Helper Functions
export function getDonations(): DonationRecord[] {
  if (typeof window === "undefined") return DEFAULT_DONATIONS;
  try {
    const data = localStorage.getItem("yt_donations");
    if (!data) {
      localStorage.setItem("yt_donations", JSON.stringify(DEFAULT_DONATIONS));
      return DEFAULT_DONATIONS;
    }
    return JSON.parse(data);
  } catch {
    return DEFAULT_DONATIONS;
  }
}

export function addDonation(donation: Omit<DonationRecord, "id" | "date" | "receiptNumber">): DonationRecord {
  const list = getDonations();
  const seq = String(list.length + 90).padStart(3, "0");
  const newRec: DonationRecord = {
    ...donation,
    id: "d_" + Date.now(),
    date: new Date().toISOString().split("T")[0],
    receiptNumber: `YT/2026-27/${seq}`,
  };
  const updated = [newRec, ...list];
  if (typeof window !== "undefined") {
    localStorage.setItem("yt_donations", JSON.stringify(updated));
    window.dispatchEvent(new Event("yt_data_updated"));
  }
  return newRec;
}
