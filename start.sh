#!/bin/sh

# script exit immidiately if any command return non-zero value
set -e

echo "run db migration"
npm prisma generate
npm prisma migrate deploy

echo "start the app"
# run all commands pass to this script
exec "$@"