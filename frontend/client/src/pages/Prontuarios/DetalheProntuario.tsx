import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { prontuariosService } from "@/services/prontuarios";
import { ProntuarioResponse } from "@/types";
import { toast } from "sonner";

export default function DetalheProntuario() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/prontuarios/:id");
  const [prontuario, setProntuario] = useState<ProntuarioResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      carregarProntuario(parseInt(params.id));
    }
  }, [params?.id]);

  const carregarProntuario = async (id: number) => {
    setIsLoading(true);
    try {
      const data = await prontuariosService.obterPorId(id);
      setProntuario(data);
    } catch (error) {
      toast.error("Erro ao carregar prontuário");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleString("pt-BR");
  };

  if (!match) {
    return null;
  }

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
              Detalhes do Prontuário
            </h1>
            <p className="text-muted-foreground mt-2">
              Prontuário #{prontuario?.idProntuario}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : prontuario ? (
          <div className="space-y-4">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">ID Paciente</p>
                  <p className="text-lg font-semibold">{prontuario.idPaciente}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ID Médico</p>
                  <p className="text-lg font-semibold">{prontuario.idMedico}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ID Agendamento</p>
                  <p className="text-lg font-semibold">
                    {prontuario.idAgendamento}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Data do Atendimento
                  </p>
                  <p className="text-lg font-semibold">
                    {formatarData(prontuario.dataAtendimento)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Queixa Principal */}
            <Card>
              <CardHeader>
                <CardTitle>Queixa Principal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">
                  {prontuario.queixaPrincipal}
                </p>
              </CardContent>
            </Card>

            {/* História Clínica */}
            <Card>
              <CardHeader>
                <CardTitle>História Clínica</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">
                  {prontuario.historiaClinica}
                </p>
              </CardContent>
            </Card>

            {/* Exame Físico */}
            <Card>
              <CardHeader>
                <CardTitle>Exame Físico</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">
                  {prontuario.exameFisico}
                </p>
              </CardContent>
            </Card>

            {/* Diagnóstico */}
            <Card>
              <CardHeader>
                <CardTitle>Diagnóstico</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">
                  {prontuario.diagnostico}
                </p>
              </CardContent>
            </Card>

            {/* Conduta */}
            <Card>
              <CardHeader>
                <CardTitle>Conduta</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">
                  {prontuario.conduta}
                </p>
              </CardContent>
            </Card>

            {/* Observações */}
            {prontuario.observacoes && (
              <Card>
                <CardHeader>
                  <CardTitle>Observações</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground whitespace-pre-wrap">
                    {prontuario.observacoes}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Ações */}
            <div className="flex gap-2">
              <Button onClick={() => navigate("/prontuarios")}>
                Voltar à Lista
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Prontuário não encontrado</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
