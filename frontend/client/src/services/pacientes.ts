import {
  PacienteCadastroRequest,
  PacienteAtualizaRequest,
  PacienteResponse,
  PacienteListagem,
  PageResponse,
} from "@/types";
import apiClient from "./api";
import { authService } from "./auth";

const getAuthHeaders = () => {
  const token = authService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const pacientesService = {
  async listar(page: number = 0, size: number = 10): Promise<PageResponse<PacienteListagem>> {
    const response = await apiClient.get<PageResponse<PacienteListagem>>(
      "/pacientes",
      {
        params: { page, size },
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  },

  async criar(dados: PacienteCadastroRequest[]): Promise<PacienteResponse[]> {
    const response = await apiClient.post<PacienteResponse[]>(
      "/pacientes",
      dados,
      { headers: getAuthHeaders() }
    );
    return response.data;
  },

  async atualizar(dados: PacienteAtualizaRequest[]): Promise<PacienteResponse[]> {
    const response = await apiClient.put<PacienteResponse[]>(
      "/pacientes",
      dados,
      { headers: getAuthHeaders() }
    );
    return response.data;
  },
};
