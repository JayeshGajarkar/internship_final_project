import { Router } from "express";
import { userController } from "../controllers/userController";
import { AuthService } from "../middlewares/middleware";

const userRouter = Router();

userRouter.get("/:id",userController.getUser);
userRouter.get('/',AuthService.authenticateJWT,userController.getAllUsers);
userRouter.post("/signIn",userController.addUser);
userRouter.post("/logIn",AuthService.generateToken);


export default userRouter;