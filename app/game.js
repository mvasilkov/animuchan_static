define(["Mob", "RectProp", "requestAnimationFrame", "conf"],
    function(Mob, RectProp, requestAnimationFrame, conf) {
        var _game = $("#game"), _mobs = []

        function render() {
            requestAnimationFrame(render)
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

            _game.click(function(event) {
                var	offset = $(this).offset(),
                    left = (event.pageX - offset.left) / 20,
                    top = (event.pageY - offset.top) / 20,
                    mob = new Mob(left, top)

                _mobs.push(mob)
            })

            render()
        }

        return {
            init: init
        }
    })
