import { ClassesUseCase } from "../../application/use-cases/ClassesUseCase"

export async function ClassesController(req: any, res: any) {
  try {
    const { authorization, token_acess } = req.headers;
    const { segment, classCode, serie } = req.query;
    if (authorization !== process.env.VERIFY_TOKEN) {
      return res.status(403).end("Necessário do authorization no header")
    }

    if (!token_acess || typeof token_acess != "string") {
      return res.status(403).end("Necessário do token_acess no header")
    }

    if (!segment || typeof segment != "string" || !classCode || typeof classCode != "string" || !serie || typeof serie != "string") {
      return res.status(403).end("Necessário que segment, classCode e serie sejam do tipo string e existam nos parametros.");
    }

    const responseClasses: ResulteClasse = await ClassesUseCase(token_acess, segment, classCode, serie);
    return res.status(responseClasses.success ? 200 : 400).json(responseClasses)

  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
      data: []
    });
  }
}

interface ResulteClasse {
  success: boolean;
  message: string;
  data: any;
}