import { GetClasses } from "../../infrastructure/http/bradesco/GetClasses"

export async function ClassesUseCase(
    token_acess: string,
    segment: string,
    classCode: string,
    serie: string
) {
    try {
        const GetClassesResponse = await GetClasses(token_acess, segment, classCode, serie);
        return GetClassesResponse
    } catch (e: any) {
        return {
            success: false,
            message: "",
            data: []
        }
    }
}