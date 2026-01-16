"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentsUseCase = SegmentsUseCase;
const GetSegments_1 = require("../../infrastructure/http/bradesco/GetSegments");
async function SegmentsUseCase(token_acess) {
    try {
        const resultGetSegments = await (0, GetSegments_1.GetSegments)(token_acess);
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
