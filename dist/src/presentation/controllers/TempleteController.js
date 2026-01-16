"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempleteController = TempleteController;
const TempleteUseCase_js_1 = require("../../application/use-cases/TempleteUseCase.js");
async function TempleteController(req, res) {
    try {
        const { authorization, token_acess, role } = req.headers;
        if (authorization !== process.env.VERIFY_TOKEN) {
            return res.status(403).end("Necessário do authorization no header");
        }
        if (!token_acess || typeof token_acess != "string") {
            return res.status(403).end("Necessário do token_acess no header");
        }
        // if (!role || typeof role != "string") {
        //   return res.status(403).end("Necessário do role no header")
        // }
        const resultTempleteUseCase = await (0, TempleteUseCase_js_1.TempleteUseCase)(token_acess);
        return res.status(resultTempleteUseCase.success == true ? 200 : 400).json(resultTempleteUseCase);
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            data: []
        });
    }
}
