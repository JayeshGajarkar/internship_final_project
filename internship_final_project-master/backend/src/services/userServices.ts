import { userRepository } from "../repositories/userRepository";

export class userService {

  //For jwtAuthentication
  static async getUser(name: string, email: string) {
    try {
      const user = await userRepository.createQueryBuilder("user")
        .where("user.name= :name AND user.email=:email", { name: name, email: email })
        .getOne();
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return error;
    }
  }


  static async getUserById(userId: number) {
    try {
      const user = await userRepository.createQueryBuilder("user")
        .where("user.userId=:id", { id: userId })
        .getOne();
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return error;
    }
  }
  


  static async getUsersByRole(role: string) {
    try {
      const user = await userRepository.createQueryBuilder("user")
        .where("user.role=:role", { role: role })
        .getMany();
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return error;
    }
  }

  static async addUser(name: string, email: string, role: string, password: string) {
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
      const users = await userRepository.find({
        select: ['userId', 'name', 'email', 'role']
      });
      return users;
    } catch (error) {
      return error;
    }
  }

  
}