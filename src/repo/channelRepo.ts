import { Channel } from '../entity'

export interface IChannelRepo {
  GetAll(): Promise<Channel>
}
