# Ruby Seas — Corporate Site

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.

## Setup

```bash
cd ruby-seas
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — ESLint

## Structure

- `app/` — routes: `/`, `/products`, `/about`, `/get-a-quote`
- `components/` — UI by section (nav, home, products, about, quote, shared)
- `lib/` — copy data, motion variants
- `hooks/` — `useCountUp` for stats animation

## Notes

- Hero and product imagery use `next/image` with `images.unsplash.com` (see `next.config.mjs`).
- Optional hero loop: set `NEXT_PUBLIC_HERO_VIDEO_URL` to a muted MP4/WebM URL; poster falls back to the static hero image.
- Quote form submits to `console.log` — wire to your API or email service.
