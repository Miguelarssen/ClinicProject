import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Register() {
  const [, navigate] = useLocation();
  const { register, isLoading } = useAuth();

  const [funcionarioId, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!funcionarioId || !senha) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem");
      return;
    }

    try {
      const novoUsuario = {
        senha,
        funcionarioId,

      };

      await register(novoUsuario);
      toast.success("Conta criada com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erro ao realizar cadastro. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Criar Conta
          </CardTitle>
          <CardDescription className="text-center">
            Cadastre os dados do funcionário e acesso ao sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Seção do Funcionário */}

            <div className="space-y-2">
              <label htmlFor="funcionarioId" className="text-sm font-medium">
                Id do Funcionário
              </label>
              <Input
                id="funcionarioId"
                //type="email"
                //placeholder="exemplo@clinica.com"
                value={funcionarioId}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <hr className="my-4 border-slate-200" />

            {/* Seção de Segurança (Usuário) */}
            <div className="space-y-2">
              <label htmlFor="senha" className="text-sm font-medium">
                Senha de Acesso
              </label>
              <Input
                id="senha"
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmarSenha" className="text-sm font-medium">
                Confirmar Senha
              </label>
              <Input
                id="confirmarSenha"
                type="password"
                placeholder="••••••••"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                "Finalizar Cadastro"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Já tem uma conta?{" "}
              <Link href="/" className="text-primary hover:underline font-medium">
                Faça login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}