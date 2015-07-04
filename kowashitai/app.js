var CardModel = Backbone.Epoxy.Model.extend({
    defaults: {
        name: '',
        typeclass: '',
        rank: 0,
        level: 0,
        strength: 0,
        intelligence: 0,
        agility: 0,
        rating: 0,
        leader: false
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
    rating: 5,
    leader: true
})

var view = new Backbone.Epoxy.View({
    el: '#Cirno',
    model: Cirno,
    computeds: {
        ratingInlineCSS: {
            deps: ['rating'],
            get: function (rating) {
                return 'width:' + (rating * 21) + 'px'
            }
        }
    }
})
