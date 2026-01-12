

/* =======================
   INTERFACES
======================= */

export interface BodyToCampaing {
  contatosToDisparo: Targets[]
  components: Components
  nameTamplate: string
  token_acess: string
}

export interface Targets {
  cpf: string
  mobileNumber: string
  name: string
  students: Students
}

export interface Students {
  rm: string
  name: string
  email: string | null
  serie: string
  classCode: string
  description: string
}

export interface Components {
  qtdDeVariaveis: number
  camposDeUtilização: string[]
}