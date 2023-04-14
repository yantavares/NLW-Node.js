import { Repository, getCustomRepository } from "typeorm";
import { MessagesRepo } from "../repos/MessagesRepo";
import { Message } from "../entities/Message";

interface IMessageCreate {
  admin_id?: string;
  text: string;
  user_id: string;
}

class MessageService {
  private messagesRepo: Repository<Message>;
  constructor() {
    this.messagesRepo = getCustomRepository(MessagesRepo);
  }
  async create({ admin_id, text, user_id }) {
    const message = this.messagesRepo.create({
      admin_id,
      text,
      user_id,
    });

    await this.messagesRepo.save(message);

    return message;
  }

  async listByUSer(user_id: string) {
    const list = await this.messagesRepo.find({
      where: { user_id },
      relations: ["user"],
    });

    return list;
  }
}

export { MessageService };
