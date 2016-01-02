#!/bin/bash
cd <%= appRemoteTargetPath %>


perl -pi -e 's/${appSiteUrl}/<%= appSiteUrl %>/g' vhost.conf
perl -pi -e 's/${appName}/<%= appName %>/g' vhost.conf
perl -pi -e 's/${appPort}/<%= appPort %>/g' vhost.conf

sudo systemctl restart nginx