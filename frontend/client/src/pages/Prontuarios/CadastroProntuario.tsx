import { useState } from "react";
import { useLocation } from "wouter";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { prontuariosService } from "@/services/prontuarios";
import { ProntuarioCadastroRequest } from "@/types";
import { toast } from "sonner";

export default function CadastroProntuario() {
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProntuarioCadastroRequest>({
    idPaciente: 0,
    idMedico: 0,
    idAgendamento: 0,
    dataAtendimento: "",
    queixaPrincipal: "",
    historiaClinica: "",
    exameFisico: "",
    diagnostico: "",
    conduta: "",
    observacoes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("id") ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.idPaciente ||
      !formData.idMedico ||
      !formData.idAgendamento ||
      !formData.dataAtendimento ||
      !formData.queixaPrincipal ||
      !formData.historiaClinica ||
      !formData.exameFisico ||
      !formData.diagnostico ||
      !formData.conduta
    ) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setIsLoading(true);
    try {
      await prontuariosService.criar([formData]);
      toast.success("Prontuário criado com sucesso!");
      navigate("/prontuarios");
    } catch (error) {
      toast.error("Erro ao criar prontuário");
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
            onClick={() => navigate("/prontuarios")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Novo Prontuário
            </h1>
            <p className="text-muted-foreground mt-2">
              Registre um novo prontuário médico
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dados do Prontuário</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* IDs */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label htmlFor="idPaciente" className="text-sm font-medium">
                    ID Paciente
                  </label>
                  <Input
                    id="idPaciente"
                    name="idPaciente"
                    type="number"
                    value={formData.idPaciente}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="idMedico" className="text-sm font-medium">
                    ID Médico
                  </label>
                  <Input
                    id="idMedico"
                    name="idMedico"
                    type="number"
                    value={formData.idMedico}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="idAgendamento" className="text-sm font-medium">
                    ID Agendamento
                  </label>
                  <Input
                    id="idAgendamento"
                    name="idAgendamento"
                    type="number"
                    value={formData.idAgendamento}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="dataAtendimento"
                    className="text-sm font-medium"
                  >
                    Data do Atendimento
                  </label>
                  <Input
                    id="dataAtendimento"
                    name="dataAtendimento"
                    type="datetime-local"
                    value={formData.dataAtendimento}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Campos de Texto */}
              <div className="space-y-2">
                <label htmlFor="queixaPrincipal" className="text-sm font-medium">
                  Queixa Principal
                </label>
                <textarea
                  id="queixaPrincipal"
                  name="queixaPrincipal"
                  value={formData.queixaPrincipal}
                  onChange={handleChange}
                  placeholder="Descreva a queixa principal"
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="historiaClinica" className="text-sm font-medium">
                  História Clínica
                </label>
                <textarea
                  id="historiaClinica"
                  name="historiaClinica"
                  value={formData.historiaClinica}
                  onChange={handleChange}
                  placeholder="Histórico médico relevante"
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="exameFisico" className="text-sm font-medium">
                  Exame Físico
                </label>
                <textarea
                  id="exameFisico"
                  name="exameFisico"
                  value={formData.exameFisico}
                  onChange={handleChange}
                  placeholder="Resultados do exame físico"
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="diagnostico" className="text-sm font-medium">
                  Diagnóstico
                </label>
                <textarea
                  id="diagnostico"
                  name="diagnostico"
                  value={formData.diagnostico}
                  onChange={handleChange}
                  placeholder="Diagnóstico do paciente"
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="conduta" className="text-sm font-medium">
                  Conduta
                </label>
                <textarea
                  id="conduta"
                  name="conduta"
                  value={formData.conduta}
                  onChange={handleChange}
                  placeholder="Plano de tratamento e recomendações"
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="observacoes" className="text-sm font-medium">
                  Observações (Opcional)
                </label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  placeholder="Observações adicionais"
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={2}
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
                  onClick={() => navigate("/prontuarios")}
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
