import { BoomAdapter } from '../../../config';
import { IUserRepository } from'../../../infrastructure/repositories/user.repositories';
import { IAuthService } from '../../../infrastructure/services/auth/login.service';
export interface loginInterfaces {
    execute(email: string, password: string): Promise<UserToken>;
  }
interface UserToken {
    token: string | null,
    user: {
      name: string;
      email: string;
    };
  }
// Contienen la lógica de negocio. En este caso, se encargarán de gestionar el proceso de login.
export class LoginUserUseCase implements loginInterfaces{
    constructor(
        private userRepository: IUserRepository,
        private authService: IAuthService,
    ){}
    async execute(email: string, password: string): Promise<UserToken> {
        // Buscar el usuario por email
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
          throw BoomAdapter.notFound('Invalid email or password');
        }
        // Verificar la contraseña
        const isPasswordValid = await this.authService.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            throw BoomAdapter.notFound('Password are not valid');
        }
    
        // Generar un token JWT
        const token = await this.authService.generateToken(user.id);
        if ( !token ) throw BoomAdapter.notFound('Error generating token');
        return {
            token: token,
            user: {
              name: user.name,
              email: user.email,
            },
  
        };
      }
      
}