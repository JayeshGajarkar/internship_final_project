import { userService } from "../services/userServices";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';

export class userController {

    static async getUser(req: Request, res: Response) {
        try {
            const {name,email} = req.body;
            const user = await userService.getUser(name,email);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    static async getAllUsers(req: Request, res: Response) {
        try {
            const user = await userService.getAllUsers();
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }


    static async addUser(req:Request,res:Response){
        try{
            const{name,email,role,password}=req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            await userService.addUser(name,email,role,hashedPassword);
            res.status(200).json({message:"User added sucessfully"});
        }catch(error:any){
            console.log(error);
            res.json({message:error});
        }
    }
}