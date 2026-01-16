import { LoginUseCase } from "../../application/use-cases/LoginUseCase.js"

interface Acess {
  success: boolean,
  data: any,
  menssage?: string
}

export async function LoginController(req: any, res: any) {
  try {
    const { authorization, token_fb } = req.headers
    if (authorization !== process.env.VERIFY_TOKEN) {
      return res.status(403).end("Necessário do authorization no header")
    }

    if (!token_fb || typeof token_fb != "string") {
      return res.status(403).end("Necessário do token_fb no header e do tipo string")
    }

    const responseAcess: Acess = await LoginUseCase(token_fb);
    return res.status(responseAcess.success ? 200 : 400).json(responseAcess)

  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
      data: {}
    });
  }
}