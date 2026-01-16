"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudienceUseCase = AudienceUseCase;
const Audience_1 = require("../../infrastructure/database/audience/Audience");
const Escola_1 = require("../../infrastructure/database/escola/Escola");
async function AudienceUseCase(token_acess, idCamapnha) {
    try {
        const getSchoolByTokenAcess = await (0, Escola_1.EscolaByTokenAcess)(token_acess);
        if (!getSchoolByTokenAcess || !getSchoolByTokenAcess.id_juncao) {
            return {
                success: false,
                message: "Escola não encontrada para coletar audiencias",
                data: []
            };
        }
        const getCampaingsByIdJuncao = await (0, Audience_1.AudienceByIdCampaing)(idCamapnha, getSchoolByTokenAcess.id_juncao);
        return {
            success: true,
            message: "Audiencias capturadas com sucesso",
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
