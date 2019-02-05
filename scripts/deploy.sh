#!/bin/bash

APP_DIRECTORY="/opt/odysseus-mct"
APP_USER="odysseus"

sudo mkdir -p $APP_DIRECTORY
chown -R ${APP_USER}: ${APP_DIRECTORY}

read -r -d '' SERVICE << SERVICE
[Service]
WorkingDirectory=${APP_DIRECTORY}
ExecStart=/usr/bin/node example-server/server.js
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=odysseus-mct
User=${APP_USER}
Group=${APP_USER}
[Install]
WantedBy=multi-user.target
SERVICE

echo "$SERVICE" | sudo tee /etc/systemd/system/odysseus-mct.service

sudo systemctl enable odysseus-mct