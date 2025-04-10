import { User } from "./user.model";

export interface Project{
    projectId:number;
    projectName: string;
    description: string;
    status: "Not Started" | "Active" | "Completed";
    startDate: Date;
    dueDate: Date;
    userId?:number; //For the form value in the options
    user?:User; //For assigned User
}


