import { UserService } from "../services/userServices";
import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import AppError from "../middlewares/appError";
import { UserDTO } from "../dto/user.dto";
import { validate } from "class-validator";

export class UserController {

    static async getUsersByRole(req: Request, res: Response, next: NextFunction) {
        const role = req.params.role;
        try {
            const user = await UserService.getUsersByRole(role);
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
            // res.status(500).json({ message: error.message });
        }
    }

    static async sendOtpForSignUp(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body;
        try {
            await UserService.sendOtpForSignUp(email);
            res.status(200).json({ message: "Otp sent successfully" });
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }

    static async changePassword(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await UserService.changePassword(email, hashedPassword);
            res.status(200).json({ message: "Password updated successfully" });
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }

    static async sendOtpForPassword(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body;
        try {
            await UserService.sendOtpForPassword(email);
            res.status(200).json({ message: "Otp sent successfully" });
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }

    static async verifyOtp(req: Request, res: Response, next: NextFunction) {
        const { email, otp } = req.body;
        try {
            await UserService.verifyOtp(email, otp);
            res.status(200).json({ message: "Otp verified successfully" });
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }

    static async updateUser(req: Request, res: Response, next: NextFunction) {
        const userId = parseInt(req.params.id);
        const userDTO = new UserDTO();
        Object.assign(userDTO, req.body);
        try {
            const errors = await validate(userDTO);
            if (errors.length > 0) {
                const errorMessages = errors.map(err => Object.values(err.constraints)).join(', ');
                throw new AppError(`Validation failed: ${errorMessages}`, 400);
            }

            const newUser = await UserService.updateUser(userId, userDTO);
            res.status(200).json(newUser);
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }

    static async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }


    static async addUser(req: Request, res: Response, next: NextFunction) {
        const userDTO = new UserDTO();
        Object.assign(userDTO, req.body);
        try {
            const errors = await validate(userDTO);
            if (errors.length > 0) {
                const errorMessages = errors.map(err => Object.values(err.constraints)).join(', ');
                throw new AppError(`Validation failed: ${errorMessages}`, 400);
            }
            const { name, email, otp, role, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await UserService.addUser(name, email, otp, role, hashedPassword);
            res.status(200).json({ message: "Sign Up successful", user: user });
        } catch (error) {
            console.log(error);
            next(new AppError(error.message, 500));
        }
    }
}
