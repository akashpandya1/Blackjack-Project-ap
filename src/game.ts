import {bet, getBet, dealCard, cardsDealt, getStrHand, evaluate, HitOrStand} from "./utils";
import {Deck} from "./deck";
import { Card } from "./card";
import PromptSync from "prompt-sync";
const prompt = PromptSync(); 
let cardCount: number = 2; 

const deck = new Deck()
deck.shuffle(); 

let playerBalance: number = 100; 

function makeBet(){
    console.log("Your balance: " + playerBalance);
    getBet(playerBalance);
}

function playerTurn(){
    makeBet(); 
    dealCard(deck, 0);
    dealCard(deck, 1);
    let h: string = "";
    if (evaluate() == 21){
        console.log(`${getStrHand()} (Blackjack!)`)
        let isPlayerBlackJack: boolean = true; 
    }
    else {
       console.log(getStrHand() + " (total = " + evaluate() + ")"); 
       h = HitOrStand(); 
    }
    while (evaluate() < 21 && h !== "stand"){
        dealCard(deck, cardCount);
        cardCount++; 
        console.log(getStrHand() + "(total = " + evaluate() + ")"); 
        if (evaluate() > 21){
            console.log("Bust!");
            playerBalance -= bet; 
            break;
        }
        h = HitOrStand();
    }

    if (h == "stand" || evaluate() == 21){
        console.log(`Your final score is ${evaluate()}. Let's see how the dealer does!`)
    }
}

function dealerTurn(){

}

playerTurn(); 
console.log(playerBalance);















