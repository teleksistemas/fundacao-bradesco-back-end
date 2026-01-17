import { pool } from "../connection.js";

export async function createLogs(
  body: any,
  servicoSolicitado: string,
  nameUser: string,
  id_juncao: string
) {
  try {
    const query = `
      INSERT INTO logs (
        juncao,
        servico_solicitado,
        usuario_disparo,
        body_recebido
      )
      VALUES ($1, $2, $3, $4)
    `;

    await pool.query(query, [
      id_juncao,
      servicoSolicitado,
      nameUser,
      JSON.stringify(body),
    ]);

    return true;
  } catch (e) {
    console.error("Erro ao criar log:", e);
    return false;
  }
}
