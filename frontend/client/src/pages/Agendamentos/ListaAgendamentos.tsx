import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Loader2 } from "lucide-react";
import { agendamentosService } from "@/services/agendamentos";
import { AgendamentoListagem, PageResponse } from "@/types";
import { toast } from "sonner";

export default function ListaAgendamentos() {
  const [, navigate] = useLocation();
  const [agendamentos, setAgendamentos] = useState<AgendamentoListagem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    carregarAgendamentos();
  }, [page]);

  const carregarAgendamentos = async () => {
    setIsLoading(true);
    try {
      const response: PageResponse<AgendamentoListagem> =
        await agendamentosService.listar({ page, size: 10 });
      setAgendamentos(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      toast.error("Erro ao carregar agendamentos");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleString("pt-BR");
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agendamentos</h1>
            <p className="text-muted-foreground mt-2">
              Gerenciar agendamentos de consultas
            </p>
          </div>
          <Button onClick={() => navigate("/agendamentos/novo")}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Agendamentos</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : agendamentos.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhum agendamento cadastrado
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Médico</TableHead>
                        <TableHead>Paciente</TableHead>
                        <TableHead>Data/Hora</TableHead>
                        <TableHead>Motivo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agendamentos.map((agendamento) => (
                        <TableRow key={agendamento.id}>

                          <TableCell className="font-medium">
                            {agendamento.emailMedico}
                          </TableCell>

                          <TableCell>
                            {agendamento.emailPaciente}
                            </TableCell>

                          <TableCell>                     
                            {formatarData(agendamento.dataAgendamento)}
                          </TableCell>

                          <TableCell>
                            {agendamento.motivo}
                          </TableCell>
                          
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Paginação */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Página {page + 1} de {totalPages}
                  </p>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      disabled={page === 0}
                      onClick={() => setPage(page - 1)}
                    >
                      Anterior
                    </Button>
                    <Button
                      variant="outline"
                      disabled={page === totalPages - 1}
                      onClick={() => setPage(page + 1)}
                    >
                      Próximo
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
