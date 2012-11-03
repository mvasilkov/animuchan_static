require(["keyboard", "todo", "ui"], function(keyboard, todo, ui) {
    keyboard.init(ui.readline, todo.push)
    todo.init(ui.addTask, ui.updateCount)
})
