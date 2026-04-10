#!/usr/bin/env python3
"""
Build public/ruby-seas-logo-transparent.png from public/ruby-seas-logo-source.jpg
(Gemini / official lockup). Removes bright neutral backgrounds (white + light gray).
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "ruby-seas-logo-source.jpg"
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
            luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
            # Drop bright, low-saturation pixels (white / gray “checkerboard” backgrounds).
            if luma >= 218 and sat < 0.14:
                px[x, y] = (0, 0, 0, 0)
            elif r >= 248 and g >= 248 and b >= 248 and sat < 0.12:
                px[x, y] = (0, 0, 0, 0)

    img.save(OUT, optimize=True)
    print(f"Wrote {OUT} ({w}x{h})")


if __name__ == "__main__":
    main()
