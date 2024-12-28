import { Request, Response, NextFunction } from 'express';
import { BoomAdapter } from "../../../config";
import { LoginUserUseCase } from "../../../domain/use-cases/auth/login.use-cases";
import { NewUserUseCase } from "../../../domain/use-cases/auth/user.use-cases";
import { catchAsync } from '../../helpers/catchAsync.helper';
import { LoginUserDto } from '../../../domain/dto/auth/login-user.dto';
import { AuthRepository,IUserRepository } from '../../../infrastructure/repositories/user.repositories';
import { AuthService, IAuthService } from '../../../infrastructure/services/auth/login.service';
// Reciben las solicitudes HTTP,  se encargará de recibir la solicitud de login y devolver la respuesta.
export class AuthController {
    constructor(
    ) {}
    // Realizar el respectivo login si los datos están correctos
    static login = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const [error, loginUserDto] = LoginUserDto.login(req.body);
        if ( error ) throw BoomAdapter.badRequest(error);
        const authService: IAuthService = new AuthService();
        const userRepository: IUserRepository = new AuthRepository();
        // TODO: 
        const loginUseCaseInstance = new LoginUserUseCase(userRepository, authService);
        const data = await loginUseCaseInstance.execute(loginUserDto!.email, loginUserDto!.password);

        return res.status(200).json({ 
            ...data,
            message: 'Login successfully' 
        });

    });
    static emailRecoveryPasswordController = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        console.log('ingreso al controlador recovery--');
         return res.status(200).json({ message: 'Bien recovery password' }); 
    });
    static newUserController = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const [error, userDto] =  LoginUserDto.create(req.body);
        if ( error ) throw BoomAdapter.badRequest(error);
        const authService: IAuthService = new AuthService();
        const userRepository: IUserRepository = new AuthRepository();

        const userUseCaseInstance = new NewUserUseCase(userRepository, authService);
        await userUseCaseInstance.execute(userDto!.email, userDto!.password,userDto?.name??'Sin name');
        return res.status(200).json({ message: 'Create user is successfully' }); 
    });
}