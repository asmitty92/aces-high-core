export enum Suits {
    CLUBS = "Clubs",
    HEARTS = "Hearts",
    SPADES = "Spades",
    DIAMONDS = "Diamonds"
}

export enum Faces {
    ACE = "Ace",
    TWO = "Two",
    THREE = "Three",
    FOUR = "Four",
    FIVE = "Five",
    SIX = "Six",
    SEVEN = "Seven",
    EIGHT = "Eight",
    NINE = "Nine",
    TEN = "Ten",
    JACK = "Jack",
    QUEEN = "Queen",
    KING = "King"
}

const FaceValues: Map<Faces, number> = new Map([
    [Faces.ACE, 1],
    [Faces.TWO, 2],
    [Faces.THREE, 3],
    [Faces.FOUR, 4],
    [Faces.FIVE, 5],
    [Faces.SIX, 6],
    [Faces.SEVEN, 7],
    [Faces.EIGHT, 8],
    [Faces.NINE, 9],
    [Faces.TEN, 10],
    [Faces.JACK, 11],
    [Faces.QUEEN, 12],
    [Faces.KING, 13],
]);

export class Card {
    public get index(): number {
        return this._index;
    }

    public get value(): number {
        return FaceValues.get(this.face);
    }

    constructor(public suit: Suits, public face: Faces, private _index: number = -1) {
    }

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
        return `The ${this.face} of ${this.suit}`
    }
}

export class StandardDeck {
    private _cards: Array<Card>;

    get cards(): Array<Card> {
        return this._cards;
    }

    protected set cards(value: Array<Card>) {
        this._cards = value;
    }

    constructor() {
        this._cards = new Array<Card>();
        this.createCards();
    }

    protected createCards() {
        let index: number = 0;
        for (const suitKey of Object.keys(Suits)) {
            for (const faceKey of Object.keys(Faces)) {
                this.cards.push(new Card(Suits[suitKey], Faces[faceKey], index++));
            }
        }
    }

    toString(): string {
        return this.cards.join('\n')
    }

    numberOfCards(): number {
        return this.cards.length;
    }

    cardAt(index: number): Card {
        return this.cards[index];
    }

    randomShuffle(): void {
        for (let i = 0; i < this.numberOfCards(); i++) {
            const swapIndex = this.getRandomIndex(0, this.numberOfCards() - 1);
            const temp = this.cardAt(i);
            this.cards[i] = this.cardAt(swapIndex);
            this.cards[swapIndex] = temp;
        }
    }

    riffleShuffle(): void {
        const [top, bottom] = this.splitDeck()

        const cards = []
        for (let i = 0; i < top.length; i++) {
            const flip = this.coinFlip();
            if (flip == 1) {
                cards.push(top[i])
                cards.push(bottom[i])
            } else {
                cards.push(bottom[i])
                cards.push(top[i])
            }
        }

        this.cards = cards;
    }

    faroShuffle(): void {
        const [top, bottom] = this.splitDeck()

        const cards = [];
        for (let i = 0; i < top.length; i++) {
            cards.push(top[i])
            cards.push(bottom[i])
        }

        this.cards = cards;
    }

    runningCutsShuffle(): void {
        if (this.numberOfCards() % 4 != 0)
            throw new TypeError('Only a full deck can be shuffled');

        const cutSizes = [4, 5, 6, 7, 8];
        const quarter = this.numberOfCards() / 4;
        const halfQuarter = quarter / 2;
        const cutStart = quarter + this.getRandomIndex(-1 * halfQuarter, halfQuarter - 1);
        let toCut = this.cards.slice(cutStart);
        this.cards = this.cards.slice(0, cutStart);

        while (toCut.length > 0) {
            const cutIndex = this.getRandomIndex(0, cutSizes.length - 1);
            const cutSize = cutSizes[cutIndex];
            this.cards = toCut.slice(0, cutSize).concat(this.cards);
            toCut = toCut.slice(cutSize);
        }
    }

    fullShuffle(): void {
        this.randomShuffle();

        this.riffleShuffle();
        this.riffleShuffle();
        this.riffleShuffle();
        this.runningCutsShuffle();

        this.riffleShuffle();
        this.riffleShuffle();
        this.riffleShuffle();
        this.runningCutsShuffle();
    }

    dealCard(): Card {
        if (this.isEmpty())
            throw new TypeError('Cannot deal card, deck is empty');

        return this.cards.shift();
    }

    protected isEmpty(): boolean {
        return this.cards.length <= 0;
    }

    protected getRandomIndex(min: number, max: number): number {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    protected coinFlip(): number {
        return Math.floor(Math.random() * 100) % 2;
    }

    protected splitDeck(): Array<Array<Card>> {
        if (this.numberOfCards() % 2 != 0) {
            throw new TypeError('Invalid number of cards to shuffle.');
        }

        const midpoint = this.cards.length / 2;
        const top = [...this.cards.slice(0, midpoint)];
        const bottom = [...this.cards.slice(midpoint)];

        return [top, bottom];
    }
}

export abstract class CardHand {
    protected constructor(private _cards: Array<Card>) {
    }

    get cards(): Array<Card> {
        return this._cards;
    }

    abstract calculateScore(): number;

    addCards(cards: Array<Card>) {
        this.cards.push(...cards)
    }
}

export abstract class CardPlayer {
    get hand(): CardHand {
        return this._hand;
    }

    protected constructor(private _hand: CardHand) {
    }

    abstract scoreHand(): any;

    takeCards(cards: Array<Card>) {
        this.hand.addCards(cards);
    }
}
