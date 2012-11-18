define(["requestAnimationFrame", "conf"], function(requestAnimationFrame, conf) {
    var _game = $("#game")

    RectProp = function(world, left, top, width, height) {
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

    function init() {
        var real_width = (960 - 325) / conf.GAME_SCALE,
            real_height = (540 - 87) / conf.GAME_SCALE,
            gravity = new Box2D.b2Vec2(0, -1),
            world = new Box2D.b2World(gravity),
            props = []

        props.push(new RectProp(world, real_width / 2, 0, real_width, 1))
        props.push(new RectProp(world, real_width / 2, real_height, real_width, 1))
        props.push(new RectProp(world, 0, real_height / 2, 1, real_height - 1))
        props.push(new RectProp(world, real_width, real_height / 2, 1, real_height - 1))

        for (var i = 0; i < props.length; ++i) {
            props[i].render()
        }
    }

    return {
        init: init
    }
})
