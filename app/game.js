define(["Mob", "RectProp", "requestAnimationFrame", "conf"],
    function(Mob, RectProp, requestAnimationFrame, conf) {
        var _game = $("#game"), _world, _mobs = [],
            _lastUpdate = new Date().getTime()

        function render() {
            requestAnimationFrame(render)

            var now = new Date().getTime(), upd = 0.01 * (now - _lastUpdate)
            _lastUpdate = now

            _world.Step(upd, 10, 8)

            for (var i = 0; i < _mobs.length; ++i) {
                _mobs[i].render()
            }
        }

        function init() {
            var real_width = (960 - 325) / conf.GAME_SCALE,
                real_height = (540 - 87) / conf.GAME_SCALE,
                gravity = new Box2D.b2Vec2(0, 1),
                props = []

            _world = new Box2D.b2World(gravity)

            props.push(new RectProp(_world, real_width / 2, 0, real_width, 1))
            props.push(new RectProp(_world, real_width / 2, real_height, real_width, 1))
            props.push(new RectProp(_world, 0, real_height / 2, 1, real_height - 1))
            props.push(new RectProp(_world, real_width, real_height / 2, 1, real_height - 1))

            for (var i = 0; i < props.length; ++i) {
                props[i].render()
            }

            _game.click(function(event) {
                var	offset = $(this).offset(),
                    left = (event.pageX - offset.left) / 20,
                    top = (event.pageY - offset.top) / 20,
                    mob = new Mob(_world, left, top)

                _mobs.push(mob)
            })

            render()
        }

        return {
            init: init
        }
    })
