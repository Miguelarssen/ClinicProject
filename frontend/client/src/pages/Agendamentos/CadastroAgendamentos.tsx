import { useState } from "react";
import { useLocation } from "wouter";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { agendamentosService } from "@/services/agendamentos";
import { AgendamentoCadastroRequest } from "@/types";
import { toast } from "sonner";

export default function CadastroAgendamentos() {
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AgendamentoCadastroRequest>({
    emailMedico: "",
    emailPaciente: "",
    emailRecepcionista: "",
    dataAgendamento: "",
    motivo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.emailMedico ||
      !formData.emailPaciente ||
      !formData.emailRecepcionista ||
      !formData.dataAgendamento ||
      !formData.motivo
    ) {
      toast.error("Preencha todos os campos");
      return;
    }

    setIsLoading(true);
    try {
      await agendamentosService.criar([formData]);
      toast.success("Agendamento criado com sucesso!");
      navigate("/agendamentos");
    } catch (error) {
      toast.error("Erro ao criar agendamento");
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
            onClick={() => navigate("/agendamentos")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Novo Agendamento
            </h1>
            <p className="text-muted-foreground mt-2">
              Agende uma nova consulta
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dados do Agendamento</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="emailMedico" className="text-sm font-medium">
                    Email do Médico
                  </label>
                  <Input
                    id="emailMedico"
                    name="emailMedico"
                    type="email"
                    value={formData.emailMedico}
                    onChange={handleChange}
                    placeholder="medico@clinica.com"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="emailPaciente" className="text-sm font-medium">
                    Email do Paciente
                  </label>
                  <Input
                    id="emailPaciente"
                    name="emailPaciente"
                    type="email"
                    value={formData.emailPaciente}
                    onChange={handleChange}
                    placeholder="paciente@email.com"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="emailRecepcionista"
                    className="text-sm font-medium"
                  >
                    Email do Recepcionista
                  </label>
                  <Input
                    id="emailRecepcionista"
                    name="emailRecepcionista"
                    type="email"
                    value={formData.emailRecepcionista}
                    onChange={handleChange}
                    placeholder="recepcao@clinica.com"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="dataAgendamento"
                    className="text-sm font-medium"
                  >
                    Data e Hora
                  </label>
                  <Input
                    id="dataAgendamento"
                    name="dataAgendamento"
                    type="datetime-local"
                    value={formData.dataAgendamento}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="motivo" className="text-sm font-medium">
                  Motivo da Consulta
                </label>
                <textarea
                  id="motivo"
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleChange}
                  placeholder="Descreva o motivo da consulta"
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={4}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={isLoading}>
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
                  onClick={() => navigate("/agendamentos")}
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
