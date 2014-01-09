define(['lib/phaser'], function (phaser) {
    var height = 200, width = 3 * height,
        game = new phaser.Game(width, height, phaser.AUTO, 'ninjacy')

    function loading() {}

    loading.prototype.preload = function () {
        game.load.image('box', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA'+
                        'ABQAAAAUAQAAAACl8iCgAAAADklEQVR4AWP8z/CRmhgAEwom1XWUb'+
                        '+EAAAAASUVORK5CYII=')
        game.load.image('ground', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEU'+
                        'gAAAfQAAAACAQAAAACGEROXAAAAEElEQVQImWP4TxH4wEChfgBe83'+
                        '1l4TdA5wAAAABJRU5ErkJggg==')
    }

    game.state.add('loading', loading)

    return game
})
