import {getBet, dealerCardsDealt, playerCardsDealt, dealDealerCard, dealPlayerCard, getStrHand, evaluate, HitOrStand, resetHands} from "./utils";
import {Deck} from "./deck";
import PromptSync from "prompt-sync";
const prompt = PromptSync(); 
let h: string = "";
let playerBalance: number = 100; 
let playerScore: number = 0;
let dealerScore: number = 0;
let isPlayerBlackJack: boolean = false; 
let isDealerBlackJack: boolean = false; 
let isPlayerBust: boolean = false; 
let isDealerBust: boolean = false;  
let keepPlaying: string = "y";
let bet: number = 0;

const deck = new Deck()

function makeBet(){
    console.log("Your balance: " + playerBalance);
    bet = getBet(playerBalance);
}

function resetRound() {
    h = "";
    playerScore = 0;
    dealerScore = 0;
    isPlayerBlackJack = false;
    isDealerBlackJack = false;
    isPlayerBust = false;
    isDealerBust = false;
    bet = 0;
    resetHands(); 
    deck.shuffle(); 
}

function initialDeal(){
    makeBet(); 
    dealPlayerCard(deck);
    dealPlayerCard(deck);
    dealDealerCard(deck);
    dealDealerCard(deck);

    if (evaluate(playerCardsDealt) == 21){
        console.log(`Your hand: ${getStrHand(playerCardsDealt, 0)} (Blackjack!)`)
        console.log(`Dealer's hand: ${getStrHand(dealerCardsDealt, 1)} [hidden]`)
        isPlayerBlackJack = true; 
    }
    else {
       console.log("Your hand: " + getStrHand(playerCardsDealt, 0) + "(total = " + evaluate(playerCardsDealt) + ")"); 
       console.log(`Dealer's hand: ${getStrHand(dealerCardsDealt, 1)}[hidden]`);
       h = HitOrStand(); 
    }
    while (evaluate() < 21 && h !== "stand"){
        dealCard(deck, cardCount);
        cardCount++; 
        console.log(getStrHand() + "(total = " + evaluate() + ")"); 
        if (evaluate() > 21){
            console.log("Bust!");
            break;
        }
        if (evaluate(playerCardsDealt) == 21){
            break;
        }
        h = HitOrStand();
    }
        playerScore = evaluate(playerCardsDealt); 
        if (!isPlayerBlackJack && !isPlayerBust){
            console.log(`Your final score is ${playerScore}. Let's see how the dealer does!`);
        }
        else if (isPlayerBlackJack){
            console.log(`Your final score is ${playerScore}. Blackjack!`)
        }
        else {
            console.log(`Your final score is ${playerScore}.`);
        }
  }
  
function dealerTurn(){
    
}

playerTurn(); 
console.log(playerBalance);















