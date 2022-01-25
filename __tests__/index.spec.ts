import {Card, Faces, StandardDeck, Suits} from '../src/index';


function getCuts(deck: StandardDeck): Array<number> {
    let count = 1;
    let cuts = [];
    for (let i = 1; i < deck.numberOfCards(); i++) {
        const currentCard = deck.cardAt(i);
        const previousCard = deck.cardAt(i - 1);
        if (currentCard.Index - previousCard.Index == 1) {
            count++;
        } else {
            cuts.push(count);
            count = 1;
        }
    }
    cuts.push(count);
    return cuts;
}

describe('Card class', () => {
    describe('isAce() method', () => {
        it('should return true if the card is an Ace', () => {
            const card = new Card(Suits.CLUBS, Faces.ACE);
            expect(card.isAce()).toBeTruthy();
        });

        it('should return false if the card is not an Ace', () => {
            const card = new Card(Suits.HEARTS, Faces.TWO);
            expect(card.isAce()).toBeFalsy();
        });
    });

    describe('isKing() method', () => {
        it('should return true if the card is an King', () => {
            const card = new Card(Suits.CLUBS, Faces.KING);
            expect(card.isKing()).toBeTruthy();
        });

        it('should return false if the card is not an King', () => {
            const card = new Card(Suits.HEARTS, Faces.QUEEN);
            expect(card.isKing()).toBeFalsy();
        });
    });

    describe('isInDeck() method', () => {
        it('should return true if card has a deck index', () => {
            const card = new Card(Suits.DIAMONDS, Faces.THREE, 2);
            expect(card.isInDeck()).toBeTruthy();
        });

        it('should return false if card does not have a deck index', () => {
            const card = new Card(Suits.DIAMONDS, Faces.THREE, -1);
            expect(card.isInDeck()).toBeFalsy();
        });
    });

    describe('toString() method', () => {
        it('should return the card representation as a string', () => {
            const card = new Card(Suits.SPADES, Faces.EIGHT);
            expect(card.toString()).toEqual('The EIGHT of Spades');
        });
    });
});

describe('StandardDeck class', () => {
    let deck: StandardDeck;
    beforeEach(() => {
        deck = new StandardDeck();
    });

    describe('constructor', () => {
        it('should create a deck with 52 cards', () => {
            expect(deck.numberOfCards()).toEqual(52);
        });

        it('should contain all Clubs', () => {
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.ACE, 0));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.TWO, 1));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.THREE, 2));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.FOUR, 3));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.FIVE, 4));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.SIX, 5));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.SEVEN, 6));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.EIGHT, 7));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.NINE, 8));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.TEN, 9));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.JACK, 10));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.QUEEN, 11));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.KING, 12));
        });

        it('should contain all Hearts', () => {
            expect(deck.Cards).toContainEqual(new Card(Suits.HEARTS, Faces.ACE, 13));
            expect(deck.Cards).toContainEqual(new Card(Suits.HEARTS, Faces.TWO, 14));
            expect(deck.Cards).toContainEqual(new Card(Suits.HEARTS, Faces.THREE, 15));
            expect(deck.Cards).toContainEqual(new Card(Suits.HEARTS, Faces.FOUR, 16));
            expect(deck.Cards).toContainEqual(new Card(Suits.HEARTS, Faces.FIVE, 17));
            expect(deck.Cards).toContainEqual(new Card(Suits.HEARTS, Faces.SIX, 18));
            expect(deck.Cards).toContainEqual(new Card(Suits.HEARTS, Faces.SEVEN, 19));
            expect(deck.Cards).toContainEqual(new Card(Suits.HEARTS, Faces.EIGHT, 20));
            expect(deck.Cards).toContainEqual(new Card(Suits.HEARTS, Faces.NINE, 21));
            expect(deck.Cards).toContainEqual(new Card(Suits.HEARTS, Faces.TEN, 22));
            expect(deck.Cards).toContainEqual(new Card(Suits.HEARTS, Faces.JACK, 23));
            expect(deck.Cards).toContainEqual(new Card(Suits.HEARTS, Faces.QUEEN, 24));
            expect(deck.Cards).toContainEqual(new Card(Suits.HEARTS, Faces.KING, 25));
        });

        it('should contain all Spades', () => {
            expect(deck.Cards).toContainEqual(new Card(Suits.SPADES, Faces.ACE, 26));
            expect(deck.Cards).toContainEqual(new Card(Suits.SPADES, Faces.TWO, 27));
            expect(deck.Cards).toContainEqual(new Card(Suits.SPADES, Faces.THREE, 28));
            expect(deck.Cards).toContainEqual(new Card(Suits.SPADES, Faces.FOUR, 29));
            expect(deck.Cards).toContainEqual(new Card(Suits.SPADES, Faces.FIVE, 30));
            expect(deck.Cards).toContainEqual(new Card(Suits.SPADES, Faces.SIX, 31));
            expect(deck.Cards).toContainEqual(new Card(Suits.SPADES, Faces.SEVEN, 32));
            expect(deck.Cards).toContainEqual(new Card(Suits.SPADES, Faces.EIGHT, 33));
            expect(deck.Cards).toContainEqual(new Card(Suits.SPADES, Faces.NINE, 34));
            expect(deck.Cards).toContainEqual(new Card(Suits.SPADES, Faces.TEN, 35));
            expect(deck.Cards).toContainEqual(new Card(Suits.SPADES, Faces.JACK, 36));
            expect(deck.Cards).toContainEqual(new Card(Suits.SPADES, Faces.QUEEN, 37));
            expect(deck.Cards).toContainEqual(new Card(Suits.SPADES, Faces.KING, 38));
        });

        it('should contain all Diamonds', () => {
            expect(deck.Cards).toContainEqual(new Card(Suits.DIAMONDS, Faces.ACE, 39));
            expect(deck.Cards).toContainEqual(new Card(Suits.DIAMONDS, Faces.TWO, 40));
            expect(deck.Cards).toContainEqual(new Card(Suits.DIAMONDS, Faces.THREE, 41));
            expect(deck.Cards).toContainEqual(new Card(Suits.DIAMONDS, Faces.FOUR, 42));
            expect(deck.Cards).toContainEqual(new Card(Suits.DIAMONDS, Faces.FIVE, 43));
            expect(deck.Cards).toContainEqual(new Card(Suits.DIAMONDS, Faces.SIX, 44));
            expect(deck.Cards).toContainEqual(new Card(Suits.DIAMONDS, Faces.SEVEN, 45));
            expect(deck.Cards).toContainEqual(new Card(Suits.DIAMONDS, Faces.EIGHT, 46));
            expect(deck.Cards).toContainEqual(new Card(Suits.DIAMONDS, Faces.NINE, 47));
            expect(deck.Cards).toContainEqual(new Card(Suits.DIAMONDS, Faces.TEN, 48));
            expect(deck.Cards).toContainEqual(new Card(Suits.DIAMONDS, Faces.JACK, 49));
            expect(deck.Cards).toContainEqual(new Card(Suits.DIAMONDS, Faces.QUEEN, 50));
            expect(deck.Cards).toContainEqual(new Card(Suits.DIAMONDS, Faces.KING, 51));
        });

        it('should give all cards an index', () => {
            for (let i = 0; i < deck.numberOfCards(); i++) {
                expect(deck.cardAt(i).Index).toEqual(i);
            }
        })
    });

    describe('toString() method', () => {
        it('should return a string containing all cards', () => {
            const deck = new StandardDeck();
            expect(deck.toString()).toEqual(deck.Cards.join('\n'));
        });
    });

    describe('randomShuffle() method', () => {
        it('should rearrange all cards so they are not in order', () => {
            deck.randomShuffle();

            let areCardsShuffled = false;
            for (let i = 0; i < deck.numberOfCards(); i++) {
                if (deck.cardAt(i).Index != i) {
                    areCardsShuffled = true;
                    break
                }
            }

            expect(areCardsShuffled).toBeTruthy();
        })
    });

    describe('faroShuffle() method', () => {
        it('should perform a proper faro shuffle', () => {
            deck.faroShuffle();

            //check first 4 cards for full card values
            expect(deck.cardAt(0)).toEqual(new Card(Suits.CLUBS, Faces.ACE, 0));
            expect(deck.cardAt(1)).toEqual(new Card(Suits.SPADES, Faces.ACE, 26));
            expect(deck.cardAt(2)).toEqual(new Card(Suits.CLUBS, Faces.TWO, 1));
            expect(deck.cardAt(3)).toEqual(new Card(Suits.SPADES, Faces.TWO, 27));

            //check rest of deck just by index
            let expectedIndex = 0;
            for (let i = 0; i < deck.numberOfCards() / 2; i += 2) {
                expect(deck.cardAt(i).Index).toEqual(expectedIndex);
                expect(deck.cardAt(i + 1).Index).toEqual(expectedIndex + 26);
                expectedIndex += 1;
            }
        });

        it('should raise error when deck length is invalid', () => {
            deck.dealCard();

            expect(() => deck.faroShuffle()).toThrow(TypeError);
        });
    })

    describe('riffleShuffle() method', () => {
        it('should riffle shuffle the deck successfully', () => {
            deck.riffleShuffle();

            let index = 0;
            for (let i = 0; i < deck.numberOfCards(); i += 2) {
                const indices = [deck.cardAt(i).Index, deck.cardAt(i + 1).Index]
                expect(indices).toContainEqual(index);
                expect(indices).toContainEqual(index + 26);
                index++;
            }
        });

        it('should raise error when deck length is invalid', () => {
            deck.dealCard()

            expect(() => deck.riffleShuffle()).toThrow(TypeError);
        });
    });

    describe('runningCutsShuffle() method', () => {
        it('should execute a running cuts shuffle', () => {
            deck.runningCutsShuffle();

            const cuts = getCuts(deck);

            expect(cuts.at(0)).toBeGreaterThanOrEqual(1);
            expect(cuts.at(0)).toBeLessThanOrEqual(8);
            expect(cuts.at(-1)).toBeGreaterThanOrEqual(7);
            expect(cuts.at(-1)).toBeLessThanOrEqual(19);
            for (const cut of cuts.slice(1, -1)) {
                expect(cut).toBeGreaterThanOrEqual(4);
                expect(cut).toBeLessThanOrEqual(8);
            }
        });

        it('should throw an error if the deck is missing cards', () => {
             deck.dealCard();

             expect(() => deck.runningCutsShuffle()).toThrow(TypeError);
        });

        it('should run running cuts 1000 times without failing', () => {
            for (let i = 0; i < 1000; i++) {
                deck = new StandardDeck();
                deck.runningCutsShuffle();

                const cuts = getCuts(deck);

                expect(cuts.at(0)).toBeGreaterThanOrEqual(1);
                expect(cuts.at(0)).toBeLessThanOrEqual(8);
                expect(cuts.at(-1)).toBeGreaterThanOrEqual(7);
                expect(cuts.at(-1)).toBeLessThanOrEqual(19);
                for (const cut of cuts.slice(1, -1)) {
                    expect(cut).toBeGreaterThanOrEqual(4);
                    expect(cut).toBeLessThanOrEqual(8);
                }
            }
        });
    });

    describe('dealCard() method', () => {
        it('should deal the first card in a new deck', () => {
            const expectedCard = deck.cardAt(0);

            const card = deck.dealCard();

            expect(card).toEqual(expectedCard);
        });

        it('should deal the first card in a shuffled deck', () => {
            deck.randomShuffle();
            const expectedCard = deck.cardAt(0);

            const card = deck.dealCard();

            expect(card).toEqual(expectedCard);
        });

        it('should raise error if deck is dealt when it is empty', () => {
            const numberOfCards = deck.numberOfCards();
            for (let i = 0; i < numberOfCards; i++) {
                const card = deck.dealCard();
                console.log(i, card);
            }

            expect(() => deck.dealCard()).toThrow(TypeError);
        });
    });
});

console.log(new StandardDeck().toString());