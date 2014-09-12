#!/bin/bash

if [ -z "$1" ] ; then
  echo "Enter a database name"
  exit 1
fi

mongoimport --jsonArray --drop --db $1 --collection forms  --file ../../db/forms.json
mongoimport --jsonArray --drop --db $1 --collection questions --file ../../db/questions.json
mongoimport --jsonArray --drop --db $1 --collection answers --file ../../db/answers.json

