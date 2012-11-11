define(["utils"], function(utils) {
    var _bgm, _blip, _disable = $("#console-disable"),
        _sound_on = $("#sound-on").is(":checked")

    function ready() {
        _bgm = soundManager.createSound({
            autoLoad: true,
            id: "bgm",
            loops: 9000,
            multiShot: false,
            url: "media/sound/bgm.mp3"
        })

        _blip = soundManager.createSound({
            autoLoad: true,
            id: "blip",
            url: "media/sound/blip.wav"
        })

        _disable.remove()

        $("#music-on").change(function() {
            _bgm[["stop", "play"][this.checked | 0]]()
        })

        $("#sound-on").change(function() {
            _sound_on = this.checked
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

    function blip() {
        if (_sound_on && _blip) _blip.play()
    }

    return {
        init: init,
        blip: blip
    }
})
