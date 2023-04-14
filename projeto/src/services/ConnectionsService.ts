import { getCustomRepository, Repository } from "typeorm";
import { ConnectionRepo } from "../repos/ConncetionsRepo";
import { Connection } from "../entities/Connection";

interface IConnectionCreate {
  admin_id?: string;
  id?: string;
  socket_id: string;
  user_id: string;
}

class ConnectionsService {
  private connectionsRepo: Repository<Connection>;
  constructor() {
    this.connectionsRepo = getCustomRepository(ConnectionRepo);
  }
  async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
    const connection = this.connectionsRepo.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.connectionsRepo.save(connection);

    return connection;
  }

  async findByUserId(user_id: string) {
    const connection = await this.connectionsRepo.findOne({
      user_id,
    });
    return connection;
  }
}

export { ConnectionsService };
