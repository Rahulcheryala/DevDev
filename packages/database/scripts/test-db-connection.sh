#!/bin/bash

# Script to test the database connection
# This script will verify that we can connect to the database

# Load environment variables
if [ -f .env ]; then
  source .env
fi

echo "Testing database connection..."

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

echo "Attempting to connect to database at $DB_HOST:$DB_PORT..."

# List all running containers for debugging
echo "Available Docker containers:"
docker ps --format "{{.Names}}" | grep -E 'supabase|postgres'

# Try to find the actual PostgreSQL container
# Look specifically for the Supabase db container
CONTAINER_NAME=$(docker ps --format "{{.Names}}" | grep -E 'supabase.*db' | head -n 1)

# If not found, try other patterns
if [ -z "$CONTAINER_NAME" ]; then
  CONTAINER_NAME=$(docker ps --format "{{.Names}}" | grep -E 'supabase.*postgres' | grep -v 'pg_meta' | head -n 1)
fi

# If still not found, try a more general approach
if [ -z "$CONTAINER_NAME" ]; then
  CONTAINER_NAME=$(docker ps --format "{{.Names}}" | grep -E 'postgres|postgresql' | grep -v 'pg_meta' | head -n 1)
fi

if [ -z "$CONTAINER_NAME" ]; then
  echo "Error: Could not find the PostgreSQL container."
  echo "Make sure your Supabase Docker container is running."
  echo "You can start it with: npm run db:start"
  exit 1
fi

echo "Using Docker container: $CONTAINER_NAME"

# Try to connect using the Docker container
echo "Attempting to connect using Docker container..."
if docker exec -it $CONTAINER_NAME bash -c "command -v psql" > /dev/null 2>&1; then
  echo "Found psql in container, executing query..."
  docker exec -it $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME -c "SELECT 'Connection successful!' AS status;"
  RESULT=$?
else
  echo "psql not found in container, trying alternative approach..."
  
  # Try to find another container with psql
  POSTGRES_CONTAINER=$(docker ps --format "{{.Names}}" | grep -E 'postgres|supabase' | head -n 1)
  
  if [ -n "$POSTGRES_CONTAINER" ]; then
    echo "Trying with container: $POSTGRES_CONTAINER"
    # Use the postgres container to connect to the database
    docker exec -it $POSTGRES_CONTAINER bash -c "PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c \"SELECT 'Connection successful!' AS status;\""
    RESULT=$?
  else
    # Try using psql directly if it's installed on the host
    if command -v psql > /dev/null 2>&1; then
      echo "Using local psql client..."
      PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT 'Connection successful!' AS status;"
      RESULT=$?
    else
      echo "Error: PostgreSQL client (psql) is not installed on your system."
      echo "Please install PostgreSQL client tools with one of these commands:"
      echo "  - Ubuntu/Debian: sudo apt-get install postgresql-client"
      echo "  - macOS: brew install postgresql"
      echo "  - Windows: Install from https://www.postgresql.org/download/windows/"
      exit 1
    fi
  fi
fi

# Check if the connection was successful
if [ $RESULT -eq 0 ]; then
  echo "Database connection test completed successfully!"
else
  echo "Error: Could not connect to the database."
  echo "Make sure your Supabase Docker container is running."
  echo "You can start it with: npm run db:start"
  exit 1
fi 