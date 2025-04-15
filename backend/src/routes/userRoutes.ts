import { Router } from "express";
import { UserController } from "../controllers/userController";
import { Authentication } from "../middlewares/authentication";

const userRouter = Router();

userRouter.put("/update/:id",Authentication.authenticateJWT,UserController.updateUser);
userRouter.get("/:role",Authentication.authenticateManager,UserController.getUsersByRole);
userRouter.get('/get/all',Authentication.authenticateAdmin,UserController.getAllUsers);
userRouter.post("/sendOtpForSignUp",UserController.sendOtpForSignUp);
userRouter.post("/sendOtpForPassword",UserController.sendOtpForPassword)
userRouter.post("/verifyOtp",UserController.verifyOtp);
userRouter.put("/changePassword",UserController.changePassword);
userRouter.post("/signIn",UserController.addUser);
userRouter.post("/logIn",Authentication.LogIn);
userRouter.delete('/delete/:id',Authentication.authenticateAdmin,UserController.deleteUser)

export default userRouter;