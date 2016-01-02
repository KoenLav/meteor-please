#!/bin/bash
cd <%= appRemoteTargetPath %>


sed -i 's/${appSiteUrl}/<%= appSiteUrl %>' vhost.conf
sed -i 's/${appName}/<%= appName %>' vhost.conf
sed -i 's/${appPort}/<%= appPort %>' vhost.conf

sudo systemctl restart nginx