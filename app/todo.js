define(["conf"], function(conf) {
    var _todo, _addTask, _removeTask, _updateCount, _updateScore, _endGame,
        _next, _changeCSS = 0, _levels = ["easy", "normal", "hard"], _level = 0,
        _speed = 2.5

    function push(text) {
        _todo.push(text)

        _addMob(text)
        _addTask(text)
        _updateCount(_todo.length)
    }

    function _set_level() {
        var opt = location.search.substr(1)

        if (opt == "normal") _level = 1
        else if (opt == "hard") _level = 2

        _speed = _speed - _level + 0.1*(1+_level)
        changeSpeed()
        $("#level-select ." + _levels[_level]).addClass("btn-primary active")
        $("#level-restart a, #game-over a").attr("href", "?" + _levels[_level])
    }

    function init() {
        var game = require("game"), ui = require("ui")

        _todo = []

        _addMob = game.addMob
        _addTask = ui.addTask
        _removeTask = ui.removeTask
        _updateCount = ui.updateCount
        _updateScore = ui.updateScore
        _endGame = ui.endGame
        _changeCSS = ui.changeCSS

        _set_level()

        push("git init")
    }

    function advance() {
        if (_todo.length === conf.TODO_SIZE) {
            _endGame()
        }
        else push("git "+conf.COMMANDS[Math.floor(Math.random()*conf.COMMANDS.length)]) // FIXME
    }

    function changeSpeed() {
        _speed = _speed - 0.1*(1+_level)
        console.log('new speed', _speed)
        _changeCSS('#next.done', '-moz-transition: width '+_speed+
                                 's linear;-webkit-transition: width '+_speed+
                                 's linear;-o-transition: width '+_speed+'s linear;')
    }

    function done(text) {
        var index = _todo.indexOf(text)
        if (index !== -1) {
            _todo.splice(index, 1)
            _removeTask(text, _todo.length)
            _updateCount(_todo.length)
            _updateScore(100 + _level * 100)
        }
    }

    return {
        push: push,
        init: init,
        advance: advance,
        changeSpeed: changeSpeed,
        done: done
    }
})
