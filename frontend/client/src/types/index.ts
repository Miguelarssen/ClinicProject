/**
 * Tipos TypeScript para o Sistema de Clínica
 * Espelham as DTOs do backend
 */

// ============ AUTENTICAÇÃO ============

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface UsuarioData {
  id: number;
  senha?: string;
  nome: string;
  email: string;
}

export interface UsuarioResponse {
  usuario: UsuarioData;
  token: string;
}



// ============ PESSOA (Base) ============

export interface Pessoa {
  id: number;
  nome: string;
  cpf: string;
  nascimento: string; // ISO Date
  email: string;
}

// ============ PACIENTE ============

export interface PacienteCadastroRequest {
  nome: string;
  cpf: string;
  nascimento: string; // ISO Date
  email: string;
}

export interface PacienteAtualizaRequest extends PacienteCadastroRequest {
  id: number;
}

export interface PacienteResponse extends Pessoa { }

export interface PacienteListagem {
  id: number;
  nome: string;
  cpf: string;
  email: string;
}

// ============ FUNCIONÁRIO ============

export type TipoFuncionario = "MEDICO" | "RECEPCAO";

export interface FuncionarioCadastroRequest {
  nome: string;
  cpf: string;
  nascimento: string; // ISO Date
  email: string;
  tipoFuncionario: TipoFuncionario;
}

export interface FuncionarioAtualizaRequest extends FuncionarioCadastroRequest {
  id: number;
}

export interface FuncionarioResponse extends Pessoa {
  tipoFuncionario: TipoFuncionario;
}

export interface FuncionarioListagem {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  tipoFuncionario: TipoFuncionario;
}

// ============ AGENDAMENTO ============

export interface AgendamentoCadastroRequest {
  emailMedico: string;
  emailPaciente: string;
  emailRecepcionista: string;
  dataAgendamento: string; // ISO DateTime
  motivo: string;
}

export interface AgendamentoResponse {
  id: number;
  emailMedico: string;
  emailPaciente: string;
  emailRecepcionista: string;
  dataAgendamento: string;
  motivo: string;
}

export interface AgendamentoListagem {
  id: number;
  emailMedico: string;
  emailPaciente: string;
  emailRecepcionista: string;
  dataAgendamento: string;
  motivo: string;
}

export interface AgendamentoFiltros {
  funcionarioEmail?: string;
  pacienteEmail?: string;
  dataInicio?: string;
  dataFim?: string;
  page?: number;
  size?: number;
}

// ============ PRONTUÁRIO ============

export interface ProntuarioCadastroRequest {
  idPaciente: number;
  idMedico: number;
  idAgendamento: number;
  dataAtendimento: string; // ISO DateTime
  queixaPrincipal: string;
  historiaClinica: string;
  exameFisico: string;
  diagnostico: string;
  conduta: string;
  observacoes?: string;
}

export interface ProntuarioResponse {
  idProntuario: number;
  idPaciente: number;
  idMedico: number;
  idAgendamento: number;
  dataAtendimento: string;
  queixaPrincipal: string;
  historiaClinica: string;
  exameFisico: string;
  diagnostico: string;
  conduta: string;
  observacoes?: string;
}

export interface ProntuarioListagem {
  idProntuario: number;
  idPaciente: number;
  idMedico: number;
  idAgendamento: number;
  dataAtendimento: string;
}

// ============ PAGINAÇÃO ============

export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

// ============ CONTEXTO DE AUTENTICAÇÃO ============

export interface AuthContextType {
  usuario: UsuarioResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  register: (novoUsuario: {
    senha: string;
    funcionarioId: string;
  }) => Promise<void>;
}
