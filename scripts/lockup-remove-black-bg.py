#!/usr/bin/env python3
"""
Remove near-uniform black (or corner-matched) background from the lockup PNG.
Writes public/ruby-seas-lockup-transparent.png — requires Pillow.

Run from repo root: python3 scripts/lockup-remove-black-bg.py
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "ruby-seas-lockup-on-black.png"
OUT = ROOT / "public" / "ruby-seas-lockup-transparent.png"

# Pixels within this Euclidean distance of the sampled background RGB become transparent.
DIST_THRESHOLD = 52


def sample_bg_rgb(img: Image.Image) -> tuple[int, int, int]:
    w, h = img.size
    samples = [
        img.getpixel((0, 0)),
        img.getpixel((w - 1, 0)),
        img.getpixel((0, h - 1)),
        img.getpixel((w - 1, h - 1)),
    ]
    r = sum(p[0] for p in samples) // len(samples)
    g = sum(p[1] for p in samples) // len(samples)
    b = sum(p[2] for p in samples) // len(samples)
    return r, g, b


def main() -> None:
    if not SRC.is_file():
        raise SystemExit(f"Missing source: {SRC}")

    img = Image.open(SRC).convert("RGBA")
    br, bg, bb = sample_bg_rgb(img)
    px = img.load()
    w, h = img.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            dist = ((r - br) ** 2 + (g - bg) ** 2 + (b - bb) ** 2) ** 0.5
            if dist < DIST_THRESHOLD:
                px[x, y] = (r, g, b, 0)

    img.save(OUT, optimize=True)
    print(f"Wrote {OUT} ({w}x{h}) bg=({br},{bg},{bb})")


if __name__ == "__main__":
    main()
