"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const commentServices_1 = require("../services/commentServices");
class CommentController {
    static addComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskId = parseInt(req.params.taskId);
            const userId = parseInt(req.params.userId);
            try {
                const comment = req.body;
                yield commentServices_1.commentService.addComment(taskId, userId, comment);
                res.status(201).json({ message: "Comment added successfully" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    static getCommentsByTaskId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskId = parseInt(req.params.taskId);
                const comments = yield commentServices_1.commentService.getCommentsByTaskId(taskId);
                res.status(200).json(comments);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    static deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentId = parseInt(req.params.id);
                yield commentServices_1.commentService.deleteComment(commentId);
                res.status(201).send("Comment deleted successfully");
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.CommentController = CommentController;
