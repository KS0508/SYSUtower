# !/usr/bin/python
# -*- coding: UTF-8 -*-

import json
import time
from flask import Flask
from flask import jsonify
from flask import request

print(type(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())))