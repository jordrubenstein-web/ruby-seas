# Interactive 3D splash logo

## Setup

From the repo root:

```bash
npm install
```

Dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`.

## Optional Blender GLB

Place `ruby-seas-globe.glb` in `public/models/` and set in `.env.local`:

```bash
NEXT_PUBLIC_USE_LOGO_GLB=1
```

Otherwise the splash uses **procedural** geometry in `GlobeModel.tsx` (no binary asset).

## Performance checklist (targets)

| Check | Target | How |
|-------|--------|-----|
| Triangles | &lt; 5k procedural | Chrome DevTools → `renderer.info.render.triangles` on the canvas |
| Draw calls | &lt; 15 | `renderer.info.render.calls` |
| Frame budget | &lt; 16 ms | Performance panel, no long tasks |
| Bundle | R3F chunk lazy | Splash uses `dynamic(..., { ssr: false })` |
| LCP | Minimal regression | Lighthouse on `/` after warm load |

If the procedural scene is heavy on low-end devices, reduce `dpr` in `Logo3DScene.tsx` to `[1, 1.5]` or simplify wave `torusGeometry` segments.

## Troubleshooting

- **Black canvas:** ensure `gl={{ alpha: true }}` and parent has no opaque background over the video.
- **ScrollTrigger not updating:** call `ScrollTrigger.refresh()` after fonts load or layout shifts.
- **GLB load errors:** unset `NEXT_PUBLIC_USE_LOGO_GLB` until a valid file exists.
