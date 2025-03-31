import { Router } from "express";
import { userController } from "../controllers/userController";
import { AuthService } from "../middlewares/middleware";

const userRouter = Router();


userRouter.get("/get/:id",userController.getUsersById);
userRouter.get("/:role",userController.getUsersByRole);
userRouter.get('/all',userController.getAllUsers);
userRouter.post("/signIn",userController.addUser);
userRouter.post("/logIn",AuthService.LogIn);


export default userRouter;