import { Router } from "express";
import { CommentController } from "../controllers/commetController";

const commentRouter=Router()

commentRouter.post('/add/:taskId/:userId',CommentController.addComment);
commentRouter.delete('/delete/:id',CommentController.deleteComment)
commentRouter.get('/get/:taskId',CommentController.getCommentsByTaskId)

export default commentRouter;

