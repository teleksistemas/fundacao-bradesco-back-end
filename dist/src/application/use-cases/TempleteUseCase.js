"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempleteUseCase = TempleteUseCase;
const GetTempletes_1 = require("../../infrastructure/http/blip/GetTempletes");
async function TempleteUseCase(token_acess) {
    try {
        const resultGetTempletes = await (0, GetTempletes_1.GetTempletes)(token_acess);
        return resultGetTempletes;
    }
    catch (e) {
        return {
            success: false,
            message: "Erro interno no servidor",
            data: []
        };
    }
}
