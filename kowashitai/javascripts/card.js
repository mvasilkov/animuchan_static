var CardModel = Backbone.Epoxy.Model.extend({
    defaults: {
        name: '',
        typeclass: '',
        rarity: '',
        rank: 0,
        level: 0,
        strength: 0,
        intelligence: 0,
        agility: 0,
        rating: 0,
        health: 0,
        mana: 0,
        attackElement: '',
        strongElement: '',
        weakElement: '',
        nullElement: '',
        unique: false,
        leader: false,
        ranks: 0,
        characterPicture: ''
    }
})

var CardCollection = Backbone.Collection.extend({
    model: CardModel,
    url: './db.json'
})

var CardView = Backbone.Epoxy.View.extend({
    className: 'card-wrapper',

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
        },

        rank2InlineCSS: {
            deps: ['ranks'],
            get: function (ranks) {
                return ranks > 1 ? '' : 'display:none'
            }
        },
        rank3InlineCSS: {
            deps: ['ranks'],
            get: function (ranks) {
                return ranks > 2 ? '' : 'display:none'
            }
        }
    },

    remove: function () {
        Backbone.Validation.unbind(this)
        return Backbone.Epoxy.View.prototype.remove.call(this)
    }
})

function clamp(x, lower, upper) {
    return x < lower? lower: x > upper? upper: x
}
