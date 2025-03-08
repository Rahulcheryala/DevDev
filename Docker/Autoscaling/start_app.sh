#!/bin/sh

cd /home/ubuntu/WebERP

echo "Checkingout the x-project/develop-v2"
git checkout x-project/develop-v2 > /dev/null 2>&1

rm -f package-lock.json

# Installing Packages
echo "Installing Packages"
npm install --legacy-peer-deps > /dev/null 2>&1