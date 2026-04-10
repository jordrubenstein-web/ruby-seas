#!/usr/bin/env python3
"""
Remove near-white background from the full-color lockup PNG.
Outputs public/ruby-seas-logo-transparent.png (no new npm deps; requires Pillow).
Run from repo root: python3 scripts/make-logo-transparent.py
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "ruby-seas-logo.png"
OUT = ROOT / "public" / "ruby-seas-logo-transparent.png"


def main() -> None:
    if not SRC.is_file():
        raise SystemExit(f"Missing source: {SRC}")

    img = Image.open(SRC).convert("RGBA")
    px = img.load()
    w, h = img.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            mx = max(r, g, b)
            mn = min(r, g, b)
            sat = (mx - mn) / mx if mx else 0.0
            # Flat near-white (background); keep saturated pixels (globe, text, ruby).
            if r >= 248 and g >= 248 and b >= 248 and sat < 0.12:
                px[x, y] = (r, g, b, 0)
            elif r >= 253 and g >= 253 and b >= 253:
                px[x, y] = (r, g, b, 0)

    img.save(OUT, optimize=True)
    print(f"Wrote {OUT} ({w}x{h})")


if __name__ == "__main__":
    main()
