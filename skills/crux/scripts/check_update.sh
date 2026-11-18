#!/usr/bin/env bash
# crux update check. Prints ONE line only when a newer version exists; otherwise
# prints nothing. Never changes anything. Network result is cached for 24 hours.
set -u

SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REMOTE_URL="https://raw.githubusercontent.com/fontai/crux/main/skills/crux/VERSION"
LOCAL="$(tr -d '[:space:]' < "$SKILL_DIR/VERSION" 2>/dev/null)" || exit 0
[ -n "$LOCAL" ] || exit 0

CACHE_DIR="${XDG_CACHE_HOME:-$HOME/.cache}/crux"
STAMP="$CACHE_DIR/remote-version"
mkdir -p "$CACHE_DIR" 2>/dev/null || exit 0

if [ -s "$STAMP" ] && [ -z "$(find "$STAMP" -mmin +1440 2>/dev/null)" ]; then
  REMOTE="$(cat "$STAMP")"
else
  REMOTE="$(curl -fsSL --max-time 3 "$REMOTE_URL" 2>/dev/null | tr -d '[:space:]')"
  case "$REMOTE" in
    [0-9]*.[0-9]*.[0-9]*) printf '%s\n' "$REMOTE" > "$STAMP" ;;
    *) touch "$STAMP" 2>/dev/null; exit 0 ;;  # offline: try again tomorrow
  esac
fi
[ -n "$REMOTE" ] || exit 0

newer="$(awk -v a="$REMOTE" -v b="$LOCAL" 'BEGIN {
  split(a, x, "."); split(b, y, ".");
  for (i = 1; i <= 3; i++) { if (x[i] + 0 > y[i] + 0) { print 1; exit } if (x[i] + 0 < y[i] + 0) exit }
}')"
[ "$newer" = "1" ] || exit 0

case "$SKILL_DIR" in
  */plugins/*) HOW="Claude app: Settings → Customize → Plugins → Crux → Update · Claude Code: claude plugin marketplace update fontai && claude plugin update crux@fontai" ;;
  *) if git -C "$SKILL_DIR" rev-parse --git-dir >/dev/null 2>&1; then
       HOW="run: git -C \"$(git -C "$SKILL_DIR" rev-parse --show-toplevel)\" pull"
     else
       HOW="download the new crux.zip from https://crux.fontai.org/#update and upload it again"
     fi ;;
esac
echo "crux $REMOTE is available (you have $LOCAL) — $HOW"
