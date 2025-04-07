import { User } from "./user.model";
import { Time } from "@angular/common";

export interface Comment{
    commentId:number;
    commentText:string;
    commentTime:string;
    userId?:number;
    user:User
}