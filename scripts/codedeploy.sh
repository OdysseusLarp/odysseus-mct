#!/bin/bash

BUCKET="odysseus-larp-dev"
REGION="eu-west-1"
PACKAGE_NAME="mct_${CIRCLE_BUILD_NUM}.tar.gz"

echo "Creating package ${PACKAGE_NAME}"
tar czf ${PACKAGE_NAME} example-server images lib scripts node_modules \
	odysseus pages static historical-telemetry-plugin.js index.html \
	odysseus.json realtime-telemetry-plugin.js \
	package.json package-lock.json appspec.yml

echo "Saving ${PACKAGE_NAME} to S3"
aws s3 cp ${PACKAGE_NAME} s3://${BUCKET}/${PACKAGE_NAME} --region $REGION

echo "Deploying using CodeDeploy"
DEPLOYMENT=`aws deploy create-deployment \
	--application-name odysseus-mct \
	--deployment-group odysseus-mct-dev \
	--s3-location bucket=${BUCKET},bundleType=tgz,key=${PACKAGE_NAME} \
	--region ${REGION} \
	--query deploymentId \
	--output text`

echo "Waiting for deployment to finish"
aws deploy wait deployment-successful --deployment-id ${DEPLOYMENT} --region ${REGION}

echo "Deployment finished"
exit 0