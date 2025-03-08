#!/bin/bash

echo "Stoping the containers"
cd /home/ubuntu/WebERP/Docker
docker compose down

echo "Backing up the env file"
cp /home/ubuntu/WebERP/Docker/.env /home/ubuntu/.env