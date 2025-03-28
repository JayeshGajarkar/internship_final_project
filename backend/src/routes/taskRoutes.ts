import { Router } from "express";
import { taskController } from "../controllers/taskController";
const taskRouter = Router();


taskRouter.post('/addTask/:projectId/:userId',taskController.addTask)
taskRouter.delete('/delete/:id',taskController.deleteTask)
taskRouter.get('/get/:id',taskController.getTaskByProjectId)
taskRouter.put('/update/:id',taskController.updateTask)

export default taskRouter;