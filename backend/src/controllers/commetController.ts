import path from "path";
import { commentService } from "../services/commentServices";
import { Request, Response, NextFunction } from "express";
import AppError from "../middlewares/appError";
import { validate } from "class-validator";
import { CommentDTO } from "../dto/comment.dto";

export class CommentController {
  static async addComment(req: Request, res: Response, next: NextFunction) {
    const taskId = parseInt(req.params.taskId);
    const userId = parseInt(req.params.userId);
    
    const commentDTO = new CommentDTO();
    Object.assign(commentDTO, req.body);

    try {
      const errors = await validate(commentDTO);
      if (errors.length > 0) {
        const errorMessages = errors.map(err => Object.values(err.constraints)).join(', ');
        throw new AppError(`Validation failed: ${errorMessages}`, 400);
      }
      await commentService.addComment(taskId, userId, commentDTO);
      res.status(201).json({ message: "Comment added successfully" });
    } catch (error) {
      next(new AppError(error.message, 500));
    }
  }

  static async getCommentsByTaskId(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = parseInt(req.params.taskId);
      const comments = await commentService.getCommentsByTaskId(taskId);
      res.status(200).json(comments);
    } catch (error) {
      console.log(error);
      next(new AppError(error.message, 500));
    }
  }

  static async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const commentId = parseInt(req.params.id);
      await commentService.deleteComment(commentId);
      res.status(201).json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.log(error);
      next(new AppError(error.message, 500));
    }
  }

  static async addFile(req: Request, res: Response, next: NextFunction) {
    const taskId = parseInt(req.params.taskid);
    const userId = parseInt(req.params.userId);
    try {
      const file = req.file;
      if (!file) {
        return next(new AppError("No file uploaded", 400));
      }
      await commentService.addFile(taskId, userId, file);
      res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
      console.log(error);
      next(new AppError(error.message, 500));
    }
  }

  static async downloadFile(req: Request, res: Response, next: NextFunction) {
    const filename = req.params.filename;
    const filePath = path.join('C:/Project/backend', 'uploads', filename);
    try {
      res.status(200).download(filePath);
    } catch (error) {
      console.log(error);
      next(new AppError('File not found', 500));
    }
  }
}
