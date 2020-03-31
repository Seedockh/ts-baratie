"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Reception file
const readline_1 = __importDefault(require("readline"));
const baratie_1 = __importDefault(require("./baratie"));
const dish_1 = require("./defs/dish");
const stdout_1 = require("./stdout");
class Reception extends baratie_1.default {
    constructor() {
        super();
        this.validOrder = false;
        this.wicket = readline_1.default.createInterface({ input: process.stdin, output: process.stdout });
        this.wicket.on("close", () => process.exit(0));
        stdout_1.log(`          o
     ____/_\\____
    |           |
    | RECEPTION |
    |___________|
          `);
    }
    close() {
        this.wicket.close();
        return stdout_1.log(`
        o
   ____/_\___
  |          |
  |  CLOSED  |
  |__________|
      `);
    }
    takeOrder() {
        stdout_1.log(`   Welcome traveler, may I take your order ?`);
        this.wicket.question(`   >  `, (order) => this.buildOrder(order));
    }
    buildOrder(order) {
        const builtOrder = [];
        const orders = order.split(';');
        orders.map(ordr => {
            let type, size, quantity;
            const orderParts = ordr.trim().split(' ', 3);
            orderParts.map((part, index) => {
                if (index === 0)
                    type = dish_1.DishType[part];
                if (index === 1)
                    size = dish_1.DishSize[part];
                if (index === 2)
                    quantity = parseInt(part.replace('x', ''));
            });
            builtOrder.push({ type: type, size: size, quantity: quantity });
        });
        console.log(builtOrder);
    }
}
exports.default = Reception;
//# sourceMappingURL=reception.js.map