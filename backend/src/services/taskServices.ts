import { TaskDTO } from "../dto/task.dto";
import { Task } from "../entities/task";
import { projectRepository } from "../repositories/projectRepository";
import { taskRepository } from "../repositories/taskRepository";
import { userRepository } from "../repositories/userRepository";

export class TaskServices {
    static async addTask(projectId: number,userId:number, taskDTO: TaskDTO): Promise<void> {
        const project = await projectRepository.findOne({ where: { projectId }, relations: ["tasks"] });
        if (!project) {
            throw new Error('Project not found');
        }
        const user = await userRepository.findOne({ where: { userId }, relations: ["tasks"] });
        if (!user) {
            throw new Error('User not found');
        }
        // project.tasks.push(task);
        // user.tasks.push(task);

        const task=new Task();
        task.title=taskDTO.title;
        task.description=taskDTO.description;
        task.status=taskDTO.status;
        task.priority=taskDTO.priority;
        task.startDate=taskDTO.startDate;
        task.dueDate=taskDTO.dueDate;
        task.user=user;
        task.project=project;

        // const newTask = taskRepository.create({...taskDTO});
        await taskRepository.save(task);
    }

    static async deleteTask(taskId: number): Promise<void> {
        const result = await taskRepository.delete(taskId);
        if (result.affected === 0) {
            throw new Error('Task not found');
        }
    }

    static async updateTask(userId:number,taskId: number, taskDTO: TaskDTO): Promise<void> {
        const task = await taskRepository.findOne({ where: { taskId } });
        if (!task) {
            throw new Error('Task not found');
        }

        const user = await userRepository.findOne({ where: { userId } }); //find new Assigned user
        if (!user) {
            throw new Error('User not found');
        }
        // project.tasks.push(task);
        // user.tasks.push(task);
        task.title=taskDTO.title;
        task.description=taskDTO.description;
        task.status=taskDTO.status;
        task.priority=taskDTO.priority;
        task.startDate=taskDTO.startDate;
        task.dueDate=taskDTO.dueDate;
        task.user=user;
        await taskRepository.save(task);
    }

    static async getTaskByProjectId(projectId: number): Promise<Task[]> {
        return await taskRepository.find({where: { project: {projectId} },relations:['user']});
    }

    static async getTaskByUserId(userId: number): Promise<Task[]> {
        return await taskRepository.find({where: { user: {userId} },relations:['project']});
    }
}