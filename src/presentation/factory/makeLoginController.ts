import { LoginController } from "../../presentation/controllers/LoginController.js"
import { LoginUseCase } from "../../application/use-cases/LoginUseCase.js"
import { ExternalAuthApiGateway } from "../../domain/gateways/ExternalAuthApiGateway.js"

export function makeLoginController(): LoginController {
  const gateway = new ExternalAuthApiGateway()
  const useCase = new LoginUseCase(gateway)
  return new LoginController(useCase)
}
