import axios from "axios"
import { AuthGlobal } from "../../domain/gateways/AuthGlobal.js";
import { GlobalResults } from "../../domain/value-objects/GlobalResults.js";
import { Escola } from "../../infrastructure/database/escola/Escola.js";
import { ExternalAuthApiGatewayBradesco } from "../../domain/gateways/ExternalAuthApiGatewayBradesco.js"

export class ExternalAuthApiSegments implements AuthGlobal {
  async global(token_acess: string): Promise<GlobalResults> {
    try {
      const dadosEscola = await Escola(token_acess);

      if (!dadosEscola.token_acess) {
        return new GlobalResults(false, "Erro na API ao coletar segments na Blip.", {}, "Escola não encontrada")
      }

      const apiGetToken = new ExternalAuthApiGatewayBradesco();
      const tokenApi = await apiGetToken.tokenBradesco();

      if(!tokenApi.data || typeof tokenApi.data !== 'object' || !('access_token' in tokenApi.data)){
        return new GlobalResults(false, "Erro ao obter token da FB para coletar classes.", {}, "Escolas não encontrada")
      }

      const tokeToApi = (tokenApi.data as any).access_token;

      const numeroTeste = 15

      const response = await axios.get(`${process.env.BASEURL}/api/school-people/schools/${numeroTeste}/segments`,
        {
          headers: {
            "Authorization": `Bearer ${tokeToApi}`,
            "Accept": "text/plain"
          }
        }
      );
      if (!response.status) {
        return new GlobalResults(false, "Erro na API ao coletar segments na FB.", {}, response.data.error)
      }

      let bodyClean;
      if (response.data.status == "success") {
        bodyClean = response.data.resource.data;
      }
      return new GlobalResults(true, "Segments coletados com sucesso", bodyClean ?? response.data, "")
    } catch (e: any) {
      return new GlobalResults(false, "Erro interno ao coletar segments na FB.", {}, e.toString())
    }
  }
}
