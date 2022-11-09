import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient({ region: process.env.REGION });
const db = DynamoDBDocument.from(dbClient);

export const list = async (event) => {
  const data = await db.scan({ TableName: process.env.DYNAMODB_TABLE });

  return {
    statusCode: 200,
    body: JSON.stringify(data.Items),
  };
};
