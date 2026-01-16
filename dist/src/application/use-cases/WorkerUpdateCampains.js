import { CamapingWithFinalizadaIstrue } from "../../infrastructure/database/campaing/Camaping";
import { GetDataCampaing } from "../../infrastructure/http/blip/GetDataCampaing";
import { EscolaByIdJuncao } from "../../infrastructure/database/escola/Escola";
import { searchCacheAudienciaToTarget, updateTarget } from "../../infrastructure/database/audience/Audience";
import { atualizarDadosDeDisparoCampanha, atualizarFianlizadaCampanha } from "../../infrastructure/database/campaing/Camaping";
export async function WorkerCampaingsUpdate() {
    try {
        const listCampaingsActived = await CamapingWithFinalizadaIstrue();
        console.log(JSON.stringify(listCampaingsActived));
        for (const campaing of listCampaingsActived) {
            const dadosEscola = await EscolaByIdJuncao(campaing.id_juncao);
            if (!dadosEscola?.token_router)
                continue;
            const resultGetDataCampaing = await GetDataCampaing(campaing.id_campanha, dadosEscola.token_router);
            const GetDataCampaingAudience = await GetDataCampaing(campaing.id_campanha, dadosEscola.token_router);
            console.log(JSON.stringify(resultGetDataCampaing));
            if (!resultGetDataCampaing.success || !resultGetDataCampaing.data?.length)
                continue;
            for (const targetGroup of resultGetDataCampaing.data) {
                const idCampaing = targetGroup.id;
                for (const target of targetGroup.statusAudience) {
                    const consulta = await searchCacheAudienciaToTarget(target.recipientIdentity, idCampaing);
                    console.log(JSON.stringify(consulta));
                    if (!consulta)
                        continue;
                    if (!precisaAtualizar(consulta, target))
                        continue;
                    await direcionarAudience(target, idCampaing, campaing);
                    console.log("Target atualizado ✅");
                }
            }
        }
    }
    catch (e) {
        console.log("❌ Erro Worker:", e);
    }
}
/* ======== NORMALIZA DATAS PARA SEGUNDOS ======== */
function mesmaData(a, b) {
    if (!a || !b)
        return true;
    return Math.floor(new Date(a).getTime() / 1000) === Math.floor(new Date(b).getTime() / 1000);
}
/* ======== REGRA ÚNICA DE DECISÃO ======== */
function precisaAtualizar(db, api) {
    if (db.status !== api.status)
        return true;
    if ((db.codigo_motivo ?? null) !== (api.reasonCode ?? null))
        return true;
    if ((db.descricao_motivo ?? "") !== (api.reasonDescription ?? ""))
        return true;
    if (api.processed && !mesmaData(db.processada_em, api.processed))
        return true;
    if (api.failed && !mesmaData(db.processada_em, api.failed))
        return true;
    return false;
}
/* ======== UPDATE CENTRALIZADO ======== */
async function direcionarAudience(target, idCampaing, campaing) {
    let dataRef = target.processed ? new Date(target.processed) : undefined;
    console.log(campaing);
    let qtd_recebidas = campaing.qtd_recebidas ?? 0;
    let qtd_lidas = campaing.qtd_lidas ?? 0;
    let qtd_falhas = campaing.qtd_falhas ?? 0;
    const totalDeAudiencias = qtd_recebidas + qtd_lidas + qtd_falhas;
    if (target.status === "FAILED") {
        dataRef = target.failed
            ? new Date(target.failed)
            : target.processed
                ? new Date(target.processed)
                : undefined;
        console.log("Caiu no FAILED");
        qtd_falhas++;
        if (campaing.total_audiencia != totalDeAudiencias) {
            await atualizarDadosDeDisparoCampanha(idCampaing, qtd_recebidas, qtd_lidas, qtd_falhas);
        }
    }
    else if (target.status === "READ") {
        console.log("Caiu no READ");
        qtd_lidas++;
        if (campaing.total_audiencia != totalDeAudiencias) {
            await atualizarDadosDeDisparoCampanha(idCampaing, qtd_recebidas, qtd_lidas, qtd_falhas);
        }
    }
    else if (target.status === "RECEIVED") {
        console.log("Caiu no RECEIVED");
        qtd_recebidas++;
        if (campaing.total_audiencia != totalDeAudiencias) {
            await atualizarDadosDeDisparoCampanha(idCampaing, qtd_recebidas, qtd_lidas, qtd_falhas);
        }
    }
    else if (target.status === "PROCESSED") {
        console.log("Caiu no PROCESSED");
        qtd_recebidas++;
        if (campaing.total_audiencia != totalDeAudiencias) {
            await atualizarDadosDeDisparoCampanha(idCampaing, qtd_recebidas, qtd_lidas, qtd_falhas);
        }
    }
    console.log(totalDeAudiencias, campaing.total_audiencia);
    if (campaing.total_audiencia == totalDeAudiencias) {
        await atualizarFianlizadaCampanha(idCampaing);
    }
    return updateTarget(target.recipientIdentity, idCampaing, target.status, target.reasonCode ?? undefined, target.reasonDescription ?? undefined, dataRef);
}
