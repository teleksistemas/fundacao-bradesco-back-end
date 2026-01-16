
import { AudienceByIdCampaing } from "../../infrastructure/database/audience/Audience.js";
import { EscolaByTokenAcess } from "../../infrastructure/database/escola/Escola.js";

export async function AudienceUseCase(token_acess: string, idCamapnha: string) {
    try {
        const getSchoolByTokenAcess = await EscolaByTokenAcess(token_acess);

        if (!getSchoolByTokenAcess || !getSchoolByTokenAcess.id_juncao) {
            return {
                success: false,
                message: "Escola não encontrada para coletar audiencias",
                data: []
            }
        }
        
        const getCampaingsByIdJuncao = await AudienceByIdCampaing(idCamapnha, getSchoolByTokenAcess.id_juncao);
        return {
            success: true,
            message: "Audiencias capturadas com sucesso",
            data: getCampaingsByIdJuncao
        }
    } catch (e: any) {
        return {
            success: false,
            message: "Erro interno no servidor",
            data: []
        }
    }
}