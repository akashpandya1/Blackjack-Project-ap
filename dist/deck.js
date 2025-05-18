"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
const card_1 = require("./card");
const types_1 = require("./types");
class Deck {
    constructor() {
        this.deck = [];
        this.resetDeck();
    }
    resetDeck() {
        this.deck = [];
        const suits = Object.values(types_1.Suit);
        const values = Object.values(types_1.Values);
        for (const suit of suits) {
            for (const value of values) {
                this.deck.push(new card_1.Card(suit, value));
            }
        }
        this.shuffle();
    }
    draw() {
        if (this.deck.length === 0) {
            console.log("Deck is empty. Creating a new shuffled deck...");
            this.resetDeck();
        }
        return this.deck.pop();
    }
    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
        return this.deck;
    }
}
exports.Deck = Deck;
//# sourceMappingURL=deck.js.map