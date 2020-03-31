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
        stdout_1.log(`========== SETTINGS =========
Cooking Time Multiplier : ${this.cookingTimeCoef}
Cooks / Kitchen : ${this.cooksPerKitchen}
Ingredients Swap Time : ${this.ingredientSwapTime}
=============================`);
    }
}
Baratie.instance = null;
exports.default = Baratie;
//# sourceMappingURL=baratie.js.map