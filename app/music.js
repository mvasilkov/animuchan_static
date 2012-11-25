define(["utils"], function(utils) {
    var _bgm, _blast, _blip, _warp, _disable = $("#console-disable"),
        _sound_on = $("#sound-on").is(":checked")

    function ready() {
        _bgm = soundManager.createSound({
            autoLoad: true,
            id: "bgm",
            loops: 9000,
            multiShot: false,
            url: "media/sound/bgm.mp3",
            volume: 90
        })

        _blast = soundManager.createSound({
            autoLoad: true,
            id: "blast",
            url: "media/sound/blast.wav"
        })

        _blip = soundManager.createSound({
            autoLoad: true,
            id: "blip",
            url: "media/sound/blip.wav"
        })

        _warp = soundManager.createSound({
            autoLoad: true,
            id: "warp",
            url: "media/sound/warp.wav"
        })

        _disable.remove() // TODO animate this

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
            preferFlash: false,
            url: "media/sound/"
        })
    }

    function blast() {
        if (_sound_on && _blast) _blast.play()
    }

    function blip() {
        if (_sound_on && _blip) _blip.play()
    }

    function warp() {
        if (_sound_on && _warp) _warp.play()
    }

    return {
        init: init,
        blast: blast,
        blip: blip,
        warp: warp
    }
})
