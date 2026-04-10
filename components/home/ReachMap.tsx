"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  type GlobalReachLocation,
} from "@/lib/globalReachLocations";

const DOT_RADIUS = 6;
const DOT_RADIUS_HOVER = 8;
const DOT_RADIUS_ACTIVE = 10;
const FLY_TO_ZOOM = 5.5;
const FLY_DURATION = 1;
const DEFAULT_CENTER: [number, number] = [20, 0];
const DEFAULT_ZOOM = 2;

const dotStyle = {
  fillColor: "#22c55e",
  color: "#15803d",
  weight: 1.5,
  fillOpacity: 0.92,
} as const;

export type ReachMapProps = {
  activeId: string | null;
  onActiveIdChange: (id: string | null) => void;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ActiveLocationSync({
  activeId,
  locations,
}: {
  activeId: string | null;
  locations: GlobalReachLocation[];
}) {
  const map = useMap();
  const prevRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (prevRef.current === undefined) {
      prevRef.current = activeId;
      return;
    }
    if (prevRef.current === activeId) return;
    prevRef.current = activeId;

    if (activeId == null) {
      map.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, { duration: FLY_DURATION });
      return;
    }
    const loc = locations.find((l) => l.id === activeId);
    if (loc) {
      map.flyTo(hubPosition(loc), FLY_TO_ZOOM, { duration: FLY_DURATION });
    }
  }, [activeId, locations, map]);

  return null;
}

function NetworkLines({ locations }: { locations: GlobalReachLocation[] }) {
  const map = useMap();
  const [pairKeys, setPairKeys] = useState<string[]>([]);

  const recompute = useCallback(() => {
    const b = map.getBounds();
    if (!b) return;
    const sw = b.getSouthWest();
    const ne = b.getNorthEast();
    const latPad = (ne.lat - sw.lat) * 0.12;
    const lngPad = (ne.lng - sw.lng) * 0.12;
    const minLat = sw.lat - latPad;
    const maxLat = ne.lat + latPad;
    const minLng = sw.lng - lngPad;
    const maxLng = ne.lng + lngPad;

    const inPad = (loc: GlobalReachLocation) =>
      loc.lat >= minLat && loc.lat <= maxLat && loc.lng >= minLng && loc.lng <= maxLng;

    const keys: string[] = [];
    for (let i = 0; i < locations.length; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const a = locations[i];
        const b = locations[j];
        if (inPad(a) || inPad(b)) {
          keys.push(`${a.id}-${b.id}`);
        }
      }
    }
    setPairKeys(keys);
  }, [map, locations]);

  useMapEvents({
    moveend: recompute,
    zoomend: recompute,
  });

  useEffect(() => {
    recompute();
  }, [recompute]);

  const linePairs = useMemo(() => {
    const result: [GlobalReachLocation, GlobalReachLocation][] = [];
    for (let i = 0; i < locations.length; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const a = locations[i];
        const b = locations[j];
        if (pairKeys.includes(`${a.id}-${b.id}`)) {
          result.push([a, b]);
        }
      }
    }
    return result;
  }, [locations, pairKeys]);

  return (
    <>
      {linePairs.map(([a, b]) => (
        <Polyline
          key={`${a.id}-${b.id}`}
          positions={[
            [a.lat, a.lng],
            [b.lat, b.lng],
          ]}
          pathOptions={{
            color: "rgba(212, 175, 55, 0.35)",
            weight: 1.2,
            lineCap: "round",
            lineJoin: "round",
          }}
        />
      ))}
    </>
  );
}

function HubMarker({
  loc,
  activeId,
  onActiveIdChange,
}: {
  loc: GlobalReachLocation;
  activeId: string | null;
  onActiveIdChange: (id: string | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isActive = activeId === loc.id;
  const hub = hubPosition(loc);

  const radius = isActive ? DOT_RADIUS_ACTIVE : hovered ? DOT_RADIUS_HOVER : DOT_RADIUS;

  const labelIcon = useMemo(
    () =>
      L.divIcon({
        className: "reach-map-label-marker",
        html: `<div class="reach-map-label reach-map-label--active">${escapeHtml(loc.name)}</div>`,
        iconSize: [1, 1],
        iconAnchor: [0, 0],
      }),
    [loc.name],
  );

  return (
    <>
      <CircleMarker
        center={hub}
        radius={radius}
        pathOptions={dotStyle}
        eventHandlers={{
          click: () => {
            onActiveIdChange(loc.id);
          },
          mouseover: () => setHovered(true),
          mouseout: () => setHovered(false),
        }}
      />
      {isActive ? (
        <Marker
          position={hub}
          icon={labelIcon}
          interactive={false}
          keyboard={false}
          pane="markerPane"
        />
      ) : null}
    </>
  );
}

export function ReachMap({ activeId, onActiveIdChange }: ReachMapProps) {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      minZoom={2}
      worldCopyJump
      scrollWheelZoom
      className="reach-map-container z-0 h-full w-full rounded-xl"
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
      />
      <NetworkLines locations={GLOBAL_REACH_LOCATIONS} />
      <ActiveLocationSync activeId={activeId} locations={GLOBAL_REACH_LOCATIONS} />
      {GLOBAL_REACH_LOCATIONS.map((loc) => (
        <HubMarker
          key={loc.id}
          loc={loc}
          activeId={activeId}
          onActiveIdChange={onActiveIdChange}
        />
      ))}
    </MapContainer>
  );
}
