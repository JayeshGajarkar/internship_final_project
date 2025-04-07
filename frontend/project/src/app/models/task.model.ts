import { Project } from "./project.model";
import { User } from "./user.model";

export interface Task {
    taskId:number;
    title: string;
    description: string;
    priority:"High"|"Medium"|"Low"
    status: "To do" | "In progress" | "Done";
    startDate: Date;
    dueDate: Date;
    userId:number;
    user?:User;
    project?:Project;
    isEditable?: boolean;
}