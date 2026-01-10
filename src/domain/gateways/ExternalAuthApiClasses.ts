import axios from "axios"
import { AuthClasses } from "../../domain/gateways/AuthClasses.js";
import { GlobalResults } from "../../domain/value-objects/GlobalResults.js";
import { Escola } from "../../infrastructure/database/escola/Escola.js";
import { ExternalAuthApiGatewayBradesco } from "../../domain/gateways/ExternalAuthApiGatewayBradesco.js"

export class ExternalAuthApiClasses implements AuthClasses {
  async global(token_acess: string, segment: string, classCode: string, serie: string): Promise<GlobalResults> {
    try {
      const dadosEscola = await Escola(token_acess);

      if (!dadosEscola.token_acess) {
        return new GlobalResults(false, "Erro na API ao coletar segments na Blip.", {}, "Escola não encontrada")
      }

      const apiGetToken = new ExternalAuthApiGatewayBradesco();
      const tokenApi = await apiGetToken.tokenBradesco();

      if (!tokenApi.data || typeof tokenApi.data !== 'object' || !('access_token' in tokenApi.data)) {
        return new GlobalResults(false, "Erro ao obter token da FB para coletar classes.", {}, "Escolas não encontrada")
      }

      const tokeToApi = (tokenApi.data as any).access_token;

      const numeroTeste = 15
      console.log(segment, classCode, serie)
      const baseUrl = process.env.BASEURL
      const response = await axios.get(`${baseUrl}/api/school-people/schools/${numeroTeste}/classes?segment=${segment}&classCode=${classCode}&serie=${serie}`,
        {
          headers: {
            "Authorization": `Bearer ${tokeToApi}`,
            "Accept": "text/plain"
          }
        }
      );

      if (response.status != 200) {
        return new GlobalResults(false, "Erro na API ao coletar classes na FB.", {}, response.data.message)
      }

      let bodyClean;
      if (response.data.status == "success") {
        bodyClean = response.data.resource.data;
      }
      return new GlobalResults(true, "Classes coletados com sucesso", bodyClean ?? response.data, "")
    } catch (e: any) {
      
      return new GlobalResults(false, "Erro interno ao coletar classes na FB.", {}, e)
    }
  }
}
