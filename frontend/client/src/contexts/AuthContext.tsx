import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, UsuarioResponse } from "@/types";
import { authService } from "@/services/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restaurar sessão ao carregar
  useEffect(() => {
    const usuarioSalvo = authService.getUsuarioAtual();
    if (usuarioSalvo) {
      setUsuario(usuarioSalvo);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, senha: string) => {
    setIsLoading(true);
    try {
      const usuarioResponse = await authService.login(email, senha);
      setUsuario(usuarioResponse);
    } catch (error) {
      setUsuario(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUsuario(null);
  };

  const value: AuthContextType = {
    usuario,
    isAuthenticated: !!usuario,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
