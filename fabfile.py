from fabric.api import local

def optimize():
    local("ln -s ../lib/almond.js app/almond.js")
    local("r.js -o baseUrl=app name=almond include=main out=upload/app.js wrap=true")
    local("rm app/almond.js")
