"use client";

import { useState } from "react";
import { useForm, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StepIndicator } from "./StepIndicator";
import {
  QUOTE_PRODUCT_GROUPS,
  QUOTE_PRODUCT_LABELS,
} from "@/lib/quote-products";

const formSchema = z.object({
  buyerType: z.enum(["retailer", "wholesaler", "international"], {
    required_error: "Select how you work with us",
  }),
  products: z.array(z.string()).min(1, "Select at least one product"),
  volume: z.string().min(2, "Describe volume or MOQ needs"),
  frequency: z.string().min(2, "Describe order frequency"),
  company: z.string().min(2, "Company name required"),
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone required"),
  message: z.string().optional(),
});

export type QuoteFormValues = z.infer<typeof formSchema>;

const STEPS = ["Your role", "Product interest", "Details & contact"] as const;

export function QuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buyerType: undefined,
      products: [],
      volume: "",
      frequency: "",
      company: "",
      name: "",
      email: "",
      phone: "",
      message: "",
    } satisfies DefaultValues<QuoteFormValues>,
  });

  const buyerType = watch("buyerType");
  const products = watch("products") ?? [];

  const addProduct = (id: string) => {
    if (!id || products.includes(id)) return;
    setValue("products", [...products, id], { shouldValidate: true });
  };

  const removeProduct = (id: string) => {
    setValue(
      "products",
      products.filter((p) => p !== id),
      { shouldValidate: true },
    );
  };

  const nextStep = async () => {
    if (step === 1) {
      const ok = await trigger("buyerType");
      if (ok) setStep(2);
    } else if (step === 2) {
      const ok = await trigger("products");
      if (ok) setStep(3);
    }
  };

  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const onSubmit = async (data: QuoteFormValues) => {
    setSubmitError(null);
    setIsSending(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!res.ok) {
        setSubmitError(
          payload?.error ?? "Unable to send quote request. Please try again.",
        );
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Unable to send quote request. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-seafoam-500/30 bg-pearl p-10 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-seafoam-500 text-3xl text-white">
          ✓
        </div>
        <h2 className="mt-6 font-display text-2xl font-bold text-navy-900">
          Request received
        </h2>
        <p className="mt-3 text-slate-600">
          Our team will respond within one business day with next steps and
          pricing alignment for your program.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10"
    >
      <StepIndicator current={step} total={3} labels={STEPS} />

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-lg font-medium text-navy-900">I am a…</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {(
              [
                { value: "retailer", label: "Retailer" },
                { value: "wholesaler", label: "Wholesaler" },
                { value: "international", label: "International buyer" },
              ] as const
            ).map((opt) => (
              <label
                key={opt.value}
                className={`cursor-pointer rounded-2xl border-2 p-5 text-center transition ${
                  buyerType === opt.value
                    ? "border-seafoam-500 bg-seafoam-500/10"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  value={opt.value}
                  className="sr-only"
                  {...register("buyerType")}
                />
                <span className="font-display font-bold text-navy-900">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
          {errors.buyerType && (
            <p className="text-sm text-red-600">{errors.buyerType.message}</p>
          )}
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={nextStep}
              className="rounded-full bg-seafoam-500 px-8 py-3 text-sm font-semibold text-white hover:bg-seafoam-600"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p className="text-lg font-medium text-navy-900">
            Which products interest you?
          </p>
          <p className="text-sm text-slate-600">
            Choose from Core Products and Retail Assortment. Add as many as you
            need.
          </p>
          <div>
            <label htmlFor="quote-product-select" className="sr-only">
              Select a product
            </label>
            <select
              id="quote-product-select"
              defaultValue=""
              onChange={(e) => {
                addProduct(e.target.value);
                e.target.value = "";
              }}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-navy-900 focus:border-seafoam-500 focus:outline-none focus:ring-2 focus:ring-seafoam-500/20"
            >
              <option value="" disabled>
                Select a product…
              </option>
              {QUOTE_PRODUCT_GROUPS.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map((opt) => (
                    <option
                      key={opt.id}
                      value={opt.id}
                      disabled={products.includes(opt.id)}
                    >
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          {products.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {products.map((id) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => removeProduct(id)}
                    className="inline-flex items-center gap-2 rounded-full border border-seafoam-500/30 bg-seafoam-500/10 px-3 py-1.5 text-left text-sm text-navy-900 transition hover:border-seafoam-500 hover:bg-seafoam-500/15"
                  >
                    <span>{QUOTE_PRODUCT_LABELS[id] ?? id}</span>
                    <span className="text-slate-500" aria-hidden>
                      ×
                    </span>
                    <span className="sr-only">Remove</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {errors.products && (
            <p className="text-sm text-red-600">{errors.products.message}</p>
          )}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={prevStep}
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-navy-900 hover:bg-slate-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="rounded-full bg-seafoam-500 px-8 py-3 text-sm font-semibold text-white hover:bg-seafoam-600"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Company
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-navy-900 focus:border-seafoam-500 focus:outline-none focus:ring-2 focus:ring-seafoam-500/20"
                {...register("company")}
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.company.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Your name
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-navy-900 focus:border-seafoam-500 focus:outline-none focus:ring-2 focus:ring-seafoam-500/20"
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-navy-900 focus:border-seafoam-500 focus:outline-none focus:ring-2 focus:ring-seafoam-500/20"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Phone
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-navy-900 focus:border-seafoam-500 focus:outline-none focus:ring-2 focus:ring-seafoam-500/20"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Volume / MOQ
            </label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-navy-900 focus:border-seafoam-500 focus:outline-none focus:ring-2 focus:ring-seafoam-500/20"
              placeholder="e.g. 2–5 containers monthly"
              {...register("volume")}
            />
            {errors.volume && (
              <p className="mt-1 text-sm text-red-600">
                {errors.volume.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Order frequency
            </label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-navy-900 focus:border-seafoam-500 focus:outline-none focus:ring-2 focus:ring-seafoam-500/20"
              placeholder="e.g. weekly programs, spot buys"
              {...register("frequency")}
            />
            {errors.frequency && (
              <p className="mt-1 text-sm text-red-600">
                {errors.frequency.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Notes (optional)
            </label>
            <textarea
              rows={4}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-navy-900 focus:border-seafoam-500 focus:outline-none focus:ring-2 focus:ring-seafoam-500/20"
              {...register("message")}
            />
          </div>
          {submitError ? (
            <p className="text-sm text-red-600" role="alert">
              {submitError}
            </p>
          ) : null}
          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={prevStep}
              disabled={isSending}
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-navy-900 hover:bg-slate-50 disabled:opacity-60"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="rounded-full bg-seafoam-500 px-8 py-3 text-sm font-semibold text-white hover:bg-seafoam-600 disabled:opacity-60"
            >
              {isSending ? "Sending…" : "Submit request"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
