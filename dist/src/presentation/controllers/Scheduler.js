"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduler = scheduler;
// src/infrastructure/scheduler/minute.scheduler.ts
const node_cron_1 = __importDefault(require("node-cron"));
const WorkerUpdateCampains_js_1 = require("../../application/use-cases/WorkerUpdateCampains.js");
function scheduler() {
    node_cron_1.default.schedule("*/1 * * * *", async () => {
        try {
            console.log("⏱️ Tick 1 minuto");
            await (0, WorkerUpdateCampains_js_1.WorkerCampaingsUpdate)();
        }
        catch (e) {
            console.error("Erro no scheduler:", e);
        }
    });
}
