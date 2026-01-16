"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = LoginUseCase;
const UserAcess_1 = require("../../infrastructure/http/bradesco/UserAcess");
async function LoginUseCase(token) {
    try {
        const userAccessResponse = await (0, UserAcess_1.UserAcess)(token);
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
