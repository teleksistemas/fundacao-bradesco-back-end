"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentsController = SegmentsController;
const SegmentsUseCase_js_1 = require("../../application/use-cases/SegmentsUseCase.js");
async function SegmentsController(req, res) {
    try {
        const { authorization, token_acess } = req.headers;
        if (authorization !== process.env.VERIFY_TOKEN) {
            return res.status(403).end("Necessário do authorization no header");
        }
        if (!token_acess || typeof token_acess != "string") {
            return res.status(403).end("Necessário do token_acess no header");
        }
        const resultSegmentsUseCase = await (0, SegmentsUseCase_js_1.SegmentsUseCase)(token_acess);
        return res.status(resultSegmentsUseCase.success ? 200 : 400).json(resultSegmentsUseCase);
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            data: {}
        });
    }
}
