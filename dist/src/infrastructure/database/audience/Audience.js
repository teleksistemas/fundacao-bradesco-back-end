"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Audience = Audience;
exports.AudienceByIdCampaing = AudienceByIdCampaing;
exports.createCacheAudiencia = createCacheAudiencia;
exports.searchCacheAudienciaToTarget = searchCacheAudienciaToTarget;
exports.updateTarget = updateTarget;
const prisma_1 = require("../prisma");
async function Audience() {
    try {
        const campaign = await prisma_1.prisma.cacheCampanha.findMany();
        return campaign;
    }
    catch (e) {
        return [];
    }
}
async function AudienceByIdCampaing(id_campanha, id_juncao) {
    try {
        const campaign = await prisma_1.prisma.cacheAudiencia.findMany({
            where: {
                id_campanha,
                id_juncao
            }
        });
        return campaign;
    }
    catch (e) {
        return [];
    }
}
async function createCacheAudiencia(body) {
    try {
        const data = {
            id_campanha: body.id_campanha,
            id_juncao: body.id_juncao || null,
            identidade_destino: body.identidade_destino,
            msisdn: body.msisdn,
            status: "PENDENTE",
            nome_aluno: body.nome_aluno || null,
            nome_responsavel: body.nome_responsavel || null,
            nome_escola: body.nome_escola || null,
            nome_turma: body.nome_turma || null
        };
        await prisma_1.prisma.cacheAudiencia.create({ data });
        return true;
    }
    catch (error) {
        if (error.code === "P2002") {
            return false;
        }
        console.error("Erro ao criar cache_audiencia:", error);
        return false;
    }
}
async function searchCacheAudienciaToTarget(target, idCampaing) {
    try {
        const resultTargetCacheAudience = await prisma_1.prisma.cacheAudiencia.findFirst({
            where: {
                identidade_destino: target,
                id_campanha: idCampaing
            }
        });
        return resultTargetCacheAudience ? resultTargetCacheAudience : false;
    }
    catch (e) {
        return false;
    }
}
async function updateTarget(target, idCampaing, status, codigo_motivo, descricao_motivo, processada_em) {
    console.log(`Acessou UPDATE com ${status}`);
    try {
        let data;
        if (status == "READ") {
            data = {
                status,
                codigo_motivo,
                descricao_motivo,
                lida_em: processada_em,
                final: true
            };
        }
        else if (status == "RECEIVED") {
            data = {
                status,
                codigo_motivo,
                descricao_motivo,
                recebida_em: processada_em
            };
        }
        else if (status == "FAILED") {
            data = {
                status,
                codigo_motivo,
                descricao_motivo,
                processada_em,
                final: true
            };
        }
        else {
            data = {
                status,
                codigo_motivo,
                descricao_motivo,
                processada_em
            };
        }
        const resultTargetCacheAudience = await prisma_1.prisma.cacheAudiencia.update({
            where: {
                id_campanha_identidade_destino: {
                    id_campanha: idCampaing,
                    identidade_destino: target
                }
            },
            data
        });
        return resultTargetCacheAudience;
    }
    catch (e) {
        return false;
    }
}
