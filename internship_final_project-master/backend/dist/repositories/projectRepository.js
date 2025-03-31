"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRepository = void 0;
const db_1 = require("../config/db");
const project_1 = require("../entities/project");
exports.projectRepository = db_1.AppDataSource.getRepository(project_1.Project);
