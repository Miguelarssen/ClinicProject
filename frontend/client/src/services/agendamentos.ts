import {
  AgendamentoCadastroRequest,
  AgendamentoResponse,
  AgendamentoListagem,
  AgendamentoFiltros,
  PageResponse,
} from "@/types";
import apiClient from "./api";

export const agendamentosService = {
  async listar(filtros: AgendamentoFiltros = {}): Promise<PageResponse<AgendamentoListagem>> {
    const params = {
      page: filtros.page || 0,
      size: filtros.size || 10,
      ...(filtros.funcionarioEmail && { funcionarioEmail: filtros.funcionarioEmail }),
      ...(filtros.pacienteEmail && { pacienteEmail: filtros.pacienteEmail }),
      ...(filtros.dataInicio && { dataInicio: filtros.dataInicio }),
      ...(filtros.dataFim && { dataFim: filtros.dataFim }),
    };

    const response = await apiClient.get<PageResponse<AgendamentoListagem>>(
      "/agendamentos",
      { params }
    );
    return response.data;
  },

  async criar(dados: AgendamentoCadastroRequest[]): Promise<AgendamentoResponse[]> {
    const response = await apiClient.post<AgendamentoResponse[]>(
      "/agendamentos",
      dados
    );
    return response.data;
  },
};
