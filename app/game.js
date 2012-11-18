define(["RectProp", "requestAnimationFrame", "conf"], function(RectProp, requestAnimationFrame, conf) {
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
