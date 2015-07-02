var CardModel = Backbone.Epoxy.Model.extend({
    defaults: {
        name: '',
        typeclass: '',
        rank: 0,
        level: 0,
        strength: 0,
        intelligence: 0,
        agility: 0,
        rarity: 0
    }
})

var Cirno = new CardModel({
    name: 'Cirno',
    typeclass: 'Fairy',
    rank: 1,
    level: 9,
    strength: 8,
    intelligence: 4,
    agility: 9,
    rarity: 5
})

var view = new Backbone.Epoxy.View({
    el: '#Cirno',
    model: Cirno,
    computeds: {
        rarityInlineCSS: {
            deps: ['rarity'],
            get: function (rarity) {
                return 'width:' + (rarity * 21) + 'px'
            }
        }
    }
})
