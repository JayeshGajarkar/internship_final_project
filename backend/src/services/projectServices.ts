import { Project } from "../entities/project";
import { projectRepository } from "../repositories/projectRepository";
import { userRepository } from "../repositories/userRepository";
import { taskRepository } from "../repositories/taskRepository";
import { ProjectDTO } from "../dto/project.dto";

export class ProjectService {

    static async addProject(projectDTO: ProjectDTO, userId: number): Promise<Project> {
        const user = await userRepository.findOne({ where: { userId }, relations: ["projects"] });
        if (!user) {
            throw new Error('Project not found');
        }


        // create new Object Project to save in the database
        const project = new Project();
        project.projectName = projectDTO.projectName;
        project.description = projectDTO.description;
        project.startDate = projectDTO.startDate;
        project.dueDate = projectDTO.dueDate;
        project.user = user;

        const newProject = projectRepository.create(project);
        await projectRepository.save(newProject);
        return newProject;
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

    static async updateProject(projectId: number, userId: number, projectDTO: ProjectDTO): Promise<Project> {
        const project = await projectRepository.findOne({ where: { projectId }});
        if (!project) {
            throw new Error('Project not found');
        }
        const user = await userRepository.findOne({ where: { userId }});
        if (!user) {
            throw new Error('user not found');
        }

        project.projectName = projectDTO.projectName;
        project.description = projectDTO.description;
        project.startDate = projectDTO.startDate;
        project.dueDate = projectDTO.dueDate;
        project.user = user;

        await projectRepository.save(project);
        return project
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
            relations: ['project', 'project.user']
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