import { EntityRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";

@EntityRepository(Connection)
class ConnectionRepo extends Repository<Connection> {}

export { ConnectionRepo };
