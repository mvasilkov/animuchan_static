define([
    'lib/phaser',
    'js/maps',
    'js/util'
],
function (phaser, maps, util) {
    var height = 200, width = 3 * height, bottom = height * 0.666|0,
        jumpButton = ' '.charCodeAt(), pad = 60, drop = bottom - 40,
        domLevel = document.getElementById('level'),
        domDeaths = document.getElementById('deaths'),
        domDeathsEnd = document.getElementById('deaths-end'),
        game = new phaser.Game(width, height, phaser.AUTO, 'ninjacy')

    function loading() {}
    function running() { this.pause = true, this.deaths = 0 }
    function gameover() {}

    loading.prototype.preload = function () {
        game.load.image('box', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA'+
                        'ABQAAAAUAQAAAACl8iCgAAAADklEQVR4AWP8z/CRmhgAEwom1XWUb'+
                        '+EAAAAASUVORK5CYII=')
        game.load.image('ground', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEU'+
                        'gAAAfQAAAACAQAAAACGEROXAAAAEElEQVQImWP4TxH4wEChfgBe83'+
                        '1l4TdA5wAAAABJRU5ErkJggg==')
        game.load.audio('music', ['media/audio/music.mp3',
                        'media/audio/music.ogg'])
        game.load.audio('crashed', 'media/audio/crashed.wav')
        game.load.audio('jump0', 'media/audio/jump0.wav')
        game.load.audio('jump1', 'media/audio/jump1.wav')
        game.load.audio('levelup0', 'media/audio/levelup0.wav')
        game.load.audio('levelup1', 'media/audio/levelup1.wav')

        game.stage.backgroundColor = '#0b0303'
    }

    loading.prototype.create = function () {
        document.body.className = 'pause'
        game.state.start('running')
    }

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
        this.player3d = util.gooBoxFrom2dObj(this.player, 2, [0.8, 1, 0.4, 1])
        this.blocks3d = []

        this.music = game.add.audio('music')
        this.sounds = {
            crashed:  game.add.audio('crashed'),
            jump0:    game.add.audio('jump0'),
            jump1:    game.add.audio('jump1'),
            levelup0: game.add.audio('levelup0'),
            levelup1: game.add.audio('levelup1')
        }

        this.levelUp(true)
    }

    running.prototype.update = function () {
        game.physics.collide(this.player, this.ground)

        var jumping = this.spacebar.isDown,
            landed = this.player.body.touching.down,
            done = this.player.x >= width - pad,
            bug = this.player.y >= height

        if (landed) {
            if (jumping) {
                if (this.pause) this.start()
                this.jump()
            }
            this.pause || this.run()
        }

        if (done) this.reset(), this.levelUp()
        else game.physics.overlap(this.player, this.blocks,
                                  this.crashed, 0, this)

        if (bug) this.player.reset(pad, drop)

        util.moveRotate2dObj(this.player3d, this.player)
        util.cameraTrack2dObj(game._goo.cam, this.player)
    }

    running.prototype.start = function () {
        this.pause = false
        this.music.play('', 0, 1, true)
        document.body.className = 'running'
    }

    running.prototype.run = function () {
        this.player.body.velocity.x = 170
    }

    running.prototype.jump = function () {
        this.player.body.velocity.y = -250
        this.sounds['jump' + (Math.random() + 0.5|0)].play('', 0, 0.5)
        this.barrelRoll = game.add.tween(this.player)
        this.barrelRoll.to({ angle: this.player.angle + 180 }, 700, 0, 1)
    }

    running.prototype.reset = function () {
        this.player.reset(pad, drop)
        this.barrelRoll.pause().stop()
        this.player.angle = 0
    }

    running.prototype.levelUp = function (initial) {
        this.blocks.forEachAlive(function (b) { b.kill() })
        this.level = (this.level|0) + 1

        this.blocks3d.forEach(function (b) { b.removeFromWorld() })
        this.blocks3d = []

        if (this.level == maps.length) {
            this.ground3d.removeFromWorld()
            this.player3d.removeFromWorld()
            domDeathsEnd.innerHTML = this.deaths
            game.state.start('gameover')
            return
        }

        maps[this.level].forEach(function (tile, n) { if (tile) {
            var b = this.blocks.getFirstDead(), h, asc
            switch (tile) {
                case 1: case 2: case 3: case 4:
                    asc = 0
                    h = -0.1 * tile * tile + tile - 0.6
                    break
                case 5:
                    asc = 22
                    h = 0.3
                    break
                default: return
            }
            b.reset(n * b.width + 100, bottom - asc - 1)
            b.anchor.setTo(0, 1)
            b.scale.setTo(1, h)

            this.blocks3d.push(util.gooBoxFrom2dObjB(b, 2))
        }}, this)

        if (initial) return
        this.sounds['levelup' + (Math.random() + 0.5|0)].play('', 0, 0.5)

        domLevel.innerHTML = this.level
    }

    running.prototype.crashed = function () {
        this.reset()
        this.sounds['crashed'].play('', 0, 0.5)

        domDeaths.innerHTML = ++this.deaths
    }

    gameover.prototype.create = function () {
        document.body.className = 'gameover'
    }

    game.state.add('loading', loading)
    game.state.add('running', running)
    game.state.add('gameover', gameover)

    return game
})
