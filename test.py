# !/usr/bin/python
# -*- coding: UTF-8 -*-

import json
import time
from flask import Flask
from flask import jsonify
from flask import request
import socket
import subprocess

def get_free_port():
    HOST = '127.0.0.1'
    with socket.socket() as sock:
        sock.bind((HOST, 0))
        port = sock.getsockname()[1]
    return port

subprocess.run(['dir'])
'''
app = Flask('hehe')
free_port = get_free_port()
print(free_port)
app.run(host='127.0.0.1', port=free_port, threaded=True)
'''