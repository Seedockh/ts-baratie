"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stdout_1 = require("./stdout");
class Baratie {
    constructor() {
        this.cookingTimeCoef = process.argv[2];
        this.cooksPerKitchen = process.argv[3];
        this.ingredientSwapTime = process.argv[4];
        stdout_1.log(`
                /                   ||     \\
               /____________________||______\\
                      \\o            ||
         ______________|____________||_______
        /                                    \\
       /   ~~~  WELCOME ON THE BARATIE ~~~   |
       \\                      ___            |
        \\____________________|___|___________/
   ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \\----\\ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  °°°°°°°°°°°°°°°°°°°°°°°°°°°°\\----\\°°°°°°°°°°°°°°°°°°°°°°°
      `, '#AD1F02');
        this.printStatus();
    }
    printStatus() {
        stdout_1.log(`
========== STATUS =========
Cooking Time Multiplier : ${this.cookingTimeCoef}
Maximum Cooks/Kitchen : ${this.cooksPerKitchen}
Ingredients Reload Time : ${this.ingredientSwapTime}
Commands : ${this.command ? this.command.length : '0'}
Cooks Occupancy : /
Cooks Ingredients Stock : /
=============================
`);
    }
    printOrderError(order) {
        stdout_1.log(`
      Oops ! There was an error in your order, it won't be sent to kitchens :/
      /!\\  ${order}  /!\\
    `, '#ff0000');
    }
}
Baratie.instance = null;
exports.default = Baratie;
//# sourceMappingURL=baratie.js.map