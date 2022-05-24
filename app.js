// // Variables
// make array for deck
// make arrays for players for their 2 cards 
// make array for the 5 community cards
// a variable that keeps track of a poker hand's strength
// variables that keep track of player, opponent, and betting money
// have an ante: the minimum amount you need to put in to play

// //Constants
// somehow make a tier list of poker hands
// probably set each poker hand to equal a certain score

// //Functions
// one where it will take a card from the deck array and put it into another array
// first three cards for community come out at the same time, then the next two 1 by 1 
// compare the strength of poker hands to see who wins
// end the game when a player has no money
// increase the ante gradually if game takes too long


// //other
// have a bar that you can interact with that manipulates how much money youre betting

// deck of cards will be an array of 52 objects with value and suit being the properties
// player hands = array of objects of your hole cards, with community cards pushed onto it
// loop through the array to build a new array of the best 5 cards

let deck = [
    {
        name: "2d",
        value: 2,
        suit: "diamond"
    },
    {
        name: "3d",
        value: 3,
        suit: "diamond"
    },
    {
        name: "4d",
        value: 4,
        suit: "diamond"
    },
    {
        name: "5d",
        value: 5,
        suit: "diamond"
    },
    {
        name: "6d",
        value: 2,
        suit: "diamond"
    },
    {
        name: "7d",
        value: 7,
        suit: "diamond"
    },
    {
        name: "8d",
        value: 8,
        suit: "diamond"
    },
    {
        name: "9d",
        value: 9,
        suit: "diamond"
    },
    {
        name: "10d",
        value: 10,
        suit: "diamond"
    },
    {
        name: "jd",
        value: 11,
        suit: "diamond"
    },
    {
        name: "qd",
        value: 12,
        suit: "diamond"
    },
    {
        name: "kd",
        value: 13,
        suit: "diamond"
    },
    {
        name: "ad",
        value: 14,
        suit: "diamond"
    },
    {
        name: "2c",
        value: 2,
        suit: "club"
    },
    {
        name: "3c",
        value: 3,
        suit: "club"
    },
    {
        name: "4c",
        value: 4,
        suit: "club"
    },
    {
        name: "5c",
        value: 5,
        suit: "club"
    },
    {
        name: "6c",
        value: 6,
        suit: "club"
    },
    {
        name: "7c",
        value: 7,
        suit: "club"
    },
    {
        name: "8c",
        value: 8,
        suit: "club"
    },
    {
        name: "9c",
        value: 9,
        suit: "club"
    },
    {
        name: "10c",
        value: 10,
        suit: "club"
    },
    {
        name: "jc",
        value: 11,
        suit: "club"
    },
    {
        name: "qc",
        value: 12,
        suit: "club"
    },
    {
        name: "kc",
        value: 13,
        suit: "club"
    },
    {
        name: "ac",
        value: 14,
        suit: "club"
    },
    {
        name: "2h",
        value: 2,
        suit: "heart"
    },
    {
        name: "3h",
        value: 3,
        suit: "heart"
    },
    {
        name: "4h",
        value: 4,
        suit: "heart"
    },
    {
        name: "5h",
        value: 5,
        suit: "heart"
    },
    {
        name: "6h",
        value: 6,
        suit: "heart"
    },
    {
        name: "7h",
        value: 7,
        suit: "heart"
    },
    {
        name: "8h",
        value: 8,
        suit: "heart"
    },
    {
        name: "9h",
        value: 9,
        suit: "heart"
    },
    {
        name: "10h",
        value: 10,
        suit: "heart"
    },
    {
        name: "jh",
        value: 11,
        suit: "heart"
    },
    {
        name: "qh",
        value: 12,
        suit: "heart"
    },
    {
        name: "kh",
        value: 13,
        suit: "heart"
    },
    {
        name: "ah",
        value: 14,
        suit: "heart"
    },
    {
        name: "2s",
        value: 2,
        suit: "spade"
    },
    {
        name: "3s",
        value: 3,
        suit: "spade"
    },
    {
        name: "4s",
        value: 4,
        suit: "spade"
    },
    {
        name: "5s",
        value: 5,
        suit: "spade"
    },
    {
        name: "6s",
        value: 6,
        suit: "spade"
    },
    {
        name: "7s",
        value: 7,
        suit: "spade"
    },
    {
        name: "8s",
        value: 8,
        suit: "spade"
    },
    {
        name: "9s",
        value: 9,
        suit: "spade"
    },
    {
        name: "10s",
        value: 10,
        suit: "spade"
    },
    {
        name: "js",
        value: 11,
        suit: "spade"
    },
    {
        name: "qs",
        value: 12,
        suit: "spade"
    },
    {
        name: "ks",
        value: 13,
        suit: "spade"
    },
    {
        name: "as",
        value: 14,
        suit: "spade"
    },
]

let playerHoleCards = []

let playerHand = []

let communityCards = []

let opponentCards = []

let deckSize = 53
function dealCards(){
    let index = Math.floor(Math.random() * deckSize)
    playerHoleCards.push(deck.splice(index - 1, 1))
    deckSize -= 1
    index = Math.floor(Math.random() * deckSize)
    playerHoleCards.push(deck.splice(index - 1, 1))
    deckSize -= 1
}

function dealFlop(){
    let index = Math.floor(Math.random() * deckSize)
    communityCards.push(deck.splice(index - 1, 1))
    deckSize -= 1
    index = Math.floor(Math.random() * deckSize)
    communityCards.push(deck.splice(index - 1, 1))
    deckSize -= 1 
    index = Math.floor(Math.random() * deckSize)
    communityCards.push(deck.splice(index - 1, 1))
    deckSize -= 1 
}

function evaluateHand {
    let dict = {}
    playerHand = communityCards.push(playerHoleCards)
    for (let i = 0; i < playerHand.length; i++){
        if (playerHand[i].)
    }
}
