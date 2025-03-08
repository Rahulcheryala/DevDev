#!/bin/bash

# Script to run the integration seed file
# This script will seed the integration data into your database

# Load environment variables
if [ -f .env ]; then
  source .env
fi

echo "Running integration seed script..."

# Check if SUPABASE_DIRECT_POSTGRES_URL is set
if [ -z "$SUPABASE_DIRECT_POSTGRES_URL" ]; then
  echo "Error: SUPABASE_DIRECT_POSTGRES_URL is not set in your .env file."
  exit 1
fi

# Extract connection details from the URL
# Format: postgresql://postgres:postgres@localhost:54322/postgres
DB_USER=$(echo $SUPABASE_DIRECT_POSTGRES_URL | sed -n 's/^postgresql:\/\/\([^:]*\):.*/\1/p')
DB_PASSWORD=$(echo $SUPABASE_DIRECT_POSTGRES_URL | sed -n 's/^postgresql:\/\/[^:]*:\([^@]*\).*/\1/p')
DB_HOST=$(echo $SUPABASE_DIRECT_POSTGRES_URL | sed -n 's/^postgresql:\/\/[^:]*:[^@]*@\([^:]*\).*/\1/p')
DB_PORT=$(echo $SUPABASE_DIRECT_POSTGRES_URL | sed -n 's/^postgresql:\/\/[^:]*:[^@]*@[^:]*:\([^\/]*\).*/\1/p')
DB_NAME=$(echo $SUPABASE_DIRECT_POSTGRES_URL | sed -n 's/^postgresql:\/\/[^:]*:[^@]*@[^:]*:[^\/]*\/\(.*\)/\1/p')

echo "Using database connection from SUPABASE_DIRECT_POSTGRES_URL"
echo "Connecting to database at $DB_HOST:$DB_PORT..."

# Create a temporary seed file
TEMP_SEED_FILE="/tmp/integration_seed.sql"
cat ./supabase/integration_seed.sql > $TEMP_SEED_FILE
echo "Created temporary seed file at $TEMP_SEED_FILE"

# Use the specific Supabase DB container
CONTAINER_NAME="supabase_db_zeak-database"

# Check if the container exists and is running
if ! docker ps | grep -q $CONTAINER_NAME; then
  echo "Error: The Supabase database container '$CONTAINER_NAME' is not running."
  echo "Make sure your Supabase Docker container is running."
  echo "You can start it with: npm run db:start"
  rm -f $TEMP_SEED_FILE
  exit 1
fi

echo "Using Docker container: $CONTAINER_NAME"
echo "Copying seed file to container..."
docker cp $TEMP_SEED_FILE $CONTAINER_NAME:/tmp/integration_seed.sql

echo "Executing seed file..."
docker exec $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME -f /tmp/integration_seed.sql
RESULT=$?

# Check if the command was successful
if [ $RESULT -eq 0 ]; then
  echo "Integration seed completed successfully!"
  # Clean up
  rm -f $TEMP_SEED_FILE
  exit 0
else
  echo "Error: Integration seed failed."
  echo "Make sure your Supabase Docker container is running."
  echo "You can start it with: npm run db:start"
  # Clean up
  rm -f $TEMP_SEED_FILE
  exit 1
fi 