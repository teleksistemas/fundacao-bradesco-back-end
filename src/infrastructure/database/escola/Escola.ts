import { pool } from "../connection.js";

/* =======================================================
   BUSCAR ESCOLA POR TOKEN DE ACESSO
======================================================= */
export async function Escola(token: string) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM escola
      WHERE token_acess = $1
      LIMIT 1
      `,
      [token]
    );

    const escola = result.rows[0];

    return new EscolaResult(
      escola?.id_juncao ?? null,
      escola?.nome_escola ?? null,
      escola?.numero_escola ?? null,
      escola?.token_router ?? "",
      escola?.token_acess ?? ""
    );
  } catch (e) {
    console.error("Erro ao buscar escola por token:", e);
    return new EscolaResult(null, null, null, "", "");
  }
}

/* =======================================================
   BUSCAR ESCOLA POR ID_JUNCAO
======================================================= */
export async function EscolaByIdJuncao(id_juncao: string) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM escola
      WHERE id_juncao = $1
      LIMIT 1
      `,
      [id_juncao]
    );

    const escola = result.rows[0];

    return new EscolaResult(
      escola?.id_juncao ?? null,
      escola?.nome_escola ?? null,
      escola?.numero_escola ?? null,
      escola?.token_router ?? "",
      escola?.token_acess ?? ""
    );
  } catch (e) {
    console.error("Erro ao buscar escola por id_juncao:", e);
    return new EscolaResult(null, null, null, "", "");
  }
}

/* =======================================================
   BUSCAR ESCOLA POR TOKEN_ACESS (COM ID_ESCOLA)
======================================================= */
export async function EscolaByTokenAcess(token_acess: string) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM escola
      WHERE token_acess = $1
      LIMIT 1
      `,
      [token_acess]
    );

    const escola = result.rows[0];

    return new EscolaResult(
      escola?.id_juncao ?? null,
      escola?.nome_escola ?? null,
      escola?.numero_escola ?? null,
      escola?.token_router ?? "",
      escola?.token_acess ?? "",
      escola?.id_escola ?? null
    );
  } catch (e) {
    console.error("Erro ao buscar escola por token_acess:", e);
    return new EscolaResult(null, null, null, "", "");
  }
}

/* =======================================================
   CLASSE DE RESULTADO (MANTIDA IGUAL À SUA)
======================================================= */
export class EscolaResult {
  constructor(
    public readonly id_juncao: string | null,
    public readonly nome_escola: string | null,
    public readonly numero_escola: string | null,
    public readonly token_router: string,
    public readonly token_acess?: string,
    public readonly id_escola?: number | null
  ) {}
}
