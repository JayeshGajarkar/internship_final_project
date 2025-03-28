import { User } from "../entities/user";
import { AppDataSource} from "../config/db";


export const userRepository = AppDataSource.getRepository(User)





