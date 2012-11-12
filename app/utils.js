define(["requestAnimationFrame"], function(requestAnimationFrame) {
    function defer(fun, obj) {
        var args = Array.prototype.slice.call(arguments, 2)

        return requestAnimationFrame(function() {
            obj[0].clientHeight
            fun.apply(obj, args)
        }, 1)
    }

    function normalize(cmd) {
        return $.trim(cmd).replace(/  +/, " ").replace(/^g /, "git ")
    }

    var _transitionend = [
        "transitionend",
        "webkitTransitionEnd",
        "otransitionend"
    ].join(" ")

    return {
        defer: defer,
        normalize: normalize,
        transitionend: _transitionend
    }
})
