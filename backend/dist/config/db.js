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
exports.dbconnect = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const user_1 = require("../entities/user");
const project_1 = require("../entities/project");
const task_1 = require("../entities/task");
const comments_1 = require("../entities/comments");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mssql',
    host: 'dev.c5owyuw64shd.ap-south-1.rds.amazonaws.com',
    port: 1982,
    username: 'j2',
    password: '123456',
    database: 'JIBE_Main_Training',
    synchronize: true,
    logging: true,
    entities: [user_1.User, project_1.Project, task_1.Task, comments_1.Comment],
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
});
const dbconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.AppDataSource.initialize();
    console.log("Database connected");
});
exports.dbconnect = dbconnect;
