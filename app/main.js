(function(root) {
    var todo = $("#todo"), count = $("#count"), input = $("#input")

    function newTask(text) {
        var task = $("<div class=task>").text(text)
        todo.append(task)
        count.css("width", todo.children(".task").length * 11.11 + "%")
    }

    root.keyboardUpdate = $.proxy(input.text, input)

    root.keyboardReturn = newTask
})(this)
