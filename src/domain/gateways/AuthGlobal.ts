import { GlobalResults } from "../../domain/value-objects/GlobalResults.js"
export interface AuthGlobal {
  global(token_acess: string): Promise<GlobalResults>
}