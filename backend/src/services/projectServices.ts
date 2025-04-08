import { Project } from "../entities/project";
import { projectRepository } from "../repositories/projectRepository";
import { userRepository } from "../repositories/userRepository";
import { taskRepository } from "../repositories/taskRepository";
import { ProjectDTO } from "../dto/project.dto";

export class ProjectService {

    static async addProject(project:ProjectDTO, userId: number): Promise<void> {
        const user = await userRepository.findOne({ where: { userId }, relations: ["projects"] });
        if (!user) {
            throw new Error('Project not found');
        }

        (project as Project).user = user;
        const newProject = projectRepository.create(project);
        await projectRepository.save(newProject);
    }

    static async getAllProject(): Promise<Project[]> {
        const projects = await projectRepository.find({ relations: ['user'] });
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

    static async updateProject(projectId: number, userId: number, projectData:ProjectDTO): Promise<void> {
        const project = await projectRepository.findOne({ where: { projectId }, relations: ["tasks"] });
        if (!project) {
            throw new Error('Project not found');
        }
        const user = await userRepository.findOne({ where: { userId }, relations: ["projects"] });
        if (!user) {
            throw new Error('user not found');
        }
        project.user = user;
        projectRepository.merge(project, projectData);
        await projectRepository.save(project);
    }


    static async getAllProjectsByManager(userId: number): Promise<Project[]> {
        const projects = await projectRepository.find({
            where: { user: { userId: userId } },
            relations: ['user']
        });

        if (projects.length === 0) {
            throw new Error('No projects found for this manager');
        }

        return projects;
    }

    static async getAllProjectsByEmployee(userId: number) {
        const tasks = await taskRepository.find({
            where: { user: { userId: userId } },
            relations: ['project','project.user']
        });

        if (tasks.length === 0) {
            throw new Error('No tasks found for this employee');
        }

        const projects = tasks.map(task => task.project);
        const uniqueProjects = Array.from(new Set(projects.map(p => p.projectId)))
        .map(id => projects.find(p => p.projectId === id));

        return uniqueProjects;
    }
}