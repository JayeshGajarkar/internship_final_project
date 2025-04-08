import { ProjectService } from "../services/projectServices";
import { Request, Response, NextFunction } from "express";
import AppError from "../middlewares/appError";
import { validate } from "class-validator";
import { ProjectDTO } from "../dto/project.dto";

export class ProjectController {
    static async addProject(req: Request, res: Response, next: NextFunction) {

        const projectDTO = new ProjectDTO();
        Object.assign(projectDTO, req.body);

        try {
            const errors = await validate(projectDTO);
            console.log(errors);
            if (errors.length > 0) {
                const errorMessages = errors.map(err => Object.values(err.constraints)).join(', ');
                throw new AppError(`Validation failed: ${errorMessages}`, 400);
            }
            const userId = parseInt(req.body.userId);
            await ProjectService.addProject(projectDTO, userId);
            res.status(201).json({ message: "Project added successfully" });
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }

    static async getProject(req: Request, res: Response, next: NextFunction) {
        try {
            const projectId = parseInt(req.params.id);
            const project = await ProjectService.getProject(projectId);
            res.status(200).json(project);
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }

    static async getAllProjects(req: Request, res: Response, next: NextFunction) {
        try {
            const projects = await ProjectService.getAllProject();
            res.status(200).json(projects);
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }

    static async getAllProjectsByManager(req: Request, res: Response, next: NextFunction) {
        const userId = parseInt(req.params.id);
        try {
            const projects = await ProjectService.getAllProjectsByManager(userId);
            res.status(200).json(projects);
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }

    static async getAllProjectsByEmployee(req: Request, res: Response, next: NextFunction) {
        const userId = parseInt(req.params.id);
        try {
            const projects = await ProjectService.getAllProjectsByEmployee(userId);
            res.status(200).json(projects);
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }

    static async deleteProject(req: Request, res: Response, next: NextFunction) {
        try {
            const projectId = parseInt(req.params.id, 10);
            await ProjectService.deleteProject(projectId);
            res.status(200).json({ message: "Project deleted successfully" });
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }

    static async updateProject(req: Request, res: Response, next: NextFunction) {
        const projectDTO = new ProjectDTO();
        Object.assign(projectDTO, req.body);
        try {
            const errors = await validate(projectDTO);
            console.log(errors);
            if (errors.length > 0) {
                const errorMessages = errors.map(err => Object.values(err.constraints)).join(', ');
                throw new AppError(`Validation failed: ${errorMessages}`, 400);
            }
            const userId = parseInt(req.body.userId);
            const projectId = parseInt(req.params.id);
            await ProjectService.updateProject(projectId, userId, projectDTO);
            res.status(200).json({ message: "Project updated successfully" });
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }
}
