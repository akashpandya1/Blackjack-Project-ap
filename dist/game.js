"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const deck_1 = require("./deck");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
let cardCount = 2;
const deck = new deck_1.Deck();
deck.shuffle();
let playerBalance = 100;
function makeBet() {
    console.log("Your balance: " + playerBalance);
    (0, utils_1.getBet)(playerBalance);
}
function playerTurn() {
    makeBet();
    (0, utils_1.dealCard)(deck, 0);
    (0, utils_1.dealCard)(deck, 1);
    let h = "";
    if ((0, utils_1.evaluate)() == 21) {
        console.log(`${(0, utils_1.getStrHand)()} (Blackjack!)`);
    }
    else {
        console.log((0, utils_1.getStrHand)() + " (total = " + (0, utils_1.evaluate)() + ")");
        h = (0, utils_1.HitOrStand)();
    }
    while ((0, utils_1.evaluate)() < 21 && h !== "stand") {
        (0, utils_1.dealCard)(deck, cardCount);
        cardCount++;
        console.log((0, utils_1.getStrHand)() + " (total = " + (0, utils_1.evaluate)() + ")");
        if ((0, utils_1.evaluate)() > 21) {
            console.log("Bust!");
            playerBalance -= utils_1.bet;
            break;
        }
        h = (0, utils_1.HitOrStand)();
    }
    if (h == "stand" || (0, utils_1.evaluate)() == 21) {
        console.log(`Your final score is ${(0, utils_1.evaluate)()}. Let's see how the dealer does!`);
    }
}
playerTurn();
console.log(playerBalance);
//# sourceMappingURL=game.js.map