import { projectService } from "../services/projectServices";
import { Request, Response } from "express";

export class projectController {
    static async addProject(req: Request, res: Response) {
        try {
            const userId=parseInt(req.body.userId)
            const project = req.body;
            await projectService.addProject(project,userId);
            res.status(201).json({message:"Project added sucessfully"});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message });
        }
    }

    static async getProject(req: Request, res: Response) {
        try {
            const projectId = parseInt(req.params.id);
            const project = await projectService.getProject(projectId);
            res.status(200).json(project);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message });
        }
    }

    static async getAllProjects(req: Request, res: Response) {
        try {
            const projects = await projectService.getAllProject();
            res.status(200).json(projects);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteProject(req: Request, res: Response) {
        try {
            const projectId = parseInt(req.params.id, 10);
            await projectService.deleteProject(projectId);
            res.status(201).json("Project deleted sucessfully");
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message });
        }
    }

    static async updateProject(req: Request, res: Response) {
        try {
            const userId=parseInt(req.body.userId)
            const projectId = parseInt(req.params.id, 10);
            const projectData = req.body;
            await projectService.updateProject(projectId,userId,projectData);
            res.status(200).json("Project updated sucessfully !");
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
}