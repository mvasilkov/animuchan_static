define(["conf", "utils"], function(conf, utils) {
    var _count = $("#count"), _input = $("#input"), _todo = $("#todo"),
        _countFull = _todo.width()

    function readline(text) {
        _input.text(text)
    }

    function addTask(text) {
        var task = $("<div class=task>").attr("data-text", text).text(text)
        _todo.append(task)
        utils.defer(task.addClass, task, "active")
    }

    function updateCount(n) {
        _count.css("width", _countFull / conf.TODO_SIZE * n + "px")
        if (n === conf.TODO_SIZE) {
            _count.addClass("danger")
        }
    }

    return {
        readline: readline,
        addTask: addTask,
        updateCount: updateCount
    }
})
