import {
  FuncionarioCadastroRequest,
  FuncionarioAtualizaRequest,
  FuncionarioResponse,
  FuncionarioListagem,
  PageResponse,
} from "@/types";
import apiClient from "./api";

export const funcionariosService = {
  async listar(page: number = 0, size: number = 10): Promise<PageResponse<FuncionarioListagem>> {
    const response = await apiClient.get<PageResponse<FuncionarioListagem>>(
      "/funcionarios",
      { params: { page, size } }
    );
    return response.data;
  },

  async criar(dados: FuncionarioCadastroRequest[]): Promise<FuncionarioResponse[]> {
    const response = await apiClient.post<FuncionarioResponse[]>(
      "/funcionarios",
      dados
    );
    return response.data;
  },

  async atualizar(dados: FuncionarioAtualizaRequest[]): Promise<FuncionarioResponse[]> {
    const response = await apiClient.put<FuncionarioResponse[]>(
      "/funcionarios",
      dados
    );
    return response.data;
  },
};
