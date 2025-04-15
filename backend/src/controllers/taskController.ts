import { Request, Response, NextFunction } from 'express';
import { TaskServices } from '../services/taskServices';
import AppError from '../middlewares/appError';
import { TaskDTO } from '../dto/task.dto';
import { validate } from 'class-validator';

export class TaskController {
    static async addTask(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = parseInt(req.body.userId);
        const projectId = parseInt(req.params.projectId);
        const taskDTO = new TaskDTO();
        Object.assign(taskDTO, req.body);
        try {
            const errors = await validate(taskDTO);
            if (errors.length > 0) {
                const errorMessages = errors.map(err => Object.values(err.constraints)).join(', ');
                throw new AppError(`Validation failed: ${errorMessages}`, 400);
            }
            const task=await TaskServices.addTask(projectId, userId, taskDTO);
            res.status(201).json({ message: "Task added successfully",task:task});
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }

    static async deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
        const taskId = parseInt(req.params.id);
        try {
            await TaskServices.deleteTask(taskId);
            res.status(201).json({ message: "Task deleted successfully" });
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }

    static async updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
        const taskId = parseInt(req.params.id);
        const userId = parseInt(req.body.userId);
        const taskDTO = new TaskDTO();
        Object.assign(taskDTO, req.body);
        try {
            const errors = await validate(taskDTO);
            if (errors.length > 0) {
                const errorMessages = errors.map(err => Object.values(err.constraints)).join(', ');
                throw new AppError(`Validation failed: ${errorMessages}`, 400);
            }
            const task=await TaskServices.updateTask(userId, taskId, taskDTO);
            res.status(201).json({ message: "Task updated successfully",task:task});
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }

    static async getTaskByProjectId(req: Request, res: Response, next: NextFunction): Promise<void> {
        const projectId = parseInt(req.params.id);
        try {
            const tasks = await TaskServices.getTaskByProjectId(projectId);
            res.status(200).json(tasks);
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }

    static async getTaskByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = parseInt(req.params.id);
        try {
            const tasks = await TaskServices.getTaskByUserId(userId);
            res.status(200).json(tasks);
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }
}
