"""Photo map: product slug → Instagram frames "<post code>/<frame>" (originals/ig/<code>/<frame>.jpg).
Frames of one colour sit back to back, in the order of `colors[].image` in src/lib/catalog/data.ts.
Frame spec: "CODE/NN" · ("CODE/NN", "t"|"b"|"c") = 3:4 crop gravity · ("CODE/NN", "pack", (x0, y0, x1, y1)) = packshot:
crop that box (fractions) and centre it on a white 3:4 canvas. "NNv" = cover frame of a reel (640 px wide, use sparingly)."""

PACK_WOMEN = ("DdCMQBeqd7-/00", "pack", (0.05, 0.20, 0.95, 0.99))   # crop below the brand lockup
PACK_MEN = ("DdTxIFeqaTV/00", "pack", (0.05, 0.20, 0.95, 0.99))

PRODUCTS = {
  # ── вишиванки: жінкам ──
  "heseky-vyshyvanka": ["DXoVUi5jHGn/01", "DXoVUi5jHGn/03", "DXoVUi5jHGn/00", "DXoVUi5jHGn/02", "DXbxcJ3jK_f/00",
                        "DXbxcJ3jK_f/02", "DV3bYXfDCEw/01", "DV3bYXfDCEw/02", "DV3bYXfDCEw/03", "DV3bYXfDCEw/00"],
  "kvitka-zhinocha": ["DWOJLDhjGLV/00", "DWOJLDhjGLV/03", "DWOJLDhjGLV/02", "DWOJLDhjGLV/01", "DVg0jUnjPCj/01",
                      "DVWpZuqjJ1F/05", "DVWpZuqjJ1F/04", "DVWpZuqjJ1F/06", "DVWpZuqjJ1F/02", "DW9NM3WDKY6/05"],
  "kvitka-kolorova": ["DYmNB9ODDh_/02", "DYmNB9ODDh_/01", "DYmNB9ODDh_/03", "DYmNB9ODDh_/00", "DX7PfIVjOrT/00",  # milk 0–4
                      "DYKi-ABjHBr/01", "DYKi-ABjHBr/02", "DYKi-ABjHBr/00"],                                          # green 5–7
  "lemko-zhinocha": ["DcGjolLDHUK/00", PACK_WOMEN, "DcGjolLDHUK/01", "DcGjolLDHUK/02", "DcGjolLDHUK/03", "DcarHMGtHSt/00v"],
  "lemko-chorna-zhinocha": ["DfceMSnRx4e/00", "Dfce5VsxMeg/00", "DfZ7AYVs_ie/00v", "DfU1PSQRbj3/00v"],
  "kvitka-suknia": ["DWZKXmCjPbF/02", "DWZKXmCjPbF/01", "DWZKXmCjPbF/03", "DWZKXmCjPbF/05", "DWZKXmCjPbF/00",
                    "DWZKXmCjPbF/04", "DW6vvgXDO8k/02"],
  "kvitka-khustyna": ["DclPhW7igeS/03", "DWwbdopDdW8/03", "DWwbdopDdW8/01", "DWwbdopDdW8/02", "DWwbdopDdW8/04",
                      "DclPhW7igeS/00", "DcyLwDeCr2g/01"],
  "korset-palazzo": ["DclPhW7igeS/01", "DclPhW7igeS/02"],
  # ── вишиванки: чоловікам ──
  "lemko-cholovicha": ["DcV2qbeioGl/00", PACK_MEN, "DcV2qbeioGl/01", "DcV2qbeioGl/02"],
  "kvitka-cholovicha": ["DV_HXTvDMLV/00", "DV_HXTvDMLV/01", "DV_HXTvDMLV/02", "DVg0jUnjPCj/00", "DVg0jUnjPCj/02"],
  "lemko-chorna-cholovicha": ["DfZ8OOiMWZU/00", "Dfcegm3RGoQ/00v", ("Dfce5VsxMeg/00", "c")],
  "lliana-sorochka": ["DdZBqf5KMUP/00", "DcyLwDeCr2g/02", "DcyLwDeCr2g/00"],
  # ── текстиль для дому ──
  "zirka-raner": ["Dfj07qaRclk/00", "DRZ5v14DJWg/00", "DSsBYevDIJM/00v"],
  "zirka-komplekt": ["Dfotfi_RRtq/00", "Dfj07qaRclk/00"],
  "rizdvo-komplekt": ["Df2Jmi2RqUW/00", "DRaESDSDHuJ/00", "DRU8tAtjDZr/00v", "DSpuSl2DLyP/00v"],
  "rizdvo-raner": ["DRaGfS5jMvG/00v", "DRaESDSDHuJ/02v", "DRVApvyDPnF/00v"],
  "rizdvo-servetky": ["DR-FNpEDGS_/00v", "DRaESDSDHuJ/03v"],
  "heseky-raner": ["DUvFrB9jLdb/00", "DUlsOKAjKlv/00v", "DVNtBk8jI5Y/00v"],
  "velykden-tekstyl": ["DVnyrBnjIgc/01", "DVnyrBnjIgc/00", "DVnyrBnjIgc/02", "DVnyrBnjIgc/03", "DWHFEiGDOx-/00",
                       "DWHFEiGDOx-/01", "DWHFEiGDOx-/03", "DVnyrBnjIgc/04"],
  "barvinok-rushnyk": ["DVWpZuqjJ1F/00", "DWBGbjojHTP/00", "DVWpZuqjJ1F/01", "DVWpZuqjJ1F/03", "DW9NM3WDKY6/03", "DVWpZuqjJ1F/07"],
  "kvitka-rushnyk": ["DWWRfdLjCPD/00v"],
  "skatertyna-logo": ["DZ7MI1KMucV/00v", ("DZzsMRHM9J1/00", "b"), "DadWq9-MuPq/00v"],
}

# Editorial images (public/images/editorial/<name>.jpg), 3:4 unless listed in WIDE (kept at source ratio, ≤1800 px).
EDITORIAL = {
  "cat-women": "DcGjolLDHUK/00",
  "cat-men": "DV_HXTvDMLV/00",
  "cat-home": "Dfotfi_RRtq/00",
  "cat-easter": "DVWpZuqjJ1F/00",
  "col-lemko": "DcV2qbeioGl/02",
  "col-kvitka": "DVg0jUnjPCj/00",
  "col-heseky": "DXoVUi5jHGn/01",
  "col-zirka": "Dfj07qaRclk/00",
  "col-rizdvo": "Df2Jmi2RqUW/00",
  "col-velykden": "DVnyrBnjIgc/03",
  "col-black": "Dfce5VsxMeg/00",
  "look-kvitka": "DVg0jUnjPCj/02",
  "look-lemko": "DcRO1eTsFx4/00v",
  "story-1": "DcGjolLDHUK/02",
  "story-2": "DcV2qbeioGl/01",
  "story-3": "Db8fiS6MX6r/00v",
  "detail-white": "DVWpZuqjJ1F/06",
  "detail-heseky": "DXoVUi5jHGn/02",
  "detail-teflon": "DVnyrBnjIgc/02",
  "pack-1": "DRetknhDOdF/00",
  "pack-2": "DWQ-auUjCar/00v",
  "custom-1": "DZ7MI1KMucV/00v",
  "custom-2": "DadWq9-MuPq/00v",
  "rikka-1": "DW9NM3WDKY6/04",
  "rikka-2": "DW9NM3WDKY6/01",
  "market-1": "DWbL_rjDfhW/00",
  "market-2": "DWbL_rjDfhW/03",
  "black-1": "DfceMSnRx4e/00",
  "black-2": "DfZ8OOiMWZU/00",
  "dress-1": "DWZKXmCjPbF/02",
  "khustyna-1": "DclPhW7igeS/01",
  "green-1": "DYKi-ABjHBr/02",
  # Instagram strip
  "ig-1": "DcGjolLDHUK/01", "ig-2": "DYmNB9ODDh_/02", "ig-3": "DV_HXTvDMLV/01", "ig-4": "DWZKXmCjPbF/03",
  "ig-5": "Dfj07qaRclk/00", "ig-6": "DXbxcJ3jK_f/02", "ig-7": "DclPhW7igeS/00", "ig-8": "DYKi-ABjHBr/00",
  "ig-9": "DVWpZuqjJ1F/03", "ig-10": "DcV2qbeioGl/00", "ig-11": "DWwbdopDdW8/03", "ig-12": "DfceMSnRx4e/00",
}
WIDE = set()
