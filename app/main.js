(function() {
    var /** @const */ BACKSPACE = 0x08, /** @const */ RETURN = 0x0d,
        /** @const */ PRINTABLE = "abcdefghijklmnopqrstuvwxyz0123456789",
        /** @const */ BUFFER_SIZE = 40, buffer = "",
        todo = $("#todo"), count = $("#count"), input = $("#term .input")

    function isPrintable(ch) {
        return PRINTABLE.indexOf(ch) !== -1
    }

    function newTask(text) {
        var task = $("<div class=task>").text(text)
        todo.append(task)
        count.css("width", todo.children(".task").length * 11.11 + "%")
    }

    $(document.documentElement).keydown(function(event) {
        if (event.which === BACKSPACE) {
            buffer = buffer.substr(0, buffer.length - 1)
            input.text(buffer)

            if (event.preventDefault) event.preventDefault()
        }
    })

    $(document.documentElement).keypress(function(event) {
        var ch = String.fromCharCode(event.which).toLowerCase()

        if (event.which === RETURN) {
            newTask("fffuuuu~")
        }
        else if (ch.length === 1 && isPrintable(ch)) {
            if (buffer.length < BUFFER_SIZE) {
                buffer += ch
                input.text(buffer)
            }

            if (event.preventDefault) event.preventDefault()
        }
    })
})()
