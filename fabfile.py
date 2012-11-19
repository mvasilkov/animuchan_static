from fabric.api import local

def optimize():
    # unlink old copy
    local("unlink app/almond.js")
    # initialize
    local("ln -s ../lib/almond.js app/almond.js")
    # build html
    command = 's|data-main="app/main.js" src="lib/require.js"|src="app.js"|'
    local("sed '%s' < index.html > upload/index.html" % command)
    # build js
    local("r.js -o baseUrl=app name=almond include=main out=upload/app.js wrap=true")
    # clean up
    local("rm app/almond.js")

def upload():
    local("rsync -Cavz lib media upload/index.html upload/app.js animuchan:git-invaders")
