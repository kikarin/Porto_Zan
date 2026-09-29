"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PiEnvelopeSimpleBold,
  PiWhatsappLogoBold,
  PiMapPinBold,
  PiArrowUpRightBold,
  PiPaperPlaneTiltBold,
  PiCheckCircleBold,
  PiWarningCircleBold,
} from "react-icons/pi";
import Container from "./Container";
import Reveal from "./ui/Reveal";
import Confetti from "./ui/Confetti";
import { EMAIL, WHATSAPP_LABEL, WHATSAPP_URL } from "@/lib/site";

type Field = "name" | "email" | "message";
type Status = "idle" | "sending" | "sent" | "error";

const MIN_MESSAGE = 10;

const channels = [
  { icon: PiEnvelopeSimpleBold, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: PiWhatsappLogoBold, label: "WhatsApp", value: WHATSAPP_LABEL, href: WHATSAPP_URL },
  { icon: PiMapPinBold, label: "Lokasi", value: "Kota Bogor, Indonesia" },
];

const validators: Record<Field, (value: string) => string | null> = {
  name: (v) => (v.trim() ? null : "Nama wajib diisi."),
  email: (v) => (/^\S+@\S+\.\S+$/.test(v.trim()) ? null : "Masukkan alamat email yang valid."),
  message: (v) =>
    v.trim().length >= MIN_MESSAGE ? null : `Pesan minimal ${MIN_MESSAGE} karakter.`,
};

const fieldClass = (hasError: boolean) =>
  `peer w-full rounded-2xl bg-canvas px-4 pb-3 pt-7 text-ink ring-1 transition-[box-shadow,background-color] duration-200 placeholder:text-transparent focus:bg-white focus:outline-none focus:ring-2 ${
    hasError ? "ring-red-400 focus:ring-red-500" : "ring-ink/10 hover:ring-ink/20 focus:ring-accent"
  }`;

const labelClass =
  "pointer-events-none absolute left-4 top-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors peer-focus:text-accent-600";

export default function Contact() {
  const [formData, setFormData] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string | null>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as Field;
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    if (status === "error") setStatus("idle");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as Field;
    if (formData[name]) setErrors((prev) => ({ ...prev, [name]: validators[name](formData[name]) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = (Object.keys(validators) as Field[]).reduce<Partial<Record<Field, string | null>>>(
      (acc, key) => ({ ...acc, [key]: validators[key](formData[key]) }),
      {}
    );
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as Field[]).find((key) => nextErrors[key]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (result.success) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 pb-24 pt-12 md:pb-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-sand px-6 py-14 shadow-soft md:px-14 md:py-20">
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <Reveal>
              <span className="eyebrow">
                <span className="text-accent-600">06</span>
                <span className="h-px w-8 bg-ink/20" />
                Contact
              </span>
              <h2 className="mt-5 font-display text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
                Punya ide?
                <br />
                <span className="italic text-accent">Let&apos;s build it.</span>
              </h2>
              <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-ink-muted">
                Ceritakan project, kebutuhan, atau sekadar ingin ngobrol soal teknologi. Saya akan
                membalas lewat email.
              </p>

              <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
                {channels.map(({ icon: Icon, label, value, href }) => {
                  const content = (
                    <>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-lg text-ink shadow-soft transition-transform duration-300 ease-spring group-hover:-rotate-12 group-hover:bg-accent group-hover:text-white">
                        <Icon />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                          {label}
                        </span>
                        <span className="block truncate font-medium text-ink">{value}</span>
                      </span>
                      {href && (
                        <PiArrowUpRightBold className="text-ink-faint transition-all duration-300 ease-spring group-hover:rotate-45 group-hover:text-accent" />
                      )}
                    </>
                  );
                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group flex items-center gap-4 py-4 transition-transform duration-300 hover:translate-x-1"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="group flex items-center gap-4 py-4">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative rounded-[2rem] bg-white p-6 shadow-lift ring-1 ring-ink/5 md:p-8">
                <AnimatePresence mode="wait" initial={false}>
                  {status === "sent" ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      role="status"
                      className="relative flex min-h-[420px] flex-col items-center justify-center text-center"
                    >
                      <Confetti />
                      <motion.span
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.1 }}
                        className="grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-4xl text-emerald-600"
                      >
                        <PiCheckCircleBold />
                      </motion.span>
                      <p className="mt-6 font-display text-3xl font-semibold tracking-tight">Pesan terkirim.</p>
                      <p className="mt-2 max-w-[36ch] text-ink-muted">
                        Terima kasih sudah menghubungi. Saya akan membalas ke email yang Anda cantumkan.
                      </p>
                      <button type="button" onClick={() => setStatus("idle")} className="btn-ghost mt-8">
                        Kirim pesan lain
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-4"
                    >
                      {(["name", "email"] as const).map((field) => (
                        <div key={field} className="relative">
                          <input
                            id={`contact-${field}`}
                            type={field === "email" ? "email" : "text"}
                            name={field}
                            autoComplete={field}
                            value={formData[field]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={field === "name" ? "Nama Anda" : "nama@email.com"}
                            aria-invalid={Boolean(errors[field])}
                            aria-describedby={errors[field] ? `contact-${field}-error` : undefined}
                            className={fieldClass(Boolean(errors[field]))}
                          />
                          <label htmlFor={`contact-${field}`} className={labelClass}>
                            {field === "name" ? "Nama" : "Email"}
                          </label>
                          {errors[field] && (
                            <p id={`contact-${field}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
                              <PiWarningCircleBold /> {errors[field]}
                            </p>
                          )}
                        </div>
                      ))}

                      <div className="relative">
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Ceritakan project Anda"
                          aria-invalid={Boolean(errors.message)}
                          aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"}
                          className={`${fieldClass(Boolean(errors.message))} resize-none`}
                        />
                        <label htmlFor="contact-message" className={labelClass}>
                          Pesan
                        </label>
                        <div className="mt-1.5 flex items-center justify-between gap-4 text-sm">
                          {errors.message ? (
                            <p id="contact-message-error" className="flex items-center gap-1.5 text-red-600">
                              <PiWarningCircleBold /> {errors.message}
                            </p>
                          ) : (
                            <p id="contact-message-hint" className="text-ink-faint">
                              Minimal {MIN_MESSAGE} karakter.
                            </p>
                          )}
                          <span
                            className={`font-mono text-xs tabular-nums ${
                              formData.message.trim().length >= MIN_MESSAGE ? "text-emerald-600" : "text-ink-faint"
                            }`}
                          >
                            {formData.message.trim().length}
                          </span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {status === "error" && (
                          <motion.div
                            role="alert"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="flex items-start gap-2 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                              <PiWarningCircleBold className="mt-0.5 shrink-0 text-base" />
                              <span>
                                Pesan gagal terkirim. Coba lagi, atau email langsung ke{" "}
                                <a href={`mailto:${EMAIL}`} className="font-medium underline">
                                  {EMAIL}
                                </a>
                                .
                              </span>
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="btn-primary group w-full !py-4 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0"
                      >
                        {status === "sending" ? (
                          <>
                            Mengirim
                            <span className="flex gap-1" aria-hidden>
                              {[0, 1, 2].map((dot) => (
                                <motion.span
                                  key={dot}
                                  className="h-1.5 w-1.5 rounded-full bg-current"
                                  animate={{ y: [0, -4, 0] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.12 }}
                                />
                              ))}
                            </span>
                          </>
                        ) : (
                          <>
                            Kirim pesan
                            <PiPaperPlaneTiltBold className="transition-transform duration-300 ease-spring group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
