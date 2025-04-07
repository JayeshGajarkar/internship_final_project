import { Task } from "../entities/task";
import { projectRepository } from "../repositories/projectRepository";
import { taskRepository } from "../repositories/taskRepository";
import { userRepository } from "../repositories/userRepository";

export class taskServices {
    static async addTask(projectId: number,userId:number, task: Task): Promise<void> {
        const project = await projectRepository.findOne({ where: { projectId }, relations: ["tasks"] });
        if (!project) {
            throw new Error('Project not found');
        }
        const user = await userRepository.findOne({ where: { userId }, relations: ["tasks"] });
        if (!user) {
            throw new Error('Project not found');
        }
        // project.tasks.push(task);
        // user.tasks.push(task);
        task.user=user;
        task.project=project;
        const newTask = taskRepository.create(task);
        await taskRepository.save(newTask);
    }

    static async deleteTask(taskId: number): Promise<void> {
        const result = await taskRepository.delete(taskId);
        if (result.affected === 0) {
            throw new Error('Task not found');
        }
    }

    static async updateTask(userId:number,taskId: number, newTask: Task): Promise<void> {
        const task = await taskRepository.findOne({ where: { taskId } });
        if (!task) {
            throw new Error('Task not found');
        }

        const user = await userRepository.findOne({ where: { userId }, relations: ["tasks"] });
        if (!user) {
            throw new Error('User not found');
        }
        // project.tasks.push(task);
        // user.tasks.push(task);
        task.user=user;
        taskRepository.merge(task, newTask);
        await taskRepository.save(task);
    }

    static async getTaskByProjectId(projectId: number): Promise<Task[]> {
        return await taskRepository.find({where: { project: {projectId} },relations:['user']});
    }

    static async getTaskByUserId(userId: number): Promise<Task[]> {
        return await taskRepository.find({where: { user: {userId} },relations:['project']});
    }
}