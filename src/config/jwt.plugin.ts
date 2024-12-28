import jwt from 'jsonwebtoken';
import { config } from './envs';

const JWT_SECRET = config.jwtSecret;

export class JwtAdapter {
  // Create a new JWT token
  static async generateToken( 
    payload: Object, 
    duration: string = '1h' ): Promise<string|null> {
    return new Promise( ( resolve ) => {
      jwt.sign( payload, JWT_SECRET, { expiresIn: duration }, (err, token) => {
        if ( err ) return resolve(null);
        resolve(token!);
      });
    } );
  }
  // Validate the token 
  static validateToken<T>( token: string ): Promise<T | null> {
    return new Promise( (resolve) => {
      jwt.verify( token, JWT_SECRET, (err, decoded) => {
        if ( err ) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}