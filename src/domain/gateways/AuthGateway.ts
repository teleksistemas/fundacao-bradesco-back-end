import { AuthResult } from "../value-objects/AuthResult.js"
export interface AuthGateway {
  login(token: string): Promise<AuthResult>
}