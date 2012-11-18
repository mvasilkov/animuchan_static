define(["conf", "utils"], function(conf, utils) {
    var _game = $("#game"),
        _mobWidth = 55 / conf.GAME_SCALE,
        _mobHeight = 40 / conf.GAME_SCALE

    function Mob(world, left, top) {
        var def = new Box2D.b2BodyDef()
        def.set_type(Box2D.b2_dynamicBody)
        def.set_position(new Box2D.b2Vec2(left, top))
        def.set_angle(0)

        var poly = new Box2D.b2PolygonShape()
        poly.SetAsBox(_mobWidth / 2, _mobHeight / 2)

        var fixdef = new Box2D.b2FixtureDef()
        fixdef.set_density(1)
        fixdef.set_friction(0.3)
        fixdef.set_restitution(0.4)
        fixdef.set_shape(poly)

        this.body = world.CreateBody(def)
        this.body.CreateFixture(fixdef)

        this.im = $("<img class=mob src=media/mob.png width=55 height=40>")[0]
        _game.append(this.im)
    }

    Mob.prototype.render = function() {
        var position = this.body.GetPosition()

        this.im.style.left = (position.get_x() - _mobWidth / 2) * conf.GAME_SCALE + "px"
        this.im.style.top = (position.get_y() - _mobHeight / 2) * conf.GAME_SCALE + "px"
        this.im.style[utils.transform] = "rotate(" + this.body.GetAngle() + "rad)"
    }

    return Mob
})
