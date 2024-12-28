import express, { Router } from 'express';
import compressionPlugin from '../config/compression.plugin';
import corsPlugin from '../config/cors.plugin';
import { ErrorsMiddleware } from './middlewares/errors/handler.error';
interface Options{
  port?: number;
  routes: Router;
}

export class Server {

  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;
  private serverListener?: any;
  constructor( options: Options ) {
    const { port = 3100, routes } = options;

    this.port = port;
    this.routes = routes;

  }


  async start() {

    // Middlewares
    this.app.use( express.json() ); // raw JSON
    this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded
    this.app.use(express.json({ limit: '10mb' }));
    compressionPlugin(this.app);
    corsPlugin(this.app);

    // Usar las rutas definidas
    this.app.use( this.routes );
    
    // Middleware para manejar rutas no existentes
    this.app.use(ErrorsMiddleware.logErrors);
    this.app.use(ErrorsMiddleware.boomErrorHandler);
    this.app.use(ErrorsMiddleware.errorHandler);
    this.app.use(ErrorsMiddleware.routeErrors);

    // Escuchar el puerto
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    })

  }
  public close() {
    this.serverListener?.close();
  }

}