import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserService } from "../services/userServices";
import { User } from "../entities/user";


const secretKey = "jayesh";

export class Authentication {


  static async LogIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserService.getUser(email);

    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }
    const token = jwt.sign({ userId: user.userId, role: user.role }, secretKey, { expiresIn: '1h' });
    res.status(201).json({ token: token, user:user}); 
  }



  static async authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (token) {
      jwt.verify(token, secretKey, (err) => {
        if (err) {
          res.status(401).json({message:"Unautorized acess !"});
        }
        next();
      });

    } else {
      res.status(401).json({message:"Unautorized acess !"});
    }
  }

  static async authenticateAdmin(req:Request,res:Response,next:NextFunction){
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (token) {
      try{
        const user = jwt.verify(token, secretKey) as User;
        if(user.role!=="Admin"){
          throw new Error("Forbidden:You are not a admin")
        }
        next()
      }catch(error){
        console.log(error);
        res.status(401).json({message:error.message});
      }
    } else {
      res.status(401).json({message:"Unautorized acess !"});
    }
  }

  static async authenticateManager(req:Request,res:Response,next:NextFunction){
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (token) {
      try{
        const user = jwt.verify(token, secretKey) as User;
        if(!(user.role==="Manager"||"Admin")){
          throw new Error("Forbidden:You are not a Manager")
        }
        next()
      }catch(error){
        console.log(error);
        res.status(401).json({message:error.message});
      }
    } else {
      res.status(401).json({message:"Unautorized acess !"});
    }
  }
}