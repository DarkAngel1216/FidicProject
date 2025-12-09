#!/usr/bin/env bash
set -euo pipefail

PROJECT_CONF="FidicProject.conf"
SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="${NGINX_CONF_DIR:-/etc/nginx/conf.d}"
TARGET_PATH="${TARGET_DIR}/${PROJECT_CONF}"

if [[ ! -f "${SOURCE_DIR}/${PROJECT_CONF}" ]]; then
    echo "Expected ${PROJECT_CONF} next to this script, but it was not found." >&2
    exit 1
fi

if [[ ! -d "${TARGET_DIR}" ]]; then
    echo "Target directory ${TARGET_DIR} does not exist." >&2
    exit 1
fi

# Use install to copy with proper permissions in one step.
sudo install -m 644 "${SOURCE_DIR}/${PROJECT_CONF}" "${TARGET_PATH}"

echo "Nginx config copied to ${TARGET_PATH}."
