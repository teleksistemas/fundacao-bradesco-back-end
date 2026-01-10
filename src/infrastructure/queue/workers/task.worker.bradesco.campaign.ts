// Onde o worker executa

import { getConectionTheChannel } from '../connection.rabbitmg.js';

export async function startTaskWorkerCampaign() {
  const channel = getConectionTheChannel()

  const queue = 'task.bradesco.campaign.create'
  const dlq = 'task.bradesco.campaign.dlq'

  await channel.assertQueue(dlq, { durable: true })

  await channel.assertQueue(queue, {
    durable: true,
    deadLetterExchange: '',
    deadLetterRoutingKey: dlq
  })

  channel.prefetch(1)

  channel.consume(queue, async msg => {
    if (!msg) return

    const bodyCampaign = JSON.parse(msg.content.toString())

    try {
     
        
      console.log('✅ Tarefa concluída')
      channel.ack(msg)
    } catch (err) {
      console.log('❌ Falhou, jogando pra DLQ');
      channel.nack(msg, false, false)
    }
  })
}
