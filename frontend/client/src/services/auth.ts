import { LoginRequest, UsuarioResponse } from "@/types";
import apiClient from "./api";

export const authService = {

  async login(email: string, senha: string): Promise<UsuarioResponse> {
    const payload: LoginRequest = { email, senha };
    const response = await apiClient.post<UsuarioResponse>(
      "/usuarios/auth/login",
      payload
    );

    localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
    localStorage.setItem("authToken", response.data.token);

    return response.data;
  },

  async me(): Promise<UsuarioResponse> {
    const token = this.getToken();

    const response = await apiClient.get("/usuarios/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  async register(novoUsuario: { senha: string; funcionarioId: string; role: string }): Promise<UsuarioResponse> {
    const response = await apiClient.post<UsuarioResponse[]>(
      "/usuarios",
      [novoUsuario]
    );

    const firstUser = response.data[0];
    // A API retorna uma lista, pegamos o primeiro e simulamos o formato de resposta de login
    const usuarioResponse: UsuarioResponse = {
      usuario: firstUser.usuario,
      token: firstUser.token
    };

    localStorage.setItem("usuario", JSON.stringify(usuarioResponse.usuario));
    localStorage.setItem("authToken", usuarioResponse.token);

    return usuarioResponse;
  },

  logout(): void {
    localStorage.removeItem("usuario");
    localStorage.removeItem("authToken");
  },

  getUsuarioAtual(): any | null {
    const usuario = localStorage.getItem("usuario");
    return usuario ? JSON.parse(usuario) : null;
  },

  getToken(): string | null {
    return localStorage.getItem("authToken");
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("usuario");
  },
};
