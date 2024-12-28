import { Router } from "express";
import { JoiAdapter } from "../../../config/joi.plugin";
import { emailRecoveryPassword, loginAuth, registryUser } from "../../middlewares/schemas/auth/login.schemas";
import { AuthController } from "../../controllers/auth/auth.controllers";

export class AuthRoutes{
  static get routes(): Router{
    const router = Router();
    router.post('/login',[JoiAdapter.validate(loginAuth, 'body')],AuthController.login);
    router.post('/recoveryPassword',[JoiAdapter.validate(emailRecoveryPassword, 'body')],AuthController.emailRecoveryPasswordController);
    router.post('/registerUser',[JoiAdapter.validate(registryUser, 'body')], AuthController.newUserController);
    return router;
  }  
}