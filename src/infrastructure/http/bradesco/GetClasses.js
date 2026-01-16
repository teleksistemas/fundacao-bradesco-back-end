import axios from "axios";
import { EscolaByTokenAcess } from "../../database/escola/Escola";
import { GetTokenBradesco } from "./GetTokenBradesco";
export async function GetClasses(token_acess, segment, classCode, serie) {
    try {
        const resultSearchEschool = await EscolaByTokenAcess(token_acess);
        const resultGetAcessApi = await GetTokenBradesco();
        if (resultGetAcessApi.status == false) {
            return {
                success: false,
                message: "Não conseguimos coletar token de acesso da api da bradeco.",
                data: []
            };
        }
        const baseUrl = process.env.BASEURL;
        const { data, status } = await axios.get(`${baseUrl}/api/school-people/schools/${resultSearchEschool.id_juncao}/classes?segment=${segment}&classCode=${classCode}&serie=${serie}`, {
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
