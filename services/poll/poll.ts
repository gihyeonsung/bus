import * as uuid from "uuid";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient({ region: process.env.REGION });
const db = DynamoDBDocument.from(dbClient);

export const poll = async (event) => {
  const item = {
    id: uuid.v1(),
    createdAt: new Date().getTime() / 1000,
  };

  await db.put({ TableName: process.env.DYNAMODB_TABLE, Item: item });

  return {
    statusCode: 201,
    body: JSON.stringify(item),
  };
};
