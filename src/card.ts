import { Suit, Values } from "./types";

export class Card {
  private suit: Suit;
  private value: Values;
  constructor(suit: Suit, value: Values) {
    this.suit = suit;
    this.value = value;
  }

  public getSuit(): string {
    return this.suit;
  }

  public getValue(): string {
    return this.value;
  }

}
