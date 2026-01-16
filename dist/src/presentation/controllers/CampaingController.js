"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaingController = CampaingController;
const CampaingUseCase_js_1 = require("../../application/use-cases/CampaingUseCase.js");
async function CampaingController(req, res) {
    try {
        const { authorization, token_acess } = req.headers;
        if (authorization !== process.env.VERIFY_TOKEN) {
            return res.status(403).end("Necessário do authorization no header");
        }
        if (!token_acess || typeof token_acess != "string") {
            return res.status(403).end("Necessário do token_acess no header");
        }
        const resultGetCampaings = await (0, CampaingUseCase_js_1.CampaingUseCase)(token_acess);
        return res.status(resultGetCampaings.success ? 200 : 400).json(resultGetCampaings);
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            data: []
        });
    }
}
