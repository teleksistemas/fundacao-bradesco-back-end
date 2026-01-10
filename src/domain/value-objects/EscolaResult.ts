export class EscolaResult {
    constructor(
        public readonly id_juncao: string | null,
        public readonly nome_escola: string | null,
        public readonly numero_escola: string | null,
        public readonly token_router?: string | null,
        public readonly token_acess?: string | null
    ) { }
}