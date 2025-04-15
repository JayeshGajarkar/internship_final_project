import { AppDataSource} from "../config/db";
import { Task } from "../entities/task";


export const taskRepository = AppDataSource.getRepository(Task)