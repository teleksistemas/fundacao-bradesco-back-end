

import { getConectionTheChannel } from '../connection.rabbitmg.js';

export async function createTaskCampaignBradesco(task: any) {
    const channel = getConectionTheChannel()
    console.log(`🔵 Serviço criado na fila campaing`);
    const queue = 'task.bradesco.campaign.create'
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(task)), {
        persistent: true
    })
}
