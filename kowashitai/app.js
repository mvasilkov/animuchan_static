var CardModel = Backbone.Epoxy.Model.extend({
    defaults: {
        name: '',
        typeclass: '',
        level: 0,
        strength: 0,
        intelligence: 0,
        agility: 0
    }
})

var Cirno = new CardModel({
    name: 'Cirno',
    typeclass: 'Fairy',
    level: 9,
    strength: 8,
    intelligence: 4,
    agility: 9
})

var view = new Backbone.Epoxy.View({
    el: '#Cirno',
    model: Cirno
})
