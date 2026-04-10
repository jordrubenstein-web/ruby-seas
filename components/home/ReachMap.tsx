"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import L from "leaflet";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  GLOBAL_REACH_LOCATIONS,
  hubPosition,
  labelPosition,
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

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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
  const hub = hubPosition(loc);
  const label = labelPosition(loc);

  const labelIcon = useMemo(
    () =>
      L.divIcon({
        className: "reach-map-label-marker",
        html: `<div class="reach-map-label${showLabels ? " reach-map-label--visible" : ""}">${escapeHtml(loc.name)}</div>`,
        iconSize: [1, 1],
        iconAnchor: [0, 0],
      }),
    [loc.name, showLabels],
  );

  const lineOpacity = showLabels ? 1 : 0;

  return (
    <>
      <CircleMarker
        center={hub}
        radius={radius}
        pathOptions={dotStyle}
        eventHandlers={{
          click: () => {
            map.flyTo(hub, FLY_TO_ZOOM, { duration: FLY_DURATION });
          },
          mouseover: () => setHovered(true),
          mouseout: () => setHovered(false),
        }}
      />
      <Polyline
        positions={[hub, label]}
        pathOptions={{
          color: "rgba(148, 163, 184, 0.85)",
          weight: 1,
          lineCap: "round",
          lineJoin: "round",
          opacity: lineOpacity,
        }}
      />
      <Marker
        position={label}
        icon={labelIcon}
        interactive={false}
        keyboard={false}
        pane="markerPane"
      />
    </>
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
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
      />
      <ZoomSync>
        {GLOBAL_REACH_LOCATIONS.map((loc) => (
          <HubMarker key={loc.id} loc={loc} />
        ))}
      </ZoomSync>
    </MapContainer>
  );
}
