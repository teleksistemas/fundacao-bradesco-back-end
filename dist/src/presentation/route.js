"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const CampaingProducerController_js_1 = require("./controllers/CampaingProducerController.js");
const LoginController_js_1 = require("./controllers/LoginController.js");
const ClassesController_js_1 = require("./controllers/ClassesController.js");
const SegmentsController_js_1 = require("./controllers/SegmentsController.js");
const TempleteController_js_1 = require("./controllers/TempleteController.js");
const Scheduler_js_1 = require("./controllers/Scheduler.js");
const CampaingController_js_1 = require("./controllers/CampaingController.js");
const AudineceController_js_1 = require("./controllers/AudineceController.js");
const routes = (0, express_1.default)();
const ROTAS = process.env.ROTAS;
routes.use((0, cors_1.default)({
    origin: ROTAS, // frontend autorizado
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
routes.use(express_1.default.json());
routes.post("/api/v1/login", LoginController_js_1.LoginController);
routes.get("/api/v1/templetes", TempleteController_js_1.TempleteController);
routes.get("/api/v1/segments", SegmentsController_js_1.SegmentsController);
routes.get("/api/v1/classes", ClassesController_js_1.ClassesController);
routes.get("/api/v1/campaings", CampaingController_js_1.CampaingController);
routes.get("/api/v1/audience", AudineceController_js_1.AudineceController);
// Receber mensagens ativas para disparo
routes.post("/api/v1/campaign", CampaingProducerController_js_1.CampaingProducerController);
routes.get("/api/v1/healths", (_, res) => {
    res.json({ status: "ok" });
});
exports.default = routes;
(0, Scheduler_js_1.scheduler)();
