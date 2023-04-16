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

  async findAllWithoutAdmin() {
    const connections = await this.connectionsRepo.find({
      where: { admin_id: null },
      relations: ["user"],
    });
    return connections;
  }
  async findBySocketID(socket_id: string) {
    const connection = await this.connectionsRepo.findOne({
      socket_id,
    });

    return connection;
  }

  async updateAdminID(user_id: string, admin_id: string) {
    await this.connectionsRepo
      .createQueryBuilder()
      .update(Connection)
      .set({ admin_id })
      .where("user_id = :user_id", {
        user_id,
      })
      .execute();
  }

  async deleteBySocketId(socket_id: string) {
    await this.connectionsRepo
      .createQueryBuilder()
      .delete()
      .where("socket_id = :socket_id", {
        socket_id,
      })
      .execute();
  }
}

export { ConnectionsService };
