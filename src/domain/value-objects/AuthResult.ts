
export class AuthResult {
    constructor(
        public readonly success: boolean,
        public readonly message: string,
        public readonly data: Data | any | null,
        public readonly error?: string,
        public readonly token_acess?: string | null | undefined
    ) { }
}

interface Data {
    "complemento": {
        "Nome": String;
        "Escola": String;
        "Juncao": String;
        "Perfil": String;
    }
}

export class User {
    constructor(
        public readonly Nome: string,
        public readonly Escola: string,
        public readonly Juncao: string,
        public readonly Perfil?: string
    ) { }
}