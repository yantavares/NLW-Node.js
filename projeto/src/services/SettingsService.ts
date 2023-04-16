import { Repository, getCustomRepository } from "typeorm";
import { SettingsRepo } from "../repos/SettingsRepo";
import { Setting } from "../entities/Settings";

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingService {
  private settingsRepo: Repository<Setting>;

  constructor() {
    this.settingsRepo = getCustomRepository(SettingsRepo);
  }

  async create({ chat, username }: ISettingsCreate) {
    const userAlreadyExists = await this.settingsRepo.findOne({ username });

    if (userAlreadyExists) {
      throw new Error("User already exists!!!");
    }

    const settings = this.settingsRepo.create({
      chat,
      username,
    });

    await this.settingsRepo.save(settings);

    return settings;
  }

  async findByUsername(username: string) {
    const settings = await this.settingsRepo.findOne({
      username,
    });
    return settings;
  }

  async update(username: string, chat: boolean) {
    const settings = await this.settingsRepo
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where("username = :usernname", {
        username,
      })
      .execute();
  }
}

export { SettingService };
