define(["conf"], function(conf) {
    var _fullscreen = $("#fullscreen")

    function init() {
        if (!document.webkitFullscreenEnabled) return

        _fullscreen.show().click(function() {
            if (document.webkitFullscreenElement)
                document.webkitExitFullscreen()
            else document.documentElement.webkitRequestFullscreen(conf.ALLOW_KEYBOARD_INPUT)

            return false
        })
    }

    return {
        init: init
    }
})
