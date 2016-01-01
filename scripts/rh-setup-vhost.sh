#!/bin/bash
cd <%= appRemoteTargetPath %>

touch temp.sed
echo 's/$[appSiteUrl]/<%= appSiteUrl %>' >> temp.sed
echo 's/$[appName]/<%= appName %>' >> temp.sed
echo 's/$[appPort]/<%= appPort %>' >> temp.sed

sed -f temp.sed nginx.conf > <%= appName %>.conf

rm temp.sed

sudo systemctl restart nginx