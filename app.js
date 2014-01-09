(function (canvas) {
    require(['js/game'], function (game) {
        game.state.start('loading')
    })
}(document.getElementsByTagName('canvas')[0]))
