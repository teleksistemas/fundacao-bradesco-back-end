"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTaskWorkerCampaign = startTaskWorkerCampaign;
const uuid_1 = require("uuid");
const connection_rabbitmg_1 = require("../connection.rabbitmg");
const Escola_1 = require("../../database/escola/Escola");
const SendCampaing_1 = require("../../http/blip/SendCampaing");
const Camaping_1 = require("../../database/campaing/Camaping");
const Audience_1 = require("../../database/audience/Audience");
/* =======================
   START WORKER
======================= */
async function startTaskWorkerCampaign() {
    const channel = (0, connection_rabbitmg_1.getConectionTheChannel)();
    const queue = 'task.bradesco.campaign.create';
    const dlq = 'task.bradesco.campaign.dlq';
    await channel.assertQueue(dlq, { durable: true });
    await channel.assertQueue(queue, {
        durable: true,
        deadLetterExchange: '',
        deadLetterRoutingKey: dlq
    });
    channel.prefetch(1);
    channel.consume(queue, async (msg) => {
        if (!msg)
            return;
        const bodyCampaign = JSON.parse(msg.content.toString());
        try {
            console.log(JSON.stringify(bodyCampaign));
            const schoolTargets = await (0, Escola_1.EscolaByTokenAcess)(bodyCampaign.token_acess);
            const payload = await modelarPayloadParaDisparo(bodyCampaign.nameTamplate, schoolTargets.nome_escola ?? "Fundação Bradesco", bodyCampaign.contatosToDisparo, bodyCampaign.components);
            const sendCampaingToBlip = await (0, SendCampaing_1.SendCampaing)(payload, schoolTargets.token_router);
            console.log(sendCampaingToBlip);
            if (sendCampaingToBlip.success) {
                const data = {
                    id_campanha: sendCampaingToBlip.data.id,
                    id_juncao: schoolTargets.id_juncao,
                    id_escola: schoolTargets.id_escola,
                    nome_campanha: payload.resource.campaign.name,
                    modelo_mensagem: payload.resource.message.messageTemplate,
                    data_envio: new Date(),
                    total_audiencia: payload.resource.audiences.length || 0
                };
                await (0, Camaping_1.createCampanha)(data, bodyCampaign.usuario_name);
            }
            if (sendCampaingToBlip.success) {
                const listaDeTargets = bodyCampaign.contatosToDisparo;
                for (let i = 0; i < listaDeTargets.length; i++) {
                    const target = listaDeTargets[i];
                    const data = {
                        id_campanha: sendCampaingToBlip.data.id,
                        id_juncao: schoolTargets.id_juncao,
                        identidade_destino: `${target.mobileNumber}@wa.gw.msging.net`,
                        msisdn: target.mobileNumber,
                        status: "PENDENTE",
                        nome_aluno: target.student.name || null,
                        nome_responsavel: target.name || null,
                        nome_escola: schoolTargets.nome_escola || null,
                        nome_turma: target.student.description || null
                    };
                    const criandoTargetDaCampanha = await (0, Audience_1.createCacheAudiencia)(data);
                    console.log(criandoTargetDaCampanha);
                }
                console.log("✅ Mensagem enviada com sucesso");
            }
            else {
                console.log("❌ Falha ao enviar mensagem");
            }
            // 👉 Aqui você envia pro BLiP
            channel.ack(msg);
        }
        catch (err) {
            console.error('❌ ERRO:', err);
            channel.nack(msg, false, false);
        }
    });
}
/* =======================
   PAYLOAD BLIP
======================= */
const modelarPayloadParaDisparo = async (nameTamplate, nomeEscola, targets, components) => {
    const stateId = process.env.STATE_ID_BLIP;
    const flowId = process.env.FLOW_ID_BLIP;
    const masterState = process.env.MASTER_STATE_BLIP;
    const timestamp = Date.now();
    const guid = (0, uuid_1.v4)();
    const nomeCampanha = `${nomeEscola}_Group_${timestamp}_${guid}`;
    const audiences = await modelarAudience(targets, components);
    return {
        id: (0, uuid_1.v4)(),
        to: "postmaster@activecampaign.msging.net",
        method: "set",
        uri: "/campaign/full",
        type: "application/vnd.iris.activecampaign.full-campaign+json",
        resource: {
            campaign: {
                name: nomeCampanha,
                campaignType: "Batch",
                flowId,
                stateId,
                masterstate: masterState + "@msging.net",
                channelType: "WhatsApp"
            },
            audiences,
            message: {
                messageTemplate: nameTamplate,
                messageParams: components.camposDeUtilização.map((_, i) => String(i + 1)),
                channelType: "WhatsApp"
            }
        }
    };
};
/* =======================
   AUDIENCE BUILDER
======================= */
const getValueByPath = (obj, path) => {
    return path.split('.').reduce((acc, key) => {
        if (acc === null || acc === undefined)
            return undefined;
        return acc[key] ?? path;
    }, obj);
};
const modelarAudience = async (targets, components) => {
    return targets.map(target => {
        const params = {};
        components.camposDeUtilização.forEach((campo, index) => {
            let valor = getValueByPath(target, campo);
            if (Array.isArray(valor))
                valor = valor[0];
            params[String(index + 1)] = String(valor ?? '');
        });
        return {
            recipient: `+${target.mobileNumber}`,
            messageParams: params
        };
    });
};
