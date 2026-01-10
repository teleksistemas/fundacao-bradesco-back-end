import { GlobalResults } from "../../domain/value-objects/GlobalResults.js"
export interface AuthClasses {
  global(token_acess: string, segment: string, classCode: string, serie: string ): Promise<GlobalResults>
}