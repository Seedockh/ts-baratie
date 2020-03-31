// Reception file
import readline from 'readline'

import Baratie from './baratie'
import { DishType, DishSize } from './defs/dish'
import { log } from './print/stdout'

export default class Reception extends Baratie {
  private wicket: readline.Interface

  constructor() {
    super()
    // Create Reception prompt
    this.wicket = readline.createInterface({ input: process.stdin })
    this.wicket.on("close", () => process.exit(0))

    log(`          o
     ____/_\\____
    |           |
    | RECEPTION |
    |___________|
          `)

    this.takeOrder()
  }

  public async takeOrder() {
    log(`Welcome traveler, may I take your order ?`)
    this.wicket.question('', async (order: string): Promise<void> => {
      if (order === 'status') {
        this.printStatus()
      } else {
        this.serializeOrder(order)
        this.factory.dispatchOrders(Baratie.command)
      }
      this.takeOrder()
    })
  }

  private serializeOrder(order) {
    const builtOrder: Order[] = Baratie.command ? [ ...Baratie.command ] : []
    const orders = order.split(';')

    orders.map(ordr => {
      if (ordr.replace(' ', '').length > 0) {
        let type: Character, size: Size, quantity: Quantity
        const orderParts = ordr.trim().split(' ', 3)

        orderParts.map((part, index) => {
          if (index === 0) type = DishType[part]
          if (index === 1) size = DishSize[part]
          if (index === 2) quantity = part.indexOf('x') === 0 ? parseInt(part.replace('x', '')) : undefined
        })

        if (type === undefined || size === undefined || quantity === undefined)
          return this.printOrderError(ordr)

        builtOrder.push({ type: type, size: size, quantity: quantity })
      }
    })

    Baratie.command = builtOrder
  }

  private deserializeOrder(order) { }

  public close(): void {
    this.wicket.close()
    return log(`
        o
   ____/_\___
  |          |
  |  CLOSED  |
  |__________|
      `)
  }
}
