export interface ChannelsListResponseDto {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: Item[];
}

export interface Item {
  kind: string;
  etag: string;
  id: string;
  contentDetails: ContentDetails;
}

export interface ContentDetails {
  relatedPlaylists: RelatedPlaylists;
}

export interface RelatedPlaylists {
  likes: string;
  uploads: string;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Welcome {
  kind: string;
  etag: string;
  nextPageToken: string;
  items: Item[];
  pageInfo: PageInfo;
}

export interface Item {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
}

export interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceID;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

export interface ResourceID {
  kind: ResourceIDKind;
  videoId: string;
}

export enum ResourceIDKind {
  YoutubeVideo = "youtube#video",
}

export interface Thumbnails {
  default: Default;
  medium: Default;
  high: Default;
  standard: Default;
}

export interface Default {
  url: string;
  width: number;
  height: number;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
