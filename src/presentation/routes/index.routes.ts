import { Router } from 'express';
import { AuthRoutes } from './auth/auth.routes';

// Definir todas mis rutas principales
export class AppRoutes {

  static get routes(): Router {

    const router = Router();
    router.use('/api/v1', router);
    router.use('/auth', AuthRoutes.routes )

    return router;
  }


}