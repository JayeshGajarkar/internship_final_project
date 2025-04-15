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
exports.userService = void 0;
const userRepository_1 = require("../repositories/userRepository");
class userService {
    //For jwtAuthentication
    static getUser(name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userRepository_1.userRepository.createQueryBuilder("user")
                    .where("user.name= :name AND user.email=:email", { name: name, email: email })
                    .getOne();
                return user;
            }
            catch (error) {
                console.error('Error fetching user:', error);
                return error;
            }
        });
    }
    static addUser(name, email, role, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = userRepository_1.userRepository.create({ name, email, role, password });
                yield userRepository_1.userRepository.save(user);
            }
            catch (error) {
                console.error('Error adding user:', error);
                return error;
            }
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userRepository_1.userRepository.find({
                    select: ['userId', 'name', 'email', 'role']
                });
                return users;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.userService = userService;
