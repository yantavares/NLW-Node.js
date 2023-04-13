import { getCustomRepository } from "typeorm";
import { MessagesRepo } from "../repos/MessagesRepo";

interface IMessageCreate {
  admin_id?: string;
  text: string;
  user_id: string;
}

class MessageService {
  async create({ admin_id, text, user_id }) {
    const messagesRepo = getCustomRepository(MessagesRepo);

    const message = messagesRepo.create({
      admin_id,
      text,
      user_id,
    });

    await messagesRepo.save(message);

    return message;
  }
}

export { MessageService };
