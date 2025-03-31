import { Project } from "../entities/project";
import { projectRepository } from "../repositories/projectRepository";
import { userRepository } from "../repositories/userRepository";

export class projectService {

    static async addProject(project: Partial<Project>,userId:number): Promise<void> {
        const user = await userRepository.findOne({ where: { userId }, relations: ["projects"] });
        if (!user) {
            throw new Error('Project not found');
        }
        project.user=user;
        const newProject = projectRepository.create(project);
        await projectRepository.save(newProject);
    }

    static async getAllProject(): Promise<Project[]> {
        const projects = await projectRepository.find({relations:['user']});
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

    static async updateProject(projectId: number,userId:number,projectData: Partial<Project>): Promise<void> {
        const project = await projectRepository.findOne({ where: { projectId }, relations: ["tasks"] });
        if (!project) {
            throw new Error('Project not found');
        }
        const user = await userRepository.findOne({ where: { userId }, relations: ["projects"] });
        if (!user) {
            throw new Error('user not found');
        }
        project.user=user;
        projectRepository.merge(project, projectData);
        await projectRepository.save(project);
    }

}