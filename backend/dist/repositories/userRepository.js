"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const user_1 = require("../entities/user");
const db_1 = require("../config/db");
exports.userRepository = db_1.AppDataSource.getRepository(user_1.User);
