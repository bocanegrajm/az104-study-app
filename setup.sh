#!/bin/bash
# AZ-104 Study Platform — One-Command Setup
# Usage: bash setup.sh

set -e

PORT=3104
DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "  ╔══════════════════════════════════════════════╗"
echo "  ║   AZ-104 // Azure Administrator Study App    ║"
echo "  ║   Starting local server...                   ║"
echo "  ╚══════════════════════════════════════════════╝"
echo ""

# Check if port is in use, kill it
lsof -ti:$PORT >/dev/null 2>&1 && kill -9 $(lsof -ti:$PORT) 2>/dev/null || true

# Try python3 first, then python
if command -v python3 &>/dev/null; then
  echo "  → Serving on http://localhost:$PORT"
  echo "  → Press Ctrl+C to stop"
  echo ""
  open "http://localhost:$PORT" 2>/dev/null || true
  cd "$DIR" && python3 -m http.server $PORT
elif command -v python &>/dev/null; then
  echo "  → Serving on http://localhost:$PORT"
  echo "  → Press Ctrl+C to stop"
  echo ""
  open "http://localhost:$PORT" 2>/dev/null || true
  cd "$DIR" && python -m http.server $PORT
elif command -v npx &>/dev/null; then
  echo "  → Serving on http://localhost:$PORT"
  echo "  → Press Ctrl+C to stop"
  echo ""
  open "http://localhost:$PORT" 2>/dev/null || true
  cd "$DIR" && npx -y serve -l $PORT -s .
else
  echo "  ✗ No server found. Install Python 3 or Node.js, then re-run."
  exit 1
fi
