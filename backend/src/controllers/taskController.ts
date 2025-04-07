import { Request, Response } from 'express';
import { taskServices } from '../services/taskServices';
import { Task } from '../entities/task';

export class taskController {
    static async addTask(req: Request, res: Response): Promise<void> {
        const userId  = parseInt(req.body.userId);
        const projectId  = parseInt(req.params.projectId);
        const task: Task = req.body;
        try {
            await taskServices.addTask(projectId, userId, task);
            res.status(201).json({message:"Task added sucessfully"});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteTask(req: Request, res: Response): Promise<void> {
        const taskId =parseInt(req.params.id);
        try {
            await taskServices.deleteTask(taskId);
            res.status(201).json({message:"Task deleted successfully"});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async updateTask(req: Request, res: Response): Promise<void> {
        const taskId = parseInt(req.params.id);
        const newTask: Task = req.body;
        const userId=parseInt(req.body.userId);
        try {
            await taskServices.updateTask(userId,taskId, newTask);
            res.status(201).json({message:"Task updated successfully"});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async getTaskByProjectId(req: Request, res: Response): Promise<void> {
        const projectId = parseInt(req.params.id);
        try {
            const tasks = await taskServices.getTaskByProjectId(projectId);
            res.status(200).json(tasks);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async getTaskByUserId(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.id);
        try {
            const tasks = await taskServices.getTaskByUserId(userId);
            res.status(200).json(tasks);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
}