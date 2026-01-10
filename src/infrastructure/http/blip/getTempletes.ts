import axios from "axios"

import { v4 as uuidv4 } from "uuid";
import { EscolaByTokenAcess } from "../../../infrastructure/database/escola/Escola.js"

export async function GetTempletes(token_acess: string) {

  try {
    const tokenRoteador = await EscolaByTokenAcess(token_acess)

    if (!tokenRoteador.token_acess) {
      return {
        success: false,
        message: "Escola não encontrada",
        data: {}
      }
    }

    console.log(tokenRoteador)
    const bodyToRequest = {
      "id": uuidv4(),
      "to": "postmaster@wa.gw.msging.net",
      "method": "get",
      "uri": "/message-templates"
    }

    const { data, status } = await axios.post("https://bradesco.http.msging.net/commands",
      bodyToRequest,
      {
        headers: {
          "Authorization": tokenRoteador.token_router
        }
      }
    );

    if (status != 200) {
      return {
        success: false,
        message: "Erro na API ao coletar templetes na Blip",
        data: {}
      }
    }

    let bodyClean;
    if (data.status == "success") {
      bodyClean = data.resource.data;
    }

    return {
      success: true,
      message: "Templetes coletados com sucesso",
      data: data
    }

  } catch (e: any) {
    return {
      success: false,
      message: "Erro interno no servidor",
      data: {}
    }
  }
}
