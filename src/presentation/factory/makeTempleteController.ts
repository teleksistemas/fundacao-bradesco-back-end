import { TempleteController } from "../../presentation/controllers/TempleteController.js"
import { TempleteUseCase } from "../../application/use-cases/TempleteUseCase.js"
import { ExternalAuthApiTemplate } from "../../domain/gateways/ExternalAuthApiTemplate.js"

export function makeTempleteController(): TempleteController {
  const gateway = new ExternalAuthApiTemplate()
  const useCase = new TempleteUseCase(gateway)
  return new TempleteController(useCase)
}
