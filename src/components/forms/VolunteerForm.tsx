"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { UserPlus, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    areaOfInterest: "Education Support",
    availability: "Weekends",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success" || status === "error") {
      alertRef.current?.focus();
    }
  }, [status]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          city: "",
          areaOfInterest: "Education Support",
          availability: "Weekends",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to submit application.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
        Become a Volunteer
      </h3>
      <p className="text-slate-600 text-sm mb-6">
        Join our dedicated team of volunteers making a tangible difference in communities.
      </p>

      {status === "success" && (
        <div
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          aria-live="polite"
          className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start space-x-3 text-emerald-800 text-sm animate-in fade-in focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Application Received!</p>
            <p className="text-xs text-emerald-700 mt-0.5">
              Thank you for signing up to volunteer! Our coordinator will contact you soon.
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 text-red-800 text-sm animate-in fade-in focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-xs text-red-700 mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="vol-name" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Full Name <span className="text-brand-red" aria-hidden="true">*</span>
            </label>
            <input
              id="vol-name"
              type="text"
              required
              aria-required="true"
              aria-invalid={status === "error" && !formData.name}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Full Name"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-red focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="vol-email" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Email Address <span className="text-brand-red" aria-hidden="true">*</span>
            </label>
            <input
              id="vol-email"
              type="email"
              required
              aria-required="true"
              aria-invalid={status === "error" && !formData.email}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-red focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="vol-phone" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Phone Number <span className="text-brand-red" aria-hidden="true">*</span>
            </label>
            <input
              id="vol-phone"
              type="tel"
              required
              aria-required="true"
              aria-invalid={status === "error" && !formData.phone}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98490 00000"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-red focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="vol-city" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              City / Location <span className="text-brand-red" aria-hidden="true">*</span>
            </label>
            <input
              id="vol-city"
              type="text"
              required
              aria-required="true"
              aria-invalid={status === "error" && !formData.city}
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Your City"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-red focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="vol-interest" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Primary Area of Interest
            </label>
            <select
              id="vol-interest"
              value={formData.areaOfInterest}
              onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-red focus:ring-2 focus:ring-red-100 outline-none transition-all bg-white"
            >
              <option value="Education Support">Education Support</option>
              <option value="Healthcare Camps">Healthcare Camps</option>
              <option value="Women Empowerment">Women Empowerment</option>
              <option value="Child Welfare">Child Welfare</option>
              <option value="Environment & Planting">Environment &amp; Planting</option>
              <option value="Disaster Relief">Disaster Relief</option>
              <option value="Elderly Care">Elderly Care</option>
            </select>
          </div>

          <div>
            <label htmlFor="vol-availability" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Availability
            </label>
            <select
              id="vol-availability"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-red focus:ring-2 focus:ring-red-100 outline-none transition-all bg-white"
            >
              <option value="Weekends">Weekends Only</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Full Time">Full Time</option>
              <option value="On-Call Emergency">On-Call Emergency Relief</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="vol-message" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Why do you want to join Yuvatejam Trust?
          </label>
          <textarea
            id="vol-message"
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us briefly about your background or interest..."
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-red focus:ring-2 focus:ring-red-100 outline-none transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-brand-red hover:bg-brand-darkRed text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting Application...</span>
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>Apply as Volunteer</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
