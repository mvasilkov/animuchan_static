define(["conf"], function(conf) {
    var _buffer = ""

    function isPrintable(ch) {
        return conf.PRINTABLE.indexOf(ch) !== -1
    }

    function init(keyboardUpdate, keyboardReturn, blip) {
        $(document.documentElement).keydown(function(event) {
            if (event.which === conf.BACKSPACE) {
                _buffer = _buffer.substr(0, _buffer.length - 1)
                keyboardUpdate(_buffer)

                if (event.preventDefault) event.preventDefault()
            }
        })

        $(document.documentElement).keypress(function(event) {
            if (event.metaKey || event.altKey || event.ctrlKey) return

            var ch = String.fromCharCode(event.which).toLowerCase()

            if (event.which === conf.RETURN) {
                keyboardUpdate("")
                keyboardReturn(_buffer)
                _buffer = ""

                if (event.preventDefault) event.preventDefault()
            }
            else if (ch.length === 1 && isPrintable(ch)) {
                if (_buffer.length < conf.BUFFER_SIZE) {
                    _buffer += ch
                    keyboardUpdate(_buffer)
                }
                else blip()

                if (event.preventDefault) event.preventDefault()
            }
            else blip()
        })
    }

    return {
        init: init
    }
})
