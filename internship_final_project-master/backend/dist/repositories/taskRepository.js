"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRepository = void 0;
const db_1 = require("../config/db");
const task_1 = require("../entities/task");
exports.taskRepository = db_1.AppDataSource.getRepository(task_1.Task);
