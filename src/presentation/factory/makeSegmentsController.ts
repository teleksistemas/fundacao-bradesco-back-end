import { SegmentsController } from "../../presentation/controllers/SegmentsController.js"
import { SegmentsUseCase } from "../../application/use-cases/SegmentsUseCase.js"
import { ExternalAuthApiSegments } from "../../domain/gateways/ExternalAuthApiSegments.js"

export function makeTempleteSegments(): SegmentsController {
  
  const gateway = new ExternalAuthApiSegments()
  const useCase = new SegmentsUseCase(gateway)
  return new SegmentsController(useCase)
}
