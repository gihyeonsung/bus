export interface PlaylistItemsListResponseDto {
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
    contentDetails: ContentDetails;
}

export interface ContentDetails {
    videoId: string;
    videoPublishedAt: string;
}

export interface Snippet {
    publishedAt: string;
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
    kind: string;
    videoId: string;
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
