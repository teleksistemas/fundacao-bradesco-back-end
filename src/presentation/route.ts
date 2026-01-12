import express from "express";
import cron from "node-cron"
import { CampaingProducerController } from "./controllers/CampaingProducerController.js";
import { LoginController } from "./controllers/LoginController.js";
import { ClassesController } from "./controllers/ClassesController.js";
import { SegmentsController } from "./controllers/SegmentsController.js";
import { TempleteController } from "./controllers/TempleteController.js";
import { scheduler } from "./controllers/scheduler.js";

const routes = express();

routes.use(express.json());

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

scheduler()