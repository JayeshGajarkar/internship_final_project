import { Task } from "./task.model";

export interface User{
    userId:number;
    name:string;
    email:string;
    password:string;
    role:"Admin"|"Manager"|"Employee";
    tasks?:Task[]
}