import React, { useState, useRef } from "react";
import { Send, AlertCircle } from "lucide-react";
import {
  projects,
  ENQUIRY_ENDPOINT,
  whatsappMessage,
} from "../data/site.js";

const PROJECT_NAMES = [...projects.map((p) => p.name), "Other"];

export default function ContactForm({ project = "" }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: PROJECT_NAMES.includes(project) ? project : "",
    requirement: "",
    budget: "",
    message: "",
    permission: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const loadedAt = useRef(Date.now());

  const update = (e) =>
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your full name.";
    if (!form.phone.trim())
      errs.phone = "Please enter your phone or WhatsApp number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Please enter a valid email address or leave it empty.";
    if (!form.requirement.trim())
      errs.requirement = "Please tell us your property requirement.";
    if (!form.permission)
      errs.permission =
        "Please tick the box so our team can contact you about this enquiry.";
    return errs;
  };

  const submit = async (e) => {
    e.preventDefault();

    // Spam protection 1: honeypot field (hidden from humans, filled by bots).
    if (form.company) return;
    // Spam protection 2: time trap — submissions within 3s of load are bots.
    if (Date.now() - loadedAt.current < 3000) {
      setErrors({
        form: "Please take a moment to complete the form, then try again.",
      });
      return;
    }

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      project: form.interest,
      requirement: form.requirement.trim(),
      budget: form.budget.trim(),
      message: form.message.trim(),
      permission: form.permission,
    };

    try {
      if (ENQUIRY_ENDPOINT) {
        // Confirmed enquiry destination (set in src/data/site.js).
        const res = await fetch(ENQUIRY_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        // Fallback until the destination is confirmed: deliver the enquiry
        // through WhatsApp with a prefilled summary identifying the project.
        const summary =
          `Website enquiry\n` +
          `Name: ${payload.name}\n` +
          `Phone: ${payload.phone}\n` +
          (payload.email ? `Email: ${payload.email}\n` : "") +
          (payload.project ? `Project of interest: ${payload.project}\n` : "") +
          `Requirement: ${payload.requirement}\n` +
          (payload.budget ? `Budget: ${payload.budget}\n` : "") +
          (payload.message ? `Message: ${payload.message}` : "");
        window.open(whatsappMessage(summary), "_blank", "noopener");
      }
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="contact-form form-success" role="status">
        <p className="success-title">Thank you for contacting Bunyaad Holdings.</p>
        <p className="form-note">
          We have received your enquiry and our team will get in touch.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      {errors.form && (
        <p className="error-note" role="alert">
          <AlertCircle size={14} /> {errors.form}
        </p>
      )}
      {status === "error" && (
        <p className="error-note" role="alert">
          <AlertCircle size={14} /> Something went wrong sending your enquiry.
          Please try again, or contact us directly on{" "}
          <a href="https://wa.me/923215667784" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          .
        </p>
      )}

      <div className="form-grid">
        <label>
          Full Name *
          <input
            required
            name="name"
            value={form.name}
            onChange={update}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "err-name" : undefined}
          />
          {errors.name && (
            <span className="field-error" id="err-name" role="alert">
              {errors.name}
            </span>
          )}
        </label>
        <label>
          Phone / WhatsApp *
          <input
            required
            type="tel"
            name="phone"
            value={form.phone}
            onChange={update}
            placeholder="+92 3XX XXXXXXX"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "err-phone" : undefined}
          />
          {errors.phone && (
            <span className="field-error" id="err-phone" role="alert">
              {errors.phone}
            </span>
          )}
        </label>
        <label>
          Email <span className="optional">Optional</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={update}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "err-email" : undefined}
          />
          {errors.email && (
            <span className="field-error" id="err-email" role="alert">
              {errors.email}
            </span>
          )}
        </label>
        <label>
          Project of Interest
          <select name="interest" value={form.interest} onChange={update}>
            <option value="">Select a project</option>
            {PROJECT_NAMES.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <label>
          Property Requirement *
          <input
            required
            name="requirement"
            value={form.requirement}
            onChange={update}
            placeholder="Apartment, shop, office..."
            aria-invalid={Boolean(errors.requirement)}
            aria-describedby={errors.requirement ? "err-requirement" : undefined}
          />
          {errors.requirement && (
            <span className="field-error" id="err-requirement" role="alert">
              {errors.requirement}
            </span>
          )}
        </label>
        <label>
          Budget <span className="optional">Optional</span>
          <input
            name="budget"
            value={form.budget}
            onChange={update}
            placeholder="Your preferred budget"
          />
        </label>
      </div>

      <label>
        Message
        <textarea
          name="message"
          rows="4"
          value={form.message}
          onChange={update}
          placeholder="Tell us a little about what you are looking for"
        />
      </label>

      {/* Honeypot: hidden from visitors, catches bots */}
      <label className="hp-field" aria-hidden="true">
        Company
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company || ""}
          onChange={update}
        />
      </label>

      <label className="check-label">
        <input
          type="checkbox"
          name="permission"
          checked={form.permission}
          onChange={update}
          required
          aria-invalid={Boolean(errors.permission)}
          aria-describedby={errors.permission ? "err-permission" : undefined}
        />
        <span>
          I agree to be contacted by Bunyaad Holdings about this enquiry using
          the details provided.
        </span>
      </label>
      {errors.permission && (
        <p className="field-error" id="err-permission" role="alert">
          {errors.permission}
        </p>
      )}

      <button
        className="btn btn-gold submit"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send My Enquiry"} <Send size={16} />
      </button>
    </form>
  );
}
