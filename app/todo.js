define(function() {
    var _todo, _addTask, _removeTask, _updateCount

    function push(text) {
        _todo.push(text)

        _addTask(text)
        _updateCount(_todo.length)
    }

    function init(addTask, removeTask, updateCount) {
        _todo = []

        _addTask = addTask
        _updateCount = updateCount
        _removeTask = removeTask

        push("git init")
    }

    function advance() {
        push("git status")
    }

    function done(text) {
        var index = _todo.indexOf(text)
        if (index !== -1) {
            _todo.splice(index, 1)
            _removeTask(text)
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
