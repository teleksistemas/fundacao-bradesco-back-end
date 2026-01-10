// const summaryResp = await fetch(`https://${contrato}.http.msging.net/commands`, {
//     method: "POST",
//     headers: {
//         Authorization: `${token}`,
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//         id: uuidv4(),
//         to: "postmaster@activecampaign.msging.net",
//         method: "get",
//         uri: `/campaigns/${idCampanhaBlip}/summaries`,
//     }),
// });

import { CamapingWithFinalizadaIstrue } from "../../infrastructure/database/campaing/Camaping.js";
import { GetDataCampaing } from "../../infrastructure/http/blip/GetDataCampaing.js";
import { EscolaByIdJuncao } from "../../infrastructure/database/escola/Escola.js"
export async function WorkerCampaingsUpdate() {
    try {
        const listCampaingsActived = await CamapingWithFinalizadaIstrue();

        for (let i = 0; i < listCampaingsActived.length; i++) {
            const campaing = listCampaingsActived[i];
            const dadosEscola = await EscolaByIdJuncao(campaing.id_juncao);
            
            if (!dadosEscola.token_router) {
                continue;
            }

            const resultGetDataCampaing = await GetDataCampaing(campaing.id_campanha, dadosEscola.token_router)
        }
    } catch (e: any) {

    }
}