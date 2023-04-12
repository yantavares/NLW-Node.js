import { Repository, EntityRepository } from "typeorm";
import { Setting } from "../entities/Settings";

@EntityRepository(Setting)
class SettingsRepo extends Repository<Setting> {}

export { SettingsRepo };
