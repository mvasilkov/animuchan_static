define(function() {
    var _todo, _addTask, _updateCount

    function push(text) {
        _todo.push(text)

        _addTask(text)
        _updateCount(_todo.length)
    }

    function init(addTask, updateCount) {
        _todo = []

        _addTask = addTask
        _updateCount = updateCount

        push("git init")
    }

    return {
        push: push,
        init: init
    }
})
