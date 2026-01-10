import { AuthClasses } from "../../domain/gateways/AuthClasses.js"
export class ClassesUseCase {
    constructor(private authTemplete: AuthClasses) { }

    async execute(token_acess: string, segment: string, classCode: string, serie: string) {
        const result = await this.authTemplete.global(token_acess, segment, classCode, serie)
        
        if (!result.success) {
            return {
                success: false, message: "", data: null, error: result.error
            }
        }

        return result
    }
}
