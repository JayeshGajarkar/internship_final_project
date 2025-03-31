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
exports.taskController = void 0;
const taskServices_1 = require("../services/taskServices");
class taskController {
    static addTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectId = parseInt(req.params.userId);
            const userId = parseInt(req.params.projectId);
            const task = req.body;
            try {
                yield taskServices_1.taskServices.addTask(projectId, userId, task);
                res.status(201).json({ message: "Task added sucessfully" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    static deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskId = parseInt(req.params.id);
            try {
                yield taskServices_1.taskServices.deleteTask(taskId);
                res.status(201).json({ message: "Task deleted successfully" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    static updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskId = parseInt(req.params.id);
            const newTask = req.body;
            try {
                yield taskServices_1.taskServices.updateTask(taskId, newTask);
                res.status(201).json({ message: "Task updated successfully" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    static getTaskByProjectId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectId = parseInt(req.params.id);
            try {
                const tasks = yield taskServices_1.taskServices.getTaskByProjectId(projectId);
                res.status(200).json(tasks);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.taskController = taskController;
