#!/usr/bin/env bash

message="# Auto generated file, don't modify. Please refer to .env.dev, .env.uat or .env.prod, run $ chmod +x prepare-env.sh for permision denied\n"

if [ "$1" == "production" ];
then
  echo "Switching to Production environment"
  echo -e $message > ".env"
  cat ".env.production" >> ".env"
  docker-compose up

elif [ "$1" == "staging" ]
then
  echo "Switching to Staging environment"
  echo -e $message > ".env"
  cat ".env.staging" >> ".env"
  docker-compose up

elif [ "$1" == "development" ]
then
  echo "Switching to Dev environment"
  echo -e $message > ".env"
  cat ".env.development" >> ".env"
  docker-compose up

elif [ "$1" == "env" ]
then
  echo -e "ID\t\t\tPROJECT ENVIRONMENT"
  echo -e "production\t\tproject-production"
  echo -e "staging\t\t\tproject-staging"
  echo -e "development\t\tproject-development"
else
  echo "Run ‘prepare-env.sh env’ to list available environments."
fi