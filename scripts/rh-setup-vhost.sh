#!/bin/bash
cd <%= appRemoteTargetPath %>


sed -i 's/${appSiteUrl}/<%= appSiteUrl %>' <%= appName %>.conf
sed -i 's/${appName}/<%= appName %>' <%= appName %>.conf
sed -i 's/${appPort}/<%= appPort %>' <%= appName %>.conf

sudo systemctl restart nginx