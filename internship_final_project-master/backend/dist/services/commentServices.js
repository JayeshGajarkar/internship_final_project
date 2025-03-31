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
exports.commentService = void 0;
const taskRepository_1 = require("../repositories/taskRepository");
const userRepository_1 = require("../repositories/userRepository");
const commentRepository_1 = require("../repositories/commentRepository");
class commentService {
    static addComment(taskId, userId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield taskRepository_1.taskRepository.findOne({ where: { taskId }, relations: ['comments'] });
            if (!task) {
                throw new Error('Task not found');
            }
            const user = yield userRepository_1.userRepository.findOne({ where: { userId }, relations: ['comments'] });
            if (!user) {
                throw new Error('User not found');
            }
            comment.task = task;
            comment.user = user;
            yield commentRepository_1.commentRepository.save(comment);
        });
    }
    static getCommentsByTaskId(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield commentRepository_1.commentRepository.findOne({ where: { task: { taskId } }, relations: ['tasks'] });
        });
    }
    static deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield commentRepository_1.commentRepository.delete(commentId);
            if (result.affected === 0) {
                throw new Error('Comment not found');
            }
        });
    }
}
exports.commentService = commentService;
