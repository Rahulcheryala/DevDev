import os
import subprocess
from dotenv import load_dotenv

load_dotenv()

# Docker container name
container_name = 'supabase-db'

# Directory containing the SQL migration files
migrations_dir = "/home/postgres/WebERP/packages/database/supabase/migrations"

# PostgreSQL password (ensure this is securely handled in a real-world scenario)
pg_password = os.environ.get("POSTGRES_PASSWORD")

for sql_file in os.listdir(migrations_dir):
    print(f"Processing file: {sql_file}")

    # Construct source and destination paths
    src_path = os.path.join(migrations_dir, sql_file)
    dest_path = f'/tmp/{sql_file}'

    # Copy the SQL file to the Docker container
    command_1 = f"docker cp {src_path} {container_name}:{dest_path}"
    result_1 = subprocess.run(command_1, shell=True, capture_output=True, text=True)

    if result_1.returncode != 0:
        print(f"Failed to copy {sql_file} to Docker container. Error: {result_1.stderr}")
        continue

    print("File copied successfully.")

    # Execute the SQL file inside the Docker container
    command_2 = (
        f"docker exec -i {container_name} "
        f"env PGPASSWORD={pg_password} "
        f"psql -U postgres -d postgres -f {dest_path}"
    )
    result_2 = subprocess.run(command_2, shell=True, capture_output=True, text=True)

    if result_2.returncode != 0:
        print(f"Failed to execute {sql_file} inside Docker container. Error: {result_2.stderr}")
        continue

    print(f"Executed {sql_file} successfully. Output: {result_2.stdout}")

    # Uncomment the following line if you want to process all files
    # break