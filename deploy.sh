#!/bin/bash

docker build -t steemdata.com .
docker tag steemdata.com furion/steemdata.com
docker push furion/steemdata.com
