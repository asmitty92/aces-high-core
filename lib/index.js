"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.CardPlayer = exports.CardHand = exports.StandardDeck = exports.DeckOfCards = exports.Card = exports.Faces = exports.Suits = void 0;
exports.getCombinations = getCombinations;
var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
var suits = ["Clubs", "Hearts", "Spades", "Diamonds"];
var faces = [
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
];
function getCombinations(items, itemCount) {
    var combinations = [];
    function recurse(remaining, start, combo) {
        if (remaining === 0) {
            combinations.push(__spreadArray([], combo, true));
            return;
        }
        for (var i = start; i <= items.length - remaining; i++) {
            combo.push(items[i]);
            recurse(remaining - 1, i + 1, combo);
            combo.pop();
        }
    }
    recurse(itemCount, 0, []);
    return combinations;
}
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
var FaceValues = new Map([
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
    Object.defineProperty(Card.prototype, "value", {
        get: function () {
            return FaceValues.get(this.face);
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
    Card[_a] = { fqn: "aces-high-core.Card", version: "2.4.0" };
    return Card;
}());
exports.Card = Card;
var DeckOfCards = (function () {
    function DeckOfCards() {
        this._cards = new Array();
    }
    Object.defineProperty(DeckOfCards.prototype, "cards", {
        get: function () {
            return this._cards;
        },
        set: function (value) {
            this._cards = value;
        },
        enumerable: false,
        configurable: true
    });
    DeckOfCards.prototype.toString = function () {
        return this.cards.join("\n");
    };
    DeckOfCards.prototype.numberOfCards = function () {
        return this.cards.length;
    };
    DeckOfCards.prototype.cardAt = function (index) {
        return this.cards[index];
    };
    DeckOfCards.prototype.randomShuffle = function () {
        for (var i = 0; i < this.numberOfCards(); i++) {
            var swapIndex = this.getRandomIndex(0, this.numberOfCards() - 1);
            var temp = this.cardAt(i);
            this.cards[i] = this.cardAt(swapIndex);
            this.cards[swapIndex] = temp;
        }
    };
    DeckOfCards.prototype.riffleShuffle = function () {
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
    DeckOfCards.prototype.faroShuffle = function () {
        var _c = this.splitDeck(), top = _c[0], bottom = _c[1];
        var cards = [];
        for (var i = 0; i < top.length; i++) {
            cards.push(top[i]);
            cards.push(bottom[i]);
        }
        this.cards = cards;
    };
    DeckOfCards.prototype.runningCutsShuffle = function () {
        if (this.numberOfCards() % 4 != 0)
            throw new TypeError("Only a full deck can be shuffled");
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
    DeckOfCards.prototype.fullShuffle = function () {
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
    DeckOfCards.prototype.isEmpty = function () {
        return this.cards.length <= 0;
    };
    DeckOfCards.prototype.getRandomIndex = function (min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    };
    DeckOfCards.prototype.coinFlip = function () {
        return Math.floor(Math.random() * 100) % 2;
    };
    DeckOfCards.prototype.splitDeck = function () {
        if (this.numberOfCards() % 2 != 0) {
            throw new TypeError("Invalid number of cards to shuffle.");
        }
        var midpoint = this.cards.length / 2;
        var top = __spreadArray([], this.cards.slice(0, midpoint), true);
        var bottom = __spreadArray([], this.cards.slice(midpoint), true);
        return [top, bottom];
    };
    var _b;
    _b = JSII_RTTI_SYMBOL_1;
    DeckOfCards[_b] = { fqn: "aces-high-core.DeckOfCards", version: "2.4.0" };
    return DeckOfCards;
}());
exports.DeckOfCards = DeckOfCards;
var StandardDeck = (function (_super) {
    __extends(StandardDeck, _super);
    function StandardDeck() {
        var _this = _super.call(this) || this;
        var index = 0;
        for (var _i = 0, suits_1 = suits; _i < suits_1.length; _i++) {
            var suitKey = suits_1[_i];
            for (var _d = 0, faces_1 = faces; _d < faces_1.length; _d++) {
                var faceKey = faces_1[_d];
                _this.cards.push(new Card(suitKey, faceKey, index++));
            }
        }
        return _this;
    }
    StandardDeck.prototype.deal = function () {
        if (this.isEmpty())
            throw new TypeError("Cannot deal card, deck is empty");
        return this.cards.shift();
    };
    var _c;
    _c = JSII_RTTI_SYMBOL_1;
    StandardDeck[_c] = { fqn: "aces-high-core.StandardDeck", version: "2.4.0" };
    return StandardDeck;
}(DeckOfCards));
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
        var _e;
        (_e = this.cards).push.apply(_e, cards);
    };
    var _d;
    _d = JSII_RTTI_SYMBOL_1;
    CardHand[_d] = { fqn: "aces-high-core.CardHand", version: "2.4.0" };
    return CardHand;
}());
exports.CardHand = CardHand;
var CardPlayer = (function () {
    function CardPlayer(myHand) {
        this.myHand = myHand;
        this.myScore = 0;
    }
    Object.defineProperty(CardPlayer.prototype, "hand", {
        get: function () {
            return this.myHand;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardPlayer.prototype, "score", {
        get: function () {
            return this.myScore;
        },
        enumerable: false,
        configurable: true
    });
    CardPlayer.prototype.takeCards = function (cards) {
        this.hand.addCards(cards);
    };
    var _e;
    _e = JSII_RTTI_SYMBOL_1;
    CardPlayer[_e] = { fqn: "aces-high-core.CardPlayer", version: "2.4.0" };
    return CardPlayer;
}());
exports.CardPlayer = CardPlayer;
//# sourceMappingURL=index.js.map