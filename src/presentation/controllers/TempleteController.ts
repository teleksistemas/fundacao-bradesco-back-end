import { TempleteUseCase } from "../../application/use-cases/TempleteUseCase.js"
import { GlobalResults } from "../../domain/value-objects/GlobalResults.js"
import { GlobalTokenAcessInputDTO } from "../../application/dto/GlobalTokenAcessInputDTO.js"

export class TempleteController {
  constructor(private templateUseCase: TempleteUseCase) {}

  async handle(input: GlobalTokenAcessInputDTO): Promise<GlobalResults> {
    const { token_acess } = input
    if (!token_acess) {
      return new GlobalResults(false, "Campo token_acess é obrigatório", null, "INVALID_INPUT")
    }

    return this.templateUseCase.execute(token_acess)
  }
}
