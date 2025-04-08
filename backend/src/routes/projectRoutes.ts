import { Router } from "express";
import { ProjectController } from "../controllers/projectController";
import { Authentication } from "../middlewares/authentication";

const projectRouter = Router();

projectRouter.post("/add",Authentication.authenticateAdmin,ProjectController.addProject);
projectRouter.get("/get/:id",ProjectController.getProject);
projectRouter.get('/all',Authentication.authenticateAdmin,ProjectController.getAllProjects);
projectRouter.get('/manager/:id',Authentication.authenticateManager ,ProjectController.getAllProjectsByManager);
projectRouter.get('/employee/:id',Authentication.authenticateJWT,ProjectController.getAllProjectsByEmployee);
projectRouter.delete('/delete/:id',Authentication.authenticateAdmin,ProjectController.deleteProject);
projectRouter.put('/update/:id',Authentication.authenticateAdmin,ProjectController.updateProject)



export default projectRouter;