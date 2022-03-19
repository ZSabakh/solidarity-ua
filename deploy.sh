#!/usr/bin/env sh

echo "Pull remote changes."
git pull

cd front && npm run start &
cd back && npm run start

