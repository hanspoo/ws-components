#!/bin/bash

#
# Actualiza una micro app react
#

if [ $# -ne 1 ]; then
  echo Entregue la aplicación a actualizar
  echo Ejemplo:
  echo actualizar usuarios
  exit -1
fi

APP=$1

cd /home/julian/fundacion/ws-components
git pull

docker build -t localhost:32000/$APP/1.0:latest -f  apps/$APP/Dockerfile .
docker push localhost:32000/$APP/1.0:latest

microk8s kubectl get pods | awk "/$APP/ { print \$1 }" | xargs microk8s kubectl delete pod
