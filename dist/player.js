"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
function placeBet() {
    const bet = prompt("Place your bet: ");
    return bet;
}
console.log(placeBet());
//# sourceMappingURL=player.js.map