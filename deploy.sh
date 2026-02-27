#!/bin/bash
# Deploy plaibook-homepage to EC2 as a standalone Next.js app
#
# Usage:
#   ./deploy.sh
#   ./deploy.sh -k <path-to-pem> -h <hostname-or-ip> -s <service-name> -p <port>
#
# Defaults: key=~/Documents/keys/production.pem, host=34.238.113.27, service=plaibook-homepage, port=8012

key="${key:-$HOME/Documents/keys/production.pem}"
hostname="${hostname:-34.238.113.27}"
service="${service:-plaibook-homepage}"
port="${port:-8012}"

while getopts k:h:s:p: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
        p) port=${OPTARG};;
    esac
done

printf "\n----> Deploying $service to $hostname with key $key on port $port\n"

set -e

# Step 1: Build
printf "\n----> Building Next.js standalone bundle\n"
npm run build

# Step 2: Prepare the standalone bundle
printf "\n----> Preparing standalone bundle\n"
rm -rf deploy-bundle
mkdir -p deploy-bundle

# Copy the standalone server (cp -a copies hidden dirs like .next inside standalone)
cp -a .next/standalone/. deploy-bundle/

# Copy static assets (required for standalone mode)
mkdir -p deploy-bundle/.next/static
cp -r .next/static/* deploy-bundle/.next/static/

# Copy public assets
mkdir -p deploy-bundle/public
cp -r public/* deploy-bundle/public/

# Copy env file
if [ -f .env.local ]; then
    cp .env.local deploy-bundle/.env.local
fi

# Step 3: Clear out previous distribution on the target server
printf "\n----> Clearing out previous distribution on the target\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
rm -rf services/${service}
mkdir -p services/${service}
ENDSSH

# Step 4: Compress and transfer
printf "\n----> Transferring bundle to server\n"
tar -czf deploy.tar.gz -C deploy-bundle .
scp -i "$key" deploy.tar.gz ubuntu@$hostname:services/$service/
ssh -i "$key" ubuntu@$hostname "cd services/$service && tar -xzf deploy.tar.gz && rm deploy.tar.gz"

# Step 5: Start/restart the PM2 process
printf "\n----> Starting service on port $port\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
bash -i
cd services/${service}
export PORT=${port}
export NODE_ENV=production
export HOSTNAME=0.0.0.0
if pm2 list | grep -q ${service}; then
  pm2 restart ${service} --update-env
else
  PORT=${port} HOSTNAME=0.0.0.0 pm2 start server.js --name ${service} --env PORT=${port}
  pm2 save
fi
ENDSSH

# Step 5: Clean up local artifacts
printf "\n----> Cleaning up local artifacts\n"
rm -rf deploy-bundle
rm -f deploy.tar.gz

printf "\n----> Deployment complete! Service '$service' is running on port $port\n"
printf "----> Make sure to update the Caddyfile if this is a new deployment\n"
