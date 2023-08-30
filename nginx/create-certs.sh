#!/bin/bash

mkdir -p cert
openssl genrsa -out cert/key.pem
openssl req -new -key cert/key.pem -out cert/csr.pem
openssl x509 -req -days 1825 -in cert/csr.pem -signkey cert/key.pem -out cert/cert.pem
rm cert/csr.pem
