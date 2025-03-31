"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRepository = void 0;
const db_1 = require("../config/db");
const comments_1 = require("../entities/comments");
exports.commentRepository = db_1.AppDataSource.getRepository(comments_1.Comment);
