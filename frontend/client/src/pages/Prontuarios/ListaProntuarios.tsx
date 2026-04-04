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
import { Plus, Loader2, Eye } from "lucide-react";
import { prontuariosService } from "@/services/prontuarios";
import { ProntuarioListagem, PageResponse } from "@/types";
import { toast } from "sonner";

export default function ListaProntuarios() {
  const [, navigate] = useLocation();
  const [prontuarios, setProntuarios] = useState<ProntuarioListagem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    carregarProntuarios();
  }, [page]);

  const carregarProntuarios = async () => {
    setIsLoading(true);
    try {
      const response: PageResponse<ProntuarioListagem> =
        await prontuariosService.listar(page, 10);
      setProntuarios(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      toast.error("Erro ao carregar prontuários");
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
            <h1 className="text-3xl font-bold text-foreground">Prontuários</h1>
            <p className="text-muted-foreground mt-2">
              Gerenciar prontuários médicos
            </p>
          </div>
          <Button onClick={() => navigate("/prontuarios/novo")}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Prontuário
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Prontuários</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : prontuarios.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhum prontuário cadastrado
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Paciente</TableHead>
                        <TableHead>ID Médico</TableHead>
                        <TableHead>Data do Atendimento</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {prontuarios.map((prontuario) => (
                        <TableRow key={prontuario.idProntuario}>
                          <TableCell className="font-medium">
                            {prontuario.idPaciente}
                          </TableCell>
                          <TableCell>{prontuario.idMedico}</TableCell>
                          <TableCell>
                            {formatarData(prontuario.dataAtendimento)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                navigate(
                                  `/prontuarios/${prontuario.idProntuario}`
                                )
                              }
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Visualizar
                            </Button>
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
