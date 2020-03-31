interface Order {
  type: Character
  size: Size
  quantity: Quantity
}

type Command = Order[]
type Character = String
type Size = String
type Quantity = Number
