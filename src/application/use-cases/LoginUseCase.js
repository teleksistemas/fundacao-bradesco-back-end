import { UserAcess } from "../../infrastructure/http/bradesco/UserAcess";
export async function LoginUseCase(token) {
    try {
        const userAccessResponse = await UserAcess(token);
        return {
            success: userAccessResponse.status ?? false,
            data: userAccessResponse.data,
            message: userAccessResponse.menssage,
            token_access: userAccessResponse.token_acess,
        };
    }
    catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Erro interno",
        };
    }
}
