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

const dadosModelos = {
  contatosToDisparo: [
    {
      "cpf": "16095357667",
      "mobileNumber": "5534997801829",
      "name": "GABRIEL LOPES SOUZA",
      "students": [
        {
          "rm": "12345",
          "name": "GABRIEL LOPES SOUZA",
          "email": "NULL",
          "serie": "1",
          "classCode": "A",
          "description": "EF 1º ano A"
        }
      ]
    }
  ],
  components: {
    qtdDeVariaveis: 1,
    camposDeUtilização: ["name"]
  },
  nameTamplate: "zacarias_vendas",
  token_acess: ""
}