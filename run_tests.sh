#!/usr/bin/env bash

set -e

trap_with_arg() {
    local func="$1"
    shift
    for sig in "$@"; do
        trap "$func $sig" "$sig"
    done
}

stop() {
    trap - SIGINT EXIT
    printf '\n%s\n' "received $1, killing child processes"
    kill -s SIGINT $(jobs -pr)
}

trap_with_arg 'stop' EXIT SIGINT SIGTERM SIGHUP

rm -f config.ini
rm -rf test.db

nild run --http-port 8529 --collator-tick-ms=100 >nild.log 2>&1 &
sleep 2

CI=true npm run test:useNilD
