import { taskRepository } from "../repositories/taskRepository";
import { userRepository } from "../repositories/userRepository";
import { Comment } from "../entities/comment";
import { commentRepository } from "../repositories/commentRepository";
import { CommentDTO } from "../dto/comment.dto";

export class commentService {
    static async addComment(taskId: number, userId: number, commentDTO: CommentDTO): Promise<Comment> {
        const task = await taskRepository.findOne({ where: { taskId }, relations: ['comments'] });
        if (!task) {
            throw new Error('Task not found');
        }
        const user = await userRepository.findOne({ where: { userId }, relations: ['comments'] });
        if (!user) {
            throw new Error('User not found');
        }

        const comment = new Comment();
        comment.commentText = commentDTO.commentText;
        comment.commentTime = new Date().toTimeString().split(' ')[0];
        comment.task = task;
        comment.user = user;

        await commentRepository.save(comment);
        return comment;

    }

    static async getCommentsByTaskId(taskId: number): Promise<Comment[]> {
        return await commentRepository.find({ where: { task: { taskId } }, relations: ['user'] });
    }

    static async deleteComment(commentId: number): Promise<void> {
        const result = await commentRepository.delete(commentId);
        if (result.affected === 0) {
            throw new Error('Comment not found');
        }

    }

    static async addFile(taskId: number, userId: number, file: Express.Multer.File): Promise<Comment> {
        const task = await taskRepository.findOne({ where: { taskId }, relations: ['comments'] });
        if (!task) {
            throw new Error('Task not found');
        }
        const user = await userRepository.findOne({ where: { userId }, relations: ['comments'] });
        if (!user) {
            throw new Error('User not found');
        }

        const comment = { commentText: file.filename, task, user } as Comment;
        comment.commentTime = new Date().toTimeString().split(' ')[0];
        comment.task = task;
        comment.user = user;
        await commentRepository.save(comment);
        return comment;
    }

    
}


