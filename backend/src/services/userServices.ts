import { userRepository } from "../repositories/userRepository";

export class userService {

  //For jwtAuthentication
  static async getUser(name:string,email:string) {
    try {
      const user = await userRepository.createQueryBuilder("user")
        .where("user.name= :name AND user.email=:email",{name:name,email:email})
        .getOne();
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return error;
    }
  }

  static async addUser(name: string, email: string, role: string,password: string) {
    try {
      const user = userRepository.create({ name, email, role, password });
      await userRepository.save(user);
    } catch (error) {
      console.error('Error adding user:', error);
      return error;
    }
  }


  static async getAllUsers() {
    try {
      const users = await userRepository.createQueryBuilder("user")
        .select(['user.id','user.name','user.email','user.role'])
        .getMany();
      return users;
    } catch (error) {
      console.error('Error fetching user:', error);
      return error;
    }
  }
}