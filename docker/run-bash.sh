#!/bin/bash


./build.sh
# echo "Deleting "
docker rm -f react-webpack-docker 
echo "Running react-webpack-docker..."

docker run -it --name react-webpack-docker --env NODE_ENV=shell -v /${PWD}/../://root/app -p 3001:3001 react-webpack-docker /bin/bash

