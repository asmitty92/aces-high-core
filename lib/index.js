"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardDeck = exports.Card = exports.Faces = exports.Suits = void 0;
var Suits;
(function (Suits) {
    Suits["CLUBS"] = "Suits";
    Suits["HEARTS"] = "Hearts";
    Suits["SPADES"] = "Spades";
    Suits["DIAMONDS"] = "Diamonds";
})(Suits = exports.Suits || (exports.Suits = {}));
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
})(Faces = exports.Faces || (exports.Faces = {}));
var Card = (function () {
    function Card(suit, face, index) {
        if (index === void 0) { index = -1; }
        this.suit = suit;
        this.face = face;
        this.index = index;
    }
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
        return "The ".concat(Faces[this.face], " of ").concat(this.suit);
    };
    return Card;
}());
exports.Card = Card;
var StandardDeck = (function () {
    function StandardDeck() {
        this.cards = new Array();
        for (var _i = 0, _a = this.enumKeys(Faces); _i < _a.length; _i++) {
            var key = _a[_i];
            var face2 = Faces[key];
            var card = new Card(Suits.CLUBS, face2);
            console.log(card);
            this.cards.push(card);
        }
    }
    Object.defineProperty(StandardDeck.prototype, "Cards", {
        get: function () {
            return this.cards;
        },
        enumerable: false,
        configurable: true
    });
    StandardDeck.prototype.numberOfCards = function () {
        return 52;
    };
    StandardDeck.prototype.enumKeys = function (obj) {
        return Object.keys(obj).filter(function (k) { return Number.isNaN(+k); });
    };
    return StandardDeck;
}());
exports.StandardDeck = StandardDeck;
new StandardDeck();
//# sourceMappingURL=index.js.map