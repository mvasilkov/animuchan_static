define(["conf"], function(conf) {
    var _buffer = ""

    function isPrintable(ch) {
        return conf.PRINTABLE.indexOf(ch) !== -1
    }

    function init(keyboardUpdate, keyboardReturn) {
    $(document.documentElement).keydown(function(event) {
            if (event.which === conf.BACKSPACE) {
                _buffer = _buffer.substr(0, _buffer.length - 1)
                if (keyboardUpdate) keyboardUpdate(_buffer)

                if (event.preventDefault) event.preventDefault()
            }
        })

        $(document.documentElement).keypress(function(event) {
            if (event.metaKey || event.altKey || event.ctrlKey) return

            var ch = String.fromCharCode(event.which).toLowerCase()

            if (event.which === conf.RETURN) {
                if (keyboardUpdate) keyboardUpdate("")
                if (keyboardReturn) keyboardReturn(_buffer)
                _buffer = ""

                if (event.preventDefault) event.preventDefault()
            }
            else if (ch.length === 1 && isPrintable(ch)) {
                if (_buffer.length < conf.BUFFER_SIZE) {
                    _buffer += ch
                    if (keyboardUpdate) keyboardUpdate(_buffer)
                }

                if (event.preventDefault) event.preventDefault()
            }
        })
    }

    return {
        init: init
    }
})
