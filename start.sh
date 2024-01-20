#!/bin/sh

# script exit immidiately if any command return non-zero value
set -e

echo "run db migration"
npx prisma generate
npx prisma migrate deploy

echo "start the app"
# run all commands pass to this script
exec "$@"