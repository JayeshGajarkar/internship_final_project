import { UserDTO } from "../dto/user.dto";
import { userRepository } from "../repositories/userRepository";
import { OTPService } from "./otpServices";

export class UserService {

  // For jwtAuthentication
  static async getUser(email: string) {
    const user = await userRepository.findOne({ where: { email, isActive: true } });
    return user;
  }

  static async updateUser(userId: number, userDTO: UserDTO) {
    const user = await userRepository.findOne({ where: { userId, isActive: true } });
    if (!user) {
      throw new Error('User not found');
    }
    
    user.name=userDTO.name;
    user.email=userDTO.email;
    user.role=userDTO.role;

    return await userRepository.save(user);
  }

  static async getUsersByRole(role: string) {
    const users = await userRepository.find({ where: { role, isActive: true } });
    return users;
  }

  static async addUser(user:UserDTO) {
    const newUser = userRepository.create({ ...user });
    await userRepository.save(newUser);
    return newUser;
  }

  static async softDeleteUser(userId: number) {
    await userRepository.update(userId, { isActive: false });
  }

  static async getAllUsers() {
    const users = await userRepository.find({
      select: ['userId', 'name', 'email', 'role'],
      where: { isActive: true }
    });
    return users;
  }

  static async sendOtpForSignUp(email: string) {
    const user = await this.getUser(email);
    if (user) {
      throw new Error("User already exists");
    }
    return OTPService.sendOtp(email, "sign UP");
  }

  static async sendOtpForPassword(email: string) {
    const user = await this.getUser(email);
    if (!user) {
      throw new Error("User not Found");
    }
    return OTPService.sendOtp(email, "Reset Password");
  }

  static async changePassword(email: string, password: string) {
    const user = await userRepository.findOne({ where: { email, isActive: true } });
    if (!user) {
      throw new Error("User not Found");
    }
    user.password = password;
    return await userRepository.save(user);
  }

  static async verifyOtp(email: string, otp: string) {
    if (!OTPService.verifyOtp(email, otp)) {
      throw new Error('Invalid OTP');
    }
  }
}
