#!/usr/bin/env bash

set -euo pipefail

DOCKER_IMAGE="odysseus-mct:latest"

docker build -t "$DOCKER_IMAGE" .
