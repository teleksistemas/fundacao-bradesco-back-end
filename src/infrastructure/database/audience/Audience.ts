import { pool } from "../connection.js";

/* =======================================================
   BUSCAR TODAS AS CAMPANHAS (cache_campanha)
======================================================= */
export async function Audience() {
  try {
    const result = await pool.query(
      `SELECT * FROM cache_campanha ORDER BY criado_em DESC`
    );
    return result.rows;
  } catch (e) {
    console.error("Erro ao buscar campanhas:", e);
    return [];
  }
}

/* =======================================================
   BUSCAR AUDIÊNCIA POR CAMPANHA + JUNÇÃO
======================================================= */
export async function AudienceByIdCampaing(
  id_campanha: string,
  id_juncao: string
) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM cache_audiencia
      WHERE id_campanha = $1
        AND id_juncao = $2
      ORDER BY criado_em DESC
      `,
      [id_campanha, id_juncao]
    );

    return result.rows;
  } catch (e) {
    console.error("Erro ao buscar audiência:", e);
    return [];
  }
}

/* =======================================================
   CRIAR REGISTRO EM cache_audiencia
======================================================= */
export async function createCacheAudiencia(body: any) {
  try {
    const query = `
      INSERT INTO cache_audiencia (
        id_campanha,
        id_juncao,
        identidade_destino,
        msisdn,
        status,
        nome_aluno,
        nome_responsavel,
        nome_escola,
        nome_turma
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    `;

    await pool.query(query, [
      body.id_campanha,
      body.id_juncao || null,
      body.identidade_destino,
      body.msisdn,
      "PENDENTE",
      body.nome_aluno || null,
      body.nome_responsavel || null,
      body.nome_escola || null,
      body.nome_turma || null,
    ]);

    return true;
  } catch (error: any) {
    // Violação de chave única no Postgres (equivalente ao P2002 do Prisma)
    if (error.code === "23505") {
      return false;
    }

    console.error("Erro ao criar cache_audiencia:", error);
    return false;
  }
}

/* =======================================================
   BUSCAR POR DESTINO + CAMPANHA
======================================================= */
export async function searchCacheAudienciaToTarget(
  target: string,
  idCampaing: string
) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM cache_audiencia
      WHERE identidade_destino = $1
        AND id_campanha = $2
      LIMIT 1
      `,
      [target, idCampaing]
    );

    return result.rows[0] || false;
  } catch (e) {
    console.error("Erro na busca:", e);
    return false;
  }
}

/* =======================================================
   ATUALIZAR STATUS DO DESTINO (updateTarget)
======================================================= */
export async function updateTarget(
  target: string,
  idCampaing: string,
  status: string,
  codigo_motivo?: number,
  descricao_motivo?: string,
  processada_em?: Date
) {
  console.log(`Acessou UPDATE com ${status}`);

  try {
    let setClause = "";
    let params: any[] = [];

    if (status === "READ") {
      setClause = `
        status = $1,
        codigo_motivo = $2,
        descricao_motivo = $3,
        lida_em = $4,
        final = true
      `;
      params = [status, codigo_motivo, descricao_motivo, processada_em];
    }
    else if (status === "RECEIVED") {
      setClause = `
        status = $1,
        codigo_motivo = $2,
        descricao_motivo = $3,
        recebida_em = $4
      `;
      params = [status, codigo_motivo, descricao_motivo, processada_em];
    }
    else if (status === "FAILED") {
      setClause = `
        status = $1,
        codigo_motivo = $2,
        descricao_motivo = $3,
        processada_em = $4,
        final = true
      `;
      params = [status, codigo_motivo, descricao_motivo, processada_em];
    }
    else {
      setClause = `
        status = $1,
        codigo_motivo = $2,
        descricao_motivo = $3,
        processada_em = $4
      `;
      params = [status, codigo_motivo, descricao_motivo, processada_em];
    }

    const query = `
      UPDATE cache_audiencia
      SET ${setClause}
      WHERE id_campanha = $5
        AND identidade_destino = $6
      RETURNING *
    `;

    const result = await pool.query(query, [
      ...params,
      idCampaing,
      target,
    ]);

    return result.rows[0] || false;
  } catch (e) {
    console.error("Erro no update:", e);
    return false;
  }
}
