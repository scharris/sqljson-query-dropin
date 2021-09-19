#!/bin/sh
set -e

SCRIPT_DIR="$(dirname "$(realpath "$0")")"

die () {
    echo >&2 "$@"
    exit 1
}

[ "$#" -eq 2 ] || die "Expected two arguments: <jdbc-properties-file> <db-type=pg|mysql|ora>"

JDBC_PROPS=$1
DBTYPE=$2

mvn -f "$SCRIPTDIR"/dbmd/pom.xml compile exec:java "-DjdbcProps=$JDBC_PROPS" "-Ddb=$DBTYPE"
npm run generate-relations-metadata
