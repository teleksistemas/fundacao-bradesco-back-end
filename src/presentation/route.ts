import express from "express";
import cors from "cors";
import { CampaingProducerController } from "./controllers/CampaingProducerController";
import { LoginController } from "./controllers/LoginController";
import { ClassesController } from "./controllers/ClassesController";
import { SegmentsController } from "./controllers/SegmentsController";
import { TempleteController } from "./controllers/TempleteController";
import { scheduler } from "./controllers/Scheduler";
import { CampaingController } from "./controllers/CampaingController";
import { AudineceController } from "./controllers/AudineceController";

const routes = express();

const ROTAS = process.env.ROTAS;

routes.use(cors({
  origin: ROTAS,   // frontend autorizado
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

routes.use(express.json());

routes.post("/api/v1/login", LoginController)

routes.get("/api/v1/templetes", TempleteController)

routes.get("/api/v1/segments", SegmentsController)

routes.get("/api/v1/classes", ClassesController);

routes.get("/api/v1/campaings", CampaingController);

routes.get("/api/v1/audience", AudineceController);

// Receber mensagens ativas para disparo
routes.post("/api/v1/campaign", CampaingProducerController);

routes.get("/api/v1/healths", (_, res) => {
  res.json({ status: "ok" });
});

export default routes;

scheduler()