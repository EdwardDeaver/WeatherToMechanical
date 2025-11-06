
echo "The script you are running has:"


#!/usr/bin/env bash

echo "The script you are running has:"
echo "basename: [$(basename "$0")]"
echo "dirname : [$(dirname "$0")]"
echo "pwd     : [$(pwd)]"

MYPWD=${pwd} 


echo $pwd

source .venv/bin/activate

~/.local/bin/uv pip install -r requirements.txt

~/.local/bin/uv run index.py
