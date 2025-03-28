import { Task } from "./task.model";

export interface Project{
    projectId:number;
    projectName: string;
    description: string;
    status: "Not Started" | "Active" | "Completed";
    startDate?: Date;
    dueDate?: Date;
    tasks?:Task[];  
}


