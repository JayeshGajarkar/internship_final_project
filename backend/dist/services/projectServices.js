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
exports.projectService = void 0;
const projectRepository_1 = require("../repositories/projectRepository");
const userRepository_1 = require("../repositories/userRepository");
class projectService {
    static addProject(project, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository_1.userRepository.findOne({ where: { userId }, relations: ["projects"] });
            if (!user) {
                throw new Error('Project not found');
            }
            project.user = user;
            const newProject = projectRepository_1.projectRepository.create(project);
            yield projectRepository_1.projectRepository.save(newProject);
        });
    }
    static getAllProject() {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield projectRepository_1.projectRepository.find({});
            if (projects.length === 0) {
                throw new Error('Project not found');
            }
            return projects;
        });
    }
    static getProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield projectRepository_1.projectRepository.findOne({ where: { projectId }, relations: ["tasks"] });
            if (!project) {
                throw new Error('Project not found');
            }
            return project;
        });
    }
    static deleteProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield projectRepository_1.projectRepository.delete(projectId);
            if (result.affected === 0) {
                throw new Error('Project not found');
            }
        });
    }
    static updateProject(projectId, projectData) {
        return __awaiter(this, void 0, void 0, function* () {
            let project = yield projectRepository_1.projectRepository.findOne({ where: { projectId }, relations: ["tasks"] });
            if (!project) {
                throw new Error('Project not found');
            }
            projectRepository_1.projectRepository.merge(project, projectData);
            yield projectRepository_1.projectRepository.save(project);
        });
    }
}
exports.projectService = projectService;
