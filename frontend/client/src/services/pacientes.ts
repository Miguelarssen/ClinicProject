import {
  PacienteCadastroRequest,
  PacienteAtualizaRequest,
  PacienteResponse,
  PacienteListagem,
  PageResponse,
} from "@/types";
import apiClient from "./api";

export const pacientesService = {
  async listar(page: number = 0, size: number = 10): Promise<PageResponse<PacienteListagem>> {
    const response = await apiClient.get<PageResponse<PacienteListagem>>(
      "/pacientes",
      { params: { page, size } }
    );
    return response.data;
  },

  async criar(dados: PacienteCadastroRequest[]): Promise<PacienteResponse[]> {
    const response = await apiClient.post<PacienteResponse[]>(
      "/pacientes",
      dados
    );
    return response.data;
  },

  async atualizar(dados: PacienteAtualizaRequest[]): Promise<PacienteResponse[]> {
    const response = await apiClient.put<PacienteResponse[]>(
      "/pacientes",
      dados
    );
    return response.data;
  },
};
