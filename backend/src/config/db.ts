import { DataSource } from "typeorm";
import "reflect-metadata";
import { User} from "../entities/user";
import { Project } from "../entities/project";
import { Task } from "../entities/task";
import { Comment } from "../entities/comment";

export const AppDataSource = new DataSource({
    type:'mssql',
    host:'dev.c5owyuw64shd.ap-south-1.rds.amazonaws.com',
    port:1982,
    username:'j2',
    password:'123456',
    database:'JIBE_Main_Training',
    synchronize:true,
    entities: [User,Project,Task,Comment],
    options:{
        encrypt:true,
        trustServerCertificate:true
    }
})
 
 
export const dbconnect = async()=>{
    await AppDataSource.initialize()
    console.log("Database connected");
}