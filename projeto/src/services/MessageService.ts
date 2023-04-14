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

  async listByUSer(user_id: string) {
    const messagesRepo = getCustomRepository(MessagesRepo);

    const list = await messagesRepo.find({
      where: { user_id },
      relations: ["user"],
    });

    return list;
  }
}

export { MessageService };
