#!/usr/bin/env bash
set -euo pipefail

SOURCE_CONF="nginx.conf"
TARGET_CONF="FidicProject.conf"
SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="${NGINX_CONF_DIR:-/etc/nginx/conf.d}"
TARGET_PATH="${TARGET_DIR}/${TARGET_CONF}"

if [[ ! -f "${SOURCE_DIR}/${SOURCE_CONF}" ]]; then
    echo "Expected ${SOURCE_CONF} next to this script, but it was not found." >&2
    exit 1
fi

if [[ ! -d "${TARGET_DIR}" ]]; then
    echo "Target directory ${TARGET_DIR} does not exist." >&2
    exit 1
fi

# Copy the nginx.conf to the target location with the project name
sudo cp "${SOURCE_DIR}/${SOURCE_CONF}" "${TARGET_PATH}"
sudo chmod 644 "${TARGET_PATH}"

echo "Nginx config copied from ${SOURCE_CONF} to ${TARGET_PATH}."
echo "Reloading nginx..."
sudo nginx -t && sudo nginx -s reload

echo "Done! Nginx reloaded successfully."
