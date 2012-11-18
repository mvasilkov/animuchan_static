define(["conf"], function(conf) {
    var _game = $("#game")

    function RectProp(world, left, top, width, height) {
        var def = new Box2D.b2BodyDef()
        def.set_position(new Box2D.b2Vec2(left, top))
        def.set_angle(0)
        def.set_fixedRotation(true)

        var poly = new Box2D.b2PolygonShape()
        poly.SetAsBox(width / 2, height / 2)

        var fixdef = new Box2D.b2FixtureDef()
        fixdef.set_restitution(0.4)
        fixdef.set_shape(poly)

        this.body = world.CreateBody(def)
        this.body.CreateFixture(fixdef)

        this._width = width
        this._height = height
    }

    RectProp.prototype.render = function() {
        if (typeof this._rect === "undefined") {
            this._rect = $("<div class=rect-prop>")
                /* initialize */
                .width(this._width * conf.GAME_SCALE)
                .height(this._height * conf.GAME_SCALE)
                .appendTo(_game)
        }

        var position = this.body.GetPosition()
        this._rect.css({
            left: (position.get_x() - this._width / 2) * conf.GAME_SCALE,
            top: (position.get_y() - this._height / 2) * conf.GAME_SCALE
        })
    }

    return RectProp
})
