"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaingProducerController = CampaingProducerController;
const task_producer_bradesco_campaign_js_1 = require("../../infrastructure/queue/producers/task.producer.bradesco.campaign.js");
async function CampaingProducerController(req, res) {
    try {
        const bodyToCampaing = req.body;
        if (!bodyToCampaing.contatosToDisparo || !bodyToCampaing.components || !bodyToCampaing.nameTamplate || !bodyToCampaing.token_acess || !bodyToCampaing.usuario_name) {
            return res.status(401).json({
                status: false,
                message: "Erro ao inserir na fila de disparo pois esta faltando dados no corpo da req.",
            });
        }
        await (0, task_producer_bradesco_campaign_js_1.createTaskCampaignBradesco)(bodyToCampaing);
        return res.status(200).json({
            success: true,
            message: "Campanha inserida na fila de disparo com sucesso.",
        });
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
        });
    }
}
