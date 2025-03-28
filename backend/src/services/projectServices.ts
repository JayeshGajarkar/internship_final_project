import { Project } from "../entities/project";
import { projectRepository } from "../repositories/projectRepository";

export class projectService {

    static async addProject(projectData: Project): Promise<void> {
        const newProject = projectRepository.create(projectData);
        await projectRepository.save(newProject);
    }

    static async getAllProject(): Promise<Project[]> {
        const projects = await projectRepository.find({ relations: ["tasks"] });
        if (projects.length === 0) {
            throw new Error('Project not found');
        }
        return projects;
    }

    static async getProject(projectId: number): Promise<Project> {
        const project = await projectRepository.findOne({ where: { projectId }, relations: ["tasks"] });
        if (!project) {
            throw new Error('Project not found');
        }
        return project;
    }

    static async deleteProject(projectId: number): Promise<void> {
        const result = await projectRepository.delete(projectId);
        if (result.affected === 0) {
            throw new Error('Project not found');
        }
    }

    static async updateProject(projectId: number, projectData: Partial<Project>): Promise<void> {
        let project = await projectRepository.findOne({ where: { projectId }, relations: ["tasks"] });
        if (!project) {
            throw new Error('Project not found');
        }
        projectRepository.merge(project, projectData);
        await projectRepository.save(project);
    }

}