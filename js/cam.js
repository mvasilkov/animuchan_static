define([
    'goo/entities/EntityUtils',
    'goo/renderer/Camera',
    'goo/scripts/MouseLookControlScript'
],
function (EntityUtils, Camera, MouseLookControlScript) {
    var camera, script = 0, cam

    function init(goo, debug) {
        camera = new Camera(96, 1, 0.1, 256)
        if (debug) script = new MouseLookControlScript
        cam = EntityUtils.createTypicalEntity(goo.world, camera, script, [0, 0, 10])
        cam.addToWorld()
        return cam
    }

    return {init: init}
})
