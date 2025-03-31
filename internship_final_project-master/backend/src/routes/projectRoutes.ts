import { Router } from "express";
import { projectController } from "../controllers/projectController";

const projectRouter = Router();

projectRouter.post("/add",projectController.addProject);
projectRouter.get("/get/:id",projectController.getProject);
projectRouter.get('/all',projectController.getAllProjects);
projectRouter.delete('/delete/:id',projectController.deleteProject);
projectRouter.put('/update/:id',projectController.updateProject)



export default projectRouter;