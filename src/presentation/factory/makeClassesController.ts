import { ClassesController } from "../../presentation/controllers/ClassesController.js"
import { ClassesUseCase } from "../../application/use-cases/ClassesUseCase.js"
import { ExternalAuthApiClasses } from "../../domain/gateways/ExternalAuthApiClasses.js"

export function makeClassesController(): ClassesController {
  
  const gateway = new ExternalAuthApiClasses()
  const useCase = new ClassesUseCase(gateway)
  return new ClassesController(useCase)
}
