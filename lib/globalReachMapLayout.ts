/** Fly-to zoom when a market is selected from the directory (Leaflet zoom level). */
export const GLOBAL_REACH_FOCUS_ZOOM: Partial<Record<string, number>> = {
  bs: 7,
  tc: 8,
  cu: 6,
  jm: 7,
  ni: 6,
  cr: 7,
  pa: 7,
  hk: 8,
  ae: 7,
  il: 6,
  nz: 5,
  ph: 6,
  vn: 5,
};

/** Tooltip pixel offset [x, y] to reduce overlap in dense regions (Cartesian, Leaflet convention). */
export const GLOBAL_REACH_TOOLTIP_OFFSET: Partial<
  Record<string, readonly [number, number]>
> = {
  bs: [10, -6],
  tc: [-18, -8],
  cu: [-6, -12],
  jm: [12, 2],
  ni: [0, -10],
  cr: [8, -8],
  pa: [14, 0],
  co: [0, -10],
  ec: [-10, -6],
  hk: [16, -4],
  vn: [-20, -6],
  ph: [12, -6],
  id: [0, -12],
};
