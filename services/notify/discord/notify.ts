import { INotify } from '../interface'
import { Client, GatewayIntentBits } from 'discord.js'

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

export const notify: INotify = async (message: string): Promise<void> => {
  await client.login(process.env.NOTIFY_DISCORD_BOT_TOKEN);

  const channel = client.channels.cache.get(process.env.NOTIFY_DISCORD_CHANNEL_ID!);
  if (!channel) {
    return
  }

  if (!channel.isTextBased()) {
    return
  }

  await channel.send(message)
}
