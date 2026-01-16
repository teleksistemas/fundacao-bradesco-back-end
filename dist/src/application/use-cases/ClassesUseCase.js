"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesUseCase = ClassesUseCase;
const GetClasses_1 = require("../../infrastructure/http/bradesco/GetClasses");
async function ClassesUseCase(token_acess, segment, classCode, serie) {
    try {
        const GetClassesResponse = await (0, GetClasses_1.GetClasses)(token_acess, segment, classCode, serie);
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
