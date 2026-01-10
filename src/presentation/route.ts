import express from "express";

import { createTaskCampaign } from '../infrastructure/queue/producers/task.producer.bradesco.campaign.js';
import { makeLoginController } from "./factory/makeLoginController.js";
import { makeTempleteController } from "./factory/makeTempleteController.js";
import { makeTempleteSegments } from "./factory/makeSegmentsController.js";
import { makeClassesController } from "./factory/makeClassesController.js";

const routes = express();

routes.use(express.json());

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API Teste",
    version: "1.0.0"
  }
};

routes.post("/api/v1/login", async (req, res) => {
  try {
    const { authorization } = req.headers
    if (authorization !== process.env.VERIFY_TOKEN) {
      return res.status(403).end("Necessário do authorization no header")
    }

    const controller = makeLoginController()
    const result = await controller.handle(req.body)

    return res.status(result.success ? 200 : 400).json(result)
  } catch {
    return res.status(500).end("Erro inesperado")
  }
})

routes.get("/api/v1/templetes", async (req, res) => {
  try {
    const { authorization, token_acess } = req.headers
    if (authorization !== process.env.VERIFY_TOKEN) {
      return res.status(403).end("Necessário do authorization no header")
    }

    if (!token_acess || typeof token_acess != "string") {
      return res.status(403).end("Necessário do token_acess no header")
    }

    const controller = makeTempleteController()
    const result = await controller.handle({
      token_acess: token_acess
    })
    return res.status(result.success ? 200 : 400).json(result)
  } catch {
    return res.status(500).end("Erro inesperado")
  }
})


routes.get("/api/v1/segments", async (req, res) => {
  try {
    const { authorization, token_acess } = req.headers
    if (authorization !== process.env.VERIFY_TOKEN) {
      return res.status(403).end("Necessário do authorization no header")
    }

    if (!token_acess || typeof token_acess != "string") {
      return res.status(403).end("Necessário do token_acess no header")
    }

    const controller = makeTempleteSegments()
    const result = await controller.handle({
      token_acess: token_acess
    })
    return res.status(result.success ? 200 : 400).json(result)
  } catch {
    return res.status(500).end("Erro inesperado")
  }
})


routes.get("/api/v1/classes", async (req, res) => {
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

    const controller = makeClassesController()
    const result = await controller.handle({
      token_acess: token_acess,
      segment: segment,
      classCode: classCode,
      serie: serie
    })
    return res.status(result.success ? 200 : 400).json(result)
  } catch {
    return res.status(500).end("Erro inesperado")
  }
})



// Receber mensagens ativas para disparo
routes.post("/api/v1/campaign", async (req, res) => {
  try {
    const bodyToCampaing = req.body;
    console.log(bodyToCampaing)
    if (!bodyToCampaing.body.messaging_product || !bodyToCampaing.body.recipient_type || !bodyToCampaing.body.template || !bodyToCampaing.body.to || !bodyToCampaing.type) {
      return res.status(401).json({
        status: false,
        message: "Erro ao inserir na fila de disparo pois esta faltando dados no corpo da req.",
        error: ""
      });
    }

    await createTaskCampaign(bodyToCampaing);

    return res.status(200).json({
      status: true,
      message: "Campanha inserida na fila de disparo com sucesso.",
      error: ""
    })
  } catch (e) {
    console.log("❌ Erro ao tentar criar campaign na fila POST-/api/v1/campaign/webhook: " + e)
    res.status(500).json({
      status: false,
      message: "Erro ao inserir na fila de disparo.",
      error: JSON.stringify(e)
    });
  }
})

routes.get("/api/v1/healths", (_, res) => {
  res.json({ status: "ok" });
});

export default routes;
