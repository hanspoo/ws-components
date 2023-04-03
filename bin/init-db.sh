#!/bin/bash

DB=starter

dropdb $DB
./pg-create.sh $DB $DB $DB

