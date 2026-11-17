"""Builds public/images/products/<slug>/NN.jpg and public/images/editorial/*.jpg (3:4, ≤1200×1600, q84) from originals/ig.
Run: ~/Desktop/nudes/research/.venv/bin/python -I scripts/build_images.py   (needs Pillow)"""
import json, shutil, sys
from pathlib import Path
from PIL import Image, ImageOps
sys.path.insert(0, str(Path(__file__).resolve().parent))
from catalog_images import EDITORIAL, PRODUCTS

ROOT = Path(__file__).resolve().parent.parent
IG = ROOT / "originals/ig"
OUT = ROOT / "public/images/products"
ED = ROOT / "public/images/editorial"


def crop34(im, g="c"):
    w, h = im.size
    if w / h > 0.75:
        nw = round(h * 0.75); x = (w - nw) // 2
        return im.crop((x, 0, x + nw, h))
    nh = round(w / 0.75)
    y = {"t": 0, "b": h - nh}.get(g, (h - nh) // 2)
    return im.crop((0, y, w, y + nh))


def packshot(im, box):
    w, h = im.size
    part = im.crop((round(box[0] * w), round(box[1] * h), round(box[2] * w), round(box[3] * h)))
    cw = max(part.width, round(part.height * 0.75)) + 80
    ch = round(cw / 0.75)
    canvas = Image.new("RGB", (cw, ch), (255, 255, 255))
    canvas.paste(part, ((cw - part.width) // 2, (ch - part.height) // 2))
    return canvas


def save(spec, dst):
    name, mode, box = (spec, "c", None) if isinstance(spec, str) else (spec + (None,))[:3]
    im = ImageOps.exif_transpose(Image.open(IG / f"{name}.jpg")).convert("RGB")
    im = packshot(im, box) if mode == "pack" else crop34(im, mode)
    if im.width > 1200:
        im = im.resize((1200, 1600), Image.LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    im.save(dst, "JPEG", quality=84, optimize=True, progressive=True)


if __name__ == "__main__":
    shutil.rmtree(OUT, ignore_errors=True)
    shutil.rmtree(ED, ignore_errors=True)
    for name, f in EDITORIAL.items():
        save(f, ED / f"{name}.jpg")
    counts = {}
    for slug, frames in PRODUCTS.items():
        for i, f in enumerate(frames):
            save(f, OUT / slug / f"{i + 1:02d}.jpg")
        counts[slug] = len(frames)
    (ROOT / "src/lib/catalog/image-counts.json").write_text(json.dumps(counts, indent=1))
    print(len(counts), "products", sum(counts.values()), "photos")
