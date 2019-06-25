#!/bin/bash
set -e

# Script for deploying locally (used on prod backend server)

DEPLOY_DIR=/opt/odysseus-mct

sudo systemctl stop odysseus-mct

sudo rm -rf $DEPLOY_DIR
sudo cp -r . $DEPLOY_DIR
sudo chown -R odysseus: $DEPLOY_DIR

# Replace URLs that are hardcoded in some files
sudo sed -i 's/http:\/\/localhost:8082\//\/misc\//g' /opt/odysseus-mct/odysseus.json
sudo sed -i 's/https:\/\/odysseus\.nicou\.me/http:\/\/odyserver/g' /opt/odysseus-mct/odysseus/dictionary.js

sudo systemctl start odysseus-mct

echo Copied files to $DEPLOY_DIR