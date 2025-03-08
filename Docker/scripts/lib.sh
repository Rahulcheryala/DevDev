#!/bin/sh

generate_trigger_secrets() {
    env_file=$1

    echo "Generating secrets for tigger.dev:"

    MAGIC_LINK_SECRET=$(openssl rand -hex 16)
    sed -i "s/MAGIC_LINK_SECRET=.*/MAGIC_LINK_SECRET=$MAGIC_LINK_SECRET/" "$env_file"
    
    SESSION_SECRET=$(openssl rand -hex 16)
    sed -i "s/SESSION_SECRET=.*/SESSION_SECRET=$SESSION_SECRET/" "$env_file"
    
    ENCRYPTION_KEY=$(openssl rand -hex 16)
    sed -i "s/ENCRYPTION_KEY=.*/ENCRYPTION_KEY=$ENCRYPTION_KEY/" "$env_file"
    
    PROVIDER_SECRET=$(openssl rand -hex 32)
    sed -i "s/PROVIDER_SECRET=.*/PROVIDER_SECRET=$PROVIDER_SECRET/" "$env_file"
    
    COORDINATOR_SECRET=$(openssl rand -hex 32)
    sed -i "s/COORDINATOR_SECRET=.*/COORDINATOR_SECRET=$COORDINATOR_SECRET/" "$env_file"

}

generate_supabase_secrets() {
    env_file=$1
    seed_env_file=$5

    echo "Generating secrets for supabase:"

    POSTGRES_PASSWORD=$(openssl rand -hex 16)
    # sed -i "s/POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$POSTGRES_PASSWORD/" "$env_file"
    
    JWT_SECRET=$2
    sed -i "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" "$env_file"

    ANON_KEY=$3
    sed -i "s/ANON_KEY=.*/ANON_KEY=$ANON_KEY/" "$env_file"

    SERVICE_ROLE_KEY=$4
    sed -i "s/SERVICE_ROLE_KEY=.*/SERVICE_ROLE_KEY=$SERVICE_ROLE_KEY/" "$env_file"
    sed -i "s/SUPABASE_SERVICE_ROLE=.*/SUPABASE_SERVICE_ROLE=$SERVICE_ROLE_KEY/" "$seed_env_file"

    DASHBOARD_USERNAME=$(openssl rand -hex 8)
    sed -i "s/DASHBOARD_USERNAME=.*/DASHBOARD_USERNAME=$DASHBOARD_USERNAME/" "$env_file"
    
    DASHBOARD_PASSWORD=$(openssl rand -hex 16)
    sed -i "s/DASHBOARD_PASSWORD=.*/DASHBOARD_PASSWORD=$DASHBOARD_PASSWORD/" "$env_file"
    
}