import Image from "next/image";
import Link from "next/link";
import { CONTACT, SITE_LOGO, SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white pb-28 pt-16">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block max-w-full">
              <Image
                src={SITE_LOGO.src}
                alt={SITE_LOGO.alt}
                width={SITE_LOGO.width}
                height={SITE_LOGO.height}
                className="h-12 w-auto max-w-full object-contain object-left sm:h-14"
                sizes="(max-width: 768px) 280px, 320px"
              />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Integrity, transparency, and scale — global seafood supply across
              major trade lanes and cold-chain hubs.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              International
            </h3>
            <address className="mt-3 not-italic text-sm text-slate-600">
              {CONTACT.international.name}
              <br />
              {CONTACT.international.address}
              <br />
              {CONTACT.international.city}
              <br />
              <a href={`tel:${CONTACT.international.phone.replace(/\D/g, "")}`} className="hover:text-seafoam-600">
                {CONTACT.international.phone}
              </a>
            </address>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              USA
            </h3>
            <address className="mt-3 not-italic text-sm text-slate-600">
              {CONTACT.usa.name}
              <br />
              {CONTACT.usa.address}
              <br />
              {CONTACT.usa.city}
              <br />
              <a href={`tel:${CONTACT.usa.phone.replace(/\D/g, "")}`} className="hover:text-seafoam-600">
                {CONTACT.usa.phone}
              </a>
            </address>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Navigate
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-slate-600 hover:text-seafoam-600">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/#global-reach" className="text-slate-600 hover:text-seafoam-600">
                  Global reach
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-seafoam-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/get-a-quote" className="font-medium text-seafoam-600 hover:text-seafoam-700">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p>EU & FDA compliant exports · MSC-certified fisheries where stated</p>
        </div>
      </div>
    </footer>
  );
}
