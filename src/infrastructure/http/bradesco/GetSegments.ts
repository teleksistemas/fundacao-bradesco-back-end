import axios from "axios"

import { GetTokenBradesco } from "./GetTokenBradesco.js"
import { EscolaByTokenAcess } from "../../database/escola/Escola.js";

export async function GetSegments(token_acess: string) {
  try {
    const dadosEscola = await EscolaByTokenAcess(token_acess);

    if (!dadosEscola.id_juncao) {
      return {
        success: false,
        message: "Não conseguimos encontrar sua escola",
        data: {}
      }
    }

    const resultGetAcessApi = await GetTokenBradesco();
    if (resultGetAcessApi.status == false) {
      return {
        success: false,
        message: "Não conseguimos coletar token de acesso da api da bradeco.",
        data: {}
      }
    }

    const { data, status } = await axios.get(`${process.env.BASEURL}/api/school-people/schools/${dadosEscola.id_juncao}/segments`,
      {
        headers: {
          "Authorization": resultGetAcessApi.token,
          "Accept": "text/plain"
        }
      }
    );

    console.log(data)

    return {
      success: status == 200 ? true : false,
      message: status == 200 ? "Encontrado com sucesso" : "Erro ao tentar consultar os segmentos",
      data: status == 200 ? data.segments : {}
    }
  } catch (e: any) {
    console.log(e)
    return {
      success: false,
      message: "Erro interno no servidor",
      data: {}
    }
  }
}