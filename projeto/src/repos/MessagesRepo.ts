import { EntityRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";

@EntityRepository(Message)
class MessagesRepo extends Repository<Message> {}

export { MessagesRepo };
