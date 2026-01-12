// src/infrastructure/scheduler/minute.scheduler.ts
import cron from "node-cron"
import { WorkerCampaingsUpdate } from "../../application/use-cases/WorkerUpdateCampains.js";

export function scheduler() {
    cron.schedule("*/1 * * * *", async () => {
        try {
            console.log("⏱️ Tick 1 minuto")
            await WorkerCampaingsUpdate()
        } catch (e) {
            console.error("Erro no scheduler:", e)
        }
    })
}
