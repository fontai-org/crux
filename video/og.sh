#!/usr/bin/env bash
# Render the social preview card and the touch icon into site/assets/.
# Needs the licensed DIN fonts copied in by build.sh (fonts/licensed/) and Google Chrome.
set -euo pipefail
cd "$(dirname "$0")"
DS="${FONTAI_DESIGN_SYSTEM:-$HOME/www/fontai-design-system}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="$PWD/../site/assets"
mkdir -p fonts/licensed
cp "$DS/assets/fonts/din.otf" "$DS/assets/fonts/din-med.otf" fonts/licensed/
cp "$DS/assets/logo/fontai-logo-white.svg" assets/fontai-logo-white.svg
shot() { "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --allow-file-access-from-files --window-size="$2" --screenshot="$3" "file://$PWD/$1" >/dev/null 2>&1; }

shot og.html 1200,630 "$OUT/og.png"

# 180x180 touch icon: the Fontai symbol, white on black, with the manual's clear space.
cat > out/icon.html <<HTML
<html><body style="margin:0;width:180px;height:180px;background:#000;display:flex;align-items:center;justify-content:center">
<img src="file://$DS/assets/logo/fontai-symbol-white.svg" style="width:112px;height:112px"></body></html>
HTML
shot out/icon.html 180,180 "$OUT/apple-touch-icon.png"
ls -l "$OUT/og.png" "$OUT/apple-touch-icon.png"
