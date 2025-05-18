import { Card } from "./card";
import PromptSync from "prompt-sync";
import { Deck } from "./deck";

const prompt = PromptSync();
const playerCardsDealt: Card[] = []; 
const dealerCardsDealt: Card[] = []; 

function getBet(balance: number): number {
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

  return enteredBet;
}


function dealPlayerCard(d: Deck, index: number): Card[] {
    playerCardsDealt.push(d.getCardFromDeck(index));
    return playerCardsDealt;
}

function dealDealerCard(d: Deck, index: number): Card[] {
    dealerCardsDealt.push(d.getCardFromDeck(index));
    return dealerCardsDealt;
}

function getStrHand(dealtCards: Card[], index: number): string {
    let hand: string = "";
    for (let i = 0; i < dealtCards.length - index; i++){
        hand += dealtCards[i].getValue() + dealtCards[i].getSuit() + "  " ;
    }
    return hand; 
}


function evaluate(dealtCards: Card[]): number{
    let total = 0;
    for (let i = 0; i < dealtCards.length; i++){
        const indexCardValue: string = dealtCards[i].getValue();
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

function resetHands(): void{
    playerCardsDealt.length = 0
    dealerCardsDealt.length = 0; 
}

export {getBet, playerCardsDealt, dealerCardsDealt, dealPlayerCard, dealDealerCard, getStrHand, evaluate, HitOrStand, resetHands};