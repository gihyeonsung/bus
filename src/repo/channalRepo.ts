import { Channal } from '../entity'

export interface IChannalRepo {
  GetAll(): Promise<Channal>
}
