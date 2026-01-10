import { LoginUseCase } from "../../application/use-cases/LoginUseCase.js"
import { AuthResult } from "../../domain/value-objects/AuthResult.js"
import { LoginInputDTO } from "../../application/dto/LoginInputDTO.js"

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(input: LoginInputDTO): Promise<AuthResult> {
    const { token } = input

    if (!token) {
      return new AuthResult(false, "Campo token é obrigatório", null, "INVALID_INPUT")
    }

    return this.loginUseCase.execute(token)
  }
}
