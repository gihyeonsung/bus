export interface Channel {
  name: string
  items: Item[]
}

export interface Item {
  created: Date
  title: string
  index: number
  url: string
  read: boolean
}
