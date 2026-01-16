import axios from "axios";
export async function GetTokenBradesco() {
    try {
        const client_id = process.env.CLIENTE_ID;
        const client_secret = process.env.CLIENTE_SECRET;
        const scope = process.env.SCOPE;
        const tenant_id = process.env.TENANT_ID;
        const body = new URLSearchParams({
            grant_type: "client_credentials",
            client_id: client_id || "",
            client_secret: client_secret || "",
            scope: scope || ""
        }).toString();
        const { data, status } = await axios.post(`https://login.microsoftonline.com/${tenant_id}/oauth2/v2.0/token`, body, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        if (status != 200) {
            console.log(`Erro ao tentar coletar token do FB: ${data}`);
            return {
                status: false,
                token: "",
                message: "Token não foi gerado.",
            };
        }
        return {
            status: true,
            token: `${data.token_type} ${data.access_token}`,
            message: "Token gerado com sucesso"
        };
    }
    catch (e) {
        return {
            status: false,
            token: "",
            message: e
        };
    }
}
