import { AuthResultBradesco } from "../value-objects/AuthResultBradesco.js"
export interface AuthGatewayBradesco {
  tokenBradesco(token: string): Promise<AuthResultBradesco>
}