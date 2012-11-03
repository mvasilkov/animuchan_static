if (!Array.prototype.indexOf) {
    var err = "This MSIE is not supported."
    alert(err)
    throw new Error(err)
}

require(["keyboard", "todo", "ui"], function(keyboard, todo, ui) {
    keyboard.init(ui.readline, todo.done)
    todo.init(ui.addTask, ui.removeTask, ui.updateCount)
})
