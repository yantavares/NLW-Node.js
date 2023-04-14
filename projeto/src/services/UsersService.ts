import { Repository, getCustomRepository } from "typeorm";
import { UsersRepo } from "../repos/UsersRepo";
import { User } from "../entities/User";

class UserService {
  private usersRepo: Repository<User>;
  constructor() {
    this.usersRepo = getCustomRepository(UsersRepo);
  }

  async create(email: string) {
    const userExists = await this.usersRepo.findOne({
      email,
    });

    if (userExists) {
      return userExists;
    }

    const user = this.usersRepo.create({
      email,
    });

    await this.usersRepo.save(user);

    return user;
  }
}

export { UserService };
