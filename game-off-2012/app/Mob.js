define(["box2d", "conf", "utils"], function(Box2D, conf, utils) {
    var _game = $("#game"), _addFrags, _blast,
        _mobWidth = 66 / conf.GAME_SCALE,
        _mobHeight = 48 / conf.GAME_SCALE

    function Mob(world, left, top, text) {
        var def = new Box2D.b2BodyDef()
        def.set_type(Box2D.b2_dynamicBody)
        def.set_position(new Box2D.b2Vec2(left, top))
        def.set_angle(0)

        var poly = new Box2D.b2PolygonShape()
        poly.SetAsBox(_mobWidth / 2, _mobHeight / 2)

        var fixdef = new Box2D.b2FixtureDef()
        fixdef.set_density(1)
        fixdef.set_friction(0.3)
        fixdef.set_restitution(0.5)
        fixdef.set_shape(poly)

        this.body = world.CreateBody(def)
        this.body.CreateFixture(fixdef)
        this.body.SetLinearVelocity(new Box2D.b2Vec2(Math.random() - 0.5, 0))

        this.world = world
        this.text = text
        this.flavor = Math.floor(Math.random() * conf.MOB_FLAVORS)

        this.im = $("<img class=mob src=media/mob" + this.flavor + ".png width=66 height=48>")[0]
        this.im.ondragstart = function() { return false }
        this.render()

        _game.append(this.im)
    }

    Mob.prototype.render = function() {
        var position = this.body.GetPosition()

        this.im.style.left = (position.get_x() - _mobWidth / 2) * conf.GAME_SCALE + "px"
        this.im.style.top = (position.get_y() - _mobHeight / 2) * conf.GAME_SCALE + "px"
        this.im.style[utils.transform] = "rotate(" + this.body.GetAngle() + "rad)"
    }

    Mob.prototype.blast = function() {
        if (typeof _addFrags == "undefined") {
            _addFrags = require("game").addFrags
            _blast = require("music").blast
        }

        _addFrags(this.body.GetPosition(), this.body.GetAngle(), this.body.GetLinearVelocity(), this.flavor)
        _blast()
    }

    Mob.prototype.remove = function() {
        $(this.im).remove()
        this.blast()
        this.world.DestroyBody(this.body)
    }

    return Mob
})
