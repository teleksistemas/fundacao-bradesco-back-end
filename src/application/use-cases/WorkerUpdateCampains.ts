
import { CamapingWithFinalizadaIstrue } from "../../infrastructure/database/campaing/Camaping.js";
import { GetDataCampaing } from "../../infrastructure/http/blip/GetDataCampaing.js";
import { EscolaByIdJuncao } from "../../infrastructure/database/escola/Escola.js";
import { searchCacheAudienciaToTarget, updateTarget } from "../../infrastructure/database/campaing/Camaping.js";

export async function WorkerCampaingsUpdate() {
    try {
        const listCampaingsActived = await CamapingWithFinalizadaIstrue();

        for (let i = 0; i < listCampaingsActived.length; i++) {
            const campaing = listCampaingsActived[i];
            const dadosEscola = await EscolaByIdJuncao(campaing.id_juncao);

            if (!dadosEscola.token_router) {
                continue;
            }

            const resultGetDataCampaing = await GetDataCampaing(campaing.id_campanha, dadosEscola.token_router);

            if (resultGetDataCampaing.success && resultGetDataCampaing.data.length > 0) {
                const targets = resultGetDataCampaing.data;
                for (let y = 0; y < targets.length; y++) {
                    const listaDeTarget = targets[y].statusAudience;
                    const idCampaing = targets[y].id
                    console.log(targets[y]);
                    for (let z = 0; z < listaDeTarget.length; z++) {
                        const target: TargetsTheOfAudience = listaDeTarget[z];
                        const consultaTargetInBD = await searchCacheAudienciaToTarget(target.recipientIdentity, idCampaing);
                      
                        console.log(`${(consultaTargetInBD && consultaTargetInBD.status) ?? ""} - ${target.status}`)
                        if (consultaTargetInBD && consultaTargetInBD.status != target.status) {
                            const resultUpdateTarget = await updateTarget(target.recipientIdentity, idCampaing, target.status);
                            console.log(resultUpdateTarget)
                        } else {
                            console.log("Contato não atualizado")
                        }
                    }
                }
            } 
        }
    } catch (e: any) {
        console.log(e)
    }
}

interface TargetsTheOfAudience {
    "recipientIdentity": string,
    "status": string,
    "processed": string,
    "numberStatus": string
}

const target = {
    id: '31bdabbd-8971-4a21-bd36-e1067f630629',
    name: 'FB Telek_Group_1768161024742_79051724-c808-4088-b9ff-a8abe03d9be0',
    messageTemplate: 'zacarias_vendas',
    masterState: 'boxfibraprincipal@msging.net',
    flowId: '228635ea-fc3a-4a6d-8f8e-468b190e7b17',
    stateId: 'bdcab051-e1f8-4cbe-ac09-e8d4f18713e0',
    sendDate: '2026-01-11T19:50:24.720Z',
    statusAudience: [
        {
            recipientIdentity: '5534997801829@wa.gw.msging.net',
            status: 'FAILED',
            reasonCode: 1602,
            reasonDescription: 'The message recipient was in attendance',
            failed: '2026-01-11T19:50:25.850Z',
            numberStatus: 'VALID'
        }
    ],
    channelType: 'WHATSAPP',
    status: 'executed'
}

const targets = [
    {
        "id": "83b2d5d9-b2e8-439f-bc16-ddf3d0e78174",
        "name": "FB Telek_Group_1768144810710_a3813d76-3fda-42dc-a440-c85e9cd79be8",
        "messageTemplate": "zacarias_vendas",
        "masterState": "boxfibraprincipal@msging.net",
        "flowId": "228635ea-fc3a-4a6d-8f8e-468b190e7b17",
        "stateId": "bdcab051-e1f8-4cbe-ac09-e8d4f18713e0",
        "sendDate": "2026-01-11T15:20:10.820Z",
        "statusAudience": [
            {
                "recipientIdentity": "5534997801829@wa.gw.msging.net",
                "status": "PROCESSED",
                "processed": "2026-01-11T15:20:13.450Z",
                "numberStatus": "VALID"
            }
        ],
        "channelType": "WHATSAPP",
        "status": "executed"
    }
]