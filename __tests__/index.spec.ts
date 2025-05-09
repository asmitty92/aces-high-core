import { Card, CardHand, Faces, StandardDeck, Suits, CardPlayer, getCombinations, Face } from "../src";

function getCuts(deck: StandardDeck): Array<number> {
  let count = 1;
  let cuts = new Array<number>();
  for (let i = 1; i < deck.size; i++) {
    const currentCard = deck.cardAt(i);
    const previousCard = deck.cardAt(i - 1);
    if (currentCard.index - previousCard.index == 1) {
      count++;
    } else {
      cuts.push(count);
      count = 1;
    }
  }
  cuts.push(count);
  return cuts;
}

function nChooseK(n: number, k: number): number {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  return nChooseK(n - 1, k - 1) + nChooseK(n - 1, k);
}

class TestHand extends CardHand<Face> {
  constructor(cards: Card<Face>[], accessKey?: symbol) {
    accessKey = accessKey ?? Symbol("testAccessKey");
    super(cards, accessKey);
  }

  calculateScore(): number {
    return 0;
  }
}

class TestPlayer extends CardPlayer<Face> {
  constructor() {
    super();
  }

  scoreHand() {}

  acceptCards(cards: Card<Face>[]): void {}
}

describe("getCombinations function", () => {
  it("should find all combinations in a list", async () => {
    const combinations = getCombinations([1, 2, 3], 2);

    expect(combinations.length).toEqual(3);
    expect(combinations).toEqual([
      [1, 2],
      [1, 3],
      [2, 3],
    ]);
  });
  it("should return an empty array if itemCount is greater than items.length", () => {
    const combinations = getCombinations([1, 2], 3);
    expect(combinations).toEqual([]);
  });
  it("should return one combination when itemCount equals items.length", () => {
    const combinations = getCombinations([1, 2, 3], 3);
    expect(combinations).toEqual([[1, 2, 3]]);
  });
  it("should return all single-item combinations when itemCount is 1", () => {
    const combinations = getCombinations(["a", "b", "c"], 1);
    expect(combinations).toEqual([["a"], ["b"], ["c"]]);
  });
  it("should return correct number of combinations (n choose k)", () => {
    const items = [1, 2, 3, 4, 5];
    const k = 3;
    const expectedCount = nChooseK(items.length, k);

    const combinations = getCombinations(items, k);

    expect(combinations.length).toEqual(expectedCount);
  });
  it("should return only unique combinations", () => {
    const items = [1, 2, 3, 4];
    const combinations = getCombinations(items, 2);

    const stringified = combinations.map((c) => c.join(","));
    const unique = new Set(stringified);

    expect(unique.size).toEqual(combinations.length);
  });
});

describe("Card class", () => {
  describe("isAce() method", () => {
    it("should return true if the card is an Ace", () => {
      const card = new Card(Suits.CLUBS, Faces.ACE);
      expect(card.isAce()).toBeTruthy();
    });

    it("should return false if the card is not an Ace", () => {
      const card = new Card(Suits.HEARTS, Faces.TWO);
      expect(card.isAce()).toBeFalsy();
    });
  });

  describe("isKing() method", () => {
    it("should return true if the card is an King", () => {
      const card = new Card(Suits.CLUBS, Faces.KING);
      expect(card.isKing()).toBeTruthy();
    });

    it("should return false if the card is not an King", () => {
      const card = new Card(Suits.HEARTS, Faces.QUEEN);
      expect(card.isKing()).toBeFalsy();
    });
  });

  describe("isInDeck() method", () => {
    it("should return true if card has a deck index", () => {
      const card = new Card(Suits.DIAMONDS, Faces.THREE, 2);
      expect(card.isInDeck()).toBeTruthy();
    });

    it("should return false if card does not have a deck index", () => {
      const card = new Card(Suits.DIAMONDS, Faces.THREE, -1);
      expect(card.isInDeck()).toBeFalsy();
    });
  });

  describe("toString() method", () => {
    it("should return the card representation as a string", () => {
      const card = new Card(Suits.SPADES, Faces.EIGHT);
      expect(card.toString()).toEqual("The Eight of Spades");
    });
  });

  describe("value property", () => {
    it("should return the correct value", () => {
      expect(new Card(Suits.SPADES, Faces.ACE).value).toBe(1);
      expect(new Card(Suits.SPADES, Faces.TWO).value).toBe(2);
      expect(new Card(Suits.SPADES, Faces.THREE).value).toBe(3);
      expect(new Card(Suits.SPADES, Faces.FOUR).value).toBe(4);
      expect(new Card(Suits.SPADES, Faces.FIVE).value).toBe(5);
      expect(new Card(Suits.SPADES, Faces.SIX).value).toBe(6);
      expect(new Card(Suits.SPADES, Faces.SEVEN).value).toBe(7);
      expect(new Card(Suits.SPADES, Faces.EIGHT).value).toBe(8);
      expect(new Card(Suits.SPADES, Faces.NINE).value).toBe(9);
      expect(new Card(Suits.SPADES, Faces.TEN).value).toBe(10);
      expect(new Card(Suits.SPADES, Faces.JACK).value).toBe(11);
      expect(new Card(Suits.SPADES, Faces.QUEEN).value).toBe(12);
      expect(new Card(Suits.SPADES, Faces.KING).value).toBe(13);
    });
  });
});

describe("StandardDeck class", () => {
  let deck: StandardDeck;
  beforeEach(() => {
    deck = new StandardDeck();
  });

  describe("constructor", () => {
    it("should create a deck with 52 cards", () => {
      expect(deck.size).toEqual(52);
    });

    it("should contain all Clubs", () => {
      expect(deck.cards[0]).toMatchObject({ suit: Suits.CLUBS, face: Faces.ACE, _index: 0 });
      expect(deck.cards[1]).toMatchObject({ suit: Suits.CLUBS, face: Faces.TWO, _index: 1 });
      expect(deck.cards[2]).toMatchObject({ suit: Suits.CLUBS, face: Faces.THREE, _index: 2 });
      expect(deck.cards[3]).toMatchObject({ suit: Suits.CLUBS, face: Faces.FOUR, _index: 3 });
      expect(deck.cards[4]).toMatchObject({ suit: Suits.CLUBS, face: Faces.FIVE, _index: 4 });
      expect(deck.cards[5]).toMatchObject({ suit: Suits.CLUBS, face: Faces.SIX, _index: 5 });
      expect(deck.cards[6]).toMatchObject({ suit: Suits.CLUBS, face: Faces.SEVEN, _index: 6 });
      expect(deck.cards[7]).toMatchObject({ suit: Suits.CLUBS, face: Faces.EIGHT, _index: 7 });
      expect(deck.cards[8]).toMatchObject({ suit: Suits.CLUBS, face: Faces.NINE, _index: 8 });
      expect(deck.cards[9]).toMatchObject({ suit: Suits.CLUBS, face: Faces.TEN, _index: 9 });
      expect(deck.cards[10]).toMatchObject({ suit: Suits.CLUBS, face: Faces.JACK, _index: 10 });
      expect(deck.cards[11]).toMatchObject({ suit: Suits.CLUBS, face: Faces.QUEEN, _index: 11 });
      expect(deck.cards[12]).toMatchObject({ suit: Suits.CLUBS, face: Faces.KING, _index: 12 });
    });

    it("should contain all Hearts", () => {
      expect(deck.cards[13]).toMatchObject({ suit: Suits.HEARTS, face: Faces.ACE, _index: 13 });
      expect(deck.cards[14]).toMatchObject({ suit: Suits.HEARTS, face: Faces.TWO, _index: 14 });
      expect(deck.cards[15]).toMatchObject({ suit: Suits.HEARTS, face: Faces.THREE, _index: 15 });
      expect(deck.cards[16]).toMatchObject({ suit: Suits.HEARTS, face: Faces.FOUR, _index: 16 });
      expect(deck.cards[17]).toMatchObject({ suit: Suits.HEARTS, face: Faces.FIVE, _index: 17 });
      expect(deck.cards[18]).toMatchObject({ suit: Suits.HEARTS, face: Faces.SIX, _index: 18 });
      expect(deck.cards[19]).toMatchObject({ suit: Suits.HEARTS, face: Faces.SEVEN, _index: 19 });
      expect(deck.cards[20]).toMatchObject({ suit: Suits.HEARTS, face: Faces.EIGHT, _index: 20 });
      expect(deck.cards[21]).toMatchObject({ suit: Suits.HEARTS, face: Faces.NINE, _index: 21 });
      expect(deck.cards[22]).toMatchObject({ suit: Suits.HEARTS, face: Faces.TEN, _index: 22 });
      expect(deck.cards[23]).toMatchObject({ suit: Suits.HEARTS, face: Faces.JACK, _index: 23 });
      expect(deck.cards[24]).toMatchObject({ suit: Suits.HEARTS, face: Faces.QUEEN, _index: 24 });
      expect(deck.cards[25]).toMatchObject({ suit: Suits.HEARTS, face: Faces.KING, _index: 25 });
    });

    it("should contain all Spades", () => {
      expect(deck.cards[26]).toMatchObject({ suit: Suits.SPADES, face: Faces.ACE, _index: 26 });
      expect(deck.cards[27]).toMatchObject({ suit: Suits.SPADES, face: Faces.TWO, _index: 27 });
      expect(deck.cards[28]).toMatchObject({ suit: Suits.SPADES, face: Faces.THREE, _index: 28 });
      expect(deck.cards[29]).toMatchObject({ suit: Suits.SPADES, face: Faces.FOUR, _index: 29 });
      expect(deck.cards[30]).toMatchObject({ suit: Suits.SPADES, face: Faces.FIVE, _index: 30 });
      expect(deck.cards[31]).toMatchObject({ suit: Suits.SPADES, face: Faces.SIX, _index: 31 });
      expect(deck.cards[32]).toMatchObject({ suit: Suits.SPADES, face: Faces.SEVEN, _index: 32 });
      expect(deck.cards[33]).toMatchObject({ suit: Suits.SPADES, face: Faces.EIGHT, _index: 33 });
      expect(deck.cards[34]).toMatchObject({ suit: Suits.SPADES, face: Faces.NINE, _index: 34 });
      expect(deck.cards[35]).toMatchObject({ suit: Suits.SPADES, face: Faces.TEN, _index: 35 });
      expect(deck.cards[36]).toMatchObject({ suit: Suits.SPADES, face: Faces.JACK, _index: 36 });
      expect(deck.cards[37]).toMatchObject({ suit: Suits.SPADES, face: Faces.QUEEN, _index: 37 });
      expect(deck.cards[38]).toMatchObject({ suit: Suits.SPADES, face: Faces.KING, _index: 38 });
    });

    it("should contain all Diamonds", () => {
      expect(deck.cards[39]).toMatchObject({ suit: Suits.DIAMONDS, face: Faces.ACE, _index: 39 });
      expect(deck.cards[40]).toMatchObject({ suit: Suits.DIAMONDS, face: Faces.TWO, _index: 40 });
      expect(deck.cards[41]).toMatchObject({ suit: Suits.DIAMONDS, face: Faces.THREE, _index: 41 });
      expect(deck.cards[42]).toMatchObject({ suit: Suits.DIAMONDS, face: Faces.FOUR, _index: 42 });
      expect(deck.cards[43]).toMatchObject({ suit: Suits.DIAMONDS, face: Faces.FIVE, _index: 43 });
      expect(deck.cards[44]).toMatchObject({ suit: Suits.DIAMONDS, face: Faces.SIX, _index: 44 });
      expect(deck.cards[45]).toMatchObject({ suit: Suits.DIAMONDS, face: Faces.SEVEN, _index: 45 });
      expect(deck.cards[46]).toMatchObject({ suit: Suits.DIAMONDS, face: Faces.EIGHT, _index: 46 });
      expect(deck.cards[47]).toMatchObject({ suit: Suits.DIAMONDS, face: Faces.NINE, _index: 47 });
      expect(deck.cards[48]).toMatchObject({ suit: Suits.DIAMONDS, face: Faces.TEN, _index: 48 });
      expect(deck.cards[49]).toMatchObject({ suit: Suits.DIAMONDS, face: Faces.JACK, _index: 49 });
      expect(deck.cards[50]).toMatchObject({ suit: Suits.DIAMONDS, face: Faces.QUEEN, _index: 50 });
      expect(deck.cards[51]).toMatchObject({ suit: Suits.DIAMONDS, face: Faces.KING, _index: 51 });
    });

    it("should give all cards an index", () => {
      for (let i = 0; i < deck.size; i++) {
        expect(deck.cardAt(i).index).toEqual(i);
      }
    });
  });

  describe("toString() method", () => {
    it("should return a string containing all cards", () => {
      const deck = new StandardDeck();
      expect(deck.toString()).toEqual(deck.cards.join("\n"));
    });
  });

  describe("randomShuffle() method", () => {
    it("should rearrange all cards so they are not in order", () => {
      deck.randomShuffle();

      let areCardsShuffled = false;
      for (let i = 0; i < deck.size; i++) {
        if (deck.cardAt(i).index != i) {
          areCardsShuffled = true;
          break;
        }
      }

      expect(areCardsShuffled).toBeTruthy();
    });
  });

  describe("faroShuffle() method", () => {
    it("should perform a proper faro shuffle", () => {
      deck.faroShuffle();

      //check first 4 cards for full card values
      expect(deck.cardAt(0)).toMatchObject({ suit: Suits.CLUBS, face: Faces.ACE, _index: 0 });
      expect(deck.cardAt(1)).toMatchObject({ suit: Suits.SPADES, face: Faces.ACE, _index: 26 });
      expect(deck.cardAt(2)).toMatchObject({ suit: Suits.CLUBS, face: Faces.TWO, _index: 1 });
      expect(deck.cardAt(3)).toMatchObject({ suit: Suits.SPADES, face: Faces.TWO, index: 27 });

      //check rest of deck just by index
      let expectedIndex = 0;
      for (let i = 0; i < deck.size / 2; i += 2) {
        expect(deck.cardAt(i).index).toEqual(expectedIndex);
        expect(deck.cardAt(i + 1).index).toEqual(expectedIndex + 26);
        expectedIndex += 1;
      }
    });
  });

  describe("riffleShuffle() method", () => {
    it("retains all cards with no duplicates", () => {
      const originalDeck = new StandardDeck(); // assuming StandardDeck extends DeckOfCards
      const originalCards = [...originalDeck.cards];
      originalDeck.riffleShuffle();

      expect(originalDeck.cards).toHaveLength(originalCards.length);

      const originalSorted = originalCards.map((c) => c.toString()).sort();
      const shuffledSorted = originalDeck.cards.map((c) => c.toString()).sort();

      expect(shuffledSorted).toEqual(originalSorted); // same cards, just reordered
    });

    // Pseudo-example of a testable shuffle
    it("uses 1–3 card chunks", () => {
      const deck = new StandardDeck();
      const spy = jest.spyOn(deck as any, "getRandomIndex");

      deck.riffleShuffle();

      // Check that chunk sizes are within expected range
      const allInRange = spy.mock.calls.every(([min, max]) => min === 1 && max === 3);
      expect(allInRange).toBe(true);
    });

    it("mixes cards from both halves", () => {
      const deck = new StandardDeck();
      const midpoint = deck.cards.length / 2;
      const top = [...deck.cards.slice(0, midpoint)];
      deck.riffleShuffle();

      const topCount = deck.cards.filter((c) => top.some((t) => t.toString() === c.toString())).length;

      const bottomCount = deck.cards.length - topCount;

      expect(topCount).toBeGreaterThan(0);
      expect(bottomCount).toBeGreaterThan(0);
    });
  });

  describe("runningCutsShuffle() method", () => {
    it("should execute a running cuts shuffle", () => {
      deck.runningCutsShuffle();

      const cuts = getCuts(deck);

      expect(cuts.at(0)).toBeGreaterThanOrEqual(1);
      expect(cuts.at(0)).toBeLessThanOrEqual(8);
      for (const cut of cuts.slice(1)) {
        expect(cut).toBeGreaterThanOrEqual(4);
        expect(cut).toBeLessThanOrEqual(8);
      }
    });

    it("should run running cuts 1000 times without failing", () => {
      for (let i = 0; i < 1000; i++) {
        deck = new StandardDeck();
        deck.runningCutsShuffle();

        const cuts = getCuts(deck);

        expect(cuts.at(0)).toBeGreaterThanOrEqual(1);
        expect(cuts.at(0)).toBeLessThanOrEqual(8);
        for (const cut of cuts.slice(1)) {
          expect(cut).toBeGreaterThanOrEqual(4);
          expect(cut).toBeLessThanOrEqual(8);
        }
      }
    });
  });

  describe("deal() method", () => {
    it("should deal the first card in a new deck", () => {
      const expectedCard = deck.cardAt(0);

      const card = deck.deal();

      expect(card).toEqual(expectedCard);
    });

    it("should deal the first card in a shuffled deck", () => {
      deck.randomShuffle();
      const expectedCard = deck.cardAt(0);

      const card = deck.deal();

      expect(card).toEqual(expectedCard);
    });

    it("should raise error if deck is dealt when it is empty", () => {
      for (let i = 0; i < deck.size; i++) {
        deck.deal();
      }

      expect(() => deck.deal()).toThrow(TypeError);
    });
  });

  describe("fullShuffle() method", () => {
    const mockShuffle = jest.fn().mockImplementation();
    beforeEach(() => {
      deck.randomShuffle = jest.fn().mockImplementation();
      deck.riffleShuffle = mockShuffle;
      deck.runningCutsShuffle = mockShuffle;
    });

    it("should call riffleShuffle or runningCutsShuffle 10 times total", () => {
      deck.fullShuffle();

      expect(mockShuffle).toHaveBeenCalledTimes(10);
    });

    it("should call randomShuffle() 1 times", () => {
      deck.fullShuffle();

      expect(deck.randomShuffle).toHaveBeenCalledTimes(1);
    });
  });
});

describe("CardHand abstract class", () => {
  describe("Cards getter", () => {
    it("should return the cards in the hand", () => {
      const cards = [new Card(Suits.CLUBS, Faces.TWO)];
      const key = Symbol("TestHandKey");

      const hand = new TestHand(cards, key);

      expect(hand.cards(key)).toEqual(cards);
    });

    it("throws an error if the key is incorrect", () => {
      const cards = [new Card(Suits.SPADES, Faces.FIVE)];
      const keyString = "TestHandKey";

      const hand = new TestHand(cards, Symbol(keyString));

      expect(() => hand.cards(Symbol(keyString))).toThrow("Invalid attempt access to access cards");
    });
  });

  describe("size getter", () => {
    it("returns the number of cards in the hand", () => {
      const hand = new TestHand([new Card(Suits.CLUBS, Faces.ACE), new Card(Suits.DIAMONDS, Faces.TWO)]);

      expect(hand.size).toEqual(2);
  });
});
});

describe("CardPlayer abstract class", () => {
  describe("Score getter", () => {
    const player = new TestPlayer();

    expect(player.score).toEqual(0);
  });
});
