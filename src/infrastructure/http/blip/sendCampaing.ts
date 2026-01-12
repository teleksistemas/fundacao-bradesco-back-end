import axios from "axios";

export async function SendCampaing(payload: any, token: string) {
    try {
        const { data, status } = await axios.post(`https://bradesco.http.msging.net/commands`,
            JSON.stringify(payload),
            {
                headers: {
                    "Authorization": `${token}`,
                    "Content-Type": "application/json",
                }
            }
        );

        return {
            success: data.status != "failure" ? 200 : 400,
            message: data.status != "failure" ? "Sucesso ao disparar" : "Erro ao fazer disparo",
            data: data.status != "failure" ? data.resource : data
        }
    } catch (e: any) {
        return {
            success: false,
            message: "Erro interno no servidor",
            data: e
        }
    }
}