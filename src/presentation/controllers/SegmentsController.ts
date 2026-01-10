import { SegmentsUseCase } from "../../application/use-cases/SegmentsUseCase.js"
import { GlobalResults } from "../../domain/value-objects/GlobalResults.js"
import { GlobalTokenAcessInputDTO } from "../../application/dto/GlobalTokenAcessInputDTO.js"

export class SegmentsController {
  constructor(private segmentsUseCase: SegmentsUseCase) {}

  async handle(input: GlobalTokenAcessInputDTO): Promise<GlobalResults> {
    const { token_acess } = input
    if (!token_acess) {
      return new GlobalResults(false, "Campo token_acess é obrigatório", null, "INVALID_INPUT")
    }

    return this.segmentsUseCase.execute(token_acess)
  }
}
