"""Cuts the BASAMUNKA lockup from post DdCMQBeqd7- (white background) into public/brand:
logo.png (orange mark + black word), logo-white.png (orange mark + white word), mark.png (U only), icons."""
from pathlib import Path
from PIL import Image, ImageDraw
import numpy as np
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public/brand"; OUT.mkdir(parents=True, exist_ok=True)
im = Image.open(ROOT / "originals/ig/DdCMQBeqd7-/00.jpg").convert("RGB")
a = np.asarray(im.crop((470, 80, 890, 310))).astype(float)
# alpha = darkness vs white background
alpha = np.clip((238 - a.min(axis=2)) * 1.25, 0, 255)
ys, xs = np.where(alpha > 30)
y0, y1, x0, x1 = max(0, ys.min() - 4), ys.max() + 5, max(0, xs.min() - 4), xs.max() + 5; print(y0, y1, x0, x1)
a, alpha = a[y0:y1, x0:x1], alpha[y0:y1, x0:x1]
orange = (a[..., 0] - a[..., 2]) > 60          # the U + diamond
def build(word_rgb):
    rgb = np.zeros(a.shape)
    rgb[...] = word_rgb
    rgb[orange] = (241, 93, 21)
    return Image.fromarray(np.dstack([rgb, alpha]).astype("uint8"))
for name, col in [("logo", (20, 16, 12)), ("logo-white", (255, 255, 255))]:
    img = build(col); img = img.resize((img.width * 3, img.height * 3), Image.LANCZOS); img.save(OUT / f"{name}.png", optimize=True)
    print(name, img.size)
# mark: rows that contain orange
rows = np.where(orange.any(axis=1))[0]
m = build((20, 16, 12)).crop((0, 0, a.shape[1], rows.max() + 3))
bb = Image.fromarray((np.asarray(m)[..., 3] * (np.asarray(m)[..., 0] > 200)).astype("uint8")).getbbox()
m = m.crop(bb); m = m.resize((m.width * 4, m.height * 4), Image.LANCZOS); m.save(OUT / "mark.png"); print("mark", m.size)
for size, name in [(32, "icon-32.png"), (512, "icon-512.png"), (180, "apple-icon.png")]:
    c = Image.new("RGBA", (size, size), (51, 30, 13, 255))
    mm = m.copy(); s = size * 0.62 / mm.height; mm = mm.resize((max(1, round(mm.width * s)), round(mm.height * s)), Image.LANCZOS)
    c.alpha_composite(mm, ((size - mm.width) // 2, (size - mm.height) // 2)); c.convert("RGB").save(OUT / name)
