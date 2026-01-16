"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendCampaing = SendCampaing;
const axios_1 = __importDefault(require("axios"));
async function SendCampaing(payload, token) {
    try {
        console.log(JSON.stringify(payload));
        const { data, status } = await axios_1.default.post(`https://bradesco.http.msging.net/commands`, JSON.stringify(payload), {
            headers: {
                "Authorization": `${token}`,
                "Content-Type": "application/json",
            }
        });
        return {
            success: data.status != "failure" ? 200 : 400,
            message: data.status != "failure" ? "Sucesso ao disparar" : "Erro ao fazer disparo",
            data: data.status != "failure" ? data.resource : data
        };
        // return {
        //     success:  400 ,
        //     message: "Sucesso ao disparar",
        //     data: {}
        // }
    }
    catch (e) {
        return {
            success: false,
            message: "Erro interno no servidor",
            data: e
        };
    }
}
