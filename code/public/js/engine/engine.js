'use strict'

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
            deck.push(generateCard(suit, face, 10))
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