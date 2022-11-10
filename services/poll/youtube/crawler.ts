import * as uuid from "uuid";
import { ICrawler, IChannelItem } from "../interface";
import { ChannelsListResponseDto } from "./channels-list-response.dto";
import { PlaylistItemsListResponseDto } from "./playlistitems-list-response.dto";
import * as axios from 'axios';
// TODO: 왜인지는 모르겠는데 default import 하면, 빌드된 js 에는 리솔브 잘 못함

export const crawl: ICrawler = async (updatedAt: number, config: string): Promise<IChannelItem[]> => {
  const configJson = JSON.parse(config);
  const channelId = configJson.channelId;
  const apiKey = configJson.apiKey;

  const uploadsResAxios = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`);
  const uploadsRes = uploadsResAxios.data as ChannelsListResponseDto;
  const uploadsId = uploadsRes.items[0].contentDetails.relatedPlaylists.uploads;

  const itemsResAxios = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=5&playlistId=${uploadsId}&key=${apiKey}`);
  const itemsRes = itemsResAxios.data as PlaylistItemsListResponseDto;
  const items = itemsRes.items;

  return items
    .filter((i) => new Date(i.snippet.publishedAt).getTime() > updatedAt)
    .map((i) => ({
      id: uuid.v1(),
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      publishedAt: new Date(i.snippet.publishedAt).getTime(),
      name: i.snippet.title,
      url: `https://youtube.com/watch?v=${i.contentDetails.videoId}`
    }))
    .sort((a, b) => b.publishedAt - a.publishedAt);
}