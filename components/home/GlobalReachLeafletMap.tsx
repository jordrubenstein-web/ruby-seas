"use client";

import { useEffect, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { GLOBAL_REACH_MARKERS } from "@/lib/constants";
import {
  GLOBAL_REACH_FOCUS_ZOOM,
  GLOBAL_REACH_TOOLTIP_OFFSET,
} from "@/lib/globalReachMapLayout";
import "leaflet/dist/leaflet.css";

export type GlobalReachLeafletMapProps = {
  selectedId: string | null;
  hoveredId: string | null;
  onSelectId: (id: string | null) => void;
  onHoverId: (id: string | null) => void;
};

function FlyToSelection({ selectedId }: { selectedId: string | null }) {
  const map = useMap();
  useEffect(() => {
    if (!selectedId) return;
    const m = GLOBAL_REACH_MARKERS.find((x) => x.id === selectedId);
    if (!m) return;
    const lat = m.coordinates[1];
    const lng = m.coordinates[0];
    const zoom = GLOBAL_REACH_FOCUS_ZOOM[selectedId] ?? 5;
    map.flyTo([lat, lng], zoom, { duration: 0.85 });
  }, [selectedId, map]);
  return null;
}

export function GlobalReachLeafletMap({
  selectedId,
  hoveredId,
  onSelectId,
  onHoverId,
}: GlobalReachLeafletMapProps) {
  const [permanentLabels, setPermanentLabels] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setPermanentLabels(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <MapContainer
      center={[18, 20]}
      zoom={2}
      minZoom={2}
      maxZoom={10}
      maxBounds={[
        [-70, -200],
        [85, 200],
      ]}
      maxBoundsViscosity={0.85}
      scrollWheelZoom
      worldCopyJump
      className="global-reach-map z-0 h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
      />
      <FlyToSelection selectedId={selectedId} />
      {GLOBAL_REACH_MARKERS.map((m) => {
        const latlng: LatLngExpression = [m.coordinates[1], m.coordinates[0]];
        const isOn = selectedId === m.id || hoveredId === m.id;
        const off = GLOBAL_REACH_TOOLTIP_OFFSET[m.id] ?? [0, -10];
        return (
          <CircleMarker
            key={m.id}
            center={latlng}
            radius={isOn ? 7 : 5}
            pathOptions={{
              color: isOn ? "#5eead4" : "#c2410c",
              fillColor: isOn ? "#2dd4bf" : "#f97316",
              fillOpacity: 0.9,
              weight: isOn ? 2.5 : 1.5,
            }}
            eventHandlers={{
              click: () => {
                onSelectId(selectedId === m.id ? null : m.id);
              },
              mouseover: () => onHoverId(m.id),
              mouseout: () => onHoverId(null),
            }}
          >
            <Tooltip
              permanent={permanentLabels}
              direction="top"
              offset={off}
              opacity={1}
              className="global-reach-marker-tip"
            >
              {m.name}
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
