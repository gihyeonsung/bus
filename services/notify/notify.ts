import { SQSEvent } from "aws-lambda";
import * as discord from './discord-webhook'

export const notify = async (event: SQSEvent): Promise<void> => {
  await Promise.all(event.Records.map((r, i, rs) => discord.notify(r.body)))
};
