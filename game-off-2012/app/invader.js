define(["conf"], function(conf) {
    var fmul = conf.FRAG_SIZE / conf.GAME_SCALE,
        x = 0, y = 0, xs = [], ys = [],
        ascii = [ "  #     #  "
                , "   #   #   "
                , "  #######  "
                , " ## ### ## "
                , "###########"
                , "# ####### #"
                , "# #     # #"
                , "   ## ##   "
                ].join("\n")

    for (var i = 0; i < ascii.length; ++i) {
        var c = ascii[i]

        if (c === "\n") x ^= x, ++y
        else {
            if (c === "#") {
                xs.push((x - 5) * fmul)
                ys.push((y - 3.5) * fmul)
            }
            ++x
        }
    }

    return {
        n: xs.length,
        xs: xs,
        ys: ys
    }
})
