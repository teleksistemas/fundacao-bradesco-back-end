"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const route_js_1 = __importDefault(require("./src/presentation/route.js"));
const connection_rabbitmg_js_1 = require("./src/infrastructure/queue/connection.rabbitmg.js");
const task_worker_bradesco_campaign_js_1 = require("./src/infrastructure/queue/workers/task.worker.bradesco.campaign.js");
const PORT = process.env.PORT || 5046;
async function start() {
    try {
        await (0, connection_rabbitmg_js_1.connectRabbit)();
        await (0, task_worker_bradesco_campaign_js_1.startTaskWorkerCampaign)();
    }
    catch (e) {
        console.log(e);
    }
    finally {
        route_js_1.default.listen(PORT, () => {
            console.log(`🚀 API rodando na porta http://localhost:${PORT}`);
        });
    }
}
start();
