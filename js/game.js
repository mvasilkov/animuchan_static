define(['lib/phaser'], function (phaser) {
    var height = 200, width = 3 * height,
        game = new phaser.Game(width, height, phaser.AUTO, 'ninjacy')

    return game
})
