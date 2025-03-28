import { Request, Response } from 'express';
import { taskServices } from '../services/taskServices';
import { Task } from '../entities/task';

export class taskController {
    static async addTask(req: Request, res: Response): Promise<void> {
        const projectId  = parseInt(req.params.userId);
        const userId  = parseInt(req.params.projectId);
        const task: Task = req.body;
        try {
            await taskServices.addTask(projectId, userId, task);
            res.status(201).send('Task added successfully');
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    static async deleteTask(req: Request, res: Response): Promise<void> {
        const taskId =parseInt(req.params.id);
        try {
            await taskServices.deleteTask(taskId);
            res.status(200).send('Task deleted successfully');
        } catch (error) {
            res.status(404).send(error.message);
        }
    }

    static async updateTask(req: Request, res: Response): Promise<void> {
        const taskId = parseInt(req.params.id);
        const newTask: Task = req.body;
        try {
            await taskServices.updateTask(taskId, newTask);
            res.status(200).send('Task updated successfully');
        } catch (error) {
            res.status(404).send(error.message);
        }
    }

    static async getTaskByProjectId(req: Request, res: Response): Promise<void> {
        const projectId = req.params.id;
        try {
            const tasks = await taskServices.getTaskByProjectId(Number(projectId));
            res.status(200).json(tasks);
        } catch (error) {
            res.status(404).send(error.message);
        }
    }
}