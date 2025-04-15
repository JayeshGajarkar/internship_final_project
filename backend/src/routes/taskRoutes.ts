import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { Authentication } from "../middlewares/authentication";
const taskRouter = Router();


taskRouter.post('/add/:projectId',Authentication.authenticateManager,TaskController.addTask)
taskRouter.delete('/delete/:id',Authentication.authenticateManager,TaskController.deleteTask)
taskRouter.get('/get/:id',Authentication.authenticateJWT,TaskController.getTaskByProjectId)
taskRouter.get('/all/:id',Authentication.authenticateJWT,TaskController.getTaskByUserId)
taskRouter.put('/update/:id',Authentication.authenticateManager,TaskController.updateTask)

export default taskRouter;