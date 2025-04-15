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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userServices_1 = require("../services/userServices");
const secretKey = "jayesh";
class AuthService {
    static authenticateJWT(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
            if (token) {
                jsonwebtoken_1.default.verify(token, secretKey, (err) => {
                    if (err) {
                        return res.status(401).json({ message: "Unautorized acess !" });
                    }
                    next();
                });
            }
            else {
                res.status(401).json({ message: "Unautorized acess !" });
            }
        });
    }
    static LogIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const user = yield userServices_1.userService.getUser(name, email);
            if (!user) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
            res.status(201).json({ token: token });
        });
    }
}
exports.AuthService = AuthService;
