#!/usr/bin/env bash
# Build the CRUX demo video: document PDF -> page images -> HyperFrames render -> web MP4 + poster.
# Usage: ./build.sh [--skip-doc]
set -euo pipefail
cd "$(dirname "$0")"
HERE="$PWD"
SITE_ASSETS="$HERE/../site/assets"
DS="${FONTAI_DESIGN_SYSTEM:-$HOME/www/fontai-design-system}"
HF="npx --yes hyperframes@0.9.65"

# 1. Licensed DIN Pro fonts: copied in at build time only, never committed (see README.md).
mkdir -p fonts/licensed
cp "$DS/assets/fonts/din.otf" "$DS/assets/fonts/din-med.otf" fonts/licensed/
cp "$DS/assets/logo/fontai-logo-white.svg" assets/fontai-logo-white.svg

# 2. Demo document -> PDF -> page thumbnails for the "huge document" scene.
if [[ "${1:-}" != "--skip-doc" ]]; then
  pandoc demo-doc/northwind-4-day-week.md -s --metadata pagetitle="Northwind four-day week analysis" \
    -c doc.css -o demo-doc/northwind-4-day-week.html
  (cd demo-doc && weasyprint northwind-4-day-week.html northwind-4-day-week.pdf)
  rm -f demo-doc/northwind-4-day-week.html
  rm -rf assets/pages && mkdir -p assets/pages
  pdftoppm -r 64 -jpeg -jpegopt quality=72 demo-doc/northwind-4-day-week.pdf assets/pages/p
  (cd assets && ls pages/*.jpg | awk 'BEGIN{printf "window.PAGES = ["} {printf "%s\"assets/%s\"", (NR>1?",":""), $0} END{print "];"}' > pages/pages.js)
  ls assets/pages | wc -l | xargs echo "files:"
fi

# 3. Render with HyperFrames (lossless-ish master), then encode the web file ourselves.
mkdir -p out "$SITE_ASSETS"
$HF render -o out/master.mp4 -q delivery --fps 30 --resolution 4k
# 4K master -> 2560x1440 web file: sharp text on retina screens at ~1100 CSS px.
/opt/homebrew/bin/ffmpeg -y -loglevel error -i out/master.mp4 -an -vf "scale=2560:1440:flags=lanczos" \
  -c:v libx264 -preset veryslow -crf "${CRF:-24}" -tune animation -x264-params "aq-mode=3:deblock=-1,-1" -pix_fmt yuv420p \
  -profile:v high -level 5.1 -g 300 -movflags +faststart "$SITE_ASSETS/demo.mp4"

# 4. Poster: the finished output screen.
POSTER_AT="${POSTER_AT:-37.9}"
/opt/homebrew/bin/ffmpeg -y -loglevel error -ss "$POSTER_AT" -i out/master.mp4 -frames:v 1 -vf "scale=2560:1440:flags=lanczos" \
  -q:v 4 "$SITE_ASSETS/demo-poster.jpg"
ls -l "$SITE_ASSETS/demo.mp4" "$SITE_ASSETS/demo-poster.jpg"
