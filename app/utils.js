(function(root) {
    root.defer = function(fun, obj) {
        var args = Array.prototype.slice.call(arguments, 2)

        return requestAnimationFrame(function() {
            fun.apply(obj, args)
        }, 1)
    }
})(this)
