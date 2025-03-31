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
exports.taskServices = void 0;
const projectRepository_1 = require("../repositories/projectRepository");
const taskRepository_1 = require("../repositories/taskRepository");
const userRepository_1 = require("../repositories/userRepository");
class taskServices {
    static addTask(projectId, userId, task) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield projectRepository_1.projectRepository.findOne({ where: { projectId }, relations: ["tasks"] });
            if (!project) {
                throw new Error('Project not found');
            }
            const user = yield userRepository_1.userRepository.findOne({ where: { userId }, relations: ["tasks"] });
            if (!user) {
                throw new Error('Project not found');
            }
            // project.tasks.push(task);
            // user.tasks.push(task);
            task.user = user;
            task.project = project;
            const newTask = taskRepository_1.taskRepository.create(task);
            yield taskRepository_1.taskRepository.save(newTask);
        });
    }
    static deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield taskRepository_1.taskRepository.delete(taskId);
            if (result.affected === 0) {
                throw new Error('Task not found');
            }
        });
    }
    static updateTask(taskId, newTask) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield taskRepository_1.taskRepository.findOne({ where: { taskId } });
            if (!task) {
                throw new Error('Task not found');
            }
            taskRepository_1.taskRepository.merge(task, newTask);
            yield taskRepository_1.taskRepository.save(task);
        });
    }
    static getTaskByProjectId(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield taskRepository_1.taskRepository.find({ where: { project: { projectId } } });
        });
    }
}
exports.taskServices = taskServices;
