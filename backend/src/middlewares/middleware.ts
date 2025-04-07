import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userService } from "../services/userServices";

const secretKey = "jayesh";

export class AuthService {

  static async authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if (token) {
      jwt.verify(token, secretKey, (err) => {
        if (err) {
          return res.status(401).json({message:"Unautorized acess !"});
        }
        next();
      });
    } else {
      res.status(401).json({message:"Unautorized acess !"});
    }
  }

  static async LogIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userService.getUser(email);

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
}