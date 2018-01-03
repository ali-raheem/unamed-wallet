Really basic example

JQuery to access electrum-vtc RPC

![screenshot](screenie.png)

Start like so

Make sure to backup your wallets from ~/.electrum-vtc

```
ELECTRUMCMD=electrum-vtc
mkdir ./wallet
$ELECTRUMCMD daemon
$ELECTRUMCMD create
$ELECTRUMCMD load_wallet
$ELECTRUMCMD setconfig requests_dir ./wallet/req
cd ./wallet
python -m SimpleHTTPServer
```
