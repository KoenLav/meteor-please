#!/bin/bash
cd <%= appRemoteTargetPath %>


perl -pi -e 's/${appSiteUrl}/<%= appSiteUrl %>' vhost.conf
perl -pi -e 's/${appName}/<%= appName %>' vhost.conf
perl -pi -e 's/${appPort}/<%= appPort %>' vhost.conf

sudo systemctl restart nginx