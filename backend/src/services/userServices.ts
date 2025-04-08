import { UserDTO } from "../dto/user.dto";
import { userRepository } from "../repositories/userRepository";
import { OTPService } from "./otpServices";

export class UserService {

  // For jwtAuthentication
  static async getUser(email: string) {
    const user = await userRepository.findOne({ where: { email } });
    return user;
  }

  static async updateUser(userId: number, newUser: UserDTO) {
    const user = await userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new Error('User not found');
    }
    userRepository.merge(user, newUser);
    return await userRepository.save(user);
  }

  static async getUsersByRole(role: string) {
    const users = await userRepository.find({ where: { role } });
    return users;
  }

  static async addUser(name: string, email: string, otp: string, role: string, password: string) {
      const user = userRepository.create({ name, email, role, password });
      await userRepository.save(user);
      return user;
  }

  static async getAllUsers() {
    const users = await userRepository.find({
      select: ['userId', 'name', 'email', 'role']
    });
    return users;
  }

  static async sendOtpForSignUp(email: string){
    const user=await this.getUser(email);
    if(user){
      throw new Error("User already exit")
    }
    return OTPService.sendOtp(email,"sign UP");
  }

  static async sendOtpForPassword(email: string){
    const user=await this.getUser(email);
    if(!user){
      throw new Error("User not Found")
    }
    return OTPService.sendOtp(email,"Reset Password");
  }

  static async changePassword(email:string,password:string){
    const user = await userRepository.findOne({ where: { email } });
    if(!user){
      throw new Error("User not Found")
    }
    user.password=password;
    return await userRepository.save(user);
  }

  static async verifyOtp(email: string, otp: string) {
    if(!OTPService.verifyOtp(email, otp)){
      throw new Error('Invalid OTP');
    }
  }

}
