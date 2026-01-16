import { GetSegments } from "../../infrastructure/http/bradesco/GetSegments"

export async function SegmentsUseCase(token_acess: string) {
    try {
        const resultGetSegments = await GetSegments(token_acess);
        return resultGetSegments;
    } catch (e: any) {
        return {
            success: false,
            message: "Erro interno no servidor",
            data: {}
        }
    }
}