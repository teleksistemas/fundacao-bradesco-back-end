import { SegmentsUseCase } from "../../application/use-cases/SegmentsUseCase"

export async function SegmentsController(req: any, res: any) {
  try {
    const { authorization, token_acess } = req.headers
    if (authorization !== process.env.VERIFY_TOKEN) {
      return res.status(403).end("Necessário do authorization no header")
    }

    if (!token_acess || typeof token_acess != "string") {
      return res.status(403).end("Necessário do token_acess no header")
    }
    const resultSegmentsUseCase = await SegmentsUseCase(token_acess);
    return res.status(resultSegmentsUseCase.success ? 200 : 400).json(resultSegmentsUseCase)

  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
      data: {}
    });
  }
}