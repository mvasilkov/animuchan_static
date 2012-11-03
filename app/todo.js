define(["conf"], function(conf) {
    var _todo, _addTask, _removeTask, _updateCount, _endGame, _next = 0

    function push(text) {
        _todo.push(text)

        _addTask(text)
        _updateCount(_todo.length)
    }

    function init(addTask, removeTask, updateCount, endGame) {
        _todo = []

        _addTask = addTask
        _removeTask = removeTask
        _updateCount = updateCount
        _endGame = endGame

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
        }
    }

    return {
        push: push,
        init: init,
        advance: advance,
        done: done
    }
})
