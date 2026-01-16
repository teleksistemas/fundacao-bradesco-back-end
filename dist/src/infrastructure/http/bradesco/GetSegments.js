"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSegments = GetSegments;
const axios_1 = __importDefault(require("axios"));
const GetTokenBradesco_1 = require("./GetTokenBradesco");
const Escola_1 = require("../../database/escola/Escola");
async function GetSegments(token_acess) {
    try {
        const dadosEscola = await (0, Escola_1.EscolaByTokenAcess)(token_acess);
        if (!dadosEscola.id_juncao) {
            return {
                success: false,
                message: "Não conseguimos encontrar sua escola",
                data: {}
            };
        }
        const resultGetAcessApi = await (0, GetTokenBradesco_1.GetTokenBradesco)();
        if (resultGetAcessApi.status == false) {
            return {
                success: false,
                message: "Não conseguimos coletar token de acesso da api da bradeco.",
                data: {}
            };
        }
        const { data, status } = await axios_1.default.get(`${process.env.BASEURL}/api/school-people/schools/${dadosEscola.id_juncao}/segments`, {
            headers: {
                "Authorization": resultGetAcessApi.token,
                "Accept": "text/plain"
            }
        });
        console.log(data);
        return {
            success: status == 200 ? true : false,
            message: status == 200 ? "Encontrado com sucesso" : "Erro ao tentar consultar os segmentos",
            data: status == 200 ? data.segments : {}
        };
    }
    catch (e) {
        console.log(e);
        return {
            success: false,
            message: "Erro interno no servidor",
            data: {}
        };
    }
}
