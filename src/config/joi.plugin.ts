import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';
import { BoomAdapter } from './hapi-boom.plugin';
import fs from 'fs';
import path from 'path';
const translations = JSON.parse(fs.readFileSync(path.join(__dirname, '../presentation/middlewares/schemas/json/spanish-joi-messages.json'), { encoding: 'utf8' }));

export class JoiAdapter {
    // Método estático para validar un objeto contra un esquema Joi
    public static validate(schema: ObjectSchema, property: keyof Request) {
        return (req: Request, res: Response, next: NextFunction) => {
            const { error } = schema.validate(req[property as keyof Request], { abortEarly: false });
            if (error) {
                error.details?.map(detail => {
                    const translatedMessage = translations[detail.type];
                    if (translatedMessage) {
                        const valueInQuotes = detail.message.match(/"([^"]+)"/)?.[0] || "";
                        const numberMatch = detail.message.match(/\d+/);
                        const number = numberMatch ? numberMatch[0] : "";
                        const finalMessage = number ? translatedMessage.replace('{{limit}}', number) : translatedMessage;
                        // Reemplazar el mensaje manteniendo el valor entre comillas dobles
                        detail.message = `${valueInQuotes} ${finalMessage}`;
                    }
                    return detail;
                });
                next(BoomAdapter.badRequest(error));
            } else {
                next();
            }
        }
    }
}

