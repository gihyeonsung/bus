import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

import * as heartbeat from "./heartbeat";
import * as youtube from "./youtube";
import { IChannel, IChannelItem } from "./interface";

const sqsClient = new SQSClient({ region: process.env.REGION })
const dbClient = new DynamoDBClient({ region: process.env.REGION });
const db = DynamoDBDocument.from(dbClient);

const crawlers = new Map(
  [
    ['heartbeat', heartbeat.crawl],
    ['youtube', youtube.crawl],
  ]
);

const publishItem = async (item: IChannelItem): Promise<void> => {
  const queueUrl = `https://sqs.${process.env.REGION}.amazonaws.com/${process.env.ACCOUNT_ID}/${process.env.SQS_QUEUE}`
  const messageBody = `${item.publishedAt} ${item.name} ${item.url}`
  const message = new SendMessageCommand({ QueueUrl: queueUrl, MessageBody: messageBody });
  await sqsClient.send(message)
}

const pollChannel = async (channel: IChannel): Promise<void> => {
  if (!crawlers.has(channel.crawler)) {
    throw new Error('crawler implementation not found: ' + channel.crawler)
  }
  const crawler = crawlers.get(channel.crawler)!;

  const items = await crawler(channel.updatedAt, channel.crawlerConfig);
  await Promise.all(items.map(publishItem))

  // if (items.length <= 0) {
  //   return;
  // }
  //
  // await db.update({
  //   TableName: process.env.DYNAMODB_TABLE,
  //   Key: { id: channel.id },
  //   UpdateExpression: `SET updatedAt = :u, #items = list_append(:newitems, #items)`,
  //   ExpressionAttributeNames: { '#items': 'items' },
  //   ExpressionAttributeValues: { ':u': items[0].publishedAt, ':newitems': items }
  // });
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
