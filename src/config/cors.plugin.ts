import cors, { CorsOptions } from 'cors';
import { Application } from 'express';

export default function corsPlugin(app: Application) {
    const whitelist = ['http://localhost:4200', 'http://localhost:5000'];
    const corsOptions: CorsOptions = {
        origin: (origin, callback) => {
            if (!origin || whitelist.includes(origin)) {
                callback(null, true);
            } else { callback(new Error('URL No permitida')); }
        }
    };
    app.use(cors(corsOptions));
}
