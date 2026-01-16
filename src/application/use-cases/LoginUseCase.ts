import { UserAcess } from "../../infrastructure/http/bradesco/UserAcess";

interface AccessResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  token_access?: string;
}

export async function LoginUseCase<T>(token: string): Promise<AccessResponse<T>> {
  try {
    const userAccessResponse = await UserAcess(token);

    return {
      success: userAccessResponse.status ?? false,
      data: userAccessResponse.data,
      message: userAccessResponse.menssage,
      token_access: userAccessResponse.token_acess,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Erro interno",
    };
  }
}
