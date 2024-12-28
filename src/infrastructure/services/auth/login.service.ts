import { JwtAdapter } from '../../../config';
import { BcryptAdapter } from '../../../config/bcryptjs.plugin';
export interface IAuthService {
    verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    generateToken(userId: number): Promise<string | null> ;
    encryptPassword(password: string): Promise<string | null> ;
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

export class AuthService implements IAuthService {
    constructor(
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ){ }
  // Verificar que las contraseñas sean las correctas
  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return BcryptAdapter.compare(plainPassword, hashedPassword);
  }
  // Create a new jwt 
  async generateToken(userId: number): Promise<string | null> {
    return await this.signToken({ userId }, '6h' );
  }
  // Encriptar password
  async encryptPassword(password: string): Promise<string | null> {
    return BcryptAdapter.hash(password);
  }
}
