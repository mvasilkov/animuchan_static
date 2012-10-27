(function(root) {
    var todo = $("#todo"), count = $("#count"), input = $("#input")

    /* todoObject */

    var /** @const */ TODO_SIZE = 9, countFull = parseInt(todo.css("width"))

    function addTask(text) {
        var task = $("<div class=task>").text(text)
        todo.append(task)
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
})(this)
