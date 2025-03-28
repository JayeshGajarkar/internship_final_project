import { AppDataSource} from "../config/db";
import { Comment } from "../entities/comments";


export const commentRepository = AppDataSource.getRepository(Comment)