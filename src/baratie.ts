// Main processes file
import cluster from 'cluster'
import http from 'http'
import os from'os'
import readline from 'readline'

import { log } from './stdout'

class Baratie {
  private static instance: Baratie | null = null
  private cookingTimeCoef: string = process.argv[2]
  private cooksPerKitchen: string = process.argv[3]
  private ingredientSwapTime: string = process.argv[4]
  command: Command

  constructor() {
    log(`
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
      `, '#AD1F02')

    this.printStatus()
  }


  public printStatus() {
    log(`
========== STATUS =========
Cooking Time Multiplier : ${this.cookingTimeCoef}
Maximum Cooks/Kitchen : ${this.cooksPerKitchen}
Ingredients Reload Time : ${this.ingredientSwapTime}
Commands : ${this.command ? this.command.length : '0'}
Cooks Occupancy : /
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
  /*

  const nbCPUS = os.cpus().length
  //console.log(process.argv)
  console.log(`Number of CPUs : ${nbCPUS}`)

  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)

    // Fork workers
    //for (let i = 0; i < nbCPUS; i++) cluster.fork()

    //cluster.on('exit', (worker, code, signal) => console.log(`worker ${worker.process.pid} died`))

  } else {
    http.createServer((req, res) => {
      res.writeHead(200)
      res.end('hello world\n')
    }).listen(8000)

    //console.log(`Worker ${process.pid} started`)
  }

  */
}

export default Baratie
