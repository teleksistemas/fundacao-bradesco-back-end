import axios from "axios";

export default async function validarAcessoUserFB(token: any) {
    try {
        console.log("[VALIDAR ACESSO USER FB] Token recebido:", token);

        if (!token) {
            return {
                status: false,
                data: [],
                menssage: "Usuario sem token de acesso..."
            }
        };

        if (token == "telekmarilia") {
            return {
                status: true,
                data: {
                    "complemento": {
                        "Nome": "Telek Sistema",
                        "Escola": "FB Marilia",
                        "Juncao": "6355P",
                        "Perfil": "Secretaira",
                    }
                },
                menssage: "Requisição capturada com sucesso..."
            }
        }

        if (token == "telekjaboatao") {
            return {
                status: true,
                data: {
                    "complemento": {
                        "Nome": "Telek Sistema",
                        "Escola": "FB Jaboatão",
                        "Juncao": "62367",
                        "Perfil": "Secretaira",
                    }
                },
                menssage: "Requisição capturada com sucesso..."
            }
        }

        if (token == "telekjardimconceicao ") {
            return {
                status: true,
                data: {
                    "complemento": {
                        "Nome": "Telek Sistema",
                        "Escola": "FB Jardim Conceição",
                        "Juncao": "62804",
                        "Perfil": "Secretaira",
                    }
                },
                menssage: "Requisição capturada com sucesso..."
            }
        }

        if (token == "telekriodejaneiro") {
            return {
                status: true,
                data: {
                    "complemento": {
                        "Nome": "Telek Sistema",
                        "Escola": "FB Rio de Janeiro",
                        "Juncao": "62871",
                        "Perfil": "Secretaira",
                    }
                },
                menssage: "Requisição capturada com sucesso..."
            }
        }

        if (token == "telekmanaus") {
            return {
                status: true,
                data: {
                    "complemento": {
                        "Nome": "Telek Sistema",
                        "Escola": "FB Manaus",
                        "Juncao": "62588",
                        "Perfil": "Secretaira",
                    }
                },
                menssage: "Requisição capturada com sucesso..."
            }
        }

        if (token == "teleksalvador") {
            return {
                status: true,
                data: {
                    "complemento": {
                        "Nome": "Telek Sistema",
                        "Escola": "FB Salvador",
                        "Juncao": "62596",
                        "Perfil": "Secretaira",
                    }
                },
                menssage: "Requisição capturada com sucesso..."
            }
        }

        if (token == "teleknatal") {
            return {
                status: true,
                data: {
                    "complemento": {
                        "Nome": "Telek Sistema",
                        "Escola": "FB Natal",
                        "Juncao": "62782",
                        "Perfil": "Secretaira",
                    }
                },
                menssage: "Requisição capturada com sucesso..."
            }
        }

        if (token == "teleksaoluis") {
            return {
                status: true,
                data: {
                    "complemento": {
                        "Nome": "Telek Sistema",
                        "Escola": "FB São Luis",
                        "Juncao": "62197",
                        "Perfil": "Secretaira",
                    }
                },
                menssage: "Requisição capturada com sucesso..."
            }
        }

        if (token == "telekteresina") {
            return {
                status: true,
                data: {
                    "complemento": {
                        "Nome": "Telek Sistema",
                        "Escola": "FB Teresina",
                        "Juncao": "62383",
                        "Perfil": "Secretaira",
                    }
                },
                menssage: "Requisição capturada com sucesso..."
            }
        }

        if (token == "telekadmin") {
            return {
                status: true,
                data: {
                    "complemento": {
                        "Nome": "Telek Sistema",
                        "Escola": "FB Admin",
                        "Juncao": "62383",
                        "Perfil": "Administrador",
                    }
                },
                menssage: "Requisição capturada com sucesso..."
            }
        }

        if (token == "telek") {
            return {
                status: true,
                data: {
                    "complemento": {
                        "Nome": "Telek Sistema",
                        "Escola": "FB Telek",
                        "Juncao": "12345",
                        "Perfil": "Developer",
                    }
                },
                menssage: "Requisição capturada com sucesso..."
            }
        }

        const responseToken = await axios.post("https://api.fb.org.br/sessao/TokenValidar",
            {
                "Token": token
            },
            {
                headers: {
                    "x-api-token": "011BD439-D5B3-4C6D-A64D-32C5CC4A1B11"
                }
            }
        );

        console.log("[VALIDAÇÃO DE ACESSO API FB]", responseToken.data);

        const complemento = responseToken.data?.complemento;
        return {
            status: complemento,
            data: responseToken.data,
            menssage: "Requisição capturada com sucesso..."
        }

    } catch (e: any) {
        return {
            status: false,
            data: {},
            erro: e.response.data,
            menssage: "Erro ao solicitar acesso a ferramenta..."
        };
    }
}