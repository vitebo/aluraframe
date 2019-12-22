#! /bin/sh

OPTS="$1"

docker run \
  -v "$PWD":/home/app \
  -w /home/app/server \
  -p 3000:3000 \
  --rm \
  ${OPTS:="-it"} \
  node:12.14.0 \
  yarn start
