#!/bin/bash

TAG="$1"
REPO="$2"

az acr login --name $REPO
docker pull $REPO.azurecr.io/zeak:$TAG

cd /home/ubuntu/ZEAK/Docker
# python3 scripts/seed_db.py
# python3 scripts/seed_db.py
# python3 scripts/seed_db.py
# python3 scripts/seed_db.py

TAG=$TAG docker compose up -d  > /dev/null 2>&1
