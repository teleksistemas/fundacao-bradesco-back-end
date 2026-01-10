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