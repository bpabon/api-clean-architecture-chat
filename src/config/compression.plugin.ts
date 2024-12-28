import compression from "compression";
import { Application } from 'express';

export default function compressionPlugin(app: Application) {
    app.use(compression());
}
