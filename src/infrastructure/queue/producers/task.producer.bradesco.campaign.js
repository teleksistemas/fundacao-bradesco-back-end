import { getConectionTheChannel } from '../connection.rabbitmg';
import { createLogs } from "../../database/Logs/Logs";
import { EscolaByTokenAcess } from "../../database/escola/Escola";
export async function createTaskCampaignBradesco(task) {
    const channel = getConectionTheChannel();
    console.log(`🔵 Serviço criado na fila campaing`);
    const queue = 'task.bradesco.campaign.create';
    const name = task.usuario_name ?? "Nome não indentificado no body";
    const tokenSchool = (await EscolaByTokenAcess(task.token_acess)).id_juncao ?? "Token não indentificado no body";
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(task)), {
        persistent: true
    });
    const criandoLog = await createLogs(task, "Criando disparo", name, tokenSchool);
    console.log(`🟠 Log criado com status: ${criandoLog}`);
}
