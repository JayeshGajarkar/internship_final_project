"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const bodyParser = require('body-parser');
const cors = require('cors');
(0, db_1.dbconnect)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/user", userRoutes_1.default);
app.use('/project', projectRoutes_1.default);
app.use('/task', taskRoutes_1.default);
app.use('/comment', commentRoutes_1.default);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
