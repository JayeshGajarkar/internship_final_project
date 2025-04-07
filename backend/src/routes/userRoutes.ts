import { Router } from "express";
import { userController } from "../controllers/userController";
import { AuthService } from "../middlewares/middleware";

const userRouter = Router();


userRouter.put("/update/:id",userController.updateUser);
userRouter.get("/:role",userController.getUsersByRole);
userRouter.get('/get/all',userController.getAllUsers);
userRouter.post("/sendOtpForSignUp",userController.sendOtpForSignUp);
userRouter.post("/sendOtpForPassword",userController.sendOtpForPassword)
userRouter.post("/verifyOtp",userController.verifyOtp);
userRouter.put("/changePassword",userController.changePassword);
userRouter.post("/signIn",userController.addUser);
userRouter.post("/logIn",AuthService.LogIn);


export default userRouter;