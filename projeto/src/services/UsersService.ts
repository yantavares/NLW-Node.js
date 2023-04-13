import { getCustomRepository } from "typeorm";
import { UsersRepo } from "../repos/UsersRepo";

class UserService {
  async create(email: string) {
    const usersRepo = getCustomRepository(UsersRepo);

    const userExists = await usersRepo.findOne({
      email,
    });

    if (userExists) {
      return userExists;
    }

    const user = usersRepo.create({
      email,
    });

    await usersRepo.save(user);

    return user;
  }
}

export { UserService };
