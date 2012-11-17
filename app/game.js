define(["requestAnimationFrame"], function(requestAnimationFrame) {
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
    }

    function init() {
        var real_width = 960 / 20, real_height = 540 / 20,
            gravity = new Box2D.b2Vec2(0, -1),
            world = new Box2D.b2World(gravity),
            props = []

        props.push(new RectProp(world, real_width / 2, 0, real_width, 1))
        props.push(new RectProp(world, real_width / 2, real_height, real_width, 1))
        props.push(new RectProp(world, 0, real_height / 2, 1, real_height - 1))
        props.push(new RectProp(world, real_width, real_height / 2, 1, real_height - 1))
    }

    return {
        init: init
    }
})
