"""Find freely licensed images via Wikipedia article pages (no API; the Commons API is rate-limited here).

python3 wikiimg.py <outdir> <Article> [<Article> ...]
  -> lists File: names used in the articles, checks each Commons file page for license/author,
     downloads allowed ones (1600px) as <outdir>/<safe>.jpg and writes <outdir>/meta.json.
Article may be prefixed with "id:" for Indonesian Wikipedia.
"""
import html, json, os, re, sys, time, urllib.parse, urllib.request

UA = {'User-Agent': 'IntinyaajeShortsBot/1.0 (educational YouTube Shorts)'}
OK = re.compile(r'(CC0|Public domain|CC BY(-SA)? \d|CC-BY|PD-)', re.I)
SKIP = re.compile(r'(\.svg$|logo|icon|Star_of_life|Wiktionary|Commons-|Question_book|Edit-clear|Ambox|padlock|Symbol_)', re.I)


def fetch(url):
    for i in range(3):
        try:
            return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40).read()
        except Exception as e:
            time.sleep(2 + 3 * i)
    return b''


def files_in(article):
    lang = 'en'
    if article.startswith('id:'):
        lang, article = 'id', article[3:]
    h = fetch(f'https://{lang}.wikipedia.org/wiki/{urllib.parse.quote(article)}').decode('utf8', 'ignore')
    names = re.findall(r'/wiki/(?:File|Berkas):([^"#?]+)', h)
    out = []
    for n in names:
        n = urllib.parse.unquote(n)
        if n not in out and not SKIP.search(n):
            out.append(n)
    return out


def license_of(name):
    h = fetch('https://commons.wikimedia.org/wiki/File:' + urllib.parse.quote(name)).decode('utf8', 'ignore')
    lic = re.findall(r'class="licensetpl(?:_|&#95;)short[^"]*"[^>]*>([^<]+)<', h)
    aut = re.search(r'id="fileinfotpl(?:_|&#95;)aut"[^>]*>.*?</td>\s*<td[^>]*>(.*?)</td>', h, re.S)
    author = html.unescape(re.sub('<[^>]+>', '', aut.group(1))).strip() if aut else ''
    return (lic[0].strip() if lic else ''), re.sub(r'\s+', ' ', author)[:120]


def main():
    out = sys.argv[1]; os.makedirs(out, exist_ok=True)
    meta = []
    for art in sys.argv[2:]:
        for n in files_in(art)[:10]:
            lic, author = license_of(n)
            ok = bool(OK.search(lic))
            row = {'article': art, 'file': n, 'license': lic, 'author': author, 'ok': ok}
            if ok:
                safe = re.sub(r'[^A-Za-z0-9]+', '_', os.path.splitext(n)[0])[:60] + '.jpg'
                data = fetch('https://commons.wikimedia.org/wiki/Special:FilePath/' + urllib.parse.quote(n) + '?width=1600')
                if len(data) > 5000:
                    open(os.path.join(out, safe), 'wb').write(data)
                    row['local'] = safe
            meta.append(row)
            print(row.get('local', '-'), '|', n, '|', lic, '|', author[:50])
            time.sleep(0.5)
    old = []
    p = os.path.join(out, 'meta.json')
    if os.path.exists(p):
        old = json.load(open(p))
    json.dump(old + meta, open(p, 'w'), indent=1, ensure_ascii=False)


if __name__ == '__main__':
    main()
