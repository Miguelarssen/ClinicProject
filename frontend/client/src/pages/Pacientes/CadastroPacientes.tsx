import { useState } from "react";
import { useLocation } from "wouter";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { pacientesService } from "@/services/pacientes";
import { PacienteCadastroRequest } from "@/types";
import { toast } from "sonner";

export default function CadastroPacientes() {
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PacienteCadastroRequest>({
    nome: "",
    cpf: "",
    nascimento: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.cpf || !formData.nascimento || !formData.email) {
      toast.error("Preencha todos os campos");
      return;
    }

    setIsLoading(true);
    try {
      await pacientesService.criar([formData]);
      toast.success("Paciente cadastrado com sucesso!");
      navigate("/pacientes");
    } catch (error) {
      toast.error("Erro ao cadastrar paciente");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/pacientes")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Novo Paciente
            </h1>
            <p className="text-muted-foreground mt-2">
              Cadastre um novo paciente no sistema
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dados do Paciente</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="nome" className="text-sm font-medium">
                    Nome Completo
                  </label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="João Silva"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="cpf" className="text-sm font-medium">
                    CPF
                  </label>
                  <Input
                    id="cpf"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    placeholder="123.456.789-00"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="nascimento" className="text-sm font-medium">
                    Data de Nascimento
                  </label>
                  <Input
                    id="nascimento"
                    name="nascimento"
                    type="date"
                    value={formData.nascimento}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="joao@email.com"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/pacientes")}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
