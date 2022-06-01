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
const card3 = document.querySelector('.container3')
import Deck from './deck.js'
const deck = new Deck()

//card and gameplay variables
let playerHoleCards = []

let playerHand = []

let communityCards = []

let opponentCards = []

let deckSize = 53

let handStrength = 0
//misc variabales
let playerMoney = 100

let potMoney = 0

let opponentMoney = 100

let betAmount = 0

//deal card functions
function dealHoleCards(){
    let index = Math.floor(Math.random() * deckSize)
    //playerHoleCards should be an array of cards, not an array of array of cards
    //to do figure out splice return
    playerHoleCards.push(deck.cards.splice(index - 1, 1))
    deckSize -= 1
    index = Math.floor(Math.random() * deckSize)
    playerHoleCards.push(deck.cards.splice(index - 1, 1))
    deckSize -= 1
}
dealHoleCards()
evaluateHand()
console.log(playerHoleCards)




function dealFlop(){
    let index = Math.floor(Math.random() * deckSize)
    communityCards.push(deck.cards.splice(index - 1, 1))
    deckSize -= 1
    index = Math.floor(Math.random() * deckSize)
    communityCards.push(deck.cards.splice(index - 1, 1))
    deckSize -= 1 
    index = Math.floor(Math.random() * deckSize)
    communityCards.push(deck.cards.splice(index - 1, 1))
    deckSize -= 1
    card3.appendChild(communityCards[0][0].getHTML())
    card3.appendChild(communityCards[1][0].getHTML())
    card3.appendChild(communityCards[2][0].getHTML())
}

function dealTurn(){
    let index = Math.floor(Math.random() * deckSize)
    communityCards.push(deck.cards.splice(index - 1, 1))
    deckSize -= 1
    card3.appendChild(communityCards[3][0].getHTML())
}

function dealRiver() {
    let index = Math.floor(Math.random() * deckSize)
    communityCards.push(deck.cards.splice(index - 1, 1))
    deckSize -= 1
    card3.appendChild(communityCards[4][0].getHTML())
}

//handstrength list:
//high card: 0
//pair: 1
//2pair: 2
//trips: 3
//straight: 4
//flush: 5
//full house: 6
//quad: 7
//straight flush: 8

// make an object and log all 7 values
function evaluateHand(flushArray) {
    let handStrength = 0
    console.log("playerHoleCards", playerHoleCards)
    console.log("communityCards", communityCards)
    playerHand = communityCards.concat(playerHoleCards)
    console.log("playerhand", playerHand)
    let Obj_CardsAndFreq = {}
    for (let i = 0; i < playerHand.length; i++){
        if (Obj_CardsAndFreq[playerHand[i][0].value]){
            Obj_CardsAndFreq[playerHand[i][0].value] += 1
        } else {
            Obj_CardsAndFreq[playerHand[i][0].value] = 1
        }
    }
    console.log("playerHoleCards", playerHoleCards)
    console.log("community", communityCards)
    console.log("herexxxx", playerHand)
    console.log("deck", deck)
    console.log("here342", Obj_CardsAndFreq)
    console.log("here222", playerHand[0])
    // console.log("playerHand[0][0]", playerHand[0][0].value)
    let freqOfEachCard = Object.values(Obj_CardsAndFreq)
    //check for full house
    let isFullHouse = []
    for (let i = 0; i < freqOfEachCard.length; i++){
        if (freqOfEachCard[i] === 2 || freqOfEachCard[i] === 3){
            isFullHouse.push(freqOfEachCard[i])
        }
    }
    if (isFullHouse.length > 1){
        if (isFullHouse.includes(2) && isFullHouse.includes(3)){
            handStrength = 6
            return handStrength
        }
    }
    //check for pair/trip/quad
    // highscore indicates the amount of pairs and trips
    let highScore = 0
    // Obj_PairAndTrip for if you happen to have 3 pairs, 2pairs, or 2 trips
    let Obj_PairAndTrip = {}
    freqOfEachCard.forEach(item => {
        if (item > highScore){
            highScore = item
            console.log("here", item)
            console.log("here2", freqOfEachCard)
            console.log("here3", Obj_CardsAndFreq)
        }
        if (Obj_PairAndTrip[item]){
            Obj_PairAndTrip[item] += 1
        } else {
            Obj_PairAndTrip[item] = 1
        }
        }
    )
   
    let freqOfPairsAndTrips = Object.values(Obj_PairAndTrip)
//determine handStrength
    //if you have 2 pairs
    if (highScore == 2 && freqOfPairsAndTrips.includes(2)){
        handStrength = 2
        return handStrength
    } else if (highScore == 2){
        handStrength = 1
        return handStrength
    } else if (highScore == 3){
        handStrength = 3
        return handStrength
    } else if (highScore == 4){
        handStrength = 7
        return handStrength
    }
    //check flush
    if (isFlush() == 2){
        handStrength = 8
        return handStrength
    } else if (isFlush() == 1){
        handStrength = 5
        return handStrength
    }
    //check straight
    if (isStraight()){
        handStrength = 4
        return handStrength
    }
    return handStrength
}

// make the same function but for the bot

function evaluateBotHand(flushArray) {
    botHand = communityCards.concat(playerHoleCards)
    let Obj_CardsAndFreq = {}
    for (let i = 0; i < botHand.length; i++){
        if (Obj_CardsAndFreq[botHand[i].value]){
            Obj_CardsAndFreq[botHand[i].value] += 1
        } else {
            Obj_CardsAndFreq[botHand[i].value] = 1
        }
    }
    let freqOfEachCard = Object.values(Obj_CardsAndFreq)
    //check for full house
    let isFullHouse = []
    for (let i = 0; i < freqOfEachCard.length; i++){
        if (freqOfEachCard[i] === 2 || freqOfEachCard[i] === 3){
            isFullHouse.push(freqOfEachCard[i])
        }
    }
    if (isFullHouse.length > 1){
        if (isFullHouse.includes(2) && isFullHouse.includes(3)){
            handStrength = 6
            return handStrength
        }
    }
    //check for pair/trip/quad
    // highscore indicates the amount of pairs and trips
    let highScore = 0
    // Obj_PairAndTrip for if you happen to have 3 pairs, 2pairs, or 2 trips
    let Obj_PairAndTrip = {}
    freqOfEachCard.forEach(item => {
        if (item > highScore){
            highScore = item
        }
        if (Obj_PairAndTrip[item]){
            Obj_PairAndTrip[item] += 1
        } else {
            Obj_PairAndTrip[item] = 1
        }
        }
    )
    let freqOfPairsAndTrips = Object.values(Obj_PairAndTrip)
//determine handStrength
    //check flush
    if (isFlush() == 2){
        handStrength = 8
        return handStrength
    } else if (isFlush() == 1){
        handStrength = 5
        return handStrength
    }
    //check straight
    if (isStraight()){
        handStrength = 4
        return handStrength
    }
    //if you have 2 pairs
    if (highScore == 2 && freqOfPairsAndTrips.includes(2)){
        handStrength = 2
        return handStrength
    } else if (highScore == 2){
        handStrength = 1
        return handStrength
    } else if (highScore == 3){
        handStrength = 3
        return handStrength
    } else if (highScore == 4){
        handStrength = 7
        return handStrength
    }
    return handStrength
}

// find straight function
function isStraight(){
    let Obj_CardsAndFreq1 = {}
    for (let i = 0; i < playerHand.length; i++){
        if (Obj_CardsAndFreq1[playerHand[i].value]){
            Obj_CardsAndFreq1[playerHand[i].value] += 1
        } else {
            Obj_CardsAndFreq1[playerHand[i].value] = 1
        }
    }
    let straightArray = Object.keys(Obj_CardsAndFreq1)
    //sort the numbers in order
    straightArray.sort(function(a, b){return a - b})
    let current = straightArray[0]
    //straightCounter is how many cards within 1 value of each other, 4 is a straight
    let straightCounter = 0
    for (let i = 1; i < straightArray.length; i++){
        if(straightArray[i] - current === 1){
            straightCounter += 1
            //need a highcard to compare if 2 players have straights
            let straightHighCard = straightArray[i]
        }
        current = straightArray[i]
    }
    if (straightCounter >= 4){
        return true
    } else {
        return false
    }
}
// find flush and straight function
function isFlush() {
    let dArray = []
    let sArray = []
    let cArray = []
    let hArray = []
    //if you have a flush, set it equal to flushArray to compare later
    let flushArray = []

    playerHand = communityCards.concat(playerHoleCards)
    for (let i = 0; i < playerHand.length; i++){
        if (playerHand[i].suit === "♦"){
            dArray.push(playerHand[i].value)
        } else if (playerHand[i].suit === "♠") {
            sArray.push(playerHand[i].value)
        } else if (playerHand[i].suit === "♣") {
            cArray.push(playerHand[i].value)
        } else if (playerHand[i].suit === "♥"){
            hArray.push(playerHand[i].value)
        }
    }
    if (dArray.length >= 5){
        flushArray = dArray.sort(function(a, b){return a - b})
        if (checkStraightFlush(flushArray)){
            //return 2 if its a straight flush
            return 2
        } else {
            return 1
        }
    } else if (sArray.length >= 5){
        flushArray = sArray.sort(function(a, b){return a - b})
        if (checkStraightFlush(flushArray)){
            return 2
        } else {
            return 1
        }
    } else if (cArray.length >= 5){
        flushArray = cArray.sort(function(a, b){return a - b})
        if (checkStraightFlush(flushArray)){
            return 2
        } else {
            return 1
        }
    } else if (hArray.length >= 5){
        flushArray = hArray.sort(function(a, b){return a - b})
        if (checkStraightFlush(flushArray)){
            return 2
        } else {
            return 1
        }
    } 
    return false    
}

function checkStraightFlush(flushArray){
    let straightFlushCounter = 0
    for (let j = 1; j < flushArray.length; j++){
        if (flushArray[j] - flushArray[j - 1] == 1){
            straightFlushCounter += 1
            let straightFlushHighCard = flushArray[i]
            if (straightFlushCounter == 4){
                break
            }
        } else {
            straightFlushCounter = 0
        } 
    }
    if (straightFlushCounter >= 4){
        return true
    } else {
        return false
    }
} 

function compare(){
    if (evaluateHand() > evaluateBotHand()){
        playerMoney += potMoney
    } else if (evaluateHand() < evaluateBotHand()){
        botMoney += potMoney
    } if (evaluateHand() == evaluateBotHand()){
 //when handstrength is equal you have to compare arrays of values 
        //for highcard, pair, trip, quads
        if (evaluateHand() == 0 || evaluateHand() == 1 || evaluateHand() == 3 || evaluateHand() == 7){
            if (sortedObj[0] > sortedObj1[0]){
                playerMoney += potMoney
            } else if (sortedObj[0] < sortedObj1[0]){
                botMoney += potMoney
            } else {
                if (sortedObj[6] > sortedObj1[6]){
                    playerMoney += potMoney
                } else if (sortedObj[6] < sortedObj1[6]){
                    botMoney += potMoney
                } else {
                    playerMoney += (potMoney / 5)
                    botMoney += (potMoney / 5)
                }
            }
        }
        //for 2pair and full house, where you can keep iterating in the front of the array for 1 more time
        if (evaluateHand() == 2){
            if (sortedObj[0] > sortedObj1[0]){
                playerMoney += potMoney
            } else if (sortedObj[0] < sortedObj1[0]){
                botMoney += potMoney
            } else {
                if (sortedObj[0] == sortedObj1[0]){
                    if (sortedObj[1] > sortedObj1[1]){
                        playerMoney += potMoney
                    } else if (sortedObj[1] < sortedObj[1]){
                        botMoney += potMoney
                    } else {
                        playerMoney += (potMoney / 5)
                        botMoney += (potMoney / 5)
                    }
                }
            }
            
        }
        //for straight, only needs to look at 1 card
        if (evaluateHand == 4){
            if(straightHighCard > straightHighCard1){
                playerMoney += potMoney 
            } else if (straightHighCard < straightHighCard1){
                botMoney += potMoney
            } else {
                playerMoney += (potMoney / 2)
                botMoney += (potMoney / 2)
            }
        }
        //for flush, it is sorted in ascending order, start from back
        if (evaluateHand == 5){
            if (flushArray[flushArray.length - 1] > flushArray1[flushArray1 - 1]){
                playerMoney += potMoney
            } else if (flushArray[flushArray.length - 1] < flushArray1[flushArray1 - 1]){
                botMoney += potMoney
            } else {
                if (flushArray[flushArray.length - 2] > flushArray1[flushArray1.length - 2]){
                    playerMoney += potMoney
                } else if (flushArray[flushArray.length - 2] < flushArray1[flushArray1.length - 2]){
                    botMoney += potMoney
                } else {
                    playerMoney += (potMoney / 2)
                    botMoney += (potMoney / 2)
                }
            }      
        }
        //for straight flush, also only need to look at 1 card
        if (evaluateHand == 8){
            if(straightFlushHighCard > straightFlushHighCard1){
                playerMoney += potMoney 
            } else if (straightFlushHighCard < straightFlushHighCard1){
                botMoney += potMoney
            } else {
                playerMoney += (potMoney / 2)
                botMoney += (potMoney / 2)
            }
        }
    }
}

const card1 = document.querySelector('.container1')
card1.appendChild(playerHoleCards[0][0].getHTML())

const card2 = document.querySelector('.container1')
card1.appendChild(playerHoleCards[1][0].getHTML())
console.log(evaluateHand())


// const betMoney = document.querySelector('#bet')
// betMoney.addEventListener('click',betMoney)

//const fold = document.querySelector('#fold)
//fold.addEventListener('click',fold)

//const call = document.querySelector('#call')
//call.addEventListener('click', call)

const flop = document.querySelector('#flop')
flop.addEventListener('click', dealFlop)

const turn = document.querySelector('#turn')
turn.addEventListener('click', dealTurn)

const river = document.querySelector('#river')
river.addEventListener('click', dealRiver)

const text = document.querySelector('.text')
const text1 = document.querySelector('.text1')
text.textContent = `Your points: ${playerMoney}`


function betMoney(){
    text.textContent = `Your points: ${playerMoney}`
    playerMoney -= 10
    potMoney += 10
}
function fold(){
    botMoney += potMoney
    potMoney = 0
    playerHand = []
    botHand = []
}

function call(){
    playerMoney -= 10
    potMoney += 10
}



// if (playerMoney == 200){
//     text.textContent = "Congrats you win!"
// } else if (botMoney == 200){
//     text.textContent = "No more money :("
// }