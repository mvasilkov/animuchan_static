if (!Array.prototype.indexOf) {
    var err = "This MSIE is not supported."
    alert(err)
    throw new Error(err)
}

require(["fullscreen", "keyboard", "music", "todo", "ui"],
    function(fullscreen, keyboard, music, todo, ui) {
        fullscreen.init()
        keyboard.init(ui.readline, todo.done, music.blip)
        music.init()
        todo.init(ui.addTask, ui.removeTask, ui.updateCount, ui.updateScore, ui.endGame)
        ui.init(todo.advance)
    })
