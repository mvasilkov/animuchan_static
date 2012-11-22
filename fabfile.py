from fabric.api import local

def optimize():
    # unlink old copy
    local("rm -f app/almond.js")
    # initialize
    local("ln -s ../lib/almond.js app/almond.js")
    # build html
    command = ";".join([
        # fix javascript path
        's|data-main="app/main.js" src="lib/require.js"|src="app.js"|',
        # remove leading whitespace
        's|^ *||',
        # remove blank lines
        '/^$/d',
    ])
    local("sed '%s' < index.html > upload/index.html" % command)
    # build js
    local("r.js -o baseUrl=app name=almond include=main out=upload/app.js wrap=true")
    # clean up
    local("rm app/almond.js")

def upload():
    local("rsync -Cavz favicon.ico lib media "
          "upload/index.html upload/app.js animuchan:git-invaders")
