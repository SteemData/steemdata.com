#!/bin/bash

docker build -t steemdata .
docker tag webui furion/
docker push furion/
