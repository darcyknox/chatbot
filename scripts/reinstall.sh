#!/usr/bin/env bash
set -euo pipefail

# Helper to reinstall node deps using the project's .nvmrc when possible.
# Usage: ./scripts/reinstall.sh

echo "== Reinstall: starting =="

if [ -f ".nvmrc" ]; then
  # Try to use nvm if available
  if command -v nvm >/dev/null 2>&1; then
    echo "Using nvm to switch node versions per .nvmrc"
    # shellcheck disable=SC1090
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
    nvm use || nvm install
  else
    echo "nvm not found in PATH. Ensure you're running with Node $(cat .nvmrc) or install nvm: https://github.com/nvm-sh/nvm"
  fi
fi

echo "Removing node_modules and package-lock.json if present..."
rm -rf node_modules package-lock.json

echo "Installing dependencies (this will create package-lock.json)..."
npm install

echo "== Reinstall: done =="
