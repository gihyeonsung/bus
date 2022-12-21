import * as uuid from "uuid";

import { ICrawler, IChannelItem } from "../interface";

export const crawl: ICrawler = async (updatedAt: number, config: string): Promise<IChannelItem[]> => {
  const now = Date.now()
  return [
    {
      id: uuid.v1(),
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
      name: 'heartbeat',
      url: '',
    }
  ]
}