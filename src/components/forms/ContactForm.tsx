"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to send message.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
        Send Us a Message
      </h3>
      <p className="text-slate-600 text-sm mb-6">
        Have questions or want to partner with Yuvatejam Trust? Fill out the form below.
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
            <p className="font-semibold">Message Sent Successfully!</p>
            <p className="text-xs text-emerald-700 mt-0.5">
              Thanks for contacting us! We will be in touch with you shortly.
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
            <p className="font-semibold">Submission Error</p>
            <p className="text-xs text-red-700 mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Your Name <span className="text-brand-red" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              required
              aria-required="true"
              aria-invalid={status === "error" && !formData.name}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Ramesh Kumar"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-red focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Phone Number
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. +91 98490 00000"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-red focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Email Address <span className="text-brand-red" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-email"
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

          <div>
            <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Subject <span className="text-brand-red" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-subject"
              type="text"
              required
              aria-required="true"
              aria-invalid={status === "error" && !formData.subject}
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Inquiry Topic"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-brand-red focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Your Message <span className="text-brand-red" aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message"
            required
            aria-required="true"
            aria-invalid={status === "error" && !formData.message}
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Write your message here..."
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
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
