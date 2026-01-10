import express from "express";

import { CampaingProducerController } from "./controllers/CampaingProducerController.js";
import { LoginController } from "./controllers/LoginController.js";
import { ClassesController } from "./controllers/ClassesController.js";
import { SegmentsController } from "./controllers/SegmentsController.js";
import { TempleteController } from "./controllers/TempleteController.js";

const routes = express();

routes.use(express.json());

// const swaggerDocument = {
//   openapi: "3.0.0",
//   info: {
//     title: "API Teste",
//     version: "1.0.0"
//   }
// };

routes.post("/api/v1/login", LoginController)

routes.get("/api/v1/templetes", TempleteController)


routes.get("/api/v1/segments", SegmentsController)


routes.get("/api/v1/classes", ClassesController);


routes.get("/api/v1/campaings", TempleteController);



// Receber mensagens ativas para disparo
routes.post("/api/v1/campaign", CampaingProducerController)

routes.get("/api/v1/healths", (_, res) => {
  res.json({ status: "ok" });
});

export default routes;
