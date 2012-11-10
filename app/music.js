define(["utils"], function(utils) {
    var _bgm, _disable = $("#console-disable")

    function ready() {
        _bgm = soundManager.createSound({
            autoLoad: true,
            id: "bgm",
            loops: 9000,
            multiShot: false,
            url: "media/sound/bgm.mp3"
        })

        _disable.remove()

        $("#music-on").click(function(event) {
            _bgm[["stop", "play"][this.checked | 0]]()
        })
    }

    function init() {
        soundManager.setup({
            debugMode: false,
            flashLoadTimeout: 9000,
            flashVersion: 9,
            onready: ready,
            url: "media/sound/"
        })
    }

    return {
        init: init
    }
})
