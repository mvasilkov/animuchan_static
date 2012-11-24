define(["box2d", "conf", "utils"], function(Box2D, conf, utils) {
    var _game = $("#game"),
        _fragWidth = conf.FRAG_SIZE / conf.GAME_SCALE,
        _fragHeight = conf.FRAG_SIZE / conf.GAME_SCALE

    function Frag(world, position, angle, velocity, blast, ttl) {
        var def = new Box2D.b2BodyDef()
        def.set_type(Box2D.b2_dynamicBody)
        def.set_position(position)
        def.set_angle(angle)

        var poly = new Box2D.b2PolygonShape()
        poly.SetAsBox(_fragWidth / 2, _fragHeight / 2)

        var fixdef = new Box2D.b2FixtureDef()
        fixdef.set_density(2.5)
        fixdef.set_friction(0.3)
        fixdef.set_restitution(0.5)
        fixdef.set_shape(poly)

        this.body = world.CreateBody(def)
        this.body.CreateFixture(fixdef)
        this.body.SetLinearVelocity(velocity)
        this.body.ApplyImpulse(blast, position)

        this.world = world
        this.ttl = ttl

        this.im = $("<div class=frag>")[0]
        this.render()

        _game.append(this.im)
    }

    Frag.prototype.render = function() {
        var position = this.body.GetPosition()

        this.im.style.left = (position.get_x() - _fragWidth / 2) * conf.GAME_SCALE + "px"
        this.im.style.top = (position.get_y() - _fragHeight / 2) * conf.GAME_SCALE + "px"
        this.im.style[utils.transform] = "rotate(" + this.body.GetAngle() + "rad)"
    }

    Frag.prototype.remove = function() {
        $(this.im).remove()
        this.world.DestroyBody(this.body)
    }

    return Frag
})
