import { prisma } from '../prisma.js';
export async function Escola(token) {
    try {
        const escola = await prisma.escola.findFirst({
            where: {
                token_acess: token
            }
        });
        return new EscolaResult(escola?.id_juncao ?? null, escola?.nome_escola ?? null, escola?.numero_escola ?? null, escola?.token_router ?? "", escola?.token_acess ?? "");
    }
    catch (e) {
        return new EscolaResult(null, null, null, "", "");
    }
}
export async function EscolaByIdJuncao(id_juncao) {
    try {
        const escola = await prisma.escola.findFirst({
            where: {
                id_juncao
            }
        });
        return new EscolaResult(escola?.id_juncao ?? null, escola?.nome_escola ?? null, escola?.numero_escola ?? null, escola?.token_router ?? "", escola?.token_acess ?? "");
    }
    catch (e) {
        return new EscolaResult(null, null, null, "", "");
    }
}
export async function EscolaByTokenAcess(token_acess) {
    try {
        const escola = await prisma.escola.findFirst({
            where: {
                token_acess
            }
        });
        return new EscolaResult(escola?.id_juncao ?? null, escola?.nome_escola ?? null, escola?.numero_escola ?? null, escola?.token_router ?? "", escola?.token_acess ?? "", escola?.id_escola ?? null);
    }
    catch (e) {
        return new EscolaResult(null, null, null, "", "");
    }
}
export class EscolaResult {
    id_juncao;
    nome_escola;
    numero_escola;
    token_router;
    token_acess;
    id_escola;
    constructor(id_juncao, nome_escola, numero_escola, token_router, token_acess, id_escola) {
        this.id_juncao = id_juncao;
        this.nome_escola = nome_escola;
        this.numero_escola = numero_escola;
        this.token_router = token_router;
        this.token_acess = token_acess;
        this.id_escola = id_escola;
    }
}
