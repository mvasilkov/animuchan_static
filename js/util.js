define([
    'goo/entities/EntityUtils',
    'goo/renderer/Material',
    'goo/renderer/shaders/ShaderLib',
    'goo/shapes/Box'
],
function (EntityUtils, Material, ShaderLib, Box) {
    var wow, width$2 = 300, height$2 = 100

    function init(goo) { wow = goo.world }

    function gooBox(size, coords) {
        var mesh = new Box(size[0], size[1], size[2], 1, 1)
        var mat = Material.createMaterial(ShaderLib.uber)
        mat.uniforms.materialAmbient = [0.5, 0.5, 0.5, 1]
        var box = EntityUtils.createTypicalEntity(wow, mesh, mat, coords)
        box.addToWorld()
        return box
    }

    function gooBoxFrom2dObj(obj, sz) {
        return gooBox([0.1 * obj.width, 0.1 * obj.height, sz],
                      [0.1 * (obj.x - width$2), 0.1 * (height$2 - obj.y), 0])
    }

    function moveRotate2dObj(box, obj) {
        box.transformComponent.setTranslation(0.1 * (obj.x - width$2),
                                              0.1 * (height$2 - obj.y), 0)
        box.transformComponent.setRotation(0, 0, -obj.rotation)
    }

    return {
        init: init,
        gooBox: gooBox,
        gooBoxFrom2dObj: gooBoxFrom2dObj,
        moveRotate2dObj: moveRotate2dObj
    }
})
