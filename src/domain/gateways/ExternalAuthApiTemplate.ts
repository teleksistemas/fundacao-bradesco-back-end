import axios from "axios"
import { AuthGlobal } from "../../domain/gateways/AuthGlobal.js";
import { GlobalResults } from "../../domain/value-objects/GlobalResults.js";
import { v4 as uuidv4 } from "uuid";
import { Escola } from "../../infrastructure/database/escola/Escola.js"

export class ExternalAuthApiTemplate implements AuthGlobal {
  async global(token_acess: string): Promise<GlobalResults> {
    try {
      const tokenRoteador = await Escola(token_acess)

      if (!tokenRoteador.token_acess) {
        return new GlobalResults(false, "Erro na API ao coletar templetes na Blip.", {}, "Escola não encontrada")
      }

      console.log(tokenRoteador)
      const bodyToRequest = {
        "id": uuidv4(),
        "to": "postmaster@wa.gw.msging.net",
        "method": "get",
        "uri": "/message-templates"
      }

      const response = await axios.post("https://bradesco.http.msging.net/commands",
        bodyToRequest,
        {
          headers: {
            "Authorization": tokenRoteador.token_router
          }
        }
      );
      console.log(response.data)
      if (!response.status) {
        return new GlobalResults(false, "Erro na API ao coletar templetes na Blip.", {}, response.data.error)
      }

      let bodyClean;
      if (response.data.status == "success") {
        bodyClean = response.data.resource.data;
      }
      return new GlobalResults(true, "Templetes coletados com sucesso", bodyClean ?? response.data, "")
    } catch (e: any) {
      return new GlobalResults(false, "Erro interno ao coletar templetes na Blip.", {}, e.toString())
    }
  }
}
