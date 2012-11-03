define(["conf", "utils"], function(conf, utils) {
    var _count = $("#count"), _input = $("#input"), _next = $("#next"),
        _todo = $("#todo"), _countFull = _todo.width(), _advanceGame

    function resetNext() {
        utils.defer(_next.addClass, _next, "done")
        _next.removeClass("done")
        _advanceGame()
    }

    function init(advanceGame) {
        _advanceGame = advanceGame
        _next.bind(utils.transitionend, resetNext)
    }

    function readline(text) {
        _input.text(text)
    }

    function addTask(text) {
        var task = $("<div class=task>").attr("data-text", text).text(text)
        _todo.append(task)
        utils.defer(task.addClass, task, "active")
    }

    function removeTask(text, remaining) {
        if (!remaining) resetNext()

        var task = _todo.children(".task[data-text=\"" + text + "\"]")
        task.removeClass("active").bind(utils.transitionend, function() {
            var replacement = $("<div class=replacement>")
            $(this).replaceWith(replacement)
            utils.defer(replacement.addClass, replacement, "foo")
            replacement.bind(utils.transitionend, function() {
                $(this).remove()
            })
        })
    }

    function updateCount(n) {
        _count.css("width", _countFull / conf.TODO_SIZE * n + "px")
        if (n === conf.TODO_SIZE) {
            _count.addClass("danger")
        }
    }

    return {
        init: init,
        readline: readline,
        addTask: addTask,
        removeTask: removeTask,
        updateCount: updateCount
    }
})
