/** WGS84 centroids for Global Reach map markers. */
export type GlobalReachLocation = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

/** Hub coordinates [lat, lng] for the dot and flyTo target. */
export function hubPosition(loc: GlobalReachLocation): [number, number] {
  return [loc.lat, loc.lng];
}

export const GLOBAL_REACH_LOCATIONS: GlobalReachLocation[] = [
  { id: "ca", name: "Canada", lat: 56.13, lng: -106.35 },
  { id: "us", name: "United States", lat: 39.5, lng: -98.35 },
  { id: "mx", name: "Mexico", lat: 23.63, lng: -102.55 },
  { id: "cu", name: "Cuba", lat: 21.7, lng: -79.0 },
  { id: "bs", name: "Bahamas", lat: 25.05, lng: -77.35 },
  { id: "jm", name: "Jamaica", lat: 18.05, lng: -77.3 },
  { id: "tc", name: "Turks & Caicos", lat: 21.75, lng: -71.75 },
  { id: "ni", name: "Nicaragua", lat: 12.9, lng: -85.2 },
  { id: "cr", name: "Costa Rica", lat: 9.7, lng: -84.1 },
  { id: "pa", name: "Panama", lat: 8.5, lng: -80.0 },
  { id: "co", name: "Colombia", lat: 4.6, lng: -74.3 },
  { id: "ec", name: "Ecuador", lat: -1.8, lng: -78.2 },
  { id: "pe", name: "Peru", lat: -9.2, lng: -75.0 },
  { id: "br", name: "Brazil", lat: -14.2, lng: -51.9 },
  { id: "cl", name: "Chile", lat: -35.7, lng: -71.5 },
  { id: "fr", name: "France", lat: 46.5, lng: 2.35 },
  { id: "es", name: "Spain", lat: 40.4, lng: -3.75 },
  { id: "il", name: "Israel", lat: 31.05, lng: 34.85 },
  { id: "ae", name: "Dubai (UAE)", lat: 25.2, lng: 55.27 },
  { id: "in", name: "India", lat: 22.0, lng: 78.96 },
  { id: "cn", name: "China", lat: 35.0, lng: 104.2 },
  { id: "hk", name: "Hong Kong", lat: 22.32, lng: 114.17 },
  { id: "vn", name: "Vietnam", lat: 14.1, lng: 108.3 },
  { id: "ph", name: "Philippines", lat: 12.9, lng: 122.0 },
  { id: "id", name: "Indonesia", lat: -2.5, lng: 113.9 },
  { id: "nz", name: "New Zealand", lat: -41.3, lng: 172.0 },
];
