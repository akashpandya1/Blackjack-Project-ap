"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dealerCardsDealt = exports.playerCardsDealt = void 0;
exports.getBet = getBet;
exports.dealPlayerCard = dealPlayerCard;
exports.dealDealerCard = dealDealerCard;
exports.getStrHand = getStrHand;
exports.evaluate = evaluate;
exports.HitOrStand = HitOrStand;
exports.resetHands = resetHands;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
const playerCardsDealt = [];
exports.playerCardsDealt = playerCardsDealt;
const dealerCardsDealt = [];
exports.dealerCardsDealt = dealerCardsDealt;
function getBet(balance) {
    const tempBet = prompt("Enter your bet: ");
    const enteredBet = Number(tempBet);
    if (isNaN(enteredBet) || enteredBet <= 0) {
        console.log("Invalid bet. Please enter a positive number: ");
        return getBet(balance);
    }
    if (balance < enteredBet) {
        console.log("Bet exceeds your balance. Please enter a valid bet: ");
        return getBet(balance);
    }
    return enteredBet;
}
function dealPlayerCard(d, index) {
    playerCardsDealt.push(d.getCardFromDeck(index));
    return playerCardsDealt;
}
function dealDealerCard(d, index) {
    dealerCardsDealt.push(d.getCardFromDeck(index));
    return dealerCardsDealt;
}
function getStrHand(dealtCards, index) {
    let hand = "";
    for (let i = 0; i < dealtCards.length - index; i++) {
        hand += dealtCards[i].getValue() + dealtCards[i].getSuit() + "  ";
    }
    return hand;
}
function evaluate(dealtCards) {
    let total = 0;
    for (let i = 0; i < dealtCards.length; i++) {
        const indexCardValue = dealtCards[i].getValue();
        if (indexCardValue == "J" || indexCardValue == "Q" || indexCardValue == "K") {
            total += 10;
        }
        else if (indexCardValue == "A") {
            if (21 - total >= 11) {
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
function HitOrStand() {
    let HS = prompt("Hit or Stand? ").toLowerCase();
    if (HS !== "hit" && HS !== "stand") {
        console.log("Invalid input. Please enter \"hit\" or \"stand\".");
        return HitOrStand();
    }
    return HS;
}
function resetHands() {
    playerCardsDealt.length = 0;
    dealerCardsDealt.length = 0;
}
//# sourceMappingURL=utils.js.map