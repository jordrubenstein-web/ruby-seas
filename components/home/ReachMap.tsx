"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  GLOBAL_REACH_LOCATIONS,
  type GlobalReachLocation,
} from "@/lib/globalReachLocations";

const LABEL_ZOOM_THRESHOLD = 4;
const DOT_RADIUS = 6;
const DOT_RADIUS_HOVER = 8;
const FLY_TO_ZOOM = 5.5;
const FLY_DURATION = 1;

const dotStyle = {
  fillColor: "#22c55e",
  color: "#15803d",
  weight: 1.5,
  fillOpacity: 0.92,
} as const;

const ReachMapZoomContext = createContext(false);

function ZoomSync({ children }: { children: ReactNode }) {
  const map = useMap();
  const [zoom, setZoom] = useState(() => map.getZoom());

  useMapEvents({
    zoom: () => setZoom(map.getZoom()),
    zoomend: () => setZoom(map.getZoom()),
  });

  const showLabels = zoom >= LABEL_ZOOM_THRESHOLD;
  return (
    <ReachMapZoomContext.Provider value={showLabels}>
      {children}
    </ReachMapZoomContext.Provider>
  );
}

function HubMarker({ loc }: { loc: GlobalReachLocation }) {
  const map = useMap();
  const showLabels = useContext(ReachMapZoomContext);
  const [hovered, setHovered] = useState(false);

  const radius = hovered ? DOT_RADIUS_HOVER : DOT_RADIUS;

  const tooltipClass = `reach-map-tooltip${showLabels ? " reach-map-tooltip--visible" : ""}`;

  return (
    <CircleMarker
      center={[loc.lat, loc.lng]}
      radius={radius}
      pathOptions={dotStyle}
      eventHandlers={{
        click: () => {
          map.flyTo([loc.lat, loc.lng], FLY_TO_ZOOM, { duration: FLY_DURATION });
        },
        mouseover: () => setHovered(true),
        mouseout: () => setHovered(false),
      }}
    >
      <Tooltip permanent direction="top" offset={[0, -6]} className={tooltipClass}>
        {loc.name}
      </Tooltip>
    </CircleMarker>
  );
}

export function ReachMap() {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      minZoom={2}
      worldCopyJump
      scrollWheelZoom
      className="reach-map-container z-0 h-full w-full rounded-xl"
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomSync>
        {GLOBAL_REACH_LOCATIONS.map((loc) => (
          <HubMarker key={loc.id} loc={loc} />
        ))}
      </ZoomSync>
    </MapContainer>
  );
}
