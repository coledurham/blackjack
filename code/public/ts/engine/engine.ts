'use strict'

import { Players } from "../constants.ts"

import type { Suit, Face, FaceValue, Card, Deck, Shoe, Hand } from '@/types/game'

const suits: Array<Suit> = ['diamond', 'club', 'heart', 'spade']
const faces: Array<Face> = ['king', 'queen', 'jack', 'ace']

const generateCard = (suit: Suit, face: Face, value: FaceValue): Card => {
    return {
        face,
        suit,
        value: (face === 'ace' ? 11 : value)
    }
}

const generateDeck = (): Deck => {
    const deck: Deck = [] as Deck

    for(let suit of suits){
        for(let face of faces){
            deck.push(generateCard(suit, face, face === 'ace' ? 11 : 10))
        }
        for(let i=2; i<=10; i++){
            deck.push(generateCard(suit, 'value', i as FaceValue))
        }
    }

    return deck
}

const shuffle = (cards: Hand): void => {
    for(let i = 0; i<cards.length; i++){
        let randomIndex = Math.floor(Math.random() * (i+1))
        let temp = cards[i]
        
        cards[i] = cards[randomIndex]
        cards[randomIndex] = temp
    }
}

export const generateShoe = (): Shoe => {
    const shoe: Shoe = [...generateDeck(), ...generateDeck()]
    
    shuffle(shoe)

    return shoe
}

export const calcValue = (hand: Hand): number => hand.map((c: Card) => c.value).sort((p: number,n: number) => p-n).reduce((p: number,n: number,i: number,arr: Array<number>) => {
    if(p+n > 21 && i === arr.length-1 && arr[i] === 11){
        n = 1
    }

    return p+n
}, 0)

export const checkBlackJack = (hand: Hand): boolean => {
    const handVal = calcValue(hand)

    return handVal === 21
}

export const checkBust = (hand: Hand): boolean => {
    const handVal = calcValue(hand)

    return handVal > 21
}

export const checkWinnerHand = (dealer: Hand, player: Hand): string => {
    const dealerVal: number = calcValue(dealer)
    const playerVal: number = calcValue(player)

    if(!(dealerVal > 21) && dealerVal > playerVal){
        return Players.DEALER
    }

    if(!(playerVal > 21) && playerVal > dealerVal){
        return Players.PLAYER
    }

    return ''
}