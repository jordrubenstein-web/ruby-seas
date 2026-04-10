"use client";

import { useEffect, useRef } from "react";
import type * as Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { GLOBAL_REACH_LOCATIONS, hubPosition } from "@/lib/globalReachLocations";

const DOT_RADIUS = 6;
const DOT_RADIUS_HOVER = 8;
const DOT_RADIUS_ACTIVE = 10;
const FLY_TO_ZOOM = 5.5;
const FLY_DURATION = 1;
const DEFAULT_CENTER: Leaflet.LatLngExpression = [20, 0];
const DEFAULT_ZOOM = 2;

/**
 * CARTO basemap (OSM data) — often more reliable than direct OSM tile servers
 * when corporate networks throttle openstreetmap.org.
 */
const TILE_URL =
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

const dotStyle: Leaflet.CircleMarkerOptions = {
  fillColor: "#2B8A7E",
  color: "#0F2341",
  weight: 2,
  fillOpacity: 0.92,
};

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

type MapState = {
  markers: Map<string, Leaflet.CircleMarker>;
  labelMarker: Leaflet.Marker | null;
  hoveredId: string | null;
};

function createEmptyState(): MapState {
  return {
    markers: new Map(),
    labelMarker: null,
    hoveredId: null,
  };
}

type LeafletModule = typeof import("leaflet");

function getLeafletNamespace(mod: LeafletModule & { default?: LeafletModule }): LeafletModule {
  const candidate = mod.default ?? mod;
  if (typeof candidate?.map !== "function") {
    console.error("[ReachMap] Leaflet namespace missing .map", mod);
  }
  return candidate;
}

export function ReachMap({ activeId, onActiveIdChange }: ReachMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const leafletRef = useRef<LeafletModule | null>(null);
  const stateRef = useRef<MapState>(createEmptyState());

  const onActiveIdChangeRef = useRef(onActiveIdChange);
  onActiveIdChangeRef.current = onActiveIdChange;

  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  const applyMarkerRadii = (currentActive: string | null) => {
    const { markers, hoveredId } = stateRef.current;
    for (const loc of GLOBAL_REACH_LOCATIONS) {
      const cm = markers.get(loc.id);
      if (!cm) continue;
      const r =
        loc.id === currentActive
          ? DOT_RADIUS_ACTIVE
          : loc.id === hoveredId
            ? DOT_RADIUS_HOVER
            : DOT_RADIUS;
      cm.setRadius(r);
    }
  };

  const syncLabel = (map: Leaflet.Map, currentActive: string | null) => {
    const L = leafletRef.current;
    if (!L) return;
    const old = stateRef.current.labelMarker;
    if (old) {
      map.removeLayer(old);
      stateRef.current.labelMarker = null;
    }
    if (currentActive == null) return;
    const loc = GLOBAL_REACH_LOCATIONS.find((l) => l.id === currentActive);
    if (!loc) return;
    const m = L.marker(hubPosition(loc), {
      icon: L.divIcon({
        className: "reach-map-label-marker",
        html: `<div class="reach-map-label reach-map-label--active">${escapeHtml(loc.name)}</div>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      }),
      interactive: false,
      keyboard: false,
      pane: "markerPane",
    }).addTo(map);
    stateRef.current.labelMarker = m;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    let ro: ResizeObserver | null = null;
    let onWinResize: (() => void) | null = null;

    const runInit = (L: LeafletModule, node: HTMLDivElement) => {
      if (cancelled || !node.isConnected) return;
      if (typeof L.map !== "function") return;

      leafletRef.current = L;

      const map = L.map(node, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        minZoom: 2,
        worldCopyJump: true,
        scrollWheelZoom: true,
        preferCanvas: false,
      });
      mapRef.current = map;

      L.tileLayer(TILE_URL, {
        attribution: TILE_ATTRIBUTION,
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      const markers = new Map<string, Leaflet.CircleMarker>();
      for (const loc of GLOBAL_REACH_LOCATIONS) {
        const cm = L.circleMarker(hubPosition(loc), {
          radius: DOT_RADIUS,
          ...dotStyle,
        });
        cm.on("click", (e) => {
          L.DomEvent.stopPropagation(e);
          onActiveIdChangeRef.current(loc.id);
        });
        cm.on("mouseover", () => {
          stateRef.current.hoveredId = loc.id;
          applyMarkerRadii(activeIdRef.current);
        });
        cm.on("mouseout", () => {
          stateRef.current.hoveredId = null;
          applyMarkerRadii(activeIdRef.current);
        });
        cm.addTo(map);
        markers.set(loc.id, cm);
      }
      stateRef.current.markers = markers;

      const refreshSize = () => {
        if (!cancelled && mapRef.current) {
          mapRef.current.invalidateSize({ animate: false });
        }
      };
      map.whenReady(() => {
        refreshSize();
        window.setTimeout(refreshSize, 50);
        window.setTimeout(refreshSize, 200);
      });
      requestAnimationFrame(() => {
        refreshSize();
        requestAnimationFrame(refreshSize);
      });
      window.setTimeout(refreshSize, 250);
      window.setTimeout(refreshSize, 600);
      window.setTimeout(refreshSize, 1200);

      ro =
        typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(() => refreshSize())
          : null;
      if (ro) ro.observe(node);

      onWinResize = () => refreshSize();
      window.addEventListener("resize", onWinResize, { passive: true });

      applyMarkerRadii(activeIdRef.current);
      syncLabel(map, activeIdRef.current);
    };

    void import("leaflet")
      .then((leafletMod) => {
        if (cancelled) return;
        const node = containerRef.current;
        if (!node?.isConnected) return;
        const L = getLeafletNamespace(
          leafletMod as LeafletModule & { default?: LeafletModule },
        );
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (cancelled || !containerRef.current?.isConnected) return;
            runInit(L, containerRef.current);
          });
        });
      })
      .catch((err) => {
        console.error("[ReachMap] Failed to load Leaflet", err);
      });

    return () => {
      cancelled = true;
      if (onWinResize) window.removeEventListener("resize", onWinResize);
      ro?.disconnect();
      const map = mapRef.current;
      if (stateRef.current.labelMarker && map) {
        map.removeLayer(stateRef.current.labelMarker);
        stateRef.current.labelMarker = null;
      }
      for (const cm of stateRef.current.markers.values()) {
        if (map) map.removeLayer(cm);
      }
      stateRef.current.markers.clear();
      if (map) {
        map.remove();
      }
      mapRef.current = null;
      leafletRef.current = null;
      stateRef.current = createEmptyState();
    };
  }, []);

  const prevActiveRef = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !leafletRef.current) return;

    if (prevActiveRef.current === undefined) {
      prevActiveRef.current = activeId;
      applyMarkerRadii(activeId);
      syncLabel(map, activeId);
      return;
    }
    if (prevActiveRef.current === activeId) return;
    prevActiveRef.current = activeId;

    if (activeId == null) {
      map.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, { duration: FLY_DURATION });
    } else {
      const loc = GLOBAL_REACH_LOCATIONS.find((l) => l.id === activeId);
      if (loc) {
        map.flyTo(hubPosition(loc), FLY_TO_ZOOM, { duration: FLY_DURATION });
      }
    }
    applyMarkerRadii(activeId);
    syncLabel(map, activeId);
  }, [activeId]);

  return (
    <div
      ref={containerRef}
      className="reach-map-container z-0 h-full w-full min-h-[280px] rounded-xl md:min-h-[320px]"
      style={{ height: "100%", width: "100%" }}
    />
  );
}
