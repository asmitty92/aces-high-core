export enum Suits {
    CLUBS = "Suits",
    HEARTS = "Hearts",
    SPADES = "Spades",
    DIAMONDS = "Diamonds"
}

export enum Faces {
    ACE = 1,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN,
    KING
}

export class Card {
    constructor(public suit: Suits, public face: Faces, public index: number = -1) {}

    isAce(): boolean {
        return this.face == Faces.ACE;
    }

    isKing(): boolean {
        return this.face == Faces.KING;
    }

    isInDeck(): boolean {
        return this.index >= 0;
    }

    toString(): string {
        return `The ${Faces[this.face]} of ${this.suit}`
    }
}

export class StandardDeck {
    private readonly cards: Array<Card>;

    public get Cards(): Array<Card> {
        return this.cards;
    }

    constructor() {
        this.cards = new Array<Card>();
        this.cards.push(new Card(Suits.CLUBS, Faces.ACE))
        this.cards.push(new Card(Suits.CLUBS, Faces.TWO))
        this.cards.push(new Card(Suits.CLUBS, Faces.THREE))
        this.cards.push(new Card(Suits.CLUBS, Faces.FOUR))
        this.cards.push(new Card(Suits.CLUBS, Faces.FIVE))
        this.cards.push(new Card(Suits.CLUBS, Faces.SIX))
        this.cards.push(new Card(Suits.CLUBS, Faces.SEVEN))
        this.cards.push(new Card(Suits.CLUBS, Faces.EIGHT))
        this.cards.push(new Card(Suits.CLUBS, Faces.NINE))
        this.cards.push(new Card(Suits.CLUBS, Faces.TEN))
        this.cards.push(new Card(Suits.CLUBS, Faces.JACK))
        this.cards.push(new Card(Suits.CLUBS, Faces.QUEEN))
        this.cards.push(new Card(Suits.CLUBS, Faces.KING))
        // this.cards.push(new Card(Suits.HEARTS, Faces.ACE))
        // this.cards.push(new Card(Suits.HEARTS, Faces.TWO))
        // this.cards.push(new Card(Suits.HEARTS, Faces.THREE))
        // this.cards.push(new Card(Suits.HEARTS, Faces.FOUR))
        // this.cards.push(new Card(Suits.HEARTS, Faces.FIVE))
        // this.cards.push(new Card(Suits.HEARTS, Faces.SIX))
        // this.cards.push(new Card(Suits.HEARTS, Faces.SEVEN))
        // this.cards.push(new Card(Suits.HEARTS, Faces.EIGHT))
        // this.cards.push(new Card(Suits.HEARTS, Faces.NINE))
        // this.cards.push(new Card(Suits.HEARTS, Faces.TEN))
        // this.cards.push(new Card(Suits.HEARTS, Faces.JACK))
        // this.cards.push(new Card(Suits.HEARTS, Faces.QUEEN))
        // this.cards.push(new Card(Suits.HEARTS, Faces.KING))
    }

    numberOfCards(): number {
        return 52;
    }

    // private enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    //     return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
    // }
}