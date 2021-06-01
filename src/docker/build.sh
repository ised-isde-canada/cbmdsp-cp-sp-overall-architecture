#!/bin/bash
# Michael O'Brien
# 20210203
# run from within docker subdir
# login to dockerhub before running - make sure you are in the isedc organization
#docker login --username obrienlabs

BUILD_ID=10001
BUILD_DIR=builds
DOCKERHUB_ORG=isedc
mkdir ../../$BUILD_DIR
TARGET_DIR=../../$BUILD_DIR/$BUILD_ID
mkdir $TARGET_DIR
CONTAINER_IMAGE=api-backend-stub
cd ../../
mvn clean install -DskipTests=true -U
cd src/docker
cp ../../target/*.jar $TARGET_DIR
cp DockerFile $TARGET_DIR
cp startService.sh $TARGET_DIR
cd $TARGET_DIR

docker build --no-cache --build-arg build-id=$BUILD_ID -t $DOCKERHUB_ORG/$CONTAINER_IMAGE -f Dockerfile .

docker tag $DOCKERHUB_ORG/$CONTAINER_IMAGE $DOCKERHUB_ORG/$CONTAINER_IMAGE:0.0.1

# dockerhub
docker push $DOCKERHUB_ORG/$CONTAINER_IMAGE:0.0.1
# locally
docker stop $CONTAINER_IMAGE
# will throw a warning on first run
docker rm $CONTAINER_IMAGE
echo "starting: $CONTAINER_IMAGE"
docker run --name $CONTAINER_IMAGE \
    -d -p 8888:8080 \
    -e os.environment.configuration.dir=/ \
    -e os.environment.ecosystem=sbx \
    $DOCKERHUB_ORG/$CONTAINER_IMAGE:0.0.1

cd ../../src/docker

