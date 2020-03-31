import { Worker, isMainThread, parentPort, workerData } from 'worker_threads'
import cluster from 'cluster'
import { AsyncResource } from 'async_hooks'

import { log } from './print/stdout'

export class KitchenFactory extends AsyncResource {
  private cookingTimeCoef: number
  private cooksPerKitchen: number
  private ingredientReloadTime: number
  public static kitchens: Kitchen[] = []

  constructor(settings) {
    super('KitchenFactory')
    this.cookingTimeCoef = settings.cookingTimeCoef
    this.cooksPerKitchen = settings.cooksPerKitchen
    this.ingredientReloadTime = settings.ingredientReloadTime
    this.createKitchen()
  }

  public dispatchOrders(command) {
    let availIndexes = this.findFirstCookAvailable()
    let pendingIndex = this.findFirstPendingAvailable()

    command.map((order: Order) => {
      // Send each single dish to the first Kitchen available to cook
      for (let j=1; j <= order.quantity; j++) {
        if (availIndexes !== undefined) {
          let kitchen = KitchenFactory.kitchens[availIndexes.kitchenIndex]
          let cook = KitchenFactory.kitchens[availIndexes.kitchenIndex].cooks[availIndexes.cookIndex]
          log(`Cook available found !`)
          kitchen.process.send({ order: order, cook: availIndexes.cookIndex, status: 'cooking' })
        // If no kitchen is available to cook, send to first available pending
        } else if (pendingIndex !== undefined) {
          let kitchenPendingFree = KitchenFactory.kitchens[pendingIndex]
          log(`Sending order to pendings`)
          kitchenPendingFree.process.send({ order: order, status: 'pending' })
        // If all Kitchens are full, create a new one and re-dispatch
        } else {
          log('::: OVERLOAD :::', '#789')
          this.createKitchen()
          this.dispatchOrders(command)
        }
        availIndexes = this.findFirstCookAvailable()
        pendingIndex = this.findFirstPendingAvailable()
      }
    })
  }


  public findFirstCookAvailable(): any {
    const kitchensMap = KitchenFactory.kitchens
    for (let i=0; i<kitchensMap.length; i++) {
      for (let j=0; j<kitchensMap[i].cooks.length; j++) {
        if (!kitchensMap[i].cooks[j].isCooking) {
          return { kitchenIndex: i, cookIndex: j }
        }
      }
    }
  }

  public findFirstPendingAvailable(): any {
    const kitchensMap = KitchenFactory.kitchens
    for (let i=0; i<kitchensMap.length; i++) {
      if (kitchensMap[i].pending.length < this.cooksPerKitchen)
        return i
    }
  }

  public createKitchen() {
    if (cluster.isMaster) {
      const kitchen = cluster.fork()
      console.log('======= CREATING KITCHEN =========')
      KitchenFactory.kitchens.push({ process: kitchen, cooks: [], pending: [], cooking: [] })

      let newKitchen = KitchenFactory.kitchens.find(k => k.process === kitchen)
      newKitchen.process.send({ create: 'cook' })
      newKitchen.process.on('message', message => {
        if (message.thread) {
          newKitchen.cooks.push(message)
        }
        if (message.cooking) {
          log(`Cook is working`)
          newKitchen.cooking.push(message.order)
          newKitchen.cooks[message.cook].isCooking = true
          console.log(KitchenFactory.kitchens[0].cooks[0])
        }
        if (message.pending) {
          newKitchen.pending.push(message.order)
        }
      })
    }
  }

  static createCook(): Worker {
    console.log('======= CREATING COOK =========')
    if (cluster.isWorker) {
      return new Worker('./src/worker/worker.js', {
        workerData: {
          path: './cook.ts',
        }
      })
    }
  }

  static getCooksOccupancy(): string {
    const kitchensMap = KitchenFactory.kitchens
    let countAvailables = 0
    let countCooking = 0

    for (let i=0; i<kitchensMap.length; i++) {
      for (let j=0; j<kitchensMap[i].cooks.length; j++) {
        if (!kitchensMap[i].cooks[j].isCooking) countCooking++
        else countAvailables++
      }
    }

    return `${(countCooking+countAvailables) / 100 * countCooking}%`
  }

  public affectCook(order: Order, kitchen: Kitchen): void {
    kitchen.cooks.map((cook, index) => {
      if (!cook.isCooking) {
        log('::: Sending new order to cook !', '#789')
        kitchen.process.send({ order: order, cook: index, status: 'cooking' })
      } else
        log('::: Sending new pending order ...', '#789')
        kitchen.process.send({ order: order, status: 'pending' })
    })
  }
}
