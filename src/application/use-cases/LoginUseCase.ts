import { AuthGateway } from "../../domain/gateways/AuthGateway.js"
export class LoginUseCase {
    constructor(private authGateway: AuthGateway) { }

    async execute(token: string) {
        const result = await this.authGateway.login(token)

        if (!result.success) {
            return {
                success: false, message: "", data: null, error: result.error
            }
        }

        return result
    }
}
