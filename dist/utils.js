"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardsDealt = exports.bet = void 0;
exports.getBet = getBet;
exports.dealCard = dealCard;
exports.getStrHand = getStrHand;
exports.evaluate = evaluate;
exports.HitOrStand = HitOrStand;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
let bet;
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
    exports.bet = bet = enteredBet;
}
const cardsDealt = [];
exports.cardsDealt = cardsDealt;
function dealCard(d, index) {
    cardsDealt.push(d.getCardFromDeck(index));
    return cardsDealt;
}
function getStrHand() {
    let hand = "";
    for (let i = 0; i < cardsDealt.length; i++) {
        hand += cardsDealt[i].getValue() + cardsDealt[i].getSuit() + "  ";
    }
    return `Your hand: ${hand}`;
}
function evaluate() {
    let total = 0;
    for (let i = 0; i < cardsDealt.length; i++) {
        const indexCardValue = cardsDealt[i].getValue();
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
//# sourceMappingURL=utils.js.map