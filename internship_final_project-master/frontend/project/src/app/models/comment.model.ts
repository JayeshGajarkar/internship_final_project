import { User } from "./user.model";

export interface Comment{
    commentText:string;
    userId?:number;
    user:User
}