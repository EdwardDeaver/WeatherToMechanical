#!/usr/bin/env bash

echo "The script you are running has:"
echo "basename: [$(basename "$0")]"
echo "dirname : [$(dirname "$0")]"
echo "pwd     : [$(pwd)]"

cd $(dirname "$0")

curl -LsSf https://astral.sh/uv/install.sh | sh

source .venv/bin/activate  

uv python install

uv pip install -r requirements.txt

uv run index.py