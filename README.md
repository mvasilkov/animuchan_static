**Click [here][1], [here][1] or [here][1] to play. Or [here][1].**

[1]: http://animuchan.net/git-invaders/

# Git Invaders

## Compatibility

<table>
	<tr>
		<td><strong>Near-ideal:</strong></td>
		<td>Google Chrome</td>
	</tr>
	<tr>
		<td><strong>Works:</strong></td>
		<td>Safari, Firefox, Opera, Chromium</td>
	</tr>
	<tr>
		<td><strong>Broken:</strong></td>
		<td>MSIE version 10</td>
	</tr>
	<tr>
		<td><strong>FFFFUUUU:</strong></td>
		<td>MSIE before version 10, mobile devices</td>
	</tr>
</table>

CSS3 support is required.
Only the recent browser versions are supported.

## Building from source

...depends on **Fabric, RequireJS, UglifyJS** and **ycssmin.**
(I assume **Node.js** and **Python** are installed, too.)

Requirements:
`npm -g i requirejs uglify-js ycssmin`
and
`pip install fabric`
should suffice.

Then use `fab optimize` to rebuild (minify) game files.

## License

[MIT][2].

[2]: https://raw.github.com/mvasilkov/game-off-2012/master/MIT-LICENSE.txt
