// Main processes file
import os from'os'
import readline from 'readline'
import { AsyncResource } from 'async_hooks'

import { KitchenFactory } from './factory'
import { log } from './print/stdout'

class Baratie {
  private cookingTimeCoef: number = parseInt(process.argv[2])
  private cooksPerKitchen: number = parseInt(process.argv[3])
  private ingredientReloadTime: number = parseInt(process.argv[4])
  public factory: KitchenFactory
  public static command: Command

  constructor() {
    log(`
                /                   ||     \\
               /____________________||______\\
                      \\o            ||
         ____#########_|_###########||#####__
        /                                    |___
       /   ~~~  WELCOME ON THE BARATIE ~~~   |  /_
       \\                      ___            |___/
        \\____________________|___|___________|
   ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \\----\\ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  °°°°°°°°°°°°°°°°°°°°°°°°°°°°\\----\\°°°°°°°°°°°°°°°°°°°°°°°
      `, '#AD1F02')

    this.factory = new KitchenFactory({
      cookingTimeCoef: this.cookingTimeCoef,
      cooksPerKitchen: this.cooksPerKitchen,
      ingredientReloadTime: this.ingredientReloadTime,
    })
  }


  public printStatus() {
    log(`
========== STATUS =========
Cooking Time Multiplier : ${this.cookingTimeCoef}
Maximum Cooks/Kitchen : ${this.cooksPerKitchen}
Ingredients Reload Time : ${this.ingredientReloadTime}
Pending Commands: ${Baratie.command ? Baratie.command.length : '0'}
Cooks Occupancy : ${KitchenFactory.getCooksOccupancy()}
Cooks Ingredients Stock : /
=============================
`)
  }

  public printOrderError(order) {
    log(`
      Oops ! There was an error in your order, it won't be sent to kitchens :/
      /!\\  ${order}  /!\\
    `, '#ff0000')
  }
}

export default Baratie
