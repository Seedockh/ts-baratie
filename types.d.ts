/***********************
  define Order type
************************/
interface Order {
  type: Character
  size: Size
  quantity: Quantity
}

type Command = Order[]
type Character = String
type Size = String
type Quantity = number

/***********************
  define Dish type
************************/
interface Dish {
  type: Character
  size: Size
}

/***********************
  define Kitchen type
************************/
type KitchenWorker = import('cluster').Worker
type CookWorker = import('worker_threads').Worker

interface Kitchen {
  process: KitchenWorker | null
  cooks: Cook[]
  pending: Order[]
  cooking: Order[]
}

/***********************
  define Cook type
************************/
interface Cook {
  thread: CookWorker
  dish: Dish
  isCooking: boolean
}
