from fabric.api import local

SED_PROGRAM = ";".join([
    # remove link to bootstrap css
    '/bootstrap.css/d',
    # remove unused javascript
    '/box2d-web.js/d',
    '/jquery-1.8.2.js/d',
    '/bootstrap.js/d',
    # fix css path
    's|media/main.css|app.css|',
    # fix javascript path
    's|lib/soundmanager2-nodebug.js|lib.js|',
    's|data-main="app/main.js" src="lib/require.js"|src="app.js"|',
    # remove leading whitespace
    's|^ *||',
    # remove blank lines
    '/^$/d',
])

UGLIFY_JS_FILES = " ".join([
    "lib/box2d-web.js",
    "lib/jquery-1.8.2.js",
    "lib/bootstrap/bootstrap.js",
    "lib/soundmanager2-nodebug.js",
])

RSYNC_FILES = " ".join([
    "media",
    "lib/bootstrap/media",
    "upload/app.{css,js}",
    "upload/lib.js",
    "upload/index.html",
    "favicon.ico",
])

def cleanup():
    # clean up
    local("rm -f app/almond.js _css")

def optimize():
    """Rebuild (minify) game files."""
    cleanup()
    # initialize
    local("ln -s ../lib/almond.js app/almond.js")
    local("mkfifo _css")
    # build html
    local("sed '%s' < index.html > upload/index.html" % SED_PROGRAM)
    # build css
    local("bin/cssembed.sh media/main.css > _css &")
    local("cat lib/bootstrap/bootstrap.css _css | ycssmin > upload/app.css")
    # build js
    local("r.js -o baseUrl=app name=almond include=main out=upload/app.js wrap=true")
    local("uglifyjs %s -c -m -o upload/lib.js" % UGLIFY_JS_FILES)
    # clean up
    cleanup()

def upload():
    """Deploy to server."""
    local("rsync -Cavz %s animuchan:git-invaders" % RSYNC_FILES)
