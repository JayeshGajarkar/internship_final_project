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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userServices_1 = require("../services/userServices");
const bcrypt_1 = __importDefault(require("bcrypt"));
class userController {
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email } = req.body;
                const user = yield userServices_1.userService.getUser(name, email);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userServices_1.userService.getAllUsers();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    static addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, role, password } = req.body;
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                yield userServices_1.userService.addUser(name, email, role, hashedPassword);
                res.status(200).json({ message: "User added sucessfully" });
            }
            catch (error) {
                console.log(error);
                res.json({ message: error });
            }
        });
    }
}
exports.userController = userController;
