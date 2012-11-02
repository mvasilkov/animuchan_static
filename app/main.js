(function(root) {
    var todo = $("#todo"), count = $("#count"), input = $("#input")

    /* todoObject */

    var /** @const */ TODO_SIZE = 9, countFull = parseInt(todo.css("width"))

    function addTask(text) {
        var task = $("<div class=task>").attr("data-text", text).text(text)
        todo.append(task)
        defer(task.addClass, task, "active")
    }

    function updateCount(n) {
        count.css("width", countFull / TODO_SIZE * n + "px")
        if (n === TODO_SIZE) {
            count.addClass("danger")
        }
    }

    var todoObject = new root.TODO(addTask, updateCount)

    /* keyboard */

    root.keyboardUpdate = $.proxy(input.text, input)
    root.keyboardReturn = $.proxy(todoObject.push, todoObject)

    /* debugging */

    todo.delegate(".active.task", "click", function(event) {
        $(this).removeClass("active").bind(root.transitionend, function(event) {
            var replacement = $("<div class=replacement>")
            $(this).replaceWith(replacement)
            defer(replacement.addClass, replacement, "foo")
            replacement.bind(root.transitionend, function(event) {
                $(this).remove()
            })
        })
    })
})(this)
