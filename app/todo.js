define(["conf"], function(conf) {
    var _todo, _addTask, _removeTask, _updateCount, _updateScore, _endGame,
        _next = 0, _levels = ["easy", "normal", "hard"], _level = 0

    function push(text) {
        _todo.push(text)

        _addTask(text)
        _updateCount(_todo.length)
    }

    function _set_level() {
        if (location.search.substr(1) == "normal") _level = 1
        else if (location.search.substr(1) == "hard") _level = 2

        $("#level-select ." + _levels[_level]).addClass("btn-primary active")
        $("#level-restart a, #game-over a").attr("href", "?" + _levels[_level])
    }

    function init(addTask, removeTask, updateCount, updateScore, endGame) {
        _todo = []

        _addTask = addTask
        _removeTask = removeTask
        _updateCount = updateCount
        _updateScore = updateScore
        _endGame = endGame

        _set_level()

        push("git init")
    }

    function advance() {
        if (_todo.length === conf.TODO_SIZE) {
            _endGame()
        }
        else push("git " + (++_next)) // FIXME
    }

    function done(text) {
        var index = _todo.indexOf(text)
        if (index !== -1) {
            _todo.splice(index, 1)
            _removeTask(text, _todo.length)
            _updateCount(_todo.length)
            _updateScore(100)
        }
    }

    return {
        push: push,
        init: init,
        advance: advance,
        done: done
    }
})
