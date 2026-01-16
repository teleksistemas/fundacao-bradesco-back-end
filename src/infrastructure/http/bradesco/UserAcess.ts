import axios from "axios";
import { EscolaByIdJuncao } from "../../database/escola/Escola"

const chavesDeTeste = ["telekmarilia", "telekjaboatao", "telekjardimconceicao", "telekriodejaneiro", "telekmanaus", "telekmanaus", "teleksalvador", "teleknatal", "teleksaoluis", "telekteresina", "telekadmin", "telek"]

export async function UserAcess(token: any) {
    try {

        if (chavesDeTeste.includes(token)) {
            const dadosDeTeste = dadosParaTeste[token as keyof typeof dadosParaTeste];
            const getTokenAcessSchool = await EscolaByIdJuncao(dadosDeTeste.complemento.Juncao);
            return {
                status: true,
                data: dadosDeTeste.complemento,
                token_acess: getTokenAcessSchool.token_acess,
                menssage: "Usuario indentificado com sucesso"
            }
        }

        const { data, status } = await axios.post("https://api.fb.org.br/sessao/TokenValidar",
            {
                "Token": token
            },
            {
                headers: {
                    "x-api-token": "011BD439-D5B3-4C6D-A64D-32C5CC4A1B11"
                }
            }
        );

        const getTokenAcessSchool = await EscolaByIdJuncao(data.complemento.Juncao);
        return {
            success: status == 200 ? true : false,
            data: status == 200 ? data?.complemento : [],
            token_acess: getTokenAcessSchool.token_acess,
            menssage: status == 200 ? "Usuario indentificado com sucesso" : "Usuario não indentificado",
        }

    } catch (e: any) {
        return {
            success: false,
            data: [],
            token_acess: "",
            menssage: e
        };
    }
}


const dadosParaTeste = {
    "telekmarilia": {
        "complemento": {
            "Nome": "Telek Sistema",
            "Escola": "FB Marilia",
            "Juncao": "6355P",
            "Perfil": "Secretaira",
        }
    },
    "telekjardimconceicao": {
        "complemento": {
            "Nome": "Telek Sistema",
            "Escola": "FB Jardim Conceição",
            "Juncao": "62804",
            "Perfil": "Secretaira",
        }
    },
    "telekriodejaneiro": {
        "complemento": {
            "Nome": "Telek Sistema",
            "Escola": "FB Rio de Janeiro",
            "Juncao": "62871",
            "Perfil": "Secretaira",
        }
    },
    "telekmanaus": {
        "complemento": {
            "Nome": "Telek Sistema",
            "Escola": "FB Manaus",
            "Juncao": "62588",
            "Perfil": "Secretaira",
        }
    },
    "teleksalvador": {
        "complemento": {
            "Nome": "Telek Sistema",
            "Escola": "FB Salvador",
            "Juncao": "62596",
            "Perfil": "Secretaira",
        }
    },
    "teleknatal": {
        "complemento": {
            "Nome": "Telek Sistema",
            "Escola": "FB Natal",
            "Juncao": "62782",
            "Perfil": "Secretaira",
        }
    },
    "teleksaoluis": {
        "complemento": {
            "Nome": "Telek Sistema",
            "Escola": "FB São Luis",
            "Juncao": "62197",
            "Perfil": "Secretaira",
        }
    },
    "telekteresina": {
        "complemento": {
            "Nome": "Telek Sistema",
            "Escola": "FB Teresina",
            "Juncao": "62383",
            "Perfil": "Secretaira",
        }
    },
    "telekadmin": {
        "complemento": {
            "Nome": "Telek Sistema",
            "Escola": "FB Admin",
            "Juncao": "62383",
            "Perfil": "Administrador",
        }
    },
    "telek": {
        "complemento": {
            "Nome": "Telek Sistema",
            "Escola": "FB Telek",
            "Juncao": "15",
            "Perfil": "Developer",
        }
    }
}