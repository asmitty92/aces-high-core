declare const suits: readonly ["Clubs", "Hearts", "Spades", "Diamonds"];
type Suit = (typeof suits)[number];
declare const faces: readonly ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
type Face = (typeof faces)[number];
export declare function getCombinations<T>(items: T[], itemCount: number): T[][];
export declare enum Suits {
    CLUBS = "Clubs",
    HEARTS = "Hearts",
    SPADES = "Spades",
    DIAMONDS = "Diamonds"
}
export declare enum Faces {
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
export declare class Card {
    suit: Suit;
    face: Face;
    private _index;
    get index(): number;
    get value(): number;
    constructor(suit: Suit, face: Face, _index?: number);
    isAce(): boolean;
    isKing(): boolean;
    isInDeck(): boolean;
    toString(): string;
}
export declare abstract class DeckOfCards {
    private _cards;
    get cards(): Array<Card>;
    protected set cards(value: Array<Card>);
    constructor();
    toString(): string;
    numberOfCards(): number;
    cardAt(index: number): Card;
    randomShuffle(): void;
    riffleShuffle(): void;
    faroShuffle(): void;
    runningCutsShuffle(): void;
    fullShuffle(): void;
    abstract deal(): Card | Card[];
    protected isEmpty(): boolean;
    protected getRandomIndex(min: number, max: number): number;
    protected coinFlip(): number;
    splitDeck(): Array<Array<Card>>;
}
export declare class StandardDeck extends DeckOfCards {
    constructor();
    deal(): Card | Card[];
}
export declare abstract class CardHand {
    private _cards;
    protected constructor(_cards: Array<Card>);
    get cards(): Array<Card>;
    abstract calculateScore(): number;
    addCards(cards: Array<Card>): void;
}
export declare abstract class CardPlayer {
    protected myHand: CardHand;
    protected myScore: number;
    get hand(): CardHand;
    get score(): number;
    protected constructor(myHand: CardHand);
    abstract scoreHand(): void;
    takeCards(cards: Array<Card>): void;
}
export {};
