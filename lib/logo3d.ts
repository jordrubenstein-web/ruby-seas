/** Optional path for a future Blender-exported lockup (see public/models/README.md). */
export const LOGO_GLB_PATH = "/models/ruby-seas-globe.glb";

/** When true, GlobeModel loads the GLB instead of procedural meshes. */
export const USE_LOGO_GLB =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_USE_LOGO_GLB === "1";
