import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import next from "next";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger";
import HealthController from "./controllers/health";
import VersionController from "./controllers/version";
import LoaderController from "./controllers/loader";

const nextApp = next({ dev: process.env.ENVIRONMENT === "dev" });
const handle = nextApp.getRequestHandler();
const port = process.env.PORT || 80;

(async () => {
  try {
    await nextApp.prepare();
    const app = express();

    app.use(bodyParser.json());

    app.use(VersionController);
    app.use(HealthController);
    app.use(LoaderController);
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use(express.static('public'));

    app.use('/_next', express.static('.next'));

    app.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    app.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port}`);
    });
    
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();