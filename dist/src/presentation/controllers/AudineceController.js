"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudineceController = AudineceController;
const AudienceUseCase_js_1 = require("../../application/use-cases/AudienceUseCase.js");
async function AudineceController(req, res) {
    try {
        const { authorization, token_acess } = req.headers;
        const { idCamapnha } = req.query;
        if (authorization !== process.env.VERIFY_TOKEN) {
            return res.status(403).json({
                success: false,
                message: "Necessário do authorization no header",
                data: []
            });
        }
        if (!token_acess || typeof token_acess != "string") {
            return res.status(403).json({
                success: false,
                message: "Necessário do token_acess no header",
                data: []
            });
        }
        if (!idCamapnha) {
            return res.status(403).json({
                success: false,
                message: "Necessário do idCamapnha nos parametros",
                data: []
            });
        }
        const resultGetAudience = await (0, AudienceUseCase_js_1.AudienceUseCase)(token_acess, idCamapnha);
        return res.status(resultGetAudience.success ? 200 : 400).json(resultGetAudience);
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            data: []
        });
    }
}
