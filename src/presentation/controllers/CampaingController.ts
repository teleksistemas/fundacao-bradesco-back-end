import { CampaingUseCase } from "../../application/use-cases/CampaingUseCase.js"

export async function CampaingController(req: any, res: any) {
  try {
    const { authorization, token_acess } = req.headers
    if (authorization !== process.env.VERIFY_TOKEN) {
      return res.status(403).end("Necessário do authorization no header")
    }

    if (!token_acess || typeof token_acess != "string") {
      return res.status(403).end("Necessário do token_acess no header")
    }
    const resultGetCampaings = await CampaingUseCase(token_acess);
    return res.status(resultGetCampaings.success ? 200 : 400).json(resultGetCampaings)

  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
      data: []
    });
  }
}