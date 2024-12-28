import { config } from "./config/envs";
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes/index.routes";

(()=>{
    main();
})();

async function main() {
    const server = new Server({
        port: config.PORT,
        routes: AppRoutes.routes,
    });
    server.start();
}