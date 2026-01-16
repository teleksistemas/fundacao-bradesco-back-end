import { GetTempletes } from "../../infrastructure/http/blip/GetTempletes.js";


export async function TempleteUseCase(token_acess: string) {
    try {
        const resultGetTempletes = await GetTempletes(token_acess);
        return resultGetTempletes;
    } catch (e: any) {
        return {
            success: false,
            message: "Erro interno no servidor",
            data: []
        }
    }
}