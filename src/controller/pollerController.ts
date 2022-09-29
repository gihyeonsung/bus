import { Item } from "../entity"

export interface IPollerController {
  Poll(): Promise<Item[]>
}
