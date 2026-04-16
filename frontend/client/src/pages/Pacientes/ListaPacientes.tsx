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
import { pacientesService } from "@/services/pacientes";
import { PacienteListagem, PageResponse } from "@/types";
import { toast } from "sonner";

export default function ListaPacientes() {
  const [, navigate] = useLocation();
  const [pacientes, setPacientes] = useState<PacienteListagem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    carregarPacientes();
  }, [page]);

  const carregarPacientes = async () => {
    setIsLoading(true);
    try {
      const response: PageResponse<PacienteListagem> = await pacientesService.listar(page, 10);
      setPacientes(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      toast.error("Erro ao carregar pacientes");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pacientes</h1>
            <p className="text-muted-foreground mt-2">
              Gerenciar lista de pacientes
            </p>
          </div>
          <Button onClick={() => navigate("/pacientes/novo")}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Paciente
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : pacientes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhum paciente cadastrado
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>CPF</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pacientes.map((paciente) => (
                        <TableRow key={paciente.id}>
                          <TableCell className="font-medium">
                            {paciente.nome}
                          </TableCell>
                          <TableCell>{paciente.cpf}</TableCell>
                          <TableCell>{paciente.email}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                navigate(`/pacientes/${paciente.id}`)
                              }
                            >
                              Editar
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
