"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

interface FormState {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "sending" | "success";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const t = useTranslations("contact");
  const projectTypes = t.raw("formProjectTypeOptions") as string[];

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    projectType: projectTypes[0] ?? "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!form.name.trim()) next.name = t("requiredField");
    if (!form.email.trim()) next.email = t("requiredField");
    else if (!EMAIL_RE.test(form.email)) next.email = t("invalidEmail");
    if (!form.message.trim()) next.message = t("requiredField");
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");

    const subject = encodeURIComponent(`${form.projectType} — inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProject type: ${form.projectType}\n\n${form.message}`
    );
    const mailto = `mailto:${site.email}?subject=${subject}&body=${body}`;

    window.setTimeout(() => {
      window.location.href = mailto;
      setStatus("success");
    }, 500);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            {t("formName")}
          </label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={t("formNamePlaceholder")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            {t("formEmail")}
          </label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder={t("formEmailPlaceholder")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="mb-2 block text-sm font-medium">
          {t("formProjectType")}
        </label>
        <Select
          id="projectType"
          value={form.projectType}
          onChange={(e) => update("projectType", e.target.value)}
        >
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          {t("formMessage")}
        </label>
        <Textarea
          id="message"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder={t("formMessagePlaceholder")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" size="lg" disabled={status === "sending"} className="gap-2">
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("sending")}
            </>
          ) : (
            <>
              {t("send")}
              <Send className="h-4 w-4" />
            </>
          )}
        </Button>

        <AnimatePresence>
          {status === "success" && (
            <motion.p
              role="status"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-1.5 text-sm text-accent"
            >
              <CheckCircle2 className="h-4 w-4" />
              {t("success")}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
