import { AppDataSource} from "../config/db";
import { Comment } from "../entities/comment";


export const commentRepository = AppDataSource.getRepository(Comment)