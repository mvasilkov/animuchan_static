(function (canvas) {
    canvas.height = (canvas.width = 960) * 9 / 16
    define('_canvas', canvas)
    require(['js/game', 'js/goo'], function (game, goo) {
        game._goo = goo
        game.state.start('loading')
    })
}(document.getElementsByTagName('canvas')[0]))
