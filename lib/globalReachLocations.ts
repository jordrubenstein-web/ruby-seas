/** WGS84 centroids for Global Reach map markers. */
export type GlobalReachLocation = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  /** Degrees added to hub to place the label anchor (leader line end). */
  labelOffset: { lat: number; lng: number };
};

/** Hub coordinates [lat, lng] for the dot and flyTo target. */
export function hubPosition(loc: GlobalReachLocation): [number, number] {
  return [loc.lat, loc.lng];
}

/** Label anchor [lat, lng] at end of leader line. */
export function labelPosition(loc: GlobalReachLocation): [number, number] {
  return [loc.lat + loc.labelOffset.lat, loc.lng + loc.labelOffset.lng];
}

export const GLOBAL_REACH_LOCATIONS: GlobalReachLocation[] = [
  { id: "ca", name: "Canada", lat: 56.13, lng: -106.35, labelOffset: { lat: 3.5, lng: -10 } },
  { id: "us", name: "United States", lat: 39.5, lng: -98.35, labelOffset: { lat: 5, lng: 0 } },
  { id: "mx", name: "Mexico", lat: 23.63, lng: -102.55, labelOffset: { lat: 4, lng: -8 } },
  { id: "cu", name: "Cuba", lat: 21.7, lng: -79.0, labelOffset: { lat: 4.5, lng: -9 } },
  { id: "bs", name: "Bahamas", lat: 25.05, lng: -77.35, labelOffset: { lat: 6, lng: -7 } },
  { id: "jm", name: "Jamaica", lat: 18.05, lng: -77.3, labelOffset: { lat: -5.5, lng: -3 } },
  { id: "tc", name: "Turks & Caicos", lat: 21.75, lng: -71.75, labelOffset: { lat: 5, lng: 8 } },
  { id: "ni", name: "Nicaragua", lat: 12.9, lng: -85.2, labelOffset: { lat: 2, lng: -9 } },
  { id: "cr", name: "Costa Rica", lat: 9.7, lng: -84.1, labelOffset: { lat: -4, lng: -7 } },
  { id: "pa", name: "Panama", lat: 8.5, lng: -80.0, labelOffset: { lat: -3.5, lng: 8 } },
  { id: "co", name: "Colombia", lat: 4.6, lng: -74.3, labelOffset: { lat: 4, lng: 8 } },
  { id: "ec", name: "Ecuador", lat: -1.8, lng: -78.2, labelOffset: { lat: -4.5, lng: -8 } },
  { id: "pe", name: "Peru", lat: -9.2, lng: -75.0, labelOffset: { lat: -5, lng: -2 } },
  { id: "br", name: "Brazil", lat: -14.2, lng: -51.9, labelOffset: { lat: -3, lng: 8 } },
  { id: "cl", name: "Chile", lat: -35.7, lng: -71.5, labelOffset: { lat: -6, lng: -5 } },
  { id: "fr", name: "France", lat: 46.5, lng: 2.35, labelOffset: { lat: 3, lng: -4 } },
  { id: "es", name: "Spain", lat: 40.4, lng: -3.75, labelOffset: { lat: 2, lng: 6 } },
  { id: "il", name: "Israel", lat: 31.05, lng: 34.85, labelOffset: { lat: 3.5, lng: 4 } },
  { id: "ae", name: "Dubai", lat: 25.2, lng: 55.27, labelOffset: { lat: 4, lng: -6 } },
  { id: "in", name: "India", lat: 22.0, lng: 78.96, labelOffset: { lat: 4, lng: -6 } },
  { id: "cn", name: "China", lat: 35.0, lng: 104.2, labelOffset: { lat: 5, lng: 0 } },
  { id: "hk", name: "Hong Kong", lat: 22.32, lng: 114.17, labelOffset: { lat: 5, lng: -5 } },
  { id: "vn", name: "Vietnam", lat: 14.1, lng: 108.3, labelOffset: { lat: -3, lng: -6 } },
  { id: "ph", name: "Philippines", lat: 12.9, lng: 122.0, labelOffset: { lat: 6, lng: 6 } },
  { id: "id", name: "Indonesia", lat: -2.5, lng: 113.9, labelOffset: { lat: -5, lng: -8 } },
  { id: "nz", name: "New Zealand", lat: -41.3, lng: 172.0, labelOffset: { lat: -5, lng: 6 } },
];
