#!/bin/bash

TAG=$1

echo "Cloning the Repo"
git clone https://DwvAVpNIurbdgD52VW4odTQBZdNcXJuBTdLfa0KJeoxb7M2oBl7pJQQJ99ALACAAAAACxQWeAAASAZDOaEQu:x-oauth-basic@dev.azure.com/XcelProsDevOps/ZEAK/_git/ZEAK
cp .env ZEAK/.env

cd /home/ubuntu/ZEAK

echo "Checkingout the public/dev-v1"
git checkout public/dev-v1
git pull

# Installing Packages
echo "Installing Packages"
npm install --legacy-peer-deps

cp /home/ubuntu/.env /home/ubuntu/ZEAK/Docker/.env

# Copping the edge-functions $ migrations
cp -r /home/ubuntu/ZEAK/packages/database/supabase/functions/* /home/ubuntu/ZEAK/Docker/volumes/functions/
cp -r /home/ubuntu/ZEAK/packages/database/supabase/migrations/* /home/ubuntu/ZEAK/Docker/seed/

# Starting the containers
echo "Starting the containers"
cd /home/ubuntu/ZEAK/Docker
az acr login -n zeakiodev
docker compose pull
TAG=$TAG docker compose up -d

# Runing the migrations
echo "Runing the migrations"
python3 scripts/seed_db.py
python3 scripts/seed_db.py
python3 scripts/seed_db.py
python3 scripts/seed_db.py

echo "Creating env file for seeding"
DEST_FILE="/home/ubuntu/ZEAK/.env"

echo "SUPABASE_API_URL=http://localhost:8000" > $DEST_FILE
echo "SUPABASE_SERVICE_ROLE=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogInNlcnZpY2Vfcm9sZSIsCiAgImlzcyI6ICJzdXBhYmFzZSIsCiAgImlhdCI6IDE3MTg5MDgyMDAsCiAgImV4cCI6IDE4NzY2NzQ2MDAKfQ.fq5dFtcfoYEi-YHFOFTHilwo99thjnc6oL89_mtCKaE" >> $DEST_FILE

echo "Running seed scripts"

cd /home/ubuntu/ZEAK
npm run db:seed