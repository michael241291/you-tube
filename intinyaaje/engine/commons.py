"""Search & download freely licensed images from Wikimedia Commons.

python3 commons.py search "<query>" <outdir> [n]   -> downloads up to n candidates (1400px) + meta.json
Only keeps licenses: CC0, Public domain, CC BY, CC BY-SA (attribution goes in the video description).
"""
import json, os, re, sys, urllib.parse, urllib.request

API = 'https://commons.wikimedia.org/w/api.php'
UA = {'User-Agent': 'intinyaaje-shorts/1.0 (educational shorts; contact via YouTube @intinyaaje)'}
OK = re.compile(r'^(cc0|public domain|pd|cc by(-sa)? ?\d|cc-by(-sa)?-\d)', re.I)


def get(params):
    url = API + '?' + urllib.parse.urlencode(params)
    return json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30))


def search(q, out, n=8):
    os.makedirs(out, exist_ok=True)
    r = get({'action': 'query', 'format': 'json', 'generator': 'search', 'gsrsearch': q + ' filetype:bitmap',
             'gsrnamespace': 6, 'gsrlimit': 30, 'prop': 'imageinfo', 'iiprop': 'url|extmetadata|size',
             'iiurlwidth': 1400})
    pages = sorted(r.get('query', {}).get('pages', {}).values(), key=lambda p: p.get('index', 99))
    meta, k = [], 0
    for p in pages:
        ii = p.get('imageinfo', [{}])[0]
        em = ii.get('extmetadata', {})
        lic = em.get('LicenseShortName', {}).get('value', '')
        if not OK.match(lic.strip()):
            continue
        if ii.get('width', 0) < 800:
            continue
        artist = re.sub('<[^>]+>', '', em.get('Artist', {}).get('value', '')).strip()
        fn = f'c{k:02d}.jpg'
        try:
            data = urllib.request.urlopen(urllib.request.Request(ii['thumburl'], headers=UA), timeout=60).read()
        except Exception as e:
            continue
        open(os.path.join(out, fn), 'wb').write(data)
        meta.append({'file': fn, 'title': p['title'], 'license': lic, 'artist': artist,
                     'page': ii.get('descriptionurl'), 'w': ii.get('width'), 'h': ii.get('height')})
        k += 1
        if k >= n:
            break
    json.dump(meta, open(os.path.join(out, 'meta.json'), 'w'), indent=1, ensure_ascii=False)
    return meta


if __name__ == '__main__':
    m = search(sys.argv[2], sys.argv[3], int(sys.argv[4]) if len(sys.argv) > 4 else 8)
    for x in m:
        print(x['file'], '|', x['title'], '|', x['license'], '|', x['artist'][:40])
