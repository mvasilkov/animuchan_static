define([
    'goo/entities/EntityUtils',
    'goo/math/Vector3',
    'goo/renderer/Camera',
    'goo/scripts/MouseLookControlScript'
],
function (EntityUtils, Vector3, Camera, MouseLookControlScript) {
    var camera, script = 0, cam

    function init(goo, debug) {
        camera = new Camera(24, 1, 0.1, 256)
        if (debug) script = new MouseLookControlScript
        cam = EntityUtils.createTypicalEntity(goo.world, camera, script, [0, 40, 60])
        cam.transformComponent.lookAt(new Vector3(-2.4, 2, 0), Vector3.UNIT_Y)
        cam.addToWorld()
        return cam
    }

    return {init: init}
})
