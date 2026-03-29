import { LoginRequest, UsuarioResponse } from "@/types";
import apiClient from "./api";

export const authService = {

  async login(email: string, senha: string): Promise<UsuarioResponse> {
    const payload: LoginRequest = { email, senha };
    const response = await apiClient.post<UsuarioResponse>(
      "/usuarios/login",
      payload
    );

    localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
    localStorage.setItem("token", response.data.token);

    return response.data;
  },

  async register(novoUsuario: { senha: string; funcionarioId: string }): Promise<UsuarioResponse> {
    const response = await apiClient.post<UsuarioResponse>(
      "/usuarios",
      [novoUsuario]
    );

    // Armazenar dados de sessão
    localStorage.setItem("usuario", JSON.stringify(response.data));
    localStorage.setItem("authToken", JSON.stringify(response.data));

    return response.data;
  },

  logout(): void {
    localStorage.removeItem("usuario");
    localStorage.removeItem("authToken");
  },

  getUsuarioAtual(): UsuarioResponse | null {
    const usuario = localStorage.getItem("usuario");
    return usuario ? JSON.parse(usuario) : null;
  },


  isAuthenticated(): boolean {
    return !!localStorage.getItem("usuario");
  },
};
