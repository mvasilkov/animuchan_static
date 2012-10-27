(function() {
    var /** @const */ BACKSPACE = 0x08, /** @const */ BUFFER_SIZE = 40,
        /** @const */ PRINTABLE = "abcdefghijklmnopqrstuvwxyz0123456789",
        buffer = "", input = $("#term .input")

    function isPrintable(ch) {
        return PRINTABLE.indexOf(ch) !== -1
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

        if (ch.length === 1 && isPrintable(ch)) {
            if (buffer.length < BUFFER_SIZE) {
                buffer += ch
                input.text(buffer)
            }

            if (event.preventDefault) event.preventDefault()
        }
    })
})()
