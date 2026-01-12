import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export async function GetDataCampaing(idCampanhaBlip: string, token: string) {
    try {
        const { data, status } = await axios.post(`https://bradesco.http.msging.net/commands`,
            {
                id: uuidv4(),
                to: "postmaster@activecampaign.msging.net",
                method: "get",
                uri: `/campaigns/${idCampanhaBlip}/summaries`,
            },
            {
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                }
            }
        );

        return {
            success: data.status == "success" ? true : false,
            message: data.status == "success" ? "Campanha coletada com sucesso" : "Erro interno no servidor",
            data: data.status == "success" ? data.resource.items : data
        }
    } catch (e: any) {
        return {
            success: false,
            message: "Erro interno no servidor",
            data: {}
        }
    }
}
