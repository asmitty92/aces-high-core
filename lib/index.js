var Suits;
(function (Suits) {
    Suits[Suits["CLUBS"] = 0] = "CLUBS";
    Suits[Suits["HEARTS"] = 1] = "HEARTS";
    Suits[Suits["SPADES"] = 2] = "SPADES";
    Suits[Suits["DIAMONDS"] = 3] = "DIAMONDS";
})(Suits || (Suits = {}));
var Faces;
(function (Faces) {
    Faces[Faces["ACE"] = 1] = "ACE";
    Faces[Faces["TWO"] = 2] = "TWO";
    Faces[Faces["THREE"] = 3] = "THREE";
    Faces[Faces["FOUR"] = 4] = "FOUR";
    Faces[Faces["FIVE"] = 5] = "FIVE";
    Faces[Faces["SIX"] = 6] = "SIX";
    Faces[Faces["SEVEN"] = 7] = "SEVEN";
    Faces[Faces["EIGHT"] = 8] = "EIGHT";
    Faces[Faces["NINE"] = 9] = "NINE";
    Faces[Faces["TEN"] = 10] = "TEN";
    Faces[Faces["JACK"] = 11] = "JACK";
    Faces[Faces["QUEEN"] = 12] = "QUEEN";
    Faces[Faces["KING"] = 13] = "KING";
})(Faces || (Faces = {}));
var Card = (function () {
    function Card(suit, face, index) {
        if (index === void 0) { index = -1; }
        this.suit = suit;
        this.face = face;
        this.index = index;
    }
    Object.defineProperty(Card.prototype, "Suit", {
        get: function () {
            return this.suit;
        },
        enumerable: false,
        configurable: true
    });
    Card.prototype.isAce = function () {
        return this.face == Faces.ACE;
    };
    Card.prototype.isKing = function () {
        return this.face == Faces.KING;
    };
    Card.prototype.isInDeck = function () {
        return this.index >= 0;
    };
    Card.prototype.toString = function () {
        return "The ".concat(Faces[this.face], " of ").concat(Suits[this.suit]);
    };
    return Card;
}());
console.log(new Card(Suits.CLUBS, Faces.TEN).toString());
//# sourceMappingURL=index.js.map