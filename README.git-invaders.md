## Building git-invaders
...involves **Fabric, RequireJS, UglifyJS** and **ycssmin.**
(I assume **Node.js** and **Python** are installed, too.)

Installation:
`npm -g i requirejs uglify-js ycssmin`
and
`pip install fabric`
should suffice.

Then use `fab optimize` to rebuild (minify) game files.
