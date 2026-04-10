# 3D logo models

- **`ruby-seas-globe.glb`** (optional): Drop a Blender-exported, Draco-compressed glTF binary here to replace the built-in procedural globe. If present, set `NEXT_PUBLIC_USE_LOGO_GLB=1` in `.env.local` to load it via `useGLTF` (see `GlobeModel.tsx`).
- Until then, the splash uses **procedural geometry** in React Three Fiber (no external file required).
