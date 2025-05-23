import { Card } from "./card";
import { Suit, Values } from "./types";

export class Deck {
  private deck: Card[] = [];
  constructor() {
    this.resetDeck();
  }
  private resetDeck(): void {
    this.deck = [];
    const suits = Object.values(Suit);
    const values = Object.values(Values);
    for (const suit of suits) {
      for (const value of values) {
        this.deck.push(new Card(suit, value));
      }
    }
    this.shuffle();
  }

  public draw(): Card {
    if (this.deck.length === 0) {
      console.log("Deck is empty. Creating a new shuffled deck...");
      this.resetDeck();
    }
    return this.deck.pop() as Card;
  }

  public shuffle(): Card[] {
    for (let i = this.deck.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at indices i and j
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
    return this.deck;
  }
}
