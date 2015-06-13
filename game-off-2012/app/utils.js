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

    var _transform = (function(obj) {
        for (var p in { MozTransform:1, WebkitTransform:1, OTransform:1, msTransform:1 })
            if (typeof obj.style[p] != "undefined") return p

        return "transform"
    })(document.createElement("p"))

    var _transitionend = [
        "transitionend",
        "webkitTransitionEnd",
        "otransitionend"
    ].join(" ")

    var _css = (function(xs) {
        for (var i = 0; i < xs.length; ++i) {
            if (xs[i].title == "main") return xs[i]
        }

        return null
    })(document.styleSheets)

    function updateCSS(selector, rule) {
        if (!_css) return

        if (_css.addRule) {
            _css.addRule(selector, rule)
        }
        else if (_css.insertRule) {
            _css.insertRule(selector + "{" + rule + "}", _css.cssRules.length)
        }
    }

    return {
        defer: defer,
        normalize: normalize,
        transform: _transform,
        transitionend: _transitionend,
        updateCSS: updateCSS
    }
})
