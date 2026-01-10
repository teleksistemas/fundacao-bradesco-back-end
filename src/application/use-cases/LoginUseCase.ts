import { UserAcess } from "../../infrastructure/http/bradesco/UserAcess.js"

interface Acess {
    status: boolean,
    data: any,
    menssage: string
}

export async function LoginUseCase(token: string) {
    try {
        const resultAcess: Acess = await UserAcess(token);
        return resultAcess
    } catch (e: any) {
        return {
            status: false,
            data: e,
            menssage: "Tivemos um erro interno"
        }
    }
}