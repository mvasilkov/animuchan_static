define([
    'goo/entities/EntityUtils',
    'goo/renderer/light/PointLight'
],
function (EntityUtils, PointLight) {
    var light, sun

    function init(goo) {
        light = new PointLight
        light.color.set(1, 1, 1)
        sun = EntityUtils.createTypicalEntity(goo.world, light, [2, 20, 10])
        sun.addToWorld()
        return sun
    }

    return {init: init}
})
