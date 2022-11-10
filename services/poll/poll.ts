import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { IChannel } from "./interface";
import { crawl } from "./youtube/crawler";

const dbClient = new DynamoDBClient({ region: process.env.REGION });
const db = DynamoDBDocument.from(dbClient);

const crawlers = new Map([['youtube', crawl]]);

const pollChannel = async (channel: IChannel): Promise<void> => {
  if (!crawlers.has(channel.crawler)) {
    throw new Error('crawler implementation not found: ' + channel.crawler)
  }
  const crawler = crawlers.get(channel.crawler)!;

  const items = await crawler(channel.updatedAt, channel.crawlerConfig);
  if (items.length <= 0) {
    return;
  }

  await db.update({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { id: channel.id },
    UpdateExpression: `SET updatedAt = :u, #items = list_append(:newitems, #items)`,
    ExpressionAttributeNames: { '#items': 'items' },
    ExpressionAttributeValues: { ':u': items[0].publishedAt, ':newitems': items }
  });
};

export const poll = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const data = await db.scan({ TableName: process.env.DYNAMODB_TABLE });

  if (data.Items === undefined) {
    return { statusCode: 500, body: "db error" };
  }

  const channels = data.Items as IChannel[];
  await Promise.all(channels.map(pollChannel));

  return { statusCode: 200, body: '' };
};
