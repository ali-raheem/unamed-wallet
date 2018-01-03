Really basic example

JQuery to access electrum-vtc RPC

![screenshot](screenie.png)

Start like so

Make sure to backup your wallets from ~/.electrum-vtc

```
mkdir wallet
electrum-vtc create
electrum-vtc daemon start
electrum-vtc load_wallet
cd wallet
python -m SimpleHTTPServer
```
