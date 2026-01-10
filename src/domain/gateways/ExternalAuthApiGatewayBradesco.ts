import axios from "axios";
import { AuthGatewayBradesco } from "../../domain/gateways/AuthGatewayBradesco.js";
import { AuthResultBradesco } from "../../domain/value-objects/AuthResultBradesco.js";

export class ExternalAuthApiGatewayBradesco implements AuthGatewayBradesco {
  async tokenBradesco(): Promise<AuthResultBradesco> {
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

      const { data, status } = await axios.post(`https://login.microsoftonline.com/${tenant_id}/oauth2/v2.0/token`,
        body,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );

      if (status != 200) {
        return new AuthResultBradesco(false, {}, data.error)
      }

      return new AuthResultBradesco(true, data, "")
    } catch (e: any) {
      return new AuthResultBradesco(false, {}, e)
    }
  }
}
