import { getCustomRepository } from "typeorm";
import { SettingsRepo } from "../repos/SettingsRepo";

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingService {
  async create({ chat, username }: ISettingsCreate) {
    const settingsRepo = getCustomRepository(SettingsRepo);

    const userAlreadyExists = await settingsRepo.findOne({ username });

    if (userAlreadyExists) {
      throw new Error("User already exists!!!");
    }

    const settings = settingsRepo.create({
      chat,
      username,
    });

    await settingsRepo.save(settings);

    return settings;
  }
}

export { SettingService };
