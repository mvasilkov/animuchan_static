$.get('./templates/_card.html').done(load)

var CardCell = Backbone.View.extend({
    tagName: 'td',
    className: 'card-cell',

    initialize: function () {
        this._cards = []
        for (var i = 1; i <= this.model.get('ranks'); ++i) {
            var card = this.model.clone()
            card.set('rank', i)
            this._cards.push(new CardView({model: card}))
        }
    },

    render: function () {
        this._cards.forEach(function (card) {
            this.$el.append(card.render().el)
        }.bind(this))
        return this
    }
})

function load(template) {
    CardView.prototype.render = function () {
        this.$el.html(template)
        this.applyBindings()
        return this
    }

    var collection = new CardCollection

    var grid = new Backgrid.Grid({
        columns: [{
            name: 'cards',
            label: 'Database · Kowashitai',
            cell: CardCell,
            editable: false
        }],
        collection: collection
    })

    $('.container').append(grid.render().$el.addClass('table'))
    collection.fetch({reset: true})
    .done(writeCSS)
}

function writeCSS(cards) {
    var style = document.createElement('style')
    var css = ''

    cards.forEach(function (card) {
        for (var i = 1; i <= card.ranks; ++i) {
            css += '.card[data-character="' + card.name + '"]'
            + '[data-rank="' + i + '"] .character'
            + '{background-image: url(./pictures/Cards/Cirno/'
            + card.characterPicture.replace('%d', i) + ')}'
        }
    })

    style.appendChild(document.createTextNode(css))
    document.head.appendChild(style)
}
