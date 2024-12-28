import { BoomAdapter } from "../../config";
import { LoginUserDto } from "../../domain/dto/auth/login-user.dto";
import { UserEntity } from "../../domain/entities/user.entities";
import { prisma } from "../databases/prisma/index";

export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  login(loginUserDto: LoginUserDto): Promise<UserEntity>;
  cerateUser(userDto: LoginUserDto): Promise<UserEntity | null>;
}
export class AuthRepository implements IUserRepository {
  // INTERACTÚA CON LA BASE DE DATOS

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({ where: { email: email, }});
    if (!user) {
      return null;
    }
    return new UserEntity(user.id, user.name, user.email,user.password, user.role,user.recoveryToken);
  }

  // Métodos adicionales si es necesario
  async login( loginUserDto: LoginUserDto ):Promise<UserEntity>{
    const user = await this.findByEmail(loginUserDto.email);
    if(!user) throw BoomAdapter.unauthorized('User not found, verify your email address');
    return new UserEntity(user.id, user.name, user.email,user.password, user.role,user.recoveryToken);
  };
  async cerateUser(userDto: LoginUserDto): Promise<UserEntity | null> {
    const user = await prisma.user.create({ 
        data:
          { 
            name: userDto.name??'Sin name', 
            email: userDto.email, 
            password: userDto.password, 
            createdAt: new Date(), 
            updatedAt: new Date,
            
        }
  });
    if (!user) {
      return null;
    }
    return new UserEntity(user.id, user.name, user.email,user.password, user.role,user.recoveryToken);
  }
}