define([
    'goo/loaders/Loader',
    'goo/entities/GooRunner',
    'lib/util/qs',
    'js/cam',
    'js/sun',
    'js/bg',
    'js/util',
    '_canvas'
], function (Loader, GooRunner, qs, cam, sun, bg, util, canvas) {
    var debug = qs.parse(location.search.substr(1)).debug || false,
        goo = new GooRunner({canvas: canvas, logo: false, showStats: debug})

    /* Patch for engine-11 TextureLoader breaks UTF-8 */
    Loader.prototype._buildURL = function (a) {
        return this.rootPath + encodeURIComponent(a)
    }

    goo.renderer.setClearColor(0, 0, 0, 1)

    return {
        goo: goo,
        cam: cam.init(goo, debug),
        sun: sun.init(goo),
        bg: bg.init(goo),
        util: util.init(goo)
    }
})
