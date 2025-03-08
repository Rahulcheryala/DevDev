#!/bin/bash


script_dir=$(dirname "$0")

. "$script_dir"/lib.sh

env_file=/home/ubuntu/WebERP/Docker/.env
seed_env_file=/home/ubuntu/WebERP/.env

DOMAIN="$1"
sed -i "s/DOMAIN=.*/DOMAIN=$DOMAIN/" "$env_file"

TAG="$2"
sed -i "s/TAG=.*/TAG=$TAG/" "$env_file"

AWS_BUCKET_NAME="$3"
sed -i "s/AWS_BUCKET_NAME=.*/AWS_BUCKET_NAME=$AWS_BUCKET_NAME/" "$env_file"

AWS_REGION="$4"
sed -i "s/AWS_REGION=.*/AWS_REGION=$AWS_REGION/" "$env_file"

JWT_SECRET="$5"
ANON_KEY="$6"
SERVICE_ROLE_KEY="$7"

generate_supabase_secrets "$env_file" "$JWT_SECRET" "$ANON_KEY" "$SERVICE_ROLE_KEY" "$seed_env_file"
generate_trigger_secrets "$env_file"

cd /home/ubuntu/WebERP/Docker
docker compose up -d