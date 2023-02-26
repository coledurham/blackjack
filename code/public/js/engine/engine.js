'use strict'

import { Players } from "../constants"

const suits = ['diamonds', 'clubs', 'hearts', 'spades']
const faces = ['K', 'Q', 'J', 'A']

const generateCard = (suit, face, value) => {
        return {
            suit,
            face,
            value: (face === 'ace' ? 11 : value)
        }
    }
const generateDeck = () => {
    const deck =  []

    for(let suit of suits){
        for(let face of faces){
            deck.push(generateCard(suit, face, face === 'A' ? 11 : 10))
        }
        for(let i=2; i<=10; i++){
            deck.push(generateCard(suit, i, i))
        }
    }

    return deck
}

const shuffle = (cards) => {
    for(let i = 0; i<cards.length; i++){
        let randomIndex = Math.floor(Math.random() * (i+1))
        let temp = cards[i]
        
        cards[i] = cards[randomIndex]
        cards[randomIndex] = temp
    }
}

export const generateShoe = () => {
    const shoe = [...generateDeck(), ...generateDeck()]
    
    shuffle(shoe)

    return shoe
}

export const calcValue = (hand) => hand.map(c => c.value).sort((p,n) => p-n).reduce((p,n,i,arr) => {
    if(p+n > 21 && i === arr.length-1 && arr[i] === 11){
        n = 1
    }

    return p+n
}, 0)

export const checkBlackJack = (hand) => {
    const handVal = calcValue(hand)

    return handVal === 21
}

export const checkBust = (hand) => {
    const handVal = calcValue(hand)

    return handVal > 21
}

export const checkWinnerHand = (dealer, player) => {
    const dealerVal = calcValue(dealer)
    const playerVal = calcValue(player)

    if(!dealerVal > 21 && dealerVal > playerVal){
        return Players.DEALER
    }

    if(!playerVal > 21 && playerVal > dealerVal){
        return Players.PLAYER
    }

    return ''
}