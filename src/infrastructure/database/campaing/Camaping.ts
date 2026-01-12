import { prisma } from '../prisma.js';


export async function Camaping() {
    try {
        const campaign = await prisma.cacheCampanha.findMany()
        return campaign;
    } catch (e) {
        return [];
    }
}

export async function CampaingByIdJuncao(id_juncao: string) {
    try {
        const campaign = await prisma.cacheCampanha.findMany({
            where: {
                id_juncao
            }
        })

        return campaign;
    } catch (e) {
        return [];
    }
}

export async function CamapingWithFinalizadaIstrue() {
    try {
        const campaign = await prisma.cacheCampanha.findMany({
            where: {
                finalizada: false
            }
        })
        return campaign;
    } catch (e) {
        return [];
    }
}

export async function createCampanha(body: any) {
    try {
        const data = {
            id_campanha: body.id_campanha,
            id_juncao: body.id_juncao,
            id_escola: body.id_escola,
            nome_campanha: body.nome_campanha,
            modelo_mensagem: body.modelo_mensagem,
            data_envio: new Date(),
            total_audiencia: body.total_audiencia || 0
        }

        await prisma.cacheCampanha.create({ data })
        return true;
    } catch (e) {
        console.error("Erro ao criar campanha:", e)
        return false;
    }
}


export async function createCacheAudiencia(body: any) {
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
        }

        await prisma.cacheAudiencia.create({ data })
        return true
    } catch (error: any) {
        if (error.code === "P2002") {
            return false;
        }
        console.error("Erro ao criar cache_audiencia:", error)
        return false;
    }
}


export async function searchCacheAudienciaToTarget(target: string, idCampaing: string) {
    try {
        const resultTargetCacheAudience = await prisma.cacheAudiencia.findFirst({
            where: {
                identidade_destino: target,
                id_campanha: idCampaing
            }
        });

        return resultTargetCacheAudience ? resultTargetCacheAudience : false;
    } catch (e: any) {
        return false;
    }
}


export async function updateTarget(
  target: string,
  idCampaing: string,
  status: string
) {
  try {
    const resultTargetCacheAudience = await prisma.cacheAudiencia.update({
      where: {
        id_campanha_identidade_destino: {
          id_campanha: idCampaing,
          identidade_destino: target
        }
      },
      data: {
        status
      }
    })

    return resultTargetCacheAudience
  } catch (e) {
    return false
  }
}
