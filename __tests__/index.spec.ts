import {Card, Faces, StandardDeck, Suits} from '../src/index';


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
    describe('constructor', () => {
        let deck: StandardDeck;

        beforeEach(() => {
            deck = new StandardDeck();
        });

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
            for (let i = 0; i < deck.Cards.length; i++) {
                expect(deck.Cards[i].Index).toEqual(i);
            }
        })
    });
});