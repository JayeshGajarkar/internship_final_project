import { userService } from "../services/userServices";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';

export class userController {

    static async getUsersByRole(req: Request, res: Response) {
        const role=req.params.role;
        try {
            const user = await userService.getUsersByRole(role);
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async sendOtpForSignUp(req: Request, res: Response) {
        const { email } = req.body;
        try {
           await userService.sendOtpForSignUp(email);
           res.status(200).json({message:"Otp sent successfully"}); 
        }catch(error){
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async changePassword(req:Request,res:Response){
        const{email,password}=req.body;
        try{
            const hashedPassword = await bcrypt.hash(password, 10);
            await userService.changePassword(email,hashedPassword)
            res.status(200).json({message:"password updated successfully"});
        }catch(error){
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }   

    static async sendOtpForPassword(req: Request, res: Response) {
        const { email } = req.body;
        try {
           await userService.sendOtpForPassword(email);
           res.status(200).json({message:"Otp sent successfully"}); 
        }catch(error){
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }



    static async verifyOtp(req: Request, res: Response) {
        const { email, otp } = req.body;
        try {
            await userService.verifyOtp(email, otp);
            res.status(200).json({ message: "Otp verified successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async updateUser(req: Request, res: Response) {
        const userId=parseInt(req.params.id);
        const user=req.body;
        try {
            const newUser = await userService.updateUser(userId,user);
            res.status(200).json(newUser);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async getAllUsers(req: Request, res: Response) {
        try {
            const users= await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }


    static async addUser(req:Request,res:Response){
        try{
            const{name,email,otp,role,password}=req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user=await userService.addUser(name,email,otp,role,hashedPassword);
            res.status(200).json({message:"Sign Up sucessful",user:user});
        }catch(error){
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
}