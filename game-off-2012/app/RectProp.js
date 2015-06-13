define(["box2d", "conf"], function(Box2D, conf) {
    var _game = $("#game")

    function RectProp(world, left, top, width, height) {
        var def = new Box2D.b2BodyDef()
        def.set_position(new Box2D.b2Vec2(left, top))
        def.set_angle(0)
        def.set_fixedRotation(true)

        var poly = new Box2D.b2PolygonShape()
        poly.SetAsBox(width / 2, height / 2)

        var fixdef = new Box2D.b2FixtureDef()
        fixdef.set_restitution(0.5)
        fixdef.set_shape(poly)

        this.body = world.CreateBody(def)
        this.body.CreateFixture(fixdef)

        this.width = width
        this.height = height
    }

    RectProp.prototype.render = function() {
        if (typeof this.im === "undefined") {
            this.im = $("<div class=rect-prop>")
                /* initialize */
                .width(this.width * conf.GAME_SCALE)
                .height(this.height * conf.GAME_SCALE)
                .appendTo(_game)
        }

        var position = this.body.GetPosition()
        this.im.css({
            left: (position.get_x() - this.width / 2) * conf.GAME_SCALE,
            top: (position.get_y() - this.height / 2) * conf.GAME_SCALE
        })
    }

    return RectProp
})
