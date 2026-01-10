import { ClassesUseCase } from "../../application/use-cases/ClassesUseCase.js"
import { GlobalResults } from "../../domain/value-objects/GlobalResults.js"
import { ClassesAcessInputDTO } from "../../application/dto/ClassesAcessInputDTO.js"

export class ClassesController {
  constructor(private templateUseCase: ClassesUseCase) { }

  async handle(input: ClassesAcessInputDTO): Promise<GlobalResults> {
    const { token_acess, segment, classCode, serie } = input
    if (!token_acess || !segment || !classCode || !serie) {
      return new GlobalResults(false, "Campo token_acess, segment, classCode e serie é obrigatório", null, "INVALID_INPUT")
    }

    return this.templateUseCase.execute(token_acess, segment, classCode, serie)
  }
}
