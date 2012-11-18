from fabric.api import local

def optimize():
    # initialize
    local("ln -s ../lib/almond.js app/almond.js")
    # build html
    command = 's|data-main="app/main.js" src="lib/require.js"|src="app.js"|'
    local("sed '%s' < index.html > upload/index.html" % command)
    # build js
    local("r.js -o baseUrl=app name=almond include=main out=upload/app.js wrap=true")
    # clean up
    local("rm app/almond.js")
