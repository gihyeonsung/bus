export interface IChannel {
  id: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  indexLast: number;
  crawler: string;
  crawlerParam: string;
  items: IChannelItem[];
}

export interface IChannelItem {
  id: string;
  createdAt: number;
  updatedAt: number;
  publishedAt: number;
  name: string;
  index: number;
  read: boolean;
}
