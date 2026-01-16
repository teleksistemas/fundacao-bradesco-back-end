import { GetClasses } from "../../infrastructure/http/bradesco/GetClasses.js";
export async function ClassesUseCase(token_acess, segment, classCode, serie) {
    try {
        const GetClassesResponse = await GetClasses(token_acess, segment, classCode, serie);
        return GetClassesResponse;
    }
    catch (e) {
        return {
            success: false,
            message: "",
            data: []
        };
    }
}
