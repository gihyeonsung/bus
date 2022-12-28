import { INotify } from '../interface'
import { WebhookClient } from 'discord.js'

export const notify: INotify = async (message: string): Promise<void> => {
  const client = new WebhookClient({ url: process.env.NOTIFY_DISCORD_WEBHOOK_URL! })

  await client.send(message)
}
