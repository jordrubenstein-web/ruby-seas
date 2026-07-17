import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@/lib/constants";
import { CTABand } from "@/components/shared/CTABand";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Ruby Seas International, Ruby Seas USA, and Retail — offices in Toronto and Buffalo.",
};

export default function ContactPage() {
  return (
    <>
      <div className="border-b border-slate-100 bg-gradient-to-b from-navy-900 to-navy-800 pt-28 pb-16 text-center">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-seafoam-400">
            Get in touch
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Reach our international, USA, and retail teams — or{" "}
            <Link
              href="/get-a-quote"
              className="font-medium text-seafoam-400 underline-offset-4 hover:underline"
            >
              request a quote
            </Link>{" "}
            and we&apos;ll respond within one business day.
          </p>
        </div>
      </div>

      <section className="section-py bg-pearl">
        <div className="mx-auto grid max-w-content gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <address className="not-italic rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-lg font-bold text-navy-900">
              International
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {CONTACT.international.name}
              <br />
              {CONTACT.international.address}
              <br />
              {CONTACT.international.city}
            </p>
            <p className="mt-4 text-sm text-slate-600">
              <a
                href={`tel:${CONTACT.international.phone.replace(/\D/g, "")}`}
                className="font-medium text-seafoam-600 hover:text-seafoam-700"
              >
                {CONTACT.international.phone}
              </a>
              <br />
              Fax: {CONTACT.international.fax}
            </p>
          </address>

          <address className="not-italic rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-lg font-bold text-navy-900">USA</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {CONTACT.usa.name}
              <br />
              {CONTACT.usa.address}
              <br />
              {CONTACT.usa.city}
            </p>
            <p className="mt-4 text-sm text-slate-600">
              <a
                href={`tel:${CONTACT.usa.phone.replace(/\D/g, "")}`}
                className="font-medium text-seafoam-600 hover:text-seafoam-700"
              >
                {CONTACT.usa.phone}
              </a>
              <br />
              Alt:{" "}
              <a
                href={`tel:${CONTACT.usa.alt.replace(/\D/g, "")}`}
                className="font-medium text-seafoam-600 hover:text-seafoam-700"
              >
                {CONTACT.usa.alt}
              </a>
            </p>
          </address>

          <address className="not-italic rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-lg font-bold text-navy-900">
              Retail
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {CONTACT.retail.name}
            </p>
            <p className="mt-4 text-sm text-slate-600">
              <a
                href={`tel:${CONTACT.retail.phone.replace(/\D/g, "")}`}
                className="font-medium text-seafoam-600 hover:text-seafoam-700"
              >
                {CONTACT.retail.phone}
              </a>
              <br />
              Fax: {CONTACT.retail.fax}
            </p>
          </address>
        </div>
      </section>

      <CTABand />
    </>
  );
}
