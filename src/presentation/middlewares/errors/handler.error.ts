import path from "path";
import { config } from "../../../config";
import { Request, Response, NextFunction } from 'express';
import { Boom } from "@hapi/boom";
interface CustomError extends Error {
    status?: string;
    stack?: string;
}
export class ErrorsMiddleware {
    // Función para ver en consola los logs de los errores
    public static logErrors(err: unknown, req: Request, res: Response, next: NextFunction) {
        try {
            if (config.env === 'development') {
                console.error(err);
            }
            next(err);
        } catch (error) {
            next(error);
        }
    }
    // Errores que vienen instanciados de happi boom
    public static boomErrorHandler(err: Boom | Error, req: Request, res: Response, next: NextFunction): any {
        try {
            if (err instanceof Boom) {
                const copyErr = err as any;
                const { output } = err;
                const payloadSpanish = copyErr?.details?.map((detail: any) => detail?.message).join(', ');
                if (payloadSpanish) {
                    output.payload.message = payloadSpanish;
                }
                return res.status(output.statusCode).json(output.payload);
            } else {
                next(err);
            }
        } catch (error) {
            next(error);
        }
    }
    // Si no se encuentra los tipos de anterior se envía un error genérico
    public static isCustomError(err: unknown): err is CustomError { return (err as CustomError).message !== undefined; }
    public static errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
        try {
            if (this.isCustomError(err)) {
                const status = err.status || 'fail';
                res.status(500).json({
                    status,
                    error: err,
                    msg: err.message,
                    stack: err.stack
                });
            } else {
                res.status(500).json({
                    status: 'fail',
                    error: err,
                    msg: 'An unknown error occurred',
                    stack: null
                });
            }
        } catch (error) {
            next(error);
        }
    }
    // En caso de que la ruta que se solicita no exista se envía el siguiente HTML5
    public static routeErrors(err: unknown, req: Request, res: Response, next: NextFunction) {
        const filePath = path.join(__dirname, '../../../../public/security/404.html')
        return res.status(404).sendFile(filePath);
    }
}
