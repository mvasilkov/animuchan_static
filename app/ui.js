define(["conf", "utils"], function(conf, utils) {
    var _count = $("#count"), _input = $("#input"), _lines = $("#lines"), _next = $("#next"),
        _score = $("#score"), _todo = $("#todo"), _countFull = _todo.width(),
        _removeMob, _advanceGame, _changeSpeed, _started = false, _points = 0

    function resetNext() {
        utils.defer(_next.addClass, _next, "done")
        _next.removeClass("done")
        _advanceGame()
    }

    function init() {
        var game = require("game"), todo = require("todo")

        _removeMob = game.removeMob
        _advanceGame = todo.advance
        _changeSpeed = todo.changeSpeed

        _next.bind(utils.transitionend, resetNext)

        /* preload images */
        for (var i = 0; i < conf.MOB_FLAVORS; ++i) {
            var foo = new Image
            foo.src = "media/mob" + i + ".png"
        }

        var body = $("body")
        utils.defer(body.removeClass, body, "loading")
    }

    function readline(text, history) {
        if ((_started || utils.normalize(history) === "git init") && typeof history === "string") {
            _lines.children(":first").remove()
            _lines.children(":first").after("<li>history> " + history + "</li>")
        }
        _input.text(text)
    }

    function addTask(text, flavor) {
        var task = $("<div class=task>").attr("data-text", text).text(text),
            icon = $("<img src=media/mob" + flavor + ".png width=33 height=24>").appendTo(task)
        _todo.append(task)
        utils.defer(task.addClass, task, "active")
    }

    function removeSecondaryUI() {
        function _rm() { $(this).remove() }

        $("#instructions").remove() // it's way too animated in the area
        $("#github").slideUp(_rm)
        $("#fullscreen").hide(_rm)
    }

    function removeTask(text, remaining) {
        if (!_started) {
            setTimeout(removeSecondaryUI, 0)
            _started = true
        }

        if (!remaining) resetNext()

        var task = _todo.children(".task[data-text=\"" + text + "\"]").first()

        _removeMob(text)

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
        var _saved = _points

        _score.text(_fmt(_points += n))

        if ((0.001 * _points | 0) != (0.001 * _saved | 0))
            _changeSpeed()
    }

    function endGame() {
        _next.remove()

        $(document.documentElement).unbind("keypress")
        $("#high-score").text(_fmt(_points))
        $("#game-over").modal({ backdrop: "static", keyboard: false })

        require("music").game_over()
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
