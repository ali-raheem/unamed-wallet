#!/bin/bash

ELECTRUMCMD=electrum-vtc

mkdir ./wallet
$ELECTRUMCMD daemon
$ELECTRUMCMD create
$ELECTRUMCMD load_wallet
$ELECTRUMCMD setconfig requests_dir ./wallet/req
cd ./wallet
python -m SimpleHTTPServer
