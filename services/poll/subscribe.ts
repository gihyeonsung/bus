import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import * as uuid from "uuid";
import { IChannel } from "./interface";

const dbClient = new DynamoDBClient({ region: process.env.REGION });
const db = DynamoDBDocument.from(dbClient);

export const subscribe = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return { statusCode: 400, body: JSON.stringify(event) };
  }

  const req = JSON.parse(event.body);
  const channel: IChannel = {
    id: uuid.v1(),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    name: req.name,
    indexLast: 0,
    crawler: req.crawler,
    crawlerParam: req.crawlerParam,
    items: [],
  };

  try {
    await db.put({ TableName: process.env.DYNAMODB_TABLE, Item: channel });
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }

  return { statusCode: 201, body: JSON.stringify(channel) };
};
