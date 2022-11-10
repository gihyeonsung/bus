import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient({ region: process.env.REGION });
const db = DynamoDBDocument.from(dbClient);

export const poll = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const data = await db.scan({ TableName: process.env.DYNAMODB_TABLE });

  if (data.Items === undefined) {
    return { statusCode: 500, body: "" };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data.Items),
  };
};
