import { INotify } from '../interface'
import { Client, GatewayIntentBits } from 'discord.js'

const BOT_TOKEN = '';
const CHANNEL_ID = ''

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

export const notify: INotify = async (message: string): Promise<void> => {
  await client.login(BOT_TOKEN);

  const channel = client.channels.cache.get(CHANNEL_ID);
  if (!channel) {
    return
  }

  if (!channel.isTextBased()) {
    return
  }

  await channel.send(message)
}
