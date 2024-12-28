import { AppRoutes } from './../src/presentation/routes/index.routes';
import { config } from './../src/config/envs';
import { Server } from '../src/presentation/server';



export const testServer = new Server({
  port: config.PORT,
  routes: AppRoutes.routes,
})