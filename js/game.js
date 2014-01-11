define([
    'lib/phaser',
    'js/maps',
    'js/util'
],
function (phaser, maps, util) {
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

        this.blocks = game.add.group()
        this.blocks.createMultiple(20, 'box')

        this.spacebar = game.input.keyboard.addKey(jumpButton)
        game.input.keyboard.addKeyCapture(jumpButton)

        this.ground3d = util.gooBoxFrom2dObj(this.ground, 2)
        this.player3d = util.gooBoxFrom2dObj(this.player, 2)

        this.levelUp()
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
        else game.physics.overlap(this.player, this.blocks,
                                  this.crashed, 0, this)

        util.moveRotate2dObj(this.player3d, this.player)
    }

    running.prototype.start = function () {
        this.pause = false
    }

    running.prototype.run = function () {
        this.player.body.velocity.x = 170
    }

    running.prototype.jump = function () {
        this.player.body.velocity.y = -250
        this.barrelRoll = game.add.tween(this.player)
        this.barrelRoll.to({ angle: this.player.angle + 180 }, 700, 0, 1)
    }

    running.prototype.reset = function () {
        this.player.reset(pad, drop)
        this.barrelRoll.pause().stop()
        this.player.angle = 0
    }

    running.prototype.levelUp = function () {
        this.blocks.forEachAlive(function (b) { b.kill() })
        this.level = (this.level|0) + 1

        maps[this.level].forEach(function (tile, n) { if (tile) {
            var b = this.blocks.getFirstDead(), h
            switch (tile) {
                case 1: case 2: case 3: case 4:
                    h = -0.1 * tile * tile + tile - 0.6
                    break
                default: return
            }
            b.reset(n * b.width + 100, bottom - 1)
            b.anchor.setTo(0, 1)
            b.scale.setTo(1, h)
        }}, this)
    }

    running.prototype.crashed = function () {
        this.reset()
    }

    game.state.add('loading', loading)
    game.state.add('running', running)

    return game
})
