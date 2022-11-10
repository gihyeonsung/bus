export interface IChannel {
  id: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  crawler: string;
  crawlerConfig: string;
  items: IChannelItem[];
}

export interface IChannelItem {
  id: string;
  createdAt: number;
  updatedAt: number;
  publishedAt: number;
  name: string;
  url: string;
}

export type ICrawler = (updatedAt: number, config: string) => Promise<IChannelItem[]>
