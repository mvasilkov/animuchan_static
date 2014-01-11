define([
    'goo/entities/EntityUtils',
    'goo/renderer/Material',
    'goo/renderer/TextureCreator',
    'goo/renderer/shaders/ShaderLib',
    'goo/shapes/Quad'
],
function (EntityUtils, Material, TextureCreator, ShaderLib, Quad) {
    var mesh, mat, tex, bg

    function init(goo) {
        mesh = new Quad(100, 100, 1, 1)
        mat = Material.createMaterial(ShaderLib.textured)
        tex = (new TextureCreator).loadTexture2D('media/bg.png')
        mat.setTexture('DIFFUSE_MAP', tex)
        mat.depthState.write = false
        bg = EntityUtils.createTypicalEntity(goo.world, mesh, mat, [0, -10, -25])
        bg.addToWorld()
        return bg
    }

    return {init: init}
})
