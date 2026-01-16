"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTempletes = GetTempletes;
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const Escola_1 = require("../../../infrastructure/database/escola/Escola");
async function GetTempletes(token_acess) {
    try {
        console.log(token_acess);
        const tokenRoteador = await (0, Escola_1.EscolaByTokenAcess)(token_acess);
        console.log(tokenRoteador);
        if (!tokenRoteador.token_acess) {
            return {
                success: false,
                message: "Escola não encontrada",
                data: []
            };
        }
        console.log(tokenRoteador);
        const bodyToRequest = {
            "id": (0, uuid_1.v4)(),
            "to": "postmaster@wa.gw.msging.net",
            "method": "get",
            "uri": "/message-templates"
        };
        const { data, status } = await axios_1.default.post("https://bradesco.http.msging.net/commands", bodyToRequest, {
            headers: {
                "Authorization": tokenRoteador.token_router
            }
        });
        if (status != 200) {
            return {
                success: false,
                message: "Erro na API ao coletar templetes na Blip",
                data: []
            };
        }
        let bodyClean;
        if (data.status == "success") {
            bodyClean = data.resource.data;
        }
        else {
            bodyClean = [];
        }
        return {
            success: true,
            message: "Templetes coletados com sucesso",
            data: bodyClean
        };
    }
    catch (e) {
        return {
            success: false,
            message: "Erro interno no servidor",
            data: []
        };
    }
}
