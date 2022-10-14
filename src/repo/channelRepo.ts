import { Channel } from '../entity'
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export interface IChannelRepo {
  GetAll(): Promise<Channel>
}

export class DynamoDBChannelRepo implements IChannelRepo {
  private client: DynamoDBDocumentClient;

  constructor(private ddbConfig: any) {
    this.client = DynamoDBDocumentClient.from(new DynamoDBClient(ddbConfig));
  }

  async GetAll(): Promise<Channel> {
    this.client.send();

    throw new Error('Method not implemented.')
  }

  async destory() {
    this.client.destroy();
  }
}
