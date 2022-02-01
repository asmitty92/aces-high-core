export declare enum Suits {
    CLUBS = "Clubs",
    HEARTS = "Hearts",
    SPADES = "Spades",
    DIAMONDS = "Diamonds"
}
export declare enum Faces {
    ACE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
    SIX = 6,
    SEVEN = 7,
    EIGHT = 8,
    NINE = 9,
    TEN = 10,
    JACK = 11,
    QUEEN = 12,
    KING = 13
}
export declare class Card {
    suit: Suits;
    face: Faces;
    private index;
    get Index(): number;
    constructor(suit: Suits, face: Faces, index?: number);
    isAce(): boolean;
    isKing(): boolean;
    isInDeck(): boolean;
    toString(): string;
}
export declare class StandardDeck {
    private cards;
    get Cards(): Array<Card>;
    constructor();
    toString(): string;
    numberOfCards(): number;
    cardAt(index: number): Card;
    randomShuffle(): void;
    riffleShuffle(): void;
    faroShuffle(): void;
    runningCutsShuffle(): void;
    fullShuffle(): void;
    dealCard(): Card;
    protected isEmpty(): boolean;
    protected getRandomIndex(min: number, max: number): number;
    protected enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[];
    protected coinFlip(): number;
    protected splitDeck(): Array<Array<Card>>;
}
export interface CardHand {
    get Cards(): Array<Card>;
    scoreHand(): number;
}
