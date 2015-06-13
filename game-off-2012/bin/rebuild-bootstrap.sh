#!/bin/bash
set -e

mkdir -p _rebuild
cd _rebuild

git clone git://github.com/twitter/bootstrap.git

sed -i= /sprites.less/d bootstrap/less/bootstrap.less
(cd bootstrap && make bootstrap)

cd ..
mkdir -p lib/bootstrap
mv _rebuild/bootstrap/bootstrap/css/bootstrap{-responsive,}.css lib/bootstrap
mv _rebuild/bootstrap/bootstrap/js/bootstrap.js lib/bootstrap

rm -rf _rebuild
