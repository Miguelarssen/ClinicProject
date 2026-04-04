import {
  ProntuarioCadastroRequest,
  ProntuarioResponse,
  ProntuarioListagem,
  PageResponse,
} from "@/types";
import apiClient from "./api";

export const prontuariosService = {
  async listar(page: number = 0, size: number = 10): Promise<PageResponse<ProntuarioListagem>> {
    const response = await apiClient.get<PageResponse<ProntuarioListagem>>(
      "/prontuarios",
      { params: { page, size } }
    );
    return response.data;
  },

  async obterPorId(id: number): Promise<ProntuarioResponse> {
    const response = await apiClient.get<ProntuarioResponse>(
      `/prontuarios/${id}`
    );
    return response.data;
  },

  async criar(dados: ProntuarioCadastroRequest[]): Promise<ProntuarioResponse[]> {
    const response = await apiClient.post<ProntuarioResponse[]>(
      "/prontuarios",
      dados
    );
    return response.data;
  },
};
