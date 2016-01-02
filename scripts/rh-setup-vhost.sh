#!/bin/bash
cd <%= appRemoteTargetPath %>

perl -pi -e s{appSiteUrl}{<%= appSiteUrl %>}g <%= appName %>.conf
perl -pi -e s{appName}{<%= appName %>}g <%= appName %>.conf
perl -pi -e s{appPort}{<%= appPort %>}g <%= appName %>.conf
perl -pi -e s{appDest}{<%= appDest %>}g <%= appName %>.conf

sudo mv <%= appName %>.conf /etc/nginx/conf.d/sites-enabled
sudo systemctl restart nginx