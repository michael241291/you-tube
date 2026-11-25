#!/bin/bash
# unduh klip Pixabay dengan retry (CDN kadang 429)
K=$(cat /home/claude/.secrets/pixabay_key)
get(){ id=$1; out=$2; [ -s "$out" ] && [ $(stat -c%s "$out") -gt 100000 ] && return 0
 u=$(curl -s "https://pixabay.com/api/videos/?key=$K&id=$id" | python3 -c "import json,sys;v=json.load(sys.stdin)['hits'][0]['videos'];print(next(v[k]['url'] for k in ('medium','large','small') if v[k]['url']))")
 for i in $(seq 1 30); do curl -s -A Mozilla -L -o "$out" "$u"; [ $(stat -c%s "$out") -gt 100000 ] && { echo ok $id; return 0; }; sleep 60; done; echo GAGAL $id; }
for id in 259910 10851 151744 11579 242 47331 144323 365704 334076 334302 142493 130488 348144 116 4511 283; do get $id clips/$id.mp4; done
E=/home/claude/you-tube/intinyaaje/episodes/e40-punuk-747/clip; get 204453 $E/v204453.mp4
echo SELESAI
