#!/usr/bin/env bash
ps -ef |grep "/home/ubuntu/.nvm/versions/node/v0.12.1/bin/node app client"|awk '{print $2}'|xargs kill -9
for((i=1;i<=29;i++));do
/home/ubuntu/.nvm/versions/node/v0.12.1/bin/node app client &
done