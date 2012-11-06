#!/bin/bash
set -e

mkdir -p _rebuild
cd _rebuild

git clone git://github.com/twitter/bootstrap.git
git clone git://github.com/mvasilkov/Font-Awesome.git

mv Font-Awesome/less/font-awesome.less bootstrap/less
sed -i '' 's#sprites\.less#font-awesome.less#' bootstrap/less/bootstrap.less
sed -i '' 's#\.\./font#media#' bootstrap/less/font-awesome.less
(cd bootstrap && make bootstrap)

cd ..
mkdir -p lib/bootstrap/media
mv _rebuild/bootstrap/bootstrap/css/bootstrap{-responsive,}.css lib/bootstrap
mv _rebuild/bootstrap/bootstrap/js/bootstrap.js lib/bootstrap
mv _rebuild/Font-Awesome/font/fontawesome-webfont* lib/bootstrap/media

rm -rf _rebuild
