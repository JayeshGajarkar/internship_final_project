"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectController = void 0;
const projectServices_1 = require("../services/projectServices");
class projectController {
    static addProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id);
                const project = req.body;
                yield projectServices_1.projectService.addProject(project, userId);
                res.status(201).json({ message: "Project added sucessfully" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    static getProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectId = parseInt(req.params.id);
                const project = yield projectServices_1.projectService.getProject(projectId);
                res.status(200).json(project);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    static getAllProjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield projectServices_1.projectService.getAllProject();
                res.status(200).json(projects);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    static deleteProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectId = parseInt(req.params.id, 10);
                yield projectServices_1.projectService.deleteProject(projectId);
                res.status(201).json("Project deleted sucessfully");
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });
            }
        });
    }
    static updateProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectId = parseInt(req.params.id, 10);
                const projectData = req.body;
                yield projectServices_1.projectService.updateProject(projectId, projectData);
                res.status(200).json("Project updated sucessfully !");
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.projectController = projectController;
