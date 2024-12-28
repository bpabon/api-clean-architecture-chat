import Boom from '@hapi/boom';

// Esta clase se encargará de la creación de errores
export class BoomAdapter {
  public static badRequest(message?: string | Error, data?: unknown):Boom.Boom<unknown> {
    return Boom.badRequest(message, data);
  }
  public static unauthorized(message?: string | Error | null): Boom.Boom<unknown> {
    return  Boom.unauthorized(message);
  }

  public static notFound(message?: string | Error, data?: unknown): Boom.Boom<unknown> {
    return Boom.notFound(message, data);
  }

  public static internal(message?: string | Error, data?: unknown, statusCode?: number): Boom.Boom<unknown> {
    return  Boom.internal(message,data,statusCode);
  }
  public static badImplementation(message?: string | Error, data?: unknown) {
    return  Boom.badImplementation(message,data);
  }
  public static boomify(err: Error, options?: (Boom.Options<unknown> & Boom.Decorate<unknown>) | undefined): Boom.Boom<unknown> {
    return Boom.boomify(err,options);
  }
}
