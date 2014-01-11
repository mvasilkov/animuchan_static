define(['lib/phaser'], function (phaser) {
    var height = 200, width = 3 * height, bottom = height * 0.666|0,
        jumpButton = ' '.charCodeAt(), pad = 60, drop = bottom - 40,
        game = new phaser.Game(width, height, phaser.AUTO, 'ninjacy')

    function loading() {}
    function running() { this.pause = true }

    loading.prototype.preload = function () {
        game.load.image('box', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA'+
                        'ABQAAAAUAQAAAACl8iCgAAAADklEQVR4AWP8z/CRmhgAEwom1XWUb'+
                        '+EAAAAASUVORK5CYII=')
        game.load.image('ground', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEU'+
                        'gAAAfQAAAACAQAAAACGEROXAAAAEElEQVQImWP4TxH4wEChfgBe83'+
                        '1l4TdA5wAAAABJRU5ErkJggg==')
    }

    loading.prototype.create = function () { game.state.start('running') }

    running.prototype.create = function () {
        this.ground = game.add.sprite(0.5 * width, bottom, 'ground')
        this.ground.anchor.setTo(0.5, 0.5)
        this.ground.body.immovable = true

        this.player = game.add.sprite(pad, drop, 'box')
        this.player.anchor.setTo(0.5, 0.5)
        this.player.body.gravity.setTo(0, 12)

        this.spacebar = game.input.keyboard.addKey(jumpButton)
        game.input.keyboard.addKeyCapture(jumpButton)
    }

    running.prototype.update = function () {
        game.physics.collide(this.player, this.ground)

        var jumping = this.spacebar.isDown,
            landed = this.player.body.touching.down,
            done = this.player.x >= width - pad

        if (landed) {
            if (jumping) {
                if (this.pause) this.start()
                this.jump()
            }
            this.pause || this.run()
        }

        if (done) this.reset()
    }

    running.prototype.start = function () {
        this.pause = false
    }

    running.prototype.run = function () {
        this.player.body.velocity.x = 170
    }

    running.prototype.jump = function () {
        this.player.body.velocity.y = -250
    }

    running.prototype.reset = function () {
        this.player.reset(pad, drop)
    }

    game.state.add('loading', loading)
    game.state.add('running', running)

    return game
})
