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
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.ACE));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.TWO));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.THREE));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.FOUR));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.FIVE));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.SIX));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.SEVEN));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.EIGHT));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.NINE));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.TEN));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.JACK));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.QUEEN));
            expect(deck.Cards).toContainEqual(new Card(Suits.CLUBS, Faces.KING));
        });
    });
});