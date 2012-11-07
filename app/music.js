define(function() {
    var _bgm

    function ready() {
        _bgm = soundManager.createSound({
            autoLoad: true,
            id: "bgm",
            loops: 9000,
            url: "media/sound/bgm.mp3"
        })

        $("#music-on").click(function(event) {
            _bgm.play()
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
