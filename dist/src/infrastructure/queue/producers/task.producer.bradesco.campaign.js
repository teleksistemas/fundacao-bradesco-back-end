"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskCampaignBradesco = createTaskCampaignBradesco;
const connection_rabbitmg_1 = require("../connection.rabbitmg");
const Logs_1 = require("../../database/logs/Logs");
const Escola_1 = require("../../database/escola/Escola");
async function createTaskCampaignBradesco(task) {
    const channel = (0, connection_rabbitmg_1.getConectionTheChannel)();
    console.log(`🔵 Serviço criado na fila campaing`);
    const queue = 'task.bradesco.campaign.create';
    const name = task.usuario_name ?? "Nome não indentificado no body";
    const tokenSchool = (await (0, Escola_1.EscolaByTokenAcess)(task.token_acess)).id_juncao ?? "Token não indentificado no body";
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(task)), {
        persistent: true
    });
    const criandoLog = await (0, Logs_1.createLogs)(task, "Criando disparo", name, tokenSchool);
    console.log(`🟠 Log criado com status: ${criandoLog}`);
}
