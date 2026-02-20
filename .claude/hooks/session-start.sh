#!/bin/bash
set -euo pipefail

# Only run in remote Claude Code environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

echo "Installing server dependencies..."
npm install --prefix "$CLAUDE_PROJECT_DIR/server"

echo "Session start hook complete."
