"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaingUseCase = CampaingUseCase;
const Camaping_1 = require("../../infrastructure/database/campaing/Camaping");
const Escola_1 = require("../../infrastructure/database/escola/Escola");
async function CampaingUseCase(token_acess) {
    try {
        const getSchoolByTokenAcess = await (0, Escola_1.EscolaByTokenAcess)(token_acess);
        if (!getSchoolByTokenAcess || !getSchoolByTokenAcess.id_juncao) {
            return {
                success: false,
                message: "Escola não encontrada para coletar campanhas",
                data: []
            };
        }
        const getCampaingsByIdJuncao = await (0, Camaping_1.CampaingByIdJuncao)(getSchoolByTokenAcess.id_juncao);
        return {
            success: true,
            message: "Camapnhas capturadas com sucesso",
            data: getCampaingsByIdJuncao
        };
    }
    catch (e) {
        return {
            success: false,
            message: "Erro interno no servidor",
            data: []
        };
    }
}
