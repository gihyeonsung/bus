export interface INotificationService {
  Push(message: string): Promise<void>
}

export class DiscordNotificationService implements INotificationService {
  async Push(message: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}