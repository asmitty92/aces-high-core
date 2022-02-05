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
    public get Index(): number {
        return this.index;
    }

    constructor(public suit: Suits, public face: Faces, private index: number = -1) {}

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
    private cards: Array<Card>;

    get Cards(): Array<Card> {
        return this.cards;
    }

    constructor() {
        this.cards = new Array<Card>();
        let index: number = 0;
        for (const suitKey of this.enumKeys(Suits)) {
            for (const faceKey of this.enumKeys(Faces)) {
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
        const cutStart = quarter + this.getRandomIndex(-1 * halfQuarter, halfQuarter-1);
        let toCut = this.cards.slice(cutStart);
        this.cards = this.cards.slice(0, cutStart);

        while(toCut.length > 0) {
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

    protected enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
        return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
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

export interface CardHand {
    get Cards(): Array<Card>;
    scoreHand(): number;
}