import 'dotenv/config'
import routes from "./src/presentation/route.js"
import { connectRabbit } from "./src/infrastructure/queue/connection.rabbitmg.js";
import { startTaskWorkerCampaign } from './src/infrastructure/queue/workers/task.worker.bradesco.campaign.js';

const PORT = process.env.PORT || 5046;

async function start() {
  try {
    await connectRabbit();
    await startTaskWorkerCampaign();
  } catch (e) {
    console.log(e)
  } finally {
    routes.listen(PORT, () => {
      console.log(`🚀 API rodando na porta http://localhost:${PORT}`);
    });
  }
}

start()

