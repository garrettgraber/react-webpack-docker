#!/bin/bash


./build.sh
# echo "Deleting "
docker rm -f react-webpack-docker 
echo "Running react-webpack-docker..."

docker run --name react-webpack-docker  -d  --env DOCKER=running --env NODE_ENV=development -v /${PWD}/../://root/app -p 3001:3001 react-webpack-docker
