#!/bin/bash

WORKDIR="/home/deploy"
SERVICE_NAME="${PROJECT}"
[ -f /home/deploy/.env ] && source /home/deploy/.env
function deploy(){
    cd ${WORKDIR}/${SERVICE_NAME}/
    npm run startserver
}

function deploy_dev () {
    cd ${WORKDIR}/${SERVICE_NAME}/
    npm run start-dev > /home/logs/push.log
}

deploy && sleep infinity
