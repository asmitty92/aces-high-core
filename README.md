# Aces High Core

Aces High Core is a foundational TypeScript library designed to support card game implementations. It provides reusable components and abstractions for building card games like Cribbage, Poker, and beyond. This library serves as the backbone for the [Aces High Cribbage](https://github.com/asmitty92/aces-high-cribbage) and [Aces High Poker](https://github.com/asmitty92/aces-high-poker) engines.

## Features

- **Card Handling**: Classes and utilities for modeling cards, decks, and hands.
- **Game Logic**: Extendable abstractions for implementing game rules and mechanics.
- **Shared Utilities**: Helper methods for operations like combinations, shuffling, and comparisons.
- **TypeScript Support**: Fully written in TypeScript to provide strong typing and modern JavaScript features.

## Installation

To install the library, use npm or yarn:

```bash
npm install aces-high-core
```

or

```bash
yarn add aces-high-core
```

## Getting Started

Here’s a quick example of how to use Aces High Core to work with cards and decks:

```typescript
import { Card, Deck, Suits, Faces } from 'aces-high-core';

// Create a new deck of cards
const deck = new Deck();
deck.fullShuffle();

// Draw five cards
const hand = deck.draw(5);
console.log('Your hand:', hand);
```

### Key Classes and Modules

- **`Card`**: Represents a standard playing card with a suit and face value.
- **`Deck`**: A standard deck of 52 cards with shuffling and drawing capabilities.
- **`CardHand`**: Represents a player's hand, with utilities for adding, removing, and analyzing cards.
- **Utilities**:
  - `getCombinations`: Generate combinations of cards for scoring logic.
  - `shuffle`: Randomize the order of cards in a deck or hand.

## Use Cases

- **Cribbage Engine**: Used in [Aces High Cribbage](https://github.com/asmitty92/aces-high-cribbage) to handle card combinations, scoring, and game logic.
- **Poker Engine**: Supports [Aces High Poker](https://github.com/asmitty92/aces-high-poker) with abstractions for poker hands and rules.

## Development

To contribute to Aces High Core, clone the repository and install dependencies:

```bash
git clone https://github.com/asmitty92/aces-high-core.git
cd aces-high-core
npm install
```

### Running Tests

Aces High Core is fully tested to ensure reliability. Run the test suite using:

```bash
npm test
```

## Roadmap

Here are some planned features and improvements:

- Add support for more card games (e.g., Blackjack, Rummy).
- Enhance documentation with in-depth guides and examples.
- Optimize performance for larger-scale games.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Related Projects

- [Aces High Cribbage](https://github.com/asmitty92/aces-high-cribbage): A Cribbage game engine built using Aces High Core.
- [Aces High Poker](https://github.com/asmitty92/aces-high-poker): A Poker game engine built using Aces High Core.

## Contact

For questions or suggestions, feel free to open an issue or contact [@asmitty92](https://github.com/asmitty92) directly.
