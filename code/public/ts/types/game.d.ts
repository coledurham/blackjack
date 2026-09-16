export type Face = "king" | "queen" | "jack" | "ace" | "value"
export type Suit = "club" | "heart" | "diamond" | "spade"
export type FaceValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export type Bet = number

export interface Card {
    face: Face,
    suit: Suit,
    value: FaceValue
}

export interface AceCard extends Card {
    face: "ace",
    value: 11
}

export interface RoyalCard extends Card {
    face: "king" | "queen" | "jack"
}

export interface Hand extends Array<Card> {}

export interface Deck extends Hand {}

export interface Shoe extends Deck {}

export interface CenterBoardProps {
  winner: string
}

export interface PlayerHUDProps {
  score: number,
  bank: number,
  player: string
}

export interface HandProps {
    cards: Array<Card>
}

export interface CardProps {
    card: Card
}

export interface BankAction {
    type: string,
    data: {
        bet: number
    }
}

export interface BetAction {
    type: string,
    data: {
        bet: number
    }
}

export interface PlayerAction {
    type: string,
    data: {
        player: string
    }
}

export interface HandAction {
    type: string,
    data: {
        player: string,
        cards: Hand
    }
}

export interface ShoeAction {
    type: string,
    data: {
        numCards: number,
        shoe: Shoe
    }
}

export interface ScoreAction {
    type: string,
    data: {
        score: number
    }
}

export interface WinnerAction {
    type: string,
    data: {
        winner: string
    }
}

export interface GameAction {
    type: string,
    data: number
}