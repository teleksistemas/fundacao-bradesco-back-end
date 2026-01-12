import axios from "axios"

import { EscolaByTokenAcess } from "../../database/escola/Escola.js";
import { GetTokenBradesco } from "./GetTokenBradesco.js"

export async function GetClasses(token_acess: string, segment: string, classCode: string, serie: string) {
  try {
    const resultSearchEschool = await EscolaByTokenAcess(token_acess);

    const resultGetAcessApi = await GetTokenBradesco();
    if (resultGetAcessApi.status == false) {
      return {
        success: false,
        message: "Não conseguimos coletar token de acesso da api da bradeco.",
        data: {}
      }
    }

    const baseUrl = process.env.BASEURL

    const { data, status } = await axios.get(`${baseUrl}/api/school-people/schools/${resultSearchEschool.id_juncao}/classes?segment=${segment}&classCode=${classCode}&serie=${serie}`,
      {
        headers: {
          "Authorization": resultGetAcessApi.token,
          "Accept": "text/plain"
        }
      }
    );

    const resultStatus = status == 200 ? true : false
    return {
      success: resultStatus,
      message: resultStatus ? "" : "",
      data
    }
  } catch (e: any) {
    return {
      success: false,
      message: "Erro interono do servidor",
      data: {}
    }
  }
}