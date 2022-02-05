"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardDeck = exports.Card = exports.Faces = exports.Suits = void 0;
var Suits;
(function (Suits) {
    Suits["CLUBS"] = "Clubs";
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
    Object.defineProperty(Card.prototype, "Index", {
        get: function () {
            return this.index;
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
        return "The ".concat(Faces[this.face], " of ").concat(this.suit);
    };
    return Card;
}());
exports.Card = Card;
var StandardDeck = (function () {
    function StandardDeck() {
        this.cards = new Array();
        var index = 0;
        for (var _i = 0, _a = this.enumKeys(Suits); _i < _a.length; _i++) {
            var suitKey = _a[_i];
            for (var _b = 0, _c = this.enumKeys(Faces); _b < _c.length; _b++) {
                var faceKey = _c[_b];
                this.cards.push(new Card(Suits[suitKey], Faces[faceKey], index++));
            }
        }
    }
    Object.defineProperty(StandardDeck.prototype, "Cards", {
        get: function () {
            return this.cards;
        },
        enumerable: false,
        configurable: true
    });
    StandardDeck.prototype.toString = function () {
        return this.cards.join('\n');
    };
    StandardDeck.prototype.numberOfCards = function () {
        return this.cards.length;
    };
    StandardDeck.prototype.cardAt = function (index) {
        return this.cards[index];
    };
    StandardDeck.prototype.randomShuffle = function () {
        for (var i = 0; i < this.numberOfCards(); i++) {
            var swapIndex = this.getRandomIndex(0, this.numberOfCards() - 1);
            var temp = this.cardAt(i);
            this.cards[i] = this.cardAt(swapIndex);
            this.cards[swapIndex] = temp;
        }
    };
    StandardDeck.prototype.riffleShuffle = function () {
        var _a = this.splitDeck(), top = _a[0], bottom = _a[1];
        var cards = [];
        for (var i = 0; i < top.length; i++) {
            var flip = this.coinFlip();
            if (flip == 1) {
                cards.push(top[i]);
                cards.push(bottom[i]);
            }
            else {
                cards.push(bottom[i]);
                cards.push(top[i]);
            }
        }
        this.cards = cards;
    };
    StandardDeck.prototype.faroShuffle = function () {
        var _a = this.splitDeck(), top = _a[0], bottom = _a[1];
        var cards = [];
        for (var i = 0; i < top.length; i++) {
            cards.push(top[i]);
            cards.push(bottom[i]);
        }
        this.cards = cards;
    };
    StandardDeck.prototype.runningCutsShuffle = function () {
        if (this.numberOfCards() % 4 != 0)
            throw new TypeError('Only a full deck can be shuffled');
        var cutSizes = [4, 5, 6, 7, 8];
        var quarter = this.numberOfCards() / 4;
        var halfQuarter = quarter / 2;
        var cutStart = quarter + this.getRandomIndex(-1 * halfQuarter, halfQuarter - 1);
        var toCut = this.cards.slice(cutStart);
        this.cards = this.cards.slice(0, cutStart);
        while (toCut.length > 0) {
            var cutIndex = this.getRandomIndex(0, cutSizes.length - 1);
            var cutSize = cutSizes[cutIndex];
            this.cards = toCut.slice(0, cutSize).concat(this.cards);
            toCut = toCut.slice(cutSize);
        }
    };
    StandardDeck.prototype.fullShuffle = function () {
        this.randomShuffle();
        this.riffleShuffle();
        this.riffleShuffle();
        this.riffleShuffle();
        this.runningCutsShuffle();
        this.riffleShuffle();
        this.riffleShuffle();
        this.riffleShuffle();
        this.runningCutsShuffle();
    };
    StandardDeck.prototype.dealCard = function () {
        if (this.isEmpty())
            throw new TypeError('Cannot deal card, deck is empty');
        return this.cards.shift();
    };
    StandardDeck.prototype.isEmpty = function () {
        return this.cards.length <= 0;
    };
    StandardDeck.prototype.getRandomIndex = function (min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    };
    StandardDeck.prototype.enumKeys = function (obj) {
        return Object.keys(obj).filter(function (k) { return Number.isNaN(+k); });
    };
    StandardDeck.prototype.coinFlip = function () {
        return Math.floor(Math.random() * 100) % 2;
    };
    StandardDeck.prototype.splitDeck = function () {
        if (this.numberOfCards() % 2 != 0) {
            throw new TypeError('Invalid number of cards to shuffle.');
        }
        var midpoint = this.cards.length / 2;
        var top = __spreadArray([], this.cards.slice(0, midpoint), true);
        var bottom = __spreadArray([], this.cards.slice(midpoint), true);
        return [top, bottom];
    };
    return StandardDeck;
}());
exports.StandardDeck = StandardDeck;
//# sourceMappingURL=index.js.map