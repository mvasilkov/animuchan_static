define(["Mob", "RectProp", "Frag", "requestAnimationFrame", "box2d", "conf", "invader"],
    function(Mob, RectProp, Frag, requestAnimationFrame, Box2D, conf, invader) {
        var _game = $("#game"), _world, _mobs = [], _frags = [],
            /* "The suggested iteration count is 8 for velocity and 3 for position." */
            _velocityIter = 8, _positionIter = 3, _lastUpdate = new Date().getTime()

        function render() {
            requestAnimationFrame(render)

            var now = new Date().getTime(), upd = 0.01 * (now - _lastUpdate)
            _lastUpdate = now

            _world.Step(upd, _velocityIter, _positionIter)

            for (var i = 0; i < _mobs.length; ++i) {
                _mobs[i].render()
            }

            for (var j = 0; j < _frags.length; ++j) {
                if (_frags[j].ttl > 0) {
                    _frags[j].ttl -= upd
                    _frags[j].render()
                }
                else {
                    _frags[j].remove()
                    _frags.splice(j, 1)
                }
            }
        }

        function init() {
            var real_width = (960 - 325) / conf.GAME_SCALE,
                real_height = (540 - 87) / conf.GAME_SCALE,
                gravity = new Box2D.b2Vec2(0, 0.05),
                props = []

            _world = new Box2D.b2World(gravity)

            _world.real_width = real_width
            _world.real_height = real_height

            props.push(new RectProp(_world, real_width / 2, 0, real_width, 1))
            props.push(new RectProp(_world, real_width / 2, real_height, real_width, 1))
            props.push(new RectProp(_world, 0, real_height / 2, 1, real_height - 1))
            props.push(new RectProp(_world, real_width, real_height / 2, 1, real_height - 1))

            if (0) for (var i = 0; i < props.length; ++i) {
                props[i].render()
            }

            requestAnimationFrame(render)
        }

        function addMob(text) {
            var x = (7 + 66 / 2) / conf.GAME_SCALE,
                y = (7 + 48 / 2) / conf.GAME_SCALE

            x += Math.random() * (_world.real_width - x - x)

            _mobs.push(new Mob(_world, x, y, text))
        }

        function removeMob(text) {
            for (var i = 0; i < _mobs.length; ++i) {
                if (_mobs[i].text == text) {
                    _mobs[i].remove()
                    _mobs.splice(i, 1)
                    return
                }
            }
        }

        function addFrags(pos, angle, velocity, flavor) {
            var x0 = pos.get_x(),
                y0 = pos.get_y(),
                c = Math.cos(angle),
                s = Math.sin(angle)

            function _rot(x, y) {
                return new Box2D.b2Vec2(x0 + c * x - s * y,
                                        y0 + c * y + s * x)
            }

            for (var i = 0; i < invader.n; ++i) {
                var position = _rot(invader.xs[i], invader.ys[i]),
                    blast = Box2D.b2Math.SubtractVV(pos, position) // implosion

                _frags.push(new Frag(_world, position, angle, velocity, blast,
                    conf.FRAG_TTL + i * 0.25, flavor))
            }
        }

        return {
            init: init,
            addMob: addMob,
            removeMob: removeMob,
            addFrags: addFrags
        }
    })
