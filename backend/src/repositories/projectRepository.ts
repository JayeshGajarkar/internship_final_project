import { AppDataSource} from "../config/db";
import { Project } from "../entities/project";


export const projectRepository = AppDataSource.getRepository(Project)