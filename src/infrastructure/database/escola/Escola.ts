import { prisma } from '../prisma.js';
import { EscolaResult } from "../../../domain/value-objects/EscolaResult.js";

export async function Escola(token: string) {
    try {
        const escola = await prisma.escola.findFirst({
            where: {
                token_acess: token
            }
        })

        return new EscolaResult(escola?.id_juncao ?? null, escola?.nome_escola ?? null, escola?.numero_escola ?? null, escola?.token_router ?? null, escola?.token_acess ?? null);
    } catch (e) {
        return new EscolaResult(null, null, null, null, null);
    }
}

export async function EscolaByIdJuncao(id_juncao: string) {
    try {
        const escola = await prisma.escola.findFirst({
            where: {
                id_juncao
            }
        })

        return new EscolaResult(escola?.id_juncao ?? null, escola?.nome_escola ?? null, escola?.numero_escola ?? null, escola?.token_router ?? null, escola?.token_acess ?? null);
    } catch (e) {
        return new EscolaResult(null, null, null, null, null);
    }
}