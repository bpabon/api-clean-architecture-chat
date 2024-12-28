import { BoomAdapter } from '../../../config';
import { IUserRepository } from'../../../infrastructure/repositories/user.repositories';
import { IAuthService } from '../../../infrastructure/services/auth/login.service';
export interface userInterfaces {
    execute(email: string, password: string, name: string): Promise<NewUser>;
  }
  
interface NewUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    recoveryToken: string | null;
    createdAt: Date | null
    updatedAt: Date | null;
  }
// Contienen la lógica de negocio. En este caso, se encargarán de gestionar el proceso de login.
export class NewUserUseCase implements userInterfaces{
    constructor(
        private userRepository: IUserRepository,
        private authService: IAuthService,
    ){}
    async execute(email: string, password: string, name: string): Promise<NewUser> {
        // Buscar el usuario por email y si existe retornar un error
        const user = await this.userRepository.findByEmail(email);
        if (user) {
          throw BoomAdapter.badRequest('Existing user: ' + user.email);
        }
        // Verificar la contraseña
        const encryptPassword = await this.authService.encryptPassword(password);
        if (!encryptPassword) {
            throw BoomAdapter.badRequest('Error encrypt password');
        }
        const newUser = await this.userRepository.cerateUser({email,password: encryptPassword,name});
        return {
            id: newUser!.id,
            name: newUser!.name,
            email: newUser!.email,
            password: encryptPassword,
            role: newUser!.role,
            recoveryToken: newUser!.recoveryToken,
            createdAt: newUser!.createdAt??null,
            updatedAt: newUser!.updatedAt ?? null 
        };
      }
      
}