import { prisma } from '../prisma.js';

export async function Escola(token: string) {
    try {
        const escola = await prisma.escola.findFirst({
            where: {
                token_acess: token
            }
        })

        return new EscolaResult(escola?.id_juncao ?? null, escola?.nome_escola ?? null, escola?.numero_escola ?? null, escola?.token_router ?? "", escola?.token_acess ?? "");
    } catch (e) {
        return new EscolaResult(null, null, null, "", "");
    }
}

export async function EscolaByIdJuncao(id_juncao: string) {
    try {
        const escola = await prisma.escola.findFirst({
            where: {
                id_juncao
            }
        })

        return new EscolaResult(escola?.id_juncao ?? null, escola?.nome_escola ?? null, escola?.numero_escola ?? null, escola?.token_router ?? "", escola?.token_acess ?? "");
    } catch (e) {
        return new EscolaResult(null, null, null, "", "");
    }
}


export async function EscolaByTokenAcess(token_acess: string) {
    try {
        const escola = await prisma.escola.findFirst({
            where: {
                token_acess
            }
        })

        return new EscolaResult(escola?.id_juncao ?? null, escola?.nome_escola ?? null, escola?.numero_escola ?? null, escola?.token_router ?? "", escola?.token_acess ?? "", escola?.id_escola ?? null);
    } catch (e) {
        return new EscolaResult(null, null, null, "", "");
    }
}

export class EscolaResult {
    constructor(
        public readonly id_juncao: string | null,
        public readonly nome_escola: string | null,
        public readonly numero_escola: string | null,
        public readonly token_router: string,
        public readonly token_acess?: string,
        public readonly id_escola?: number | null 
    ) { }
}