**Click [here][1], [here][2] or [here][1] to play. Or [here][2].**

[1]: http://animuchan.net/git-invaders/
[2]: http://animuchan.net/git-invaders/music-on/

# Git Invaders

Programmed by [Mark Vasilkov][3].
See [End credits][4] for contributors and third parties.

[3]: http://careers.stackoverflow.com/mvasilkov
[4]: https://github.com/mvasilkov/game-off-2012/wiki/End-credits

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

[MIT][5].

[5]: https://raw.github.com/mvasilkov/game-off-2012/master/MIT-LICENSE.txt
