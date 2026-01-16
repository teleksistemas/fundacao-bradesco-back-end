"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDataCampaing = GetDataCampaing;
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
async function GetDataCampaing(idCampanhaBlip, token) {
    try {
        const { data, status } = await axios_1.default.post(`https://bradesco.http.msging.net/commands`, {
            id: (0, uuid_1.v4)(),
            to: "postmaster@activecampaign.msging.net",
            method: "get",
            uri: `/campaigns/${idCampanhaBlip}/summaries`,
        }, {
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            }
        });
        return {
            success: data.status == "success" ? true : false,
            message: data.status == "success" ? "Campanha coletada com sucesso" : "Erro interno no servidor",
            data: data.status == "success" ? data.resource.items : data
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
