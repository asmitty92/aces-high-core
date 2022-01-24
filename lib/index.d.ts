declare enum Suits {
    CLUBS = 0,
    HEARTS = 1,
    SPADES = 2,
    DIAMONDS = 3
}
declare enum Faces {
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
declare class Card {
    suit: Suits;
    face: Faces;
    index: number;
    get Suit(): Suits;
    constructor(suit: Suits, face: Faces, index?: number);
    isAce(): boolean;
    isKing(): boolean;
    isInDeck(): boolean;
    toString(): string;
}
