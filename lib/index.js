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
exports.CardPlayer = exports.CardHand = exports.StandardDeck = exports.Card = exports.Faces = exports.Suits = void 0;
var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
var Suits;
(function (Suits) {
    Suits["CLUBS"] = "Clubs";
    Suits["HEARTS"] = "Hearts";
    Suits["SPADES"] = "Spades";
    Suits["DIAMONDS"] = "Diamonds";
})(Suits || (exports.Suits = Suits = {}));
var Faces;
(function (Faces) {
    Faces["ACE"] = "Ace";
    Faces["TWO"] = "Two";
    Faces["THREE"] = "Three";
    Faces["FOUR"] = "Four";
    Faces["FIVE"] = "Five";
    Faces["SIX"] = "Six";
    Faces["SEVEN"] = "Seven";
    Faces["EIGHT"] = "Eight";
    Faces["NINE"] = "Nine";
    Faces["TEN"] = "Ten";
    Faces["JACK"] = "Jack";
    Faces["QUEEN"] = "Queen";
    Faces["KING"] = "King";
})(Faces || (exports.Faces = Faces = {}));
var Card = (function () {
    function Card(suit, face, _index) {
        if (_index === void 0) { _index = -1; }
        this.suit = suit;
        this.face = face;
        this._index = _index;
    }
    Object.defineProperty(Card.prototype, "index", {
        get: function () {
            return this._index;
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
        return "The ".concat(this.face, " of ").concat(this.suit);
    };
    var _a;
    _a = JSII_RTTI_SYMBOL_1;
    Card[_a] = { fqn: "aces-high-core.Card", version: "1.1.0" };
    return Card;
}());
exports.Card = Card;
var StandardDeck = (function () {
    function StandardDeck() {
        this._cards = new Array();
        var index = 0;
        for (var _i = 0, _c = Object.keys(Suits); _i < _c.length; _i++) {
            var suitKey = _c[_i];
            for (var _d = 0, _e = Object.keys(Faces); _d < _e.length; _d++) {
                var faceKey = _e[_d];
                this.cards.push(new Card(Suits[suitKey], Faces[faceKey], index++));
            }
        }
    }
    Object.defineProperty(StandardDeck.prototype, "cards", {
        get: function () {
            return this._cards;
        },
        set: function (value) {
            this._cards = value;
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
        var _c = this.splitDeck(), top = _c[0], bottom = _c[1];
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
        var _c = this.splitDeck(), top = _c[0], bottom = _c[1];
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
    var _b;
    _b = JSII_RTTI_SYMBOL_1;
    StandardDeck[_b] = { fqn: "aces-high-core.StandardDeck", version: "1.1.0" };
    return StandardDeck;
}());
exports.StandardDeck = StandardDeck;
var CardHand = (function () {
    function CardHand(_cards) {
        this._cards = _cards;
    }
    Object.defineProperty(CardHand.prototype, "cards", {
        get: function () {
            return this._cards;
        },
        enumerable: false,
        configurable: true
    });
    CardHand.prototype.addCards = function (cards) {
        var _d;
        (_d = this.cards).push.apply(_d, cards);
    };
    var _c;
    _c = JSII_RTTI_SYMBOL_1;
    CardHand[_c] = { fqn: "aces-high-core.CardHand", version: "1.1.0" };
    return CardHand;
}());
exports.CardHand = CardHand;
var CardPlayer = (function () {
    function CardPlayer(_hand) {
        this._hand = _hand;
    }
    Object.defineProperty(CardPlayer.prototype, "hand", {
        get: function () {
            return this._hand;
        },
        enumerable: false,
        configurable: true
    });
    CardPlayer.prototype.takeCards = function (cards) {
        this.hand.addCards(cards);
    };
    var _d;
    _d = JSII_RTTI_SYMBOL_1;
    CardPlayer[_d] = { fqn: "aces-high-core.CardPlayer", version: "1.1.0" };
    return CardPlayer;
}());
exports.CardPlayer = CardPlayer;
//# sourceMappingURL=index.js.map