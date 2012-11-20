define(["conf", "utils"], function(conf, utils) {
    var _caret = $(".text-caret"), _buffer = ""

    function isPrintable(ch) {
        return conf.PRINTABLE.indexOf(ch) !== -1
    }

    function init() {
        var keyboardUpdate = require("ui").readline,
            keyboardReturn = require("todo").done,
            blip = require("music").blip,
            keypressId = 0

        function testAnimated(n) {
            return function() { _caret[n === keypressId?
                "addClass": "removeClass"]("text-caret-animated") }
        }

        $(document.documentElement).keydown(function(event) {
            if (event.which === conf.BACKSPACE) {
                if (_buffer.length !== 0) {
                    _buffer = _buffer.substr(0, _buffer.length - 1)
                    keyboardUpdate(_buffer)
                }
                else blip()

                if (event.preventDefault) event.preventDefault()
            }
        })

        $(document.documentElement).keypress(function(event) {
            if (event.metaKey || event.altKey || event.ctrlKey) return

            setTimeout(testAnimated(++keypressId), 250)

            var ch = String.fromCharCode(event.which).toLowerCase()

            if (event.which === conf.RETURN) {
                keyboardUpdate("")
                keyboardReturn(utils.normalize(_buffer))
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
