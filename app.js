
let playerMoney = 100

const card3 = document.querySelector('.container3')


const flop = document.querySelector('#flop')
flop.addEventListener('click', dealFlop)

const turn = document.querySelector('#turn')
turn.addEventListener('click', dealTurn)

const river = document.querySelector('#river')
river.addEventListener('click', dealRiver)

const text = document.querySelector('.text')

const text1 = document.querySelector('.text1')

text1.textContent = `Your points: ${playerMoney}`

const betMoney = document.querySelector('#bet')
betMoney.addEventListener('click',betMoneyFunc)

const fold = document.querySelector('#fold')
fold.addEventListener('click',foldFunc)

const call = document.querySelector('#call')
call.addEventListener('click', callFunc)

const evaluate = document.querySelector('#evaluate')
evaluate.addEventListener('click', compare)

const card1 = document.querySelector('.container1')

const deal = document.querySelector('#deal')
deal.addEventListener('click', dealHoleCards)

const card5 = document.querySelector('.container5')

import Deck from './deck.js'

const deck = new Deck()

//card and gameplay variables
let playerHoleCards = []

let botHoleCards = []

let playerHand = []

let botHand = []

let communityCards = []

let deckSize = 53

let handStrength = 0

let handStrength1 = 0
//misc variabales

let needToCall = 0

let potMoney = 0

let botMoney = 100


//deal card functions
function dealHoleCards(){
    let index = Math.floor(Math.random() * deckSize)
    playerHoleCards.push(deck.cards.splice(index - 1, 1))
    deckSize -= 1
    index = Math.floor(Math.random() * deckSize)
    playerHoleCards.push(deck.cards.splice(index - 1, 1))
    deckSize -= 1
    index = Math.floor(Math.random() * deckSize)
    botHoleCards.push(deck.cards.splice(index - 1, 1))
    deckSize -= 1
    index = Math.floor(Math.random() * deckSize)
    botHoleCards.push(deck.cards.splice(index - 1, 1))
    deckSize -= 1
    card1.appendChild(playerHoleCards[0][0].getHTML())
    card1.appendChild(playerHoleCards[1][0].getHTML())
    card5.appendChild(getMystery())
    card5.appendChild(getMystery())
}
dealHoleCards()

// card1.appendChild(playerHoleCards[0][0].getHTML())
// card1.appendChild(playerHoleCards[1][0].getHTML())





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
dealFlop()

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
    playerHand = communityCards.concat(playerHoleCards)
    let Obj_CardsAndFreq = {}
    for (let i = 0; i < playerHand.length; i++){
        if (Obj_CardsAndFreq[playerHand[i][0].value]){
            Obj_CardsAndFreq[playerHand[i][0].value] += 1
        } else {
            Obj_CardsAndFreq[playerHand[i][0].value] = 1
        }
    }
    //create an object with properties ordered by freq to compare highcards
    let sortedObj = Object.entries(Obj_CardsAndFreq).sort((a,b) => b[1] - a[1])
    //get keys of sorted Obj
    let sortedObjKeys = []
    for (let i = 0; i < sortedObj.length; i++){
      sortedObjKeys.push(sortedObj[i][0])
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

//straight function
function isStraight(){
    let Obj_CardsAndFreq = {}
    for (let i = 0; i < botHand.length; i++){
        if (Obj_CardsAndFreq[playerHand[i].value]){
            Obj_CardsAndFreq[playerHand[i].value] += 1
        } else {
            Obj_CardsAndFreq[playerHand[i].value] = 1
        }
    }
    let straightArray = Object.keys(Obj_CardsAndFreq)
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

//flush function
function isFlush() {
    let dArray = []
    let sArray = []
    let cArray = []
    let hArray = []
    //if you have a flush, set it equal to flushArray to compare later
    let flushArray = []

    playerHand = communityCards.concat(playerHoleCards)
    for (let i = 0; i < playerHand.length; i++){
        if (playerHand[i].suit === "diamond"){
            dArray.push(playerHand[i].value)
        } else if (playerHand[i].suit === "spade") {
            sArray.push(playerHand[i].value)
        } else if (playerHand[i].suit === "club") {
            cArray.push(playerHand[i].value)
        } else if (playerHand[i].suit === "heart"){
            hArray.push(playerHand[i].value)
        }
    }
    if (dArray.length >= 5){
        flushArray = dArray.sort(function(a, b){return a - b})
        if (checkStraightFlush(flushArray)){
            //return 1 if its a straight flush
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

//straight flush function
function checkStraightFlush(flushArray){
    let straightFlushCounter = 0
    for (let j = 1; j < flushArray.length; j++){
        if (flushArray[j] - flushArray[j - 1] == 1){
            straightFlushCounter += 1
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

// make the same function but for the bot
function evaluateBotHand(flushArray1) {
    let handStrength1 = 0
    botHand = communityCards.concat(botHoleCards)
    let Obj_CardsAndFreq1 = {}
    for (let i = 0; i < botHand.length; i++){
        if (Obj_CardsAndFreq1[botHand[i][0].value]){
            Obj_CardsAndFreq1[botHand[i][0].value] += 1
        } else {
            Obj_CardsAndFreq1[botHand[i][0].value] = 1
        }
    }
     //create an object with properties ordered by freq to compare highcards
     let sortedObj1 = Object.entries(Obj_CardsAndFreq1).sort((a,b) => b[1] - a[1])
     //get keys of sorted Obj
     let sortedObjKeys1 = []
     for (let i = 0; i < sortedObj1.length; i++){
       sortedObjKeys1.push(sortedObj1[i][0])
     }
    let freqOfEachCard1 = Object.values(Obj_CardsAndFreq1)
    //check for full house
    let isFullHouse1 = []
    for (let i = 0; i < freqOfEachCard1.length; i++){
        if (freqOfEachCard1[i] === 2 || freqOfEachCard1[i] === 3){
            isFullHouse1.push(freqOfEachCard1[i])
        }
    }
    if (isFullHouse1.length > 1){
        if (isFullHouse1.includes(2) && isFullHouse1.includes(3)){
            handStrength1 = 6
            return handStrength1
        }
    }
    //check for pair/trip/quad
    // highscore indicates the amount of pairs and trips
    let highScore1 = 0
    // Obj_PairAndTrip for if you happen to have 3 pairs, 2pairs, or 2 trips
    let Obj_PairAndTrip1 = {}
    freqOfEachCard1.forEach(item => {
        if (item > highScore1){
            highScore1 = item
        }
        if (Obj_PairAndTrip1[item]){
            Obj_PairAndTrip1[item] += 1
        } else {
            Obj_PairAndTrip1[item] = 1
        }
        }
    )
    let freqOfPairsAndTrips1 = Object.values(Obj_PairAndTrip1)
//determine handStrength
    if (highScore1 == 2 && freqOfPairsAndTrips1.includes(2)){
        handStrength1 = 2
        return handStrength1
    } else if (highScore1 == 2){
        handStrength1 = 1
        return handStrength1
    } else if (highScore1 == 3){
        handStrength1 = 3
        return handStrength1
    } else if (highScore1 == 4){
        handStrength1 = 7
        return handStrength1
    }
    //check flush
    if (isFlush1() == 2){
        handStrength1 = 8
        return handStrength1
    } else if (isFlush1() == 1){
        handStrength1 = 5
        return handStrength1
    }
    //check straight
    if (isStraight1()){
        handStrength1 = 4
        return handStrength1
    }
    //if you have 2 pairs
    
    return handStrength1
}


function isStraight1(){
    let Obj_CardsAndFreq1 = {}
    for (let i = 0; i < botHand.length; i++){
        if (Obj_CardsAndFreq1[botHand[i].value]){
            Obj_CardsAndFreq1[botHand[i].value] += 1
        } else {
            Obj_CardsAndFreq1[botHand[i].value] = 1
        }
    }
    let straightArray1 = Object.keys(Obj_CardsAndFreq1)
    //sort the numbers in order
    straightArray1.sort(function(a, b){return a - b})
    let current1 = straightArray1[0]
    //straightCounter is how many cards within 1 value of each other, 4 is a straight
    let straightCounter1 = 0
    for (let i = 1; i < straightArray1.length; i++){
        if(straightArray1[i] - current1 === 1){
            straightCounter1 += 1
            //need a highcard to compare if 2 players have straights
            let straightHighCard1 = straightArray1[i]
        }
        current1 = straightArray1[i]
    }
    if (straightCounter1 >= 4){
        return true
    } else {
        return false
    }
}

function isFlush1() {
    let dArray1 = []
    let sArray1 = []
    let cArray1 = []
    let hArray1 = []
    //if you have a flush, set it equal to flushArray to compare later
    let flushArray1 = []

    botHand = communityCards.concat(botHoleCards)
    for (let i = 0; i < botHand.length; i++){
        if (botHand[i].suit === "♦"){
            dArray1.push(botHand[i].value)
        } else if (botHand[i].suit === "♠") {
            sArray1.push(botHand[i].value)
        } else if (botHand[i].suit === "♣") {
            cArray1.push(botHand[i].value)
        } else if (botHand[i].suit === "♥"){
            hArray1.push(botHand[i].value)
        }
    }
    if (dArray1.length >= 5){
        flushArray1 = dArray1.sort(function(a, b){return a - b})
        if (checkStraightFlush1(flushArray1)){
            //return 2 if its a straight flush
            return 2
        } else {
            return 1
        }
    } else if (sArray1.length >= 5){
        flushArray1 = sArray1.sort(function(a, b){return a - b})
        if (checkStraightFlush1(flushArray)){
            return 2
        } else {
            return 1
        }
    } else if (cArray1.length >= 5){
        flushArray1 = cArray1.sort(function(a, b){return a - b})
        if (checkStraightFlush1(flushArray)){
            return 2
        } else {
            return 1
        }
    } else if (hArray1.length >= 5){
        flushArray1 = hArray1.sort(function(a, b){return a - b})
        if (checkStraightFlush1(flushArray1)){
            return 2
        } else {
            return 1
        }
    } 
    return false    
}

function checkStraightFlush1(flushArray1){
    let straightFlushCounter1 = 0
    for (let j = 1; j < flushArray.length; j++){
        if (flushArray[j] - flushArray[j - 1] == 1){
            straightFlushCounter1 += 1
            let straightFlushHighCard1 = flushArray1[i]
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
    
    card5.removeChild(card5.firstElementChild)
    card5.removeChild(card5.firstElementChild)
    card5.appendChild(botHoleCards[0][0].getHTML())
    card5.appendChild(botHoleCards[1][0].getHTML())

    playerHand = communityCards.concat(playerHoleCards)
    let Obj_CardsAndFreq = {}
    for (let i = 0; i < playerHand.length; i++){
        if (Obj_CardsAndFreq[playerHand[i][0].value]){
            Obj_CardsAndFreq[playerHand[i][0].value] += 1
        } else {
            Obj_CardsAndFreq[playerHand[i][0].value] = 1
        }
    }
    //create an object with properties ordered by freq to compare highcards
    let sortedObj = Object.entries(Obj_CardsAndFreq).sort((a,b) => b[1] - a[1])
    //get keys of sorted Obj
    let sortedObjKeys = []
    for (let i = 0; i < sortedObj.length; i++){
      sortedObjKeys.push(sortedObj[i][0])
    }
   
    botHand = communityCards.concat(botHoleCards)
    let Obj_CardsAndFreq1 = {}
    for (let i = 0; i < botHand.length; i++){
        if (Obj_CardsAndFreq1[botHand[i][0].value]){
            Obj_CardsAndFreq1[botHand[i][0].value] += 1
        } else {
            Obj_CardsAndFreq1[botHand[i][0].value] = 1
        }
    }
     //create an object with properties ordered by freq to compare highcards
     let sortedObj1 = Object.entries(Obj_CardsAndFreq1).sort((a,b) => b[1] - a[1])
     //get keys of sorted Obj
     let sortedObjKeys1 = []
     for (let i = 0; i < sortedObj1.length; i++){
       sortedObjKeys1.push(sortedObj1[i][0])
     }
    
    
    
    
    
    console.log("here")
    if (evaluateHand() > evaluateBotHand()){
        playerMoney += potMoney
        potMoney = 0
    } else if (evaluateHand() < evaluateBotHand()){
        botMoney += potMoney
        potMoney = 0
    } if (evaluateHand() == evaluateBotHand()){
 //when handstrength is equal you have to compare arrays of values 
        //for highcard, pair, trip, quads
        if (evaluateHand() == 0 || evaluateHand() == 1 || evaluateHand() == 3 || evaluateHand() == 7){
            console.log("Here")
            if (sortedObjKeys[0] > sortedObjKeys1[0]){
                playerMoney += potMoney
                potMoney = 0
            } else if (sortedObjKeys[0] < sortedObjKeys1[0]){
                botMoney += potMoney
                potMoney = 0
            } else {
                if (sortedObjKeys[6] > sortedObjKeys1[6]){
                    playerMoney += potMoney
                    potMoney = 0
                } else if (sortedObjKeys[6] < sortedObjKeys1[6]){
                    botMoney += potMoney
                    potMoney = 0
                } else {
                    playerMoney += (potMoney / 2)
                    botMoney += (potMoney / 2)
                    potMoney = 0
                }
            }
        }
        //for 2pair and full house, where you can keep iterating in the front of the array for 1 more time
        if (evaluateHand() == 2){
            if (sortedObjKeys[0] > sortedObjKeys1[0]){
                playerMoney += potMoney
                potMoney = 0
            } else if (sortedObjKeys[0] < sortedObjKeys1[0]){
                botMoney += potMoney
                potMoney = 0
            } else {
                if (sortedObjKeys[0] == sortedObjKeys1[0]){
                    if (sortedObjKeys[1] > sortedObjKeys1[1]){
                        playerMoney += potMoney
                        potMoney = 0
                    } else if (sortedObjKeys[1] < sortedObjKeys[1]){
                        botMoney += potMoney
                        potMoney = 0
                    } else {
                        playerMoney += (potMoney / 2)
                        botMoney += (potMoney / 2)
                        potMoney = 0
                    }
                }
            }
            
        }
        //for straight, only needs to look at 1 card
        if (evaluateHand() == 4){
            if(straightHighCard > straightHighCard1){
                playerMoney += potMoney 
                potMoney = 0
            } else if (straightHighCard < straightHighCard1){
                botMoney += 
                potMoney = 0
            } else {
                playerMoney += (potMoney / 2)
                botMoney += (potMoney / 2)
                potMoney = 0
            }
        }
        //for flush, it is sorted in ascending order, start from back
        if (evaluateHand() == 5){
            if (flushArray[flushArray.length - 1] > flushArray1[flushArray1 - 1]){
                playerMoney += potMoney
                potMoney = 0
            } else if (flushArray[flushArray.length - 1] < flushArray1[flushArray1 - 1]){
                botMoney += potMoney
                potMoney = 0
            } else {
                if (flushArray[flushArray.length - 2] > flushArray1[flushArray1.length - 2]){
                    playerMoney += potMoney
                    potMoney = 0
                } else if (flushArray[flushArray.length - 2] < flushArray1[flushArray1.length - 2]){
                    botMoney += potMoney
                    potMoney = 0
                } else {
                    playerMoney += (potMoney / 2)
                    botMoney += (potMoney / 2)
                    potMoney = 0
                }
            }      
        }
        //for straight flush, also only need to look at 1 card
        if (evaluateHand() == 8){
            if(straightFlushHighCard > straightFlushHighCard1){
                playerMoney += potMoney
                potMoney = 0 
            } else if (straightFlushHighCard < straightFlushHighCard1){
                botMoney += potMoney
                potMoney = 0
            } else {
                playerMoney += (potMoney / 2)
                botMoney += (potMoney / 2)
                potMoney = 0
            }
        }
    }
    text1.textContent = `Your points: ${playerMoney}`
    text.textContent = `Pot Money: ${potMoney}`
    removeBotCards()
    if(playerMoney >= 200){
        text.textContent = "Congrats, you win!"
        flop.disabled = true
        betMoney.disabled = true
        call.disabled = true
        fold.disabled = true
        turn.disabled = true
        river.disabled = true
        evaluate.disabled = true
    }
}


function removeBotCards() {
    setTimeout(removeCards, 3000)
}
function removeCards() {
    card1.removeChild(card1.firstElementChild)
    card1.removeChild(card1.firstElementChild)
    card5.removeChild(card5.firstElementChild)
    card5.removeChild(card5.firstElementChild)
    card3.removeChild(card3.firstElementChild)
    card3.removeChild(card3.firstElementChild)
    card3.removeChild(card3.firstElementChild)
    card3.removeChild(card3.firstElementChild)
    card3.removeChild(card3.firstElementChild)
}


function botTurn(){
    setTimeout(botAction, 3000)
}

function botAction(){
    let x = Math.floor(Math.random()*2)
    //bot bets
    if (x == 0){
        if(needToCall = true){
            botMoney -= 20
            potMoney += 20
            text.textContent = `Pot Money: ${potMoney} Bot bets 20`
            needToCall = true
        } else {
            botMoney -= 10
            potMoney += 10
            text.textContent = `Pot Money: ${potMoney} Bot bets 10`
            needToCall = false
        }
    //bot calls/checks    
    } else {
        if(needToCall = true){
            botMoney -= 10
            potMoney += 10
            text.textContent = `Pot Money: ${potMoney} Bot calls`
            needToCall = false
       } else {
        text.textContent = `Pot Money: ${potMoney}| Bot checks`
        needToCall = false
       }
    }
}

function betMoneyFunc(){
    if (needToCall = true){
        playerMoney -= 20
        potMoney += 20
    } else {
        playerMoney -= 10
        potMoney += 10
        needToCall = false
    }
    text.textContent = `Pot Money: ${potMoney}`
    text1.textContent = `Your points: ${playerMoney}`
    console.log("here")
    botTurn()
}


function foldFunc(){
    botMoney += potMoney
    potMoney = 0
    card1.removeChild(card1.firstElementChild)
    card1.removeChild(card1.firstElementChild)
    card3.removeChild(card3.firstElementChild)
    card3.removeChild(card3.firstElementChild)
    card3.removeChild(card3.firstElementChild)
    card5.removeChild(card5.firstElementChild)
    card5.removeChild(card5.firstElementChild)
    // card3.removeChild(card3.firstElementChild)
    // card3.removeChild(card3.firstElementChild)
    playerHoleCards = []
}

function callFunc(){
    playerMoney -= 10
    potMoney += 10
    text.textContent = `Pot Money: ${potMoney}`
    needToCall = false
}


function getMystery(){
    const cardDiv = document.createElement('div')
    cardDiv.classList.add("computer-card")
    cardDiv.innerText = "?"
    return cardDiv
}