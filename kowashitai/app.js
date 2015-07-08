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
        rating1InlineCSS: {
            deps: ['rating'],
            get: function (rating) {
                rating = clamp(rating, 0, 10)
                return 'width:' + (rating * 22) + 'px'
            }
        },
        rating2InlineCSS: {
            deps: ['rating'],
            get: function (rating) {
                rating = clamp(rating - 10, 0, 10)
                return 'width:' + (rating * 22) + 'px'
            }
        }
    }
})

function clamp(x, lower, upper) {
    return x < lower? lower: x > upper? upper: x
}
