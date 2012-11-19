define(["conf", "utils"], function(conf, utils) {
    var _buffer = ""

    function isPrintable(ch) {
        return conf.PRINTABLE.indexOf(ch) !== -1
    }

    function init() {
        var keyboardUpdate = require("ui").readline,
            keyboardReturn = require("todo").done,
            blip = require("music").blip,
            press_count = 0;

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
            check_keys = function(){
                var keys_pressed = press_count;
                return (function() {
                    if (keys_pressed == press_count-1) { 
                        $('.text-caret').addClass('text-caret-animated')
                    } else {
                        $('.text-caret').removeClass('text-caret-animated')
                    }
                });
            }
            setTimeout(check_keys(), 250);
            press_count++;

            if (event.metaKey || event.altKey || event.ctrlKey) return

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
