(function(root) {
    var /** @const */ BACKSPACE = 0x08, /** @const */ RETURN = 0x0d,
        /** @const */ PRINTABLE = "abcdefghijklmnopqrstuvwxyz0123456789",
        /** @const */ BUFFER_SIZE = 40, buffer = ""

    function isPrintable(ch) {
        return PRINTABLE.indexOf(ch) !== -1
    }

    $(document.documentElement).keydown(function(event) {
        if (event.which === BACKSPACE) {
            buffer = buffer.substr(0, buffer.length - 1)
            if (root.keyboardUpdate) root.keyboardUpdate(buffer)

            if (event.preventDefault) event.preventDefault()
        }
    })

    $(document.documentElement).keypress(function(event) {
        var ch = String.fromCharCode(event.which).toLowerCase()

        if (event.which === RETURN) {
            if (root.keyboardReturn) root.keyboardReturn(buffer)

            if (event.preventDefault) event.preventDefault()
        }
        else if (ch.length === 1 && isPrintable(ch)) {
            if (buffer.length < BUFFER_SIZE) {
                buffer += ch
                if (root.keyboardUpdate) root.keyboardUpdate(buffer)
            }

            if (event.preventDefault) event.preventDefault()
        }
    })
})(this)
