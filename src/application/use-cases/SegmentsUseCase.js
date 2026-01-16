import { GetSegments } from "../../infrastructure/http/bradesco/GetSegments";
export async function SegmentsUseCase(token_acess) {
    try {
        const resultGetSegments = await GetSegments(token_acess);
        return resultGetSegments;
    }
    catch (e) {
        return {
            success: false,
            message: "Erro interno no servidor",
            data: {}
        };
    }
}
