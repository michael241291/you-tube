#!/bin/bash
# sheet.sh video.mp4 out.jpg [n]
V=$1; O=$2; N=${3:-24}
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V")
R=$(python3 -c "print($N/$D)")
ffmpeg -v error -y -i "$V" -vf "fps=$R,scale=216:384,tile=8x$(( (N+7)/8 ))" -frames:v 1 "$O"
