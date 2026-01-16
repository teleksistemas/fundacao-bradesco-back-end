"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = LoginController;
const LoginUseCase_js_1 = require("../../application/use-cases/LoginUseCase.js");
async function LoginController(req, res) {
    try {
        const { authorization, token_fb } = req.headers;
        if (authorization !== process.env.VERIFY_TOKEN) {
            return res.status(403).end("Necessário do authorization no header");
        }
        if (!token_fb || typeof token_fb != "string") {
            return res.status(403).end("Necessário do token_fb no header e do tipo string");
        }
        const responseAcess = await (0, LoginUseCase_js_1.LoginUseCase)(token_fb);
        return res.status(responseAcess.success ? 200 : 400).json(responseAcess);
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Erro interno do servidor",
            data: {}
        });
    }
}
