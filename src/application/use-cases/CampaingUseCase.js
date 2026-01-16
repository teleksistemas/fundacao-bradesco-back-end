import { CampaingByIdJuncao } from "../../infrastructure/database/campaing/Camaping";
import { EscolaByTokenAcess } from "../../infrastructure/database/escola/Escola";
export async function CampaingUseCase(token_acess) {
    try {
        const getSchoolByTokenAcess = await EscolaByTokenAcess(token_acess);
        if (!getSchoolByTokenAcess || !getSchoolByTokenAcess.id_juncao) {
            return {
                success: false,
                message: "Escola não encontrada para coletar campanhas",
                data: []
            };
        }
        const getCampaingsByIdJuncao = await CampaingByIdJuncao(getSchoolByTokenAcess.id_juncao);
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
