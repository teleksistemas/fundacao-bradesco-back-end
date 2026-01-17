import { pool } from "../connection.js";

/* =======================================================
   BUSCAR TODAS AS CAMPANHAS
======================================================= */
export async function Camaping() {
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
   BUSCAR CAMPANHAS POR ID_JUNCAO
======================================================= */
export async function CampaingByIdJuncao(id_juncao: string) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM cache_campanha
      WHERE id_juncao = $1
      ORDER BY criado_em DESC
      `,
      [id_juncao]
    );

    return result.rows;
  } catch (e) {
    console.error("Erro ao buscar campanhas por junção:", e);
    return [];
  }
}

/* =======================================================
   BUSCAR CAMPANHAS NÃO FINALIZADAS
======================================================= */
export async function CamapingWithFinalizadaIstrue() {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM cache_campanha
      WHERE finalizada = false
      ORDER BY criado_em DESC
      `
    );

    return result.rows;
  } catch (e) {
    console.error("Erro ao buscar campanhas não finalizadas:", e);
    return [];
  }
}

/* =======================================================
   CRIAR NOVA CAMPANHA
======================================================= */
export async function createCampanha(body: any, nameUser: string) {
  try {
    const query = `
      INSERT INTO cache_campanha (
        id_campanha,
        id_juncao,
        id_escola,
        nome_campanha,
        modelo_mensagem,
        data_envio,
        total_audiencia,
        name_user
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    `;

    await pool.query(query, [
      body.id_campanha,
      body.id_juncao,
      body.id_escola,
      body.nome_campanha,
      body.modelo_mensagem,
      new Date(),
      body.total_audiencia || 0,
      nameUser,
    ]);

    return true;
  } catch (e) {
    console.error("Erro ao criar campanha:", e);
    return false;
  }
}

/* =======================================================
   MARCAR CAMPANHA COMO FINALIZADA
======================================================= */
export async function atualizarFianlizadaCampanha(idCampaing: string) {
  try {
    const result = await pool.query(
      `
      UPDATE cache_campanha
      SET finalizada = true,
          ultima_verificacao = now()
      WHERE id_campanha = $1
      RETURNING *
      `,
      [idCampaing]
    );

    return result.rows[0] || false;
  } catch (e) {
    console.error("Erro ao atualizar finalizada:", e);
    return false;
  }
}

/* =======================================================
   ATUALIZAR DADOS DE DISPARO DA CAMPANHA
======================================================= */
export async function atualizarDadosDeDisparoCampanha(
  idCampaing: string,
  qtd_recebidas: number,
  qtd_lidas: number,
  qtd_falhas: number
) {
  try {
    const result = await pool.query(
      `
      UPDATE cache_campanha
      SET 
        qtd_recebidas = $2,
        qtd_lidas = $3,
        qtd_falhas = $4,
        ultima_verificacao = now()
      WHERE id_campanha = $1
      RETURNING *
      `,
      [idCampaing, qtd_recebidas, qtd_lidas, qtd_falhas]
    );

    return result.rows[0] || false;
  } catch (e) {
    console.error("Erro ao atualizar dados de disparo:", e);
    return false;
  }
}
