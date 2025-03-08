#!/bin/sh

cd /home/postgres/WebERP/Docker

docker compose down
docker volume rm weberpdb_supabase-db-config
docker volume rm weberpdb_trigger-db-config

sudo rm -r supabase_volumes
sudo rm -r trigger_volumes

mkdir supabase_volumes
mkdir trigger_volumes

cp -r /home/postgres/WebERP/Docker/volumes* supabase_volumes
cp -r /home/postgres/WebERP/Docker/volumes* trigger_volumes

cp /home/postgres/WebERP/Docker/Autoscaling/docker-compose-postgres.yml docker-compose.yml

docker compose -f docker-compose.yml up -d

sleep 10

cp /home/postgres/WebERP/packages/database/supabase/migrations 

python3 Autoscaling/seed_db.py
python3 Autoscaling/seed_db.py
python3 Autoscaling/seed_db.py
python3 Autoscaling/seed_db.py