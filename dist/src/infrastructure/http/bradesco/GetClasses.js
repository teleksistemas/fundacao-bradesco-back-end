"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetClasses = GetClasses;
const axios_1 = __importDefault(require("axios"));
const Escola_1 = require("../../database/escola/Escola");
const GetTokenBradesco_1 = require("./GetTokenBradesco");
async function GetClasses(token_acess, segment, classCode, serie) {
    try {
        const resultSearchEschool = await (0, Escola_1.EscolaByTokenAcess)(token_acess);
        const resultGetAcessApi = await (0, GetTokenBradesco_1.GetTokenBradesco)();
        if (resultGetAcessApi.status == false) {
            return {
                success: false,
                message: "Não conseguimos coletar token de acesso da api da bradeco.",
                data: []
            };
        }
        const baseUrl = process.env.BASEURL;
        const { data, status } = await axios_1.default.get(`${baseUrl}/api/school-people/schools/${resultSearchEschool.id_juncao}/classes?segment=${segment}&classCode=${classCode}&serie=${serie}`, {
            headers: {
                "Authorization": resultGetAcessApi.token,
                "Accept": "text/plain"
            }
        });
        const resultStatus = status == 200 ? true : false;
        return {
            success: resultStatus,
            message: resultStatus ? "" : "",
            data: resultStatus ? data.data : data
        };
    }
    catch (e) {
        console.log(e);
        return {
            success: false,
            message: "Erro interono do servidor",
            data: []
        };
    }
}
