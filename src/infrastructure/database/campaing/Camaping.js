import { prisma } from '../../../../lib/prisma';
export async function Camaping() {
    try {
        const campaign = await prisma.cacheCampanha.findMany();
        return campaign;
    }
    catch (e) {
        return [];
    }
}
export async function CampaingByIdJuncao(id_juncao) {
    try {
        const campaign = await prisma.cacheCampanha.findMany({
            where: {
                id_juncao
            }
        });
        return campaign;
    }
    catch (e) {
        return [];
    }
}
export async function CamapingWithFinalizadaIstrue() {
    try {
        const campaign = await prisma.cacheCampanha.findMany({
            where: {
                finalizada: false
            }
        });
        return campaign;
    }
    catch (e) {
        return [];
    }
}
export async function createCampanha(body, nameUser) {
    try {
        const data = {
            id_campanha: body.id_campanha,
            id_juncao: body.id_juncao,
            id_escola: body.id_escola,
            nome_campanha: body.nome_campanha,
            modelo_mensagem: body.modelo_mensagem,
            data_envio: new Date(),
            total_audiencia: body.total_audiencia || 0,
            name_user: nameUser
        };
        await prisma.cacheCampanha.create({ data });
        return true;
    }
    catch (e) {
        console.error("Erro ao criar campanha:", e);
        return false;
    }
}
export async function atualizarFianlizadaCampanha(idCampaing) {
    try {
        const resultTargetCacheAudience = await prisma.cacheCampanha.update({
            where: {
                id_campanha: idCampaing
            },
            data: {
                finalizada: true
            }
        });
        return resultTargetCacheAudience;
    }
    catch (e) {
        console.log(e);
    }
}
export async function atualizarDadosDeDisparoCampanha(idCampaing, qtd_recebidas, qtd_lidas, qtd_falhas) {
    try {
        const resultTargetCacheAudience = await prisma.cacheCampanha.update({
            where: {
                id_campanha: idCampaing
            },
            data: {
                qtd_recebidas,
                qtd_lidas,
                qtd_falhas
            }
        });
        return resultTargetCacheAudience;
    }
    catch (e) {
        console.log(e);
    }
}
