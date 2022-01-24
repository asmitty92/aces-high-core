export enum Suits {
    CLUBS = "Clubs",
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
        for (const key of this.enumKeys(Faces)) {
            this.cards.push(new Card(Suits.CLUBS, Faces[key]));
        }
    }

    numberOfCards(): number {
        return 52;
    }

    protected enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
        return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
    }
}

new StandardDeck();