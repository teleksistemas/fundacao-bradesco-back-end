import { AuthGlobal } from "../../domain/gateways/AuthGlobal.js"
export class TempleteUseCase {
    constructor(private authTemplete: AuthGlobal) { }

    async execute(token_acess: string) {
        const result = await this.authTemplete.global(token_acess)

        if (!result.success) {
            return {
                success: false, message: "", data: null, error: result.error
            }
        }

        return result
    }
}
