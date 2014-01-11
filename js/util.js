define([
    'goo/entities/EntityUtils',
    'goo/math/Vector3',
    'goo/renderer/Material',
    'goo/renderer/shaders/ShaderLib',
    'goo/shapes/Box'
],
function (EntityUtils, Vector3, Material, ShaderLib, Box) {
    var wow, width$2 = 300, height$2 = 100

    function init(goo) { wow = goo.world }

    function gooBox(size, coords, color) {
        var mesh = new Box(size[0], size[1], size[2], 1, 1)
        var mat = Material.createMaterial(ShaderLib.uber)
        if (color) mat.uniforms.materialDiffuse = color
        mat.uniforms.materialSpecular = [0.8, 0.8, 0.8, 1]
        mat.uniforms.materialAmbient = [0.5, 0.5, 0.5, 1]
        var box = EntityUtils.createTypicalEntity(wow, mesh, mat, coords)
        box.addToWorld()
        return box
    }

    function gooBoxFrom2dObj(obj, sz, c) {
        return gooBox([0.1 * obj.width, 0.1 * obj.height, sz],
                      [0.1 * (obj.x - width$2), 0.1 * (height$2 - obj.y), 0], c)
    }

    function moveRotate2dObj(box, obj) {
        box.transformComponent.setTranslation(0.1 * (obj.x - width$2),
                                              0.1 * (height$2 - obj.y), 0)
        box.transformComponent.setRotation(0, 0, -obj.rotation)
    }

    function gooBoxFrom2dObjB(obj, sz) {
        return gooBox([
            0.1 * obj.width,
            0.1 * obj.height,
            sz
        ], [
            0.1 * (obj.x - width$2),
            0.1 * (height$2 - obj.y + 0.5 * obj.height),
            0
        ], [0.4, 0.8, 1, 1])
    }

    function cameraTrack2dObj(cam, obj) {
        cam.transformComponent.lookAt(new Vector3(0.01 * (obj.x - width$2), 2, 0),
                                      Vector3.UNIT_Y)
    }

    return {
        init: init,
        gooBox: gooBox,
        gooBoxFrom2dObj: gooBoxFrom2dObj,
        moveRotate2dObj: moveRotate2dObj,
        gooBoxFrom2dObjB: gooBoxFrom2dObjB,
        cameraTrack2dObj: cameraTrack2dObj
    }
})
