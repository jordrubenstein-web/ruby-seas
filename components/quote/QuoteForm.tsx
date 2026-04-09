"use client";

import { useState } from "react";
import { useForm, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StepIndicator } from "./StepIndicator";

const PRODUCT_OPTIONS = [
  { id: "fish", label: "Wild-caught & responsibly sourced fish" },
  { id: "shellfish", label: "Premium shellfish" },
  { id: "value-added", label: "Value-added & ready meals" },
  { id: "lobster", label: "Bahamas spiny lobster (MSC)" },
] as const;

const formSchema = z.object({
  buyerType: z.enum(["retailer", "wholesaler", "international"], {
    required_error: "Select how you work with us",
  }),
  products: z.array(z.string()).min(1, "Select at least one category"),
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

  const toggleProduct = (id: string) => {
    const next = products.includes(id)
      ? products.filter((p) => p !== id)
      : [...products, id];
    setValue("products", next, { shouldValidate: true });
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

  const onSubmit = (data: QuoteFormValues) => {
    console.log("Quote request:", data);
    setSubmitted(true);
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
            Which categories interest you?
          </p>
          <div className="space-y-2">
            {PRODUCT_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 ${
                  products.includes(opt.id)
                    ? "border-seafoam-500 bg-seafoam-500/10"
                    : "border-slate-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={products.includes(opt.id)}
                  onChange={() => toggleProduct(opt.id)}
                  className="h-4 w-4 rounded border-slate-300 text-seafoam-600 focus:ring-seafoam-500"
                />
                <span className="text-sm text-navy-900">{opt.label}</span>
              </label>
            ))}
          </div>
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
          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={prevStep}
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-navy-900 hover:bg-slate-50"
            >
              Back
            </button>
            <button
              type="submit"
              className="rounded-full bg-seafoam-500 px-8 py-3 text-sm font-semibold text-white hover:bg-seafoam-600"
            >
              Submit request
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
