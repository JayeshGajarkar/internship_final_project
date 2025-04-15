import { User } from "./user.model";

export interface Comment{
    commentId:number;
    commentText:string;
    commentTime:string;
    userId:number;
    user:User
}