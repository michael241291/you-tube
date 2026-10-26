"""Generate an SVG map layer (Web Mercator) from Natural Earth 10m countries.

Usage from Python:
    from mapgen import MapGen
    m = MapGen('/path/ne10.geojson')
    svg = m.layer(bbox=(lon0, lat0, lon1, lat1), style={...})
    x, y = m.proj(lon, lat)

World units: W = 100000 across 360 degrees.  Every polygon gets id "<ISO3>_<n>"
(n = polygon index, largest first) and class "land".  Natural Earth data is public domain.
"""
import json, math

W = 100000.0


def proj(lon, lat):
    lat = max(-85.0, min(85.0, lat))
    x = (lon + 180.0) / 360.0 * W
    y = (1 - math.log(math.tan(math.radians(lat)) + 1 / math.cos(math.radians(lat))) / math.pi) / 2 * W
    return x, y


class MapGen:
    def __init__(self, path):
        self.data = json.load(open(path))

    proj = staticmethod(proj)

    def layer(self, bbox, pad=2.0, land='#24324a', stroke='#0b1220', sw=None, colors=None, decimals=1):
        """Return SVG <g> with country polygons intersecting bbox (lon0,lat0,lon1,lat1)."""
        lon0, lat0, lon1, lat1 = bbox
        lon0 -= pad; lat0 -= pad; lon1 += pad; lat1 += pad
        colors = colors or {}
        x0, y1 = proj(lon0, lat0)
        x1, y0 = proj(lon1, lat1)
        span = x1 - x0
        if sw is None:
            sw = span / 1600.0
        out = []
        for f in self.data['features']:
            p = f['properties']
            iso = p.get('ADM0_A3') or p.get('ISO_A3') or 'XXX'
            g = f['geometry']
            polys = g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]
            # keep polygons whose bbox intersects
            kept = []
            for poly in polys:
                ring = poly[0]
                lons = [c[0] for c in ring]; lats = [c[1] for c in ring]
                if max(lons) < lon0 or min(lons) > lon1 or max(lats) < lat0 or min(lats) > lat1:
                    continue
                kept.append(poly)
            if not kept:
                continue
            # sort by area (approx, number of points * extent) largest first
            def ext(poly):
                r = poly[0]
                return (max(c[0] for c in r) - min(c[0] for c in r)) * (max(c[1] for c in r) - min(c[1] for c in r))
            kept.sort(key=ext, reverse=True)
            fill = colors.get(iso, land)
            for i, poly in enumerate(kept):
                d = []
                for ring in poly:
                    pts = []
                    last = None
                    for lon, lat in ring:
                        x, y = proj(lon, lat)
                        q = (round(x, decimals), round(y, decimals))
                        if q != last:
                            pts.append('%g,%g' % q)
                            last = q
                    if len(pts) > 2:
                        d.append('M' + 'L'.join(pts) + 'Z')
                if d:
                    out.append('<path id="%s_%d" class="land c_%s" data-name="%s" fill="%s" stroke="%s" stroke-width="%.2f" stroke-linejoin="round" d="%s"/>' % (
                        iso, i, iso, p.get('NAME', ''), fill, stroke, sw, ''.join(d)))
        return '<g class="map">' + ''.join(out) + '</g>'

    def polys(self, iso):
        """List polygons of a country with their lon/lat centroid, to find e.g. an exclave index."""
        res = []
        for f in self.data['features']:
            p = f['properties']
            if (p.get('ADM0_A3') or p.get('ISO_A3')) != iso:
                continue
            g = f['geometry']
            polys = g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]
            for poly in polys:
                r = poly[0]
                res.append((sum(c[0] for c in r) / len(r), sum(c[1] for c in r) / len(r), len(r)))
        return res
