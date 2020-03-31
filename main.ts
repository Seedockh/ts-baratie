import cluster from 'cluster'
import { Worker, isMainThread } from 'worker_threads'

import Reception from './src/reception'
import { KitchenFactory } from './src/factory'
import { log } from './src/print/stdout'

// Main process
if (cluster.isMaster) new Reception()

// Kitchen
// Still needs to instantiate Cooks to wait for their response before
// adding new orders
if (cluster.isWorker) {
  process.on('message', message => {
    // Create a cook
    if (message.create) {
      const cook = KitchenFactory.createCook()
      process.send({ thread: cook, isCooking: false })
    }

    // Add order to Kitchen
    if (message.order) {
      // Affect order to a cook
      if (message.status === 'cooking') {
        console.log(`Kitchen::${cluster.worker.id} Affect order to cook !`)
        process.send({ order: message.order, cook: message.cook, cooking: true })
      }
      // Push order to pending list
      if (message.status === 'pending') {
        console.log(`Kitchen::${cluster.worker.id} Add order to pending !`)
        process.send({ order: message.order, pending: true })
      }
    }
  })
}
