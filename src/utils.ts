import { Card } from "./card";
import PromptSync from "prompt-sync";
import { Deck } from "./deck";

const prompt = PromptSync();

let bet: number;

function getBet(balance: number): void {
  const tempBet = prompt("Enter your bet: ");
  const enteredBet = Number(tempBet);
  if (isNaN(enteredBet) || enteredBet <= 0){
    console.log("Invalid bet. Please enter a positive number: ");
    return getBet(balance);
  }
  if (balance < enteredBet) {
    console.log("Bet exceeds your balance. Please enter a valid bet: ")
    return getBet(balance);
  }

  bet = enteredBet;
}

const cardsDealt: Card[] = []; 

function dealCard(d: Deck, index: number): Card[] {
    cardsDealt.push(d.getCardFromDeck(index));
    return cardsDealt;
}

function getStrHand(): string {
    let hand: string = "";
    for (let i = 0; i < cardsDealt.length; i++){
        hand += cardsDealt[i].getValue() + cardsDealt[i].getSuit() + "  " ;
    }
    return `Your hand: ${hand}`;
}


function evaluate(): number{
    let total = 0;
    for (let i = 0; i < cardsDealt.length; i++){
        const indexCardValue: string = cardsDealt[i].getValue();
        if (indexCardValue == "J" || indexCardValue == "Q" || indexCardValue == "K"){
            total += 10; 
        }
        else if (indexCardValue == "A"){
            if (21 - total >= 11){
                total += 11;
            }
            else {
                total += 1; 
            }
        }
        else {
            total += Number(indexCardValue);
        }
    }
    return total; 
}

function HitOrStand(): string{
    let HS = prompt("Hit or Stand? ").toLowerCase();
    if (HS !== "hit" && HS !== "stand"){
        console.log("Invalid input. Please enter \"hit\" or \"stand\".");
        return HitOrStand(); 
    } 
    return HS; 
}


export {bet, getBet, cardsDealt, dealCard, getStrHand, evaluate, HitOrStand};