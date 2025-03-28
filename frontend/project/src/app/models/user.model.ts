import { Task } from "./task.model";

export interface User{
    name:string;
    email:string;
    password:string;
    role?:string;
    tasks?:Task[]
}