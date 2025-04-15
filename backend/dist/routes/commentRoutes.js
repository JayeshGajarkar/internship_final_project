"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commetController_1 = require("../controllers/commetController");
const commentRouter = (0, express_1.Router)();
commentRouter.post('/add/:taskId/:userId', commetController_1.CommentController.addComment);
commentRouter.delete('/delete/:id', commetController_1.CommentController.deleteComment);
commentRouter.get('/get/:taskId', commetController_1.CommentController.getCommentsByTaskId);
exports.default = commentRouter;
