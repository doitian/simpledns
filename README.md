simpledns
=========

A simple node script to start DNS server from
[pow.cx](https://github.com/37signals/pow). It resolves all specified domains to
127.0.0.1

Get Pow
-------

Use bash script `get_pow.sh` to download:

    $ ./get_pow.sh
    
You also can download yourself and unpack in directory pow.

Start Server
------------

    node server.js [--pow=./pow/0.3.2] [--port=20560] [--domains=dev]

Options:

-  `pow`: path to unpacked pow.
-  `port`: which port the DNS server should listen to.
-  `domains`: list of domains that should be resolved to 127.0.0.1 Multiple
              domains are separated by comma, e.g., `--domains=dev,staging`.
