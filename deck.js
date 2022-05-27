//reference from Web Dev Simplified
const suits = ["♠", "♣", "♥", "♦"]
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
class Deck {
    constructor(cards) {
        this.cards = cards
    }
}

class Card {
    constructor(suit, value){
        this.suit = suit
        this.value = value
    }
}

//loop through suits, then values to combine into array with flatmap and map
function newDeck() {
    return suits.flatMap(suit => {
        return values.map(value => {
            return new Card(suit, value)
        })
    })
}