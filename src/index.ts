const suits = ["Clubs", "Hearts", "Spades", "Diamonds"] as const;
type Suit = (typeof suits)[number];
const faces = [
  "Ace",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Jack",
  "Queen",
  "King",
] as const;
type Face = (typeof faces)[number];

export function getCombinations<T>(items: T[], itemCount: number): T[][] {
  const combinations: T[][] = [];

  function recurse(remaining: number, start: number, combo: T[]) {
    if (remaining === 0) {
      combinations.push([...combo]);
      return;
    }

    for (let i = start; i <= items.length - remaining; i++) {
      combo.push(items[i]);
      recurse(remaining - 1, i + 1, combo);
      combo.pop();
    }
  }

  recurse(itemCount, 0, []);
  return combinations;
}

export enum Suits {
  CLUBS = "Clubs",
  HEARTS = "Hearts",
  SPADES = "Spades",
  DIAMONDS = "Diamonds",
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
  KING = "King",
}

const FaceValues: Map<Face, number> = new Map([
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

  constructor(
    public suit: Suit,
    public face: Face,
    private _index: number = -1,
  ) {}

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
    return `The ${this.face} of ${this.suit}`;
  }
}

export abstract class DeckOfCards {
  private _cards: Array<Card>;
  private _dealIndex: number;

  get cards(): Array<Card> {
    return this._cards;
  }

  protected get dealIndex(): number {
    return this._dealIndex;
  }

  protected set cards(value: Array<Card>) {
    this._cards = value;
  }

  constructor() {
    this._cards = new Array<Card>();
    this._dealIndex = 0;
  }

  toString(): string {
    return this.cards.join("\n");
  }

  numberOfCards(): number {
    return this.cards.length;
  }

  cardAt(index: number): Card {
    return this.cards[index];
  }

  randomShuffle(): void {
    this.resetDealIndex();
    for (let i = 0; i < this.numberOfCards(); i++) {
      const swapIndex = this.getRandomIndex(0, this.numberOfCards() - 1);
      const temp = this.cardAt(i);
      this.cards[i] = this.cardAt(swapIndex);
      this.cards[swapIndex] = temp;
    }
  }

  riffleShuffle(): void {
    this.resetDealIndex();
    const [top, bottom] = this.splitDeck();
    const shuffled: Card[] = [];

    let topIndex = 0;
    let bottomIndex = 0;

    while (topIndex < top.length || bottomIndex < bottom.length) {
      // Randomly choose which half to drop from first
      const startWithTop = this.coinFlip() === 0;

      if (startWithTop) {
        const chunkSize = this.getRandomIndex(1, 3); // drop 1–3 cards from top
        for (let i = 0; i < chunkSize && topIndex < top.length; i++) {
          shuffled.push(top[topIndex++]);
        }

        const otherChunkSize = this.getRandomIndex(1, 3); // drop 1–3 cards from bottom
        for (
          let i = 0;
          i < otherChunkSize && bottomIndex < bottom.length;
          i++
        ) {
          shuffled.push(bottom[bottomIndex++]);
        }
      } else {
        const chunkSize = this.getRandomIndex(1, 3); // drop 1–3 cards from bottom
        for (let i = 0; i < chunkSize && bottomIndex < bottom.length; i++) {
          shuffled.push(bottom[bottomIndex++]);
        }

        const otherChunkSize = this.getRandomIndex(1, 3); // drop 1–3 cards from top
        for (let i = 0; i < otherChunkSize && topIndex < top.length; i++) {
          shuffled.push(top[topIndex++]);
        }
      }
    }

    this.cards = shuffled;
  }

  faroShuffle(): void {
    this.resetDealIndex();
    const [top, bottom] = this.splitDeck();

    const cards = [];
    for (let i = 0; i < top.length; i++) {
      cards.push(top[i]);
      cards.push(bottom[i]);
    }

    this.cards = cards;
  }

  runningCutsShuffle(): void {
    this.resetDealIndex();

    const newDeck: Card[] = [];
    const deckCopy = [...this.cards];

    while (deckCopy.length > 0) {
      const packetSize = this.getRandomIndex(4, 8); // simulate pulling off 1–4 cards
      const packet = deckCopy.splice(0, packetSize);
      newDeck.unshift(...packet); // place packets on top in reverse
    }

    this.cards = newDeck;
  }

  fullShuffle(): void {
    this.resetDealIndex();
    this.randomShuffle(); // Still start with a Fisher-Yates-style shuffle

    const totalShuffles = 10;

    for (let i = 0; i < totalShuffles; i++) {
      const random = this.getRandomIndex(1, 5); // 1 to 4 = riffle, 5 = running cut
      if (random === 5) {
        this.runningCutsShuffle();
      } else {
        this.riffleShuffle();
      }
    }
  }

  protected getRandomIndex(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  protected coinFlip(): number {
    return Math.floor(Math.random() * 100) % 2;
  }

  // I don't want subclasses modifying deal index directly
  protected resetDealIndex(): void {
    this._dealIndex = 0;
  }

  // I don't want subclasses modifying deal index directly
  protected advanceDealIndex(): void {
    this._dealIndex++;
  }

  private splitDeck(): Array<Array<Card>> {
    const midpoint = this.cards.length / 2;
    const top = [...this.cards.slice(0, midpoint)];
    const bottom = [...this.cards.slice(midpoint)];

    return [top, bottom];
  }

}

export class StandardDeck extends DeckOfCards {
  constructor() {
    super();
    let index = 0;
    for (const suitKey of suits) {
      for (const faceKey of faces) {
        this.cards.push(new Card(suitKey, faceKey, index++));
      }
    }
  }

  deal(): Card {
    if (this.dealIndex >= this.cards.length)
      throw new TypeError("Cannot deal card, deck is empty");
    const cardToDeal = this.cardAt(this.dealIndex);
    this.advanceDealIndex();
    return cardToDeal;
  }
}

export abstract class CardHand {
  protected constructor(private _cards: Array<Card>) {}

  get cards(): Array<Card> {
    return this._cards;
  }

  abstract calculateScore(): number;

  addCards(cards: Array<Card>) {
    this.cards.push(...cards);
  }
}

export abstract class CardPlayer {
  protected myScore: number;

  get score(): number {
    return this.myScore;
  }

  protected constructor() {
    this.myScore = 0;
  }

  abstract scoreHand(): void;

  abstract takeCards(cards: Array<Card>): void;
}
