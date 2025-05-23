export const suits = ["Clubs", "Hearts", "Spades", "Diamonds"] as const;
export type Suit = (typeof suits)[number];
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
export type Face = (typeof faces)[number];

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

export const Suits = Object.fromEntries(suits.map((suit) => [suit.toUpperCase(), suit])) as {
  [K in Uppercase<Suit>]: Suit;
};

export const Faces = Object.fromEntries(faces.map((face) => [face.toUpperCase(), face])) as {
  [K in Uppercase<Face>]: Face;
};

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

export class Card<FaceType extends Face> {
  public get index(): number {
    return this._index;
  }

  public get value(): number {
    return FaceValues.get(this.face);
  }

  constructor(
    public readonly suit: Suit,
    public readonly face: FaceType,
    private _index: number = -1,
  ) {}

  isAce = () => {
    return this.face == Faces.ACE;
  };

  isKing = () => {
    return this.face == Faces.KING;
  };

  isInDeck = () => {
    return this.index >= 0;
  };

  toString = () => {
    return `The ${this.face} of ${this.suit}`;
  };
}

export abstract class DeckOfCards<FaceType extends Face> {
  private _cards: Card<FaceType>[];
  private _dealIndex: number;

  get cards(): Card<FaceType>[] {
    return this._cards;
  }

  get size(): number {
    return this.cards.length;
  }

  private get dealIndex(): number {
    return this._dealIndex;
  }

  protected set cards(value: Card<FaceType>[]) {
    this._cards = value;
  }

  constructor() {
    this._cards = [];
    this._dealIndex = 0;
  }

  toString = () => {
    return this.cards.join("\n");
  };

  deal(): Card<FaceType> {
    if (this.dealIndex >= this.cards.length) throw new TypeError("Cannot deal card, deck is empty");
    const cardToDeal = this.cardAt(this.dealIndex);
    this.advanceDealIndex();
    return cardToDeal;
  }

  cardAt = (index: number) => {
    return this.cards[index];
  };

  randomShuffle = () => {
    this.resetDealIndex();
    for (let i = 0; i < this.size; i++) {
      const swapIndex = this.getRandomIndex(0, this.size - 1);
      const temp = this.cardAt(i);
      this.cards[i] = this.cardAt(swapIndex);
      this.cards[swapIndex] = temp;
    }
  };

  riffleShuffle = () => {
    this.resetDealIndex();
    const [top, bottom] = this.splitDeck();
    const shuffled: Card<FaceType>[] = [];

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
        for (let i = 0; i < otherChunkSize && bottomIndex < bottom.length; i++) {
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
  };

  faroShuffle = () => {
    this.resetDealIndex();
    const [top, bottom] = this.splitDeck();

    const cards = [];
    for (let i = 0; i < top.length; i++) {
      cards.push(top[i]);
      cards.push(bottom[i]);
    }

    this.cards = cards;
  };

  runningCutsShuffle = () => {
    this.resetDealIndex();

    const newDeck: Card<FaceType>[] = [];
    const deckCopy = [...this.cards];

    while (deckCopy.length > 0) {
      const packetSize = this.getRandomIndex(4, 8); // simulate pulling off 1–4 cards
      const packet = deckCopy.splice(0, packetSize);
      newDeck.unshift(...packet); // place packets on top in reverse
    }

    this.cards = newDeck;
  };

  fullShuffle = () => {
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
  };

  private getRandomIndex = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  private coinFlip = () => {
    return Math.floor(Math.random() * 100) % 2;
  };

  // I don't want subclasses modifying deal index directly
  private resetDealIndex = () => {
    this._dealIndex = 0;
  };

  // I don't want subclasses modifying deal index directly
  private advanceDealIndex = () => {
    this._dealIndex++;
  };

  private splitDeck = () => {
    const midpoint = this.cards.length / 2;
    const top = [...this.cards.slice(0, midpoint)];
    const bottom = [...this.cards.slice(midpoint)];

    return [top, bottom];
  };
}

export class StandardDeck extends DeckOfCards<Face> {
  constructor() {
    super();
    let index = 0;
    for (const suitKey of suits) {
      for (const faceKey of faces) {
        this.cards.push(new Card(suitKey, faceKey, index++));
      }
    }
  }
}

export abstract class CardHand<FaceType extends Face> {
  protected constructor(
    protected readonly _cards: Card<FaceType>[],
    private readonly accessKey: symbol,
  ) {}

  get size(): number {
    return this._cards.length;
  }

  cards = (key: symbol) => {
    if (key !== this.accessKey) {
      throw new Error("Invalid attempt access to access cards");
    }
    return this._cards;
  };

  abstract calculateScore(context?: unknown): number;
}

export abstract class CardPlayer<FaceType extends Face> {
  protected myScore: number;

  get score(): number {
    return this.myScore;
  }

  protected constructor() {
    this.myScore = 0;
  }

  abstract scoreHand(): void;

  abstract acceptCards(cards: Card<FaceType>[]): void;
}
