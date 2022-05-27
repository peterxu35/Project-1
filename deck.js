//reference from Web Dev Simplified
const suits = ["♠", "♣", "♥", "♦"]
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
export default class Deck {
    constructor(cards = newDeck()) {
        this.cards = cards
    }
}

class Card {
    constructor(suit, value){
        this.suit = suit
        this.value = value
    }
    get color() {
        return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red '
    }
    getHTML(){
        const cardDiv = document.createElement('div')
        cardDiv.innerText = this.suit
        cardDiv.classList.add("card", this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    } 
    getValue(){
        return this.value
    }
    
}

//loop through suits, then values to combine into array with flatmap and map
function newDeck() {
    // use flatmap to get 1 array of 52 cards instead of 4 arrays of 13 (for each suit)
    return suits.flatMap(suit => {
        return values.map(value => {
            return new Card(suit, value)
        })
    })
}



    