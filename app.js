(function (canvas) {
    define('_canvas', canvas)
    require.config({
        urlArgs: 'rc1'
    })
    require(['js/game', 'js/goo'], function (game, goo) {
        game._goo = goo
        game.state.start('loading')
    })
}(document.getElementsByTagName('canvas')[0]))
