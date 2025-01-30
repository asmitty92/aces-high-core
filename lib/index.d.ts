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
    suit: Suits;
    face: Faces;
    private _index;
    get index(): number;
    get value(): number;
    constructor(suit: Suits, face: Faces, _index?: number);
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
    protected splitDeck(): Array<Array<Card>>;
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
    private _hand;
    get hand(): CardHand;
    protected constructor(_hand: CardHand);
    abstract scoreHand(): void;
    takeCards(cards: Array<Card>): void;
}
