#!/bin/bash

# package meteor
cd $APP_LOCAL_PATH
meteor build bundle $BUILD_OPTIONS
cd bundle