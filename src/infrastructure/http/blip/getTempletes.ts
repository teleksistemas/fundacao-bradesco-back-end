// import axios from 'axios';
// import { v4 as uuidv4 } from "uuid";
// const BLIP_BASE = `https://fundacaobradesco.http.msging.net/commands`;
// const BLIP_AUTH = "Key ZnVuZGFjYW9icmFkZXNjbzE6SXE3MkxiVVFmU2lzUDBCN2hOZTU=";
// import { getEscolasByNome } from "@/lib/ColetarDadosEscola";
// const tokenParaSegundaChance = process.env.TOKEN_ROUTER_BLIP;
// const contrato = process.env.ID_CONTRATO_BLIP;

// async function coletarTemplate(idjuncao: string) {
//     try {

//         const consulta = await getEscolasByNome(idjuncao);

//         console.log(consulta)

//         if (consulta.length == 0) {
//             return {
//                 "success": false,
//                 "data": [],
//                 "erro": "Não encontramos sua escola.",
//                 "message": "Não conseguimos localizar os dados da sua escola. Peço que refaça o login novamente!"
//             }
//         }

//         const body = {
//             "id": uuidv4(),
//             "to": "postmaster@wa.gw.msging.net",
//             "method": "get",
//             "uri": "/message-templates"
//         }

//         const token = consulta[0].token_router ?? tokenParaSegundaChance;

//         const req = await axios.post(`https://${contrato}.http.msging.net/commands`,
//             body,
//             {
//                 headers: {
//                     "Authorization": token
//                 }
//             })

//         return {
//             status: true,
//             menssage: "Requisição ocorrida com sucesso",
//             data: req.data.resource.data || []
//         }
//     } catch (e) {
//         return {
//             status: false,
//             menssage: "Erro ao coletar dados: " + JSON.stringify(e),
//             data: []
//         }
//     }
// }


// export async function GET(req: NextRequest) {
//     try {
//         const idJuncaoEscola = req.headers.get('idjuncao');

//         if (!idJuncaoEscola) {
//             return NextResponse.json(
//                 {
//                     success: false,
//                     data: [],
//                     erro: "ID da escola não foi encontrado na sua sessão",
//                     message: "Sua sessão parece ter expirado. Faça login novamente para continuar usando o sistema!"
//                 },
//                 { status: 500 }
//             );
//         }

//         const resultado = await coletarTemplate(idJuncaoEscola);
        
//         return NextResponse.json(resultado,{status: 200});
//     } catch (e) {
//         console.error("Erro na API:", e);
//         return NextResponse.json(
//             { status: false, mensagem: "Erro interno no servidor.", data: [] },
//             { status: 500 }
//         );
//     }
// }