import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export async function GetDataCampaingAudience(idCampanhaBlip, token) {
    try {
        const { data, status } = await axios.post(`https://bradesco.http.msging.net/commands`, {
            id: uuidv4(),
            to: "postmaster@activecampaign.msging.net",
            method: "get",
            uri: `/audiences/${idCampanhaBlip}`,
        }, {
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            }
        });
        return {
            success: data.status == "success" ? true : false,
            message: data.status == "success" ? "Audiencia coletada com sucesso" : "Erro interno no servidor",
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
