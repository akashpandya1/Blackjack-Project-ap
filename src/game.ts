import {getBet, dealerCardsDealt, playerCardsDealt, dealDealerCard, dealPlayerCard, getStrHand, evaluate, HitOrStand, resetHands} from "./utils";
import {Deck} from "./deck";
import PromptSync from "prompt-sync";
const prompt = PromptSync(); 
let cardCount: number = 2; 
let h: string = "";
let playerBalance: number = 100; 
let playerScore: number = 0;
let dealerScore: number = 0;
let isPlayerBlackJack: boolean = false; 
let isDealerBlackJack: boolean = false; 
let isPlayerBust: boolean = false; 
let isDealerBust: boolean = false;  
let bet: number = 0;

const deck = new Deck()

function makeBet(){
    console.log("Your balance: " + playerBalance);
    bet = getBet(playerBalance);
}

function resetRound() {
    cardCount = 2;
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
    dealPlayerCard(deck, 0);
    dealPlayerCard(deck, 1);
    dealDealerCard(deck, 51);
    dealDealerCard(deck, 50);

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
}


function playerTurn() { 
    while (evaluate(playerCardsDealt) < 21 && h !== "stand"){
        dealPlayerCard(deck, cardCount);
        cardCount++; 
        console.log("Your hand: " + getStrHand(playerCardsDealt, 0) + "(total = " + evaluate(playerCardsDealt) + ")"); 
        if (evaluate(playerCardsDealt) > 21){
            isPlayerBust = true; 
            console.log("Bust!");
            break;
        }
        if (evaluate(playerCardsDealt) == 21){
            break;
        }
        h = HitOrStand();
    }
        playerScore = evaluate(playerCardsDealt); 
        console.log(`Your final score is ${playerScore}. Let's see how the dealer does!`)
  }
  
function dealerTurn(){

    console.log(`Dealer's hand: ${getStrHand(dealerCardsDealt, 0)}(total = ${evaluate(dealerCardsDealt)})`);

    if (evaluate(dealerCardsDealt) == 21){
        isDealerBlackJack = true; 
    }

    while (!isPlayerBust && evaluate(dealerCardsDealt) < 17){
        dealDealerCard(deck, 51 - cardCount);
        cardCount--; 
        console.log(`Dealer hits: ${getStrHand(dealerCardsDealt, 0)} (total: ${evaluate(dealerCardsDealt)})`)
        if (evaluate(dealerCardsDealt) > 21){
            isDealerBust = true;
            console.log("Dealer busts!")
            break; 
        }
    }
    dealerScore = evaluate(dealerCardsDealt);
}


while (playerBalance > 0) {
    resetRound(); 
    console.log("\n" + "------------------------");
    initialDeal(); 
    playerTurn();
    if (isPlayerBust){
        console.log(`You bust and lose $${bet}`); 
        playerBalance -= bet; 
        console.log("Player funds: " + playerBalance);
        continue; 
    }
    if (isPlayerBlackJack){
        console.log("You win $" + bet * 1.5 + "!")
        playerBalance += bet * 1.5; 
        console.log("Player funds: " + playerBalance);
        continue; 
    }
    dealerTurn(); 
    if (isDealerBust || playerScore > dealerScore){
        console.log(`You win $${bet}`);
        playerBalance += bet; 
        console.log("Player funds: " + playerBalance);
        continue; 
    }
    if (isDealerBlackJack && playerScore != 21){
        console.log(`Dealer has Blackjack. You lose $${bet}`);
        playerBalance -= bet;
        console.log("Player funds: " + playerBalance);
        continue;
    }

    if (dealerScore > playerScore){
        console.log(`You lose $${bet}`);
        playerBalance -= bet;
        console.log("Player funds: " + playerBalance);
        continue; 
    }

    if (dealerScore == playerScore){
        console.log("It's a push! Your bet is returned.")
        console.log("Player funds: " + playerBalance);    
        continue; 
    }
}
  



















