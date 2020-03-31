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
        // Create Reception prompt
        this.wicket = readline_1.default.createInterface({ input: process.stdin, output: process.stdout });
        this.wicket.on("close", () => process.exit(0));
        stdout_1.log(`          o
     ____/_\\____
    |           |
    | RECEPTION |
    |___________|
          `);
    }
    takeOrder() {
        stdout_1.log(`   Welcome traveler, may I take your order ?`);
        this.wicket.question(`   >  `, (order) => {
            if (order === 'status') {
                this.printStatus();
                this.takeOrder();
            }
            else
                this.serializeOrder(order);
        });
    }
    serializeOrder(order) {
        const builtOrder = this.command ? [...this.command] : [];
        const orders = order.split(';');
        orders.map(ordr => {
            if (ordr.replace(' ', '').length > 0) {
                let type, size, quantity;
                const orderParts = ordr.trim().split(' ', 3);
                orderParts.map((part, index) => {
                    if (index === 0)
                        type = dish_1.DishType[part];
                    if (index === 1)
                        size = dish_1.DishSize[part];
                    if (index === 2)
                        quantity = part.indexOf('x') === 0 ? parseInt(part.replace('x', '')) : undefined;
                });
                if (type === undefined || size === undefined || quantity === undefined)
                    return this.printOrderError(ordr);
                builtOrder.push({ type: type, size: size, quantity: quantity });
            }
        });
        this.command = builtOrder;
        this.printStatus();
        this.takeOrder();
    }
    deserializeOrder(order) { }
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
}
exports.default = Reception;
//# sourceMappingURL=reception.js.map