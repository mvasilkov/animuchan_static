define(["conf", "utils"], function(conf, utils) {
    var _count = $("#count"), _input = $("#input"), _next = $("#next"),
        _score = $("#score"), _todo = $("#todo"), _countFull = _todo.width(),
        _advanceGame, _started = false, _points = 0

    function resetNext() {
        utils.defer(_next.addClass, _next, "done")
        _next.removeClass("done")
        _advanceGame()
    }

    function init(advanceGame) {
        _advanceGame = advanceGame
        _next.bind(utils.transitionend, resetNext)

        _score.tooltip({ placement: "bottom" })

        var body = $("body")
        utils.defer(body.removeClass, body, "loading")
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
        if (!_started) {
            $("#instructions").remove()
            _started = true
        }

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

    function _fmt(n) {
        var t = "00000000" + n
        return t.substr(t.length - conf.SCORE_SIZE)
    }

    function updateScore(n) {
        _score.text(_fmt(_points += n))
    }

    function endGame() {
        _next.remove()

        $("#high-score").text(_fmt(_points))
        $("#game-over").modal({ backdrop: "static", keyboard: false })
    }

    return {
        init: init,
        readline: readline,
        addTask: addTask,
        removeTask: removeTask,
        updateCount: updateCount,
        updateScore: updateScore,
        endGame: endGame
    }
})
