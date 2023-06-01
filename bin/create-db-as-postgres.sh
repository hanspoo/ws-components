#!/bin/bash -x

DB=$1

createdb $DB
createuser $DB

psql -c 'create extension "uuid-ossp";' $DB
psql -c "alter user $DB encrypted password '123456'"
psql -c "alter database $DB owner to $DB;"
