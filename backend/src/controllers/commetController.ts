import path from "path";
import { commentService } from "../services/commentServices";
import { Request, Response } from "express";

export class CommentController {
  static async addComment(req: Request, res: Response) {
    const taskId = parseInt(req.params.taskId);
    const userId = parseInt(req.params.userId);
    try {
      const comment = req.body;
      await commentService.addComment(taskId, userId, comment);
      res.status(201).json({ message: "Comment added successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getCommentsByTaskId(req: Request, res: Response) {
    try {
      const taskId = parseInt(req.params.taskId);
      const comments = await commentService.getCommentsByTaskId(taskId);
      res.status(200).json(comments);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteComment(req: Request, res: Response) {
    try {
      const commentId = parseInt(req.params.id);
      await commentService.deleteComment(commentId);
      res.status(201).json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async addFile(req: Request, res: Response) {
    const taskId = parseInt(req.params.taskid);
    const userId = parseInt(req.params.userId);
    try {
      const file = req.file;
      if (!file) {
        res.status(400).send({ message: "No file uploaded" });
      }
      await commentService.addFile(taskId, userId, file);
      res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async downloadFile(req: Request, res: Response) {
    const filename = req.params.filename;
    const filePath = path.join('C:/Project/backend', 'uploads', filename);
    try{
      res.status(200).download(filePath);
    }catch(error){
      console.log(error);
      res.status(500).json({message:'File not found'})
    }

  }

}