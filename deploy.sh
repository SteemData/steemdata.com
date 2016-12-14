#!/bin/bash

docker build -t steemdata .
docker tag steemdata furion/steemdata
docker push furion/steemdata
